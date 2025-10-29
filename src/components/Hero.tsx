
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRightIcon, SparklesIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

interface HeroProps {
  locale: 'en' | 'hi';
}

const content = {
  en: {
    title: 'Empowering Rural India',
    subtitle: 'Know Your MGNREGA Performance',
    description: 'Easy access to your district\'s employment guarantee program data. See how the Mahatma Gandhi National Rural Employment Guarantee Act is performing in your area.',
    cta: 'Detect My Location',
    stats: [
      { label: 'Districts Covered', value: '700+' },
      { label: 'Data Points', value: '50M+' },
      { label: 'Workers Benefited', value: '130M+' }
    ],
    features: [
      'Real-time performance metrics',
      'Gender & SC/ST participation',
      'Payment tracking'
    ]
  },
  hi: {
    title: 'ग्रामीण भारत को सशक्त बनाना',
    subtitle: 'अपने मनरेगा प्रदर्शन को जानें',
    description: 'अपने जिले के रोजगार गारंटी कार्यक्रम का डेटा आसानी से देखें। महात्मा गांधी राष्ट्रीय ग्रामीण रोजगार गारंटी अधिनियम का प्रदर्शन देखें।',
    cta: 'मेरा स्थान पता करें',
    stats: [
      { label: 'जिले', value: '700+' },
      { label: 'डेटा पॉइंट्स', value: '50M+' },
      { label: 'कार्यकर्ता लाभार्थी', value: '130M+' }
    ],
    features: [
      'रियल-टाइम प्रदर्शन मेट्रिक्स',
      'लिंग और अनुसूचित जाति/जनजाति भागीदारी',
      'भुगतान ट्रैकिंग'
    ]
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: 'easeOut' },
  },
};

export default function Hero({ locale }: HeroProps) {
  const text = content[locale];

  return (
    <div className="relative isolate overflow-hidden pt-20">
      {/* Animated background gradient */}
      <div className="absolute inset-0 -z-20">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50" />
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      {/* Grid pattern overlay */}
      <svg
        className="absolute inset-0 -z-10 h-full w-full stroke-gray-200/50 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="grid-pattern"
            width={40}
            height={40}
            patternUnits="userSpaceOnUse"
          >
            <path d="M40 0H0v40" fill="none" strokeWidth={0.5} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-pattern)" />
      </svg>

      <div className="mx-auto max-w-7xl px-6 py-20 sm:py-32 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Badge */}
            <motion.div 
            //@ts-ignore
            variants={itemVariants}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/40 backdrop-blur-md border border-white/60 shadow-lg hover:shadow-xl transition-all hover:bg-white/50">
                <SparklesIcon className="h-4 w-4 text-purple-600" />
                <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {locale === 'en' ? 'Transparency Matters' : 'पारदर्शिता महत्वपूर्ण है'}
                </span>
              </div>
            </motion.div>

            {/* Main Title */}
            <motion.h2 
            //@ts-ignore
            variants={itemVariants} className="mt-6 text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="text-gray-900">{text.title}</span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                {text.subtitle}
              </span>
            </motion.h2>

            {/* Description */}
            <motion.p 
            //@ts-ignore
            variants={itemVariants} className="mt-6 text-lg text-gray-600 max-w-lg">
              {text.description}
            </motion.p>

            {/* Features List */}
            <motion.div 
            //@ts-ignore
            variants={itemVariants} className="mt-8 space-y-3">
              {text.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">{feature}</span>
                </div>
              ))}
            </motion.div>
            {/* Stats */}
           
            <motion.div 
            //@ts-ignore
            variants={itemVariants} className="mt-12 grid grid-cols-3 gap-4 ">
              {text.stats.map((stat, idx) => (
                <div key={idx} className="p-4 rounded-lg bg-white/40 backdrop-blur-md border border-white/90 hover:bg-white/60 transition-all shadow-lg">
                  <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right - Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            {/* Floating cards background */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-3xl -z-10" />
            
            {/* Main Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/60 backdrop-blur-xl shadow-2xl">
              <Image
                src="/hero-image.jpg"
                alt="MGNREGA workers"
                width={600}
                height={600}
                className="w-full h-auto object-cover"
                priority
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Floating stat cards */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -bottom-6 -left-6 p-4 rounded-xl bg-white/90 backdrop-blur-md shadow-lg border border-white/60"
            >
              <div className="text-sm font-semibold text-gray-900">
                {locale === 'en' ? '50M+ Data Points' : '50M+ डेटा पॉइंट्स'}
              </div>
              <div className="text-xs text-gray-600 mt-1">
                {locale === 'en' ? 'Real-time updates' : 'रीयल-टाइम अपडेट'}
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
              className="absolute -top-6 -right-6 p-4 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-lg"
            >
              <div className="text-sm font-semibold">
                {locale === 'en' ? '700+ Districts' : '700+ जिले'}
              </div>
              <div className="text-xs opacity-90 mt-1">
                {locale === 'en' ? 'All of India' : 'सभी भारत'}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}