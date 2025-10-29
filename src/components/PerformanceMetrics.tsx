

'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  UserGroupIcon,
  CurrencyRupeeIcon,
  CalendarIcon,
  CheckCircleIcon,
  ArrowTrendingUpIcon,
  BriefcaseIcon,
  HomeIcon,
  SparklesIcon,
  DocumentCheckIcon,
  BuildingLibraryIcon,
} from '@heroicons/react/24/outline';

interface PerformanceData {
  success: boolean;
  district_code: string;
  district_name: string;
  state_name: string;
  meta: {
    fin_year: string;
    month: string;
    state_code: string;
    district_code: string;
    timestamp: string;
  };
  performance_data: {
    total_workers: number;
    active_workers: number;
    total_households_worked: number;
    total_individuals_worked: number;
    job_cards_issued: number;
    active_job_cards: number;
    avg_days_employment: number;
    avg_wage_rate: number;
    completed_100_days: number;
    approved_labour_budget: number;
    total_wages: number;
    material_skilled_wages: number;
    total_expenditure: number;
    admin_expenditure: number;
    total_works_taken_up: number;
    completed_works: number;
    ongoing_works: number;
    gps_with_nil_exp: number;
    women_participation_days: number;
    sc_participation_days: number;
    sc_workers_count: number;
    st_participation_days: number;
    st_workers_count: number;
    differently_abled: number;
    payment_within_15_days: number;
    category_b_works_percent: number;
    agriculture_allied_percent: number;
    nrm_expenditure_percent: number;
    central_liability_persondays: number;
    remarks: string;
  };
  statistics: {
    total_people_employed: number;
    total_households: number;
    women_percentage: string;
    sc_percentage: string;
    st_percentage: string;
  };
}

interface PerformanceMetricsProps {
  districtId: string | null;
  locale: 'en' | 'hi';
}

const content = {
  en: {
    title: 'Performance Metrics',
    subtitle: 'District Performance Overview',
    noDistrict: 'Select a district to view performance metrics',
    loading: 'Loading district performance...',
    employment: 'Employment Metrics',
    financial: 'Financial Information',
    works: 'Works & Projects',
    participation: 'Participation & Inclusion',
    performance: 'Performance Indicators',
    meta: 'Data Information',
    keyStatistics: 'Key Statistics',
    remarks: 'Remarks',
  },
  hi: {
    title: 'प्रदर्शन मेट्रिक्स',
    subtitle: 'जिला प्रदर्शन अवलोकन',
    noDistrict: 'प्रदर्शन मेट्रिक्स देखने के लिए एक जिला चुनें',
    loading: 'जिला प्रदर्शन लोड हो रहा है...',
    employment: 'रोजगार मेट्रिक्स',
    financial: 'वित्तीय जानकारी',
    works: 'कार्य और परियोजनाएं',
    participation: 'भागीदारी और समावेश',
    performance: 'प्रदर्शन संकेतक',
    meta: 'डेटा जानकारी',
    keyStatistics: 'मुख्य सांख्यिकी',
    remarks: 'टिप्पणियां',
  },
};

const metricsConfig = {
  employment: [
    { key: 'total_workers', label: { en: 'Total Workers', hi: 'कुल श्रमिक' }, icon: UserGroupIcon, color: 'blue' },
    { key: 'active_workers', label: { en: 'Active Workers', hi: 'सक्रिय श्रमिक' }, icon: ArrowTrendingUpIcon, color: 'green' },
    { key: 'total_households_worked', label: { en: 'Households Worked', hi: 'काम करने वाले घर' }, icon: HomeIcon, color: 'purple' },
    { key: 'total_individuals_worked', label: { en: 'Total Individuals Worked', hi: 'कुल व्यक्ति' }, icon: UserGroupIcon, color: 'orange' },
    { key: 'avg_days_employment', label: { en: 'Avg Days Employment', hi: 'औसत दिन रोजगार' }, icon: CalendarIcon, color: 'pink' },
    { key: 'completed_100_days', label: { en: 'Completed 100 Days', hi: '100 दिन पूरे किए' }, icon: CheckCircleIcon, color: 'indigo' },
  ],
  jobs: [
    { key: 'job_cards_issued', label: { en: 'Job Cards Issued', hi: 'जारी किए गए जॉब कार्ड' }, icon: DocumentCheckIcon, color: 'blue' },
    { key: 'active_job_cards', label: { en: 'Active Job Cards', hi: 'सक्रिय जॉब कार्ड' }, icon: CheckCircleIcon, color: 'green' },
  ],
  financial: [
    { key: 'total_wages', label: { en: 'Total Wages Paid', hi: 'कुल मजदूरी का भुगतान' }, icon: CurrencyRupeeIcon, color: 'green', format: 'currency' },
    { key: 'avg_wage_rate', label: { en: 'Avg Wage Rate/Day', hi: 'औसत दैनिक दर' }, icon: CurrencyRupeeIcon, color: 'blue', format: 'currency' },
    { key: 'total_expenditure', label: { en: 'Total Expenditure', hi: 'कुल व्यय' }, icon: CurrencyRupeeIcon, color: 'orange', format: 'currency' },
    { key: 'admin_expenditure', label: { en: 'Admin Expenditure', hi: 'प्रशासनिक व्यय' }, icon: CurrencyRupeeIcon, color: 'pink', format: 'currency' },
    { key: 'material_skilled_wages', label: { en: 'Material & Skilled Wages', hi: 'सामग्री और कुशल मजदूरी' }, icon: CurrencyRupeeIcon, color: 'indigo', format: 'currency' },
    { key: 'approved_labour_budget', label: { en: 'Approved Labour Budget', hi: 'अनुमोदित श्रम बजट' }, icon: CurrencyRupeeIcon, color: 'purple', format: 'currency' },
  ],
  works: [
    { key: 'total_works_taken_up', label: { en: 'Works Taken Up', hi: 'उठाए गए कार्य' }, icon: BriefcaseIcon, color: 'blue' },
    { key: 'completed_works', label: { en: 'Completed Works', hi: 'पूर्ण कार्य' }, icon: CheckCircleIcon, color: 'green' },
    { key: 'ongoing_works', label: { en: 'Ongoing Works', hi: 'चल रहे कार्य' }, icon: ArrowTrendingUpIcon, color: 'orange' },
    { key: 'gps_with_nil_exp', label: { en: 'GPs with Nil Expenditure', hi: 'कोई व्यय के साथ जीपी' }, icon: BuildingLibraryIcon, color: 'pink' },
  ],
  participation: [
    { key: 'women_participation_days', label: { en: 'Women Participation Days', hi: 'महिला भागीदारी दिन' }, icon: UserGroupIcon, color: 'pink' },
    { key: 'sc_participation_days', label: { en: 'SC Participation Days', hi: 'अनुसूचित जाति भागीदारी दिन' }, icon: UserGroupIcon, color: 'blue' },
    { key: 'st_participation_days', label: { en: 'ST Participation Days', hi: 'अनुसूचित जनजाति भागीदारी दिन' }, icon: UserGroupIcon, color: 'green' },
    { key: 'differently_abled', label: { en: 'Differently Abled Persons', hi: 'विकलांग व्यक्ति' }, icon: UserGroupIcon, color: 'purple' },
  ],
  performance: [
    { key: 'payment_within_15_days', label: { en: 'Payment Within 15 Days %', hi: '15 दिन में भुगतान %' }, icon: CheckCircleIcon, color: 'green', format: 'percent' },
    { key: 'category_b_works_percent', label: { en: 'Category B Works %', hi: 'श्रेणी बी कार्य %' }, icon: ArrowTrendingUpIcon, color: 'blue', format: 'percent' },
    { key: 'agriculture_allied_percent', label: { en: 'Agriculture & Allied %', hi: 'कृषि और संबंधित %' }, icon: ArrowTrendingUpIcon, color: 'orange', format: 'percent' },
    { key: 'nrm_expenditure_percent', label: { en: 'NRM Expenditure %', hi: 'एनआरएम व्यय %' }, icon: ArrowTrendingUpIcon, color: 'pink', format: 'percent' },
  ],
};

const colorClasses: { [key: string]: string } = {
  blue: 'from-blue-500 to-blue-600',
  green: 'from-green-500 to-green-600',
  purple: 'from-purple-500 to-purple-600',
  orange: 'from-orange-500 to-orange-600',
  pink: 'from-pink-500 to-pink-600',
  indigo: 'from-indigo-500 to-indigo-600',
};

const colorBgClasses: { [key: string]: string } = {
  blue: 'bg-blue-50',
  green: 'bg-green-50',
  purple: 'bg-purple-50',
  orange: 'bg-orange-50',
  pink: 'bg-pink-50',
  indigo: 'bg-indigo-50',
};

// Metric Card Component
const MetricCard = ({ metric, value, locale, color }: any) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const Icon = metric.icon;

  const formatValue = (val: number | string, format?: string): string => {
    const numVal = typeof val === 'string' ? parseFloat(val) : val;
    if (isNaN(numVal)) return '0';
    if (format === 'currency') return `₹${numVal.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;
    if (format === 'percent') return `${numVal.toFixed(2)}%`;
    return numVal.toLocaleString();
  };

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
      className="group relative"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${colorClasses[color]} rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

      <div className={`relative h-full p-6 rounded-2xl ${colorBgClasses[color]} border border-white/60 shadow-lg group-hover:shadow-2xl transition-all duration-300 backdrop-blur-xl bg-white/80`}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
              {metric.label[locale]}
            </h3>
          </div>
          <motion.div
            animate={{ scale: isHovered ? 1.1 : 1 }}
            className={`p-3 rounded-lg bg-gradient-to-br ${colorClasses[color]} text-white flex-shrink-0`}
          >
            <Icon className="h-5 w-5" />
          </motion.div>
        </div>

        <motion.div
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-baseline gap-2">
            <span className={`text-3xl font-bold bg-gradient-to-r ${colorClasses[color]} bg-clip-text text-transparent`}>
              {formatValue(value, metric.format)}
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: isHovered ? '100%' : '0%' }}
          transition={{ duration: 0.3 }}
          className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${colorClasses[color]} rounded-b-2xl`}
        />
      </div>
    </motion.div>
  );
};

// Metrics Section Component
const MetricsSection = ({ title, metrics, data, locale }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="mb-12"
  >
    <div className="mb-8">
      <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        {title}
      </h3>
      <div className="h-1 w-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mt-2" />
    </div>

    <motion.div
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {metrics.map((metric: any, idx: number) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.05 }}
        >
          <MetricCard
            metric={metric}
            value={data[metric.key] || 0}
            locale={locale}
            color={metric.color}
          />
        </motion.div>
      ))}
    </motion.div>
  </motion.div>
);

// Main Component
export default function PerformanceMetrics({ districtId, locale }: PerformanceMetricsProps) {
  const [performanceData, setPerformanceData] = useState<PerformanceData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const text = content[locale];

  useEffect(() => {
    if (!districtId) {
      setPerformanceData(null);
      setLoading(false);
      return;
    }

    const fetchMetrics = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await fetch(`/api/district/${districtId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: PerformanceData = await response.json();
        setPerformanceData(data);
        setError('');
      } catch (err) {
        console.error('Fetch error:', err);
        setError(locale === 'en' ? 'Error loading metrics' : 'मेट्रिक्स लोड करने में त्रुटि');
        setPerformanceData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, [districtId, locale]);

  // No district selected
  if (!districtId) {
    return (
      <section className="py-16 px-6">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-100"
          >
            <SparklesIcon className="h-16 w-16 mx-auto text-blue-400 mb-4" />
            <p className="text-xl text-gray-600 font-medium">{text.noDistrict}</p>
          </motion.div>
        </div>
      </section>
    );
  }

  // Loading state
  if (loading) {
    return (
      <section className="py-16 px-6">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="inline-block"
            >
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto" />
            </motion.div>
            <p className="mt-6 text-gray-600 text-lg font-medium">{text.loading}</p>
          </motion.div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="py-16 px-6">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-lg bg-red-50 border border-red-200 text-red-700"
          >
            <p className="font-semibold mb-2">{error}</p>
            <p className="text-sm">{locale === 'en' ? 'Please try again later or select another district.' : 'कृपया बाद में पुनः प्रयास करें या अन्य जिला चुनें।'}</p>
          </motion.div>
        </div>
      </section>
    );
  }

  // No data
  if (!performanceData) {
    return null;
  }

  const { performance_data, meta, statistics } = performanceData;

  return (
    <section className="py-20 px-6 relative overflow-hidden" id="performance-metrics">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              {text.title}
            </span>
          </h2>
          <p className="text-lg text-gray-600 mb-4">{text.subtitle}</p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-bold text-blue-600"
          >
            📍 {performanceData.district_name}, {performanceData.state_name}
          </motion.p>
        </motion.div>

        {/* Meta Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 p-6 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100"
        >
          <p className="text-sm text-gray-600 mb-2">
            {text.meta} • {meta.fin_year} • {meta.month}
          </p>
          <p className="text-xs text-gray-500">
            {locale === 'en' ? 'Last Updated' : 'अंतिम अपडेट'}: {new Date(meta.timestamp).toLocaleDateString(locale === 'hi' ? 'hi-IN' : 'en-US')}
          </p>
        </motion.div>

        {/* Employment Metrics */}
        <MetricsSection
          title={text.employment}
          metrics={[...metricsConfig.employment, ...metricsConfig.jobs]}
          data={performance_data}
          locale={locale}
        />

        {/* Financial Information */}
        <MetricsSection
          title={text.financial}
          metrics={metricsConfig.financial}
          data={performance_data}
          locale={locale}
        />

        {/* Works & Projects */}
        <MetricsSection
          title={text.works}
          metrics={metricsConfig.works}
          data={performance_data}
          locale={locale}
        />

        {/* Participation & Inclusion */}
        <MetricsSection
          title={text.participation}
          metrics={metricsConfig.participation}
          data={performance_data}
          locale={locale}
        />

        {/* Performance Indicators */}
        <MetricsSection
          title={text.performance}
          metrics={metricsConfig.performance}
          data={performance_data}
          locale={locale}
        />

        {/* Statistics Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-2xl"
        >
          <h3 className="text-2xl font-bold mb-6">
            {text.keyStatistics}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
            <motion.div whileHover={{ y: -5 }}>
              <p className="text-blue-100 text-sm mb-2">
                {locale === 'en' ? 'Total Employed' : 'कुल नियोजित'}
              </p>
              <p className="text-3xl font-bold">{statistics.total_people_employed.toLocaleString()}</p>
            </motion.div>
            <motion.div whileHover={{ y: -5 }}>
              <p className="text-blue-100 text-sm mb-2">
                {locale === 'en' ? 'Total Households' : 'कुल घर'}
              </p>
              <p className="text-3xl font-bold">{statistics.total_households.toLocaleString()}</p>
            </motion.div>
            <motion.div whileHover={{ y: -5 }}>
              <p className="text-blue-100 text-sm mb-2">
                {locale === 'en' ? 'Women %' : 'महिलाएं %'}
              </p>
              <p className="text-3xl font-bold">{statistics.women_percentage}%</p>
            </motion.div>
            <motion.div whileHover={{ y: -5 }}>
              <p className="text-blue-100 text-sm mb-2">
                {locale === 'en' ? 'SC %' : 'एससी %'}
              </p>
              <p className="text-3xl font-bold">{statistics.sc_percentage}%</p>
            </motion.div>
            <motion.div whileHover={{ y: -5 }}>
              <p className="text-blue-100 text-sm mb-2">
                {locale === 'en' ? 'ST %' : 'एसटी %'}
              </p>
              <p className="text-3xl font-bold">{statistics.st_percentage}%</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Remarks */}
        {performance_data.remarks && performance_data.remarks !== 'NA' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 p-6 rounded-xl bg-yellow-50 border border-yellow-200"
          >
            <p className="text-sm text-yellow-800 font-medium">
              <strong>{text.remarks}:</strong> {performance_data.remarks}
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}

