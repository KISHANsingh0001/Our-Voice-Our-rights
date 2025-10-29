'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import DistrictSelector from '@/components/DistrictSelector';
import PerformanceMetrics from '@/components/PerformanceMetrics';
import { useLocale } from '@/context/LocaleContext';

interface District {
  id: string;
  name: string;
  state: string;
  nameHi?: string;
  stateHi?: string;
}

interface Metric {
  label: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  comparison?: string;
}

export default function Home() {
  const { locale, setLocale } = useLocale();
  const [selectedDistrict, setSelectedDistrict] = useState<District | null>(null);
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [loading, setLoading] = useState(false);

  const handleDistrictSelect = async (district: District | null) => {
    // Handle clearing selection
    if (!district) {
      setSelectedDistrict(null);
      setMetrics([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setSelectedDistrict(district);

    try {
      const response = await fetch(`/api/district/${district.id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch district data');
      }
      
      const data = await response.json();
      const { performance_data } = data;

      // Helper function to determine trend
      const getTrend = (current: number, threshold: number): 'up' | 'down' | 'stable' => {
        if (current > threshold) return 'up';
        if (current < threshold) return 'down';
        return 'stable';
      };
      
      // Transform API data into metrics
      const newMetrics: Metric[] = [
        {
          label: locale === 'en' ? 'Total Workers' : 'कुल श्रमिक',
          value: performance_data.total_workers,
          unit: locale === 'en' ? 'people' : 'लोग',
          trend: getTrend(performance_data.total_workers, performance_data.total_workers * 0.8), // Compare with 80% threshold
          comparison: locale === 'en' ? 'Current active workers' : 'वर्तमान सक्रिय श्रमिक'
        },
        {
          label: locale === 'en' ? 'Active Workers' : 'सक्रिय श्रमिक',
          value: performance_data.active_workers,
          unit: locale === 'en' ? 'people' : 'लोग',
          trend: getTrend(performance_data.active_workers, performance_data.total_workers * 0.5),
          comparison: locale === 'en' ? 
            `${Math.round((performance_data.active_workers / performance_data.total_workers) * 100)}% of total workers` : 
            `कुल श्रमिकों का ${Math.round((performance_data.active_workers / performance_data.total_workers) * 100)}%`
        },
        {
          label: locale === 'en' ? 'Work Days Generated' : 'उत्पन्न कार्य दिवस',
          value: performance_data.work_days_generated,
          unit: locale === 'en' ? 'days' : 'दिन',
          trend: getTrend(performance_data.work_days_generated, 50000), // Example threshold
          comparison: locale === 'en' ? 'Total work days this period' : 'इस अवधि में कुल कार्य दिवस'
        },
        {
          label: locale === 'en' ? 'Wages Paid' : 'भुगतान की गई मजदूरी',
          value: performance_data.wages_paid,
          unit: '₹',
          trend: getTrend(performance_data.wages_paid, 2000000), // Example threshold of 20 lakhs
          comparison: locale === 'en' ? 'Total wages disbursed' : 'कुल वितरित मजदूरी'
        }
      ];
      
      setMetrics(newMetrics);
    } catch (error) {
      console.error('Error fetching metrics:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation locale={locale} onLocaleChange={setLocale} />
      
      <main>
        <Hero locale={locale} />
        
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <DistrictSelector
            locale={locale}
            onDistrictSelect={handleDistrictSelect}
          />
        </section>

        {selectedDistrict  && (
          <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-100">
            <div className="max-w-7xl mx-auto">
              <PerformanceMetrics
                districtId={selectedDistrict?.id}
                 locale={locale}
              />
            </div>
          </section>
        )}
      </main>

      {/* <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">
                {locale === 'en' ? 'About MGNREGA' : 'मनरेगा के बारे में'}
              </h3>
              <p className="text-gray-400">
                {locale === 'en' 
                  ? 'The Mahatma Gandhi National Rural Employment Guarantee Act aims to enhance livelihood security in rural areas.'
                  : 'महात्मा गांधी राष्ट्रीय ग्रामीण रोजगार गारंटी अधिनियम का उद्देश्य ग्रामीण क्षेत्रों में आजीविका सुरक्षा को बढ़ाना है।'
                }
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">
                {locale === 'en' ? 'Quick Links' : 'त्वरित लिंक्स'}
              </h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    {locale === 'en' ? 'Home' : 'होम'}
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    {locale === 'en' ? 'About' : 'परिचय'}
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    {locale === 'en' ? 'Contact' : 'संपर्क'}
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">
                {locale === 'en' ? 'Resources' : 'संसाधन'}
              </h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    {locale === 'en' ? 'Official Website' : 'आधिकारिक वेबसाइट'}
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    {locale === 'en' ? 'Guidelines' : 'दिशानिर्देश'}
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    {locale === 'en' ? 'FAQs' : 'सामान्य प्रश्न'}
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">
                {locale === 'en' ? 'Contact Us' : 'संपर्क करें'}
              </h3>
              <ul className="space-y-2">
                <li className="text-gray-400">
                  {locale === 'en' ? 'Email: support@ourvoice.org' : 'ईमेल: support@ourvoice.org'}
                </li>
                <li className="text-gray-400">
                  {locale === 'en' ? 'Phone: 1800-XXX-XXXX' : 'फोन: 1800-XXX-XXXX'}
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>
              {locale === 'en' 
                ? '© 2025 Our Voice, Our Rights. All rights reserved.'
                : '© 2025 हमारी आवाज़, हमारा अधिकार। सर्वाधिकार सुरक्षित।'
              }
            </p>
          </div>
        </div>
      </footer> */}
            <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-orange-500 to-pink-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-blue-500 to-purple-500 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Footer Content */}
          <div className="py-12 lg:py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
              
              {/* Brand Section */}
              <div className="lg:col-span-1">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
                      {locale === 'en' ? 'Our Voice' : 'हमारी आवाज़'}
                    </h3>
                    <p className="text-xs text-slate-400">
                      {locale === 'en' ? 'Our Rights' : 'हमारा अधिकार'}
                    </p>
                  </div>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  {locale === 'en' 
                    ? 'Empowering rural communities with transparent access to MGNREGA data and performance metrics.'
                    : 'मनरेगा डेटा और प्रदर्शन मेट्रिक्स तक पारदर्शी पहुंच के साथ ग्रामीण समुदायों को सशक्त बनाना।'
                  }
                </p>
                {/* Social Media Icons */}
                <div className="flex space-x-4">
                  <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-gradient-to-br hover:from-orange-500 hover:to-pink-500 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-orange-500/30">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-gradient-to-br hover:from-orange-500 hover:to-pink-500 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-orange-500/30">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-gradient-to-br hover:from-orange-500 hover:to-pink-500 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-orange-500/30">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-gradient-to-br hover:from-orange-500 hover:to-pink-500 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-orange-500/30">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                    </svg>
                  </a>
                </div>
              </div>
              
              {/* Quick Links */}
              <div>
                <h3 className="text-lg font-semibold mb-6 flex items-center">
                  <span className="w-1 h-6 bg-gradient-to-b from-orange-500 to-pink-500 rounded-full mr-3"></span>
                  {locale === 'en' ? 'Quick Links' : 'त्वरित लिंक्स'}
                </h3>
                <ul className="space-y-3">
                  {[
                    { en: 'Home', hi: 'होम', nav:'/' },
                    { en: 'About Us', hi: 'हमारे बारे में' , nav:'/about' },
                    { en: 'Districts', hi: 'जिले' , nav:'/' },
                    { en: 'Analytics', hi: 'विश्लेषण' , nav:'/' },
                    { en: 'Contact', hi: 'संपर्क' , nav:'/' }
                  ].map((link, idx) => (
                    <li key={idx}>
                      <a href={link.nav} className="text-slate-300 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center group">
                        <span className="w-0 h-0.5 bg-gradient-to-r from-orange-500 to-pink-500 group-hover:w-6 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                        {locale === 'en' ? link.en : link.hi}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Resources */}
              <div>
                <h3 className="text-lg font-semibold mb-6 flex items-center">
                  <span className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full mr-3"></span>
                  {locale === 'en' ? 'Resources' : 'संसाधन'}
                </h3>
                <ul className="space-y-3">
                  {[
                    { en: 'MGNREGA Official', hi: 'मनरेगा आधिकारिक' },
                    { en: 'Guidelines', hi: 'दिशानिर्देश' },
                    { en: 'FAQs', hi: 'सामान्य प्रश्न' },
                    { en: 'Reports', hi: 'रिपोर्ट' },
                    { en: 'Documentation', hi: 'प्रलेखन' }
                  ].map((link, idx) => (
                    <li key={idx}>
                      <a href="#" className="text-slate-300 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center group">
                        <span className="w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-6 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                        {locale === 'en' ? link.en : link.hi}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-semibold mb-6 flex items-center">
                  <span className="w-1 h-6 bg-gradient-to-b from-green-500 to-teal-500 rounded-full mr-3"></span>
                  {locale === 'en' ? 'Contact Us' : 'संपर्क करें'}
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start space-x-3 text-slate-300 hover:text-white transition-colors group">
                    <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-gradient-to-br group-hover:from-green-500 group-hover:to-teal-500 transition-all">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 mb-1">
                        {locale === 'en' ? 'Email' : 'ईमेल'}
                      </p>
                      <p className="text-sm font-medium">support@ourvoice.org</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3 text-slate-300 hover:text-white transition-colors group">
                    <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-gradient-to-br group-hover:from-green-500 group-hover:to-teal-500 transition-all">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 mb-1">
                        {locale === 'en' ? 'Helpline' : 'हेल्पलाइन'}
                      </p>
                      <p className="text-sm font-medium">1800-XXX-XXXX</p>
                    </div>
                  </li>
                 
                  
                    {/* <div>
                      <p className="text-xs text-slate-400 mb-1">
                        {locale === 'en' ? 'Address' : 'पता'}
                      </p>
                      <p className="text-sm font-medium">
                        {locale === 'en' ? 'New Delhi, India' : 'नई दिल्ली, भारत'}
                      </p>
                    </div> */}
                 
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-slate-700/50 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-6 text-sm text-slate-400">
                <a href="#" className="hover:text-white transition-colors">
                  {locale === 'en' ? 'Privacy Policy' : 'गोपनीयता नीति'}
                </a>
                <span className="text-slate-600">•</span>
                <a href="#" className="hover:text-white transition-colors">
                  {locale === 'en' ? 'Terms of Service' : 'सेवा की शर्तें'}
                </a>
                <span className="text-slate-600">•</span>
                <a href="#" className="hover:text-white transition-colors">
                  {locale === 'en' ? 'Sitemap' : 'साइटमैप'}
                </a>
              </div>
              
              <div className="flex items-center space-x-2 text-slate-400">
                <span className="text-sm">
                  {locale === 'en' 
                    ? '© 2025 Our Voice, Our Rights' 
                    : '© 2025 हमारी आवाज़, हमारा अधिकार'
                  }
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-sm">
                  {locale === 'en' ? 'Made with' : 'के साथ बनाया'}
                </span>
                <span className="text-red-500 animate-pulse">❤️</span>
                <span className="text-sm">
                  {locale === 'en' ? 'in India' : 'भारत में'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}