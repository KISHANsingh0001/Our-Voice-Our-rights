// 'use client';

// import { motion } from 'framer-motion';
// import Navigation from '@/components/Navigation';
// import { useLocale } from '@/context/LocaleContext';

// interface ContentType {
//   title: string;
//   subtitle: string;
//   description: string;
//   keyPoints: string[];
// }

// interface ContentMap {
//   en: ContentType;
//   hi: ContentType;
// }

// const content: ContentMap = {
//   en: {
//     title: 'About MGNREGA',
//     subtitle: 'Understanding Your Rights',
//     description: `The Mahatma Gandhi National Rural Employment Guarantee Act 2005 (MGNREGA) is an Indian labour law and social security measure that aims to guarantee the 'right to work'. It aims to enhance livelihood security in rural areas by providing at least 100 days of wage employment in a financial year to every household whose adult members volunteer to do unskilled manual work.`,
//     keyPoints: [
//       'Legal right to work',
//       'Minimum 100 days of guaranteed employment',
//       'Equal wages for men and women',
//       'Unemployment allowance if work is not provided',
//       'Work within 5 km radius of village',
//     ],
//   },
//   hi: {
//     title: 'एमजीएनआरईजीए के बारे में',
//     subtitle: 'अपने अधिकारों को समझें',
//     description: `महात्मा गांधी राष्ट्रीय ग्रामीण रोजगार गारंटी अधिनियम 2005 (मनरेगा) एक भारतीय श्रम कानून और सामाजिक सुरक्षा उपाय है जो 'काम के अधिकार' की गारंटी देने का लक्ष्य रखता है। इसका उद्देश्य ग्रामीण क्षेत्रों में आजीविका सुरक्षा को बढ़ाना है, जिसमें प्रत्येक परिवार के वयस्क सदस्यों को एक वित्तीय वर्ष में कम से कम 100 दिनों का मजदूरी रोजगार प्रदान किया जाता है।`,
//     keyPoints: [
//       'काम का कानूनी अधिकार',
//       'न्यूनतम 100 दिन का गारंटी रोजगार',
//       'पुरुषों और महिलाओं के लिए समान मजदूरी',
//       'काम नहीं मिलने पर बेरोजगारी भत्ता',
//       'गांव से 5 किलोमीटर के दायरे में काम',
//     ],
//   },
// } as const;

// export default function About() {
//   const { locale, setLocale } = useLocale();
//   const currentContent = content[locale];

//   return (
//     <div className="min-h-screen bg-white">
//       <Navigation locale={locale} onLocaleChange={setLocale} />
//       <div className="py-24 sm:py-32">
//         <div className="mx-auto max-w-7xl px-6 lg:px-8">
//           <div className="mx-auto max-w-2xl lg:text-center">
//             <motion.h2
//               className="text-base font-semibold leading-7 text-indigo-600"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//             >
//               {currentContent.subtitle}
//             </motion.h2>
//             <motion.p
//               className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//             >
//               {currentContent.title}
//             </motion.p>
//             <motion.p
//               className="mt-6 text-lg leading-8 text-gray-600"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.4 }}
//             >
//               {currentContent.description}
//             </motion.p>
//           </div>
//           <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
//             <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
//               {currentContent.keyPoints.map((point, index) => (
//                 <motion.div
//                   key={index}
//                   className="flex flex-col"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
//                 >
//                   <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
//                     <div className="h-5 w-5 flex-none rounded-lg bg-indigo-600 text-white flex items-center justify-center">
//                       {index + 1}
//                     </div>
//                     {point}
//                   </dt>
//                 </motion.div>
//               ))}
//             </dl>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

'use client';

import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import { useLocale } from '@/context/LocaleContext';
import { CheckCircleIcon, SparklesIcon, BookOpenIcon, UserGroupIcon, CurrencyRupeeIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

interface ContentType {
  title: string;
  subtitle: string;
  description: string;
  keyPoints: string[];
}

interface ContentMap {
  en: ContentType;
  hi: ContentType;
}

const content: ContentMap = {
  en: {
    title: 'About MGNREGA',
    subtitle: 'Understanding Your Rights',
    description: `The Mahatma Gandhi National Rural Employment Guarantee Act 2005 (MGNREGA) is an Indian labour law and social security measure that aims to guarantee the 'right to work'. It aims to enhance livelihood security in rural areas by providing at least 100 days of wage employment in a financial year to every household whose adult members volunteer to do unskilled manual work.`,
    keyPoints: [
      'Legal right to work',
      'Minimum 100 days of guaranteed employment',
      'Equal wages for men and women',
      'Unemployment allowance if work is not provided',
      'Work within 5 km radius of village',
      'Social security & welfare benefits',
    ],
  },
  hi: {
    title: 'मनरेगा के बारे में',
    subtitle: 'अपने अधिकारों को समझें',
    description: `महात्मा गांधी राष्ट्रीय ग्रामीण रोजगार गारंटी अधिनियम 2005 (मनरेगा) एक भारतीय श्रम कानून और सामाजिक सुरक्षा उपाय है जो 'काम के अधिकार' की गारंटी देने का लक्ष्य रखता है। इसका उद्देश्य ग्रामीण क्षेत्रों में आजीविका सुरक्षा को बढ़ाना है, जिसमें प्रत्येक परिवार के वयस्क सदस्यों को एक वित्तीय वर्ष में कम से कम 100 दिनों का मजदूरी रोजगार प्रदान किया जाता है।`,
    keyPoints: [
      'काम का कानूनी अधिकार',
      'न्यूनतम 100 दिन का गारंटी रोजगार',
      'पुरुषों और महिलाओं के लिए समान मजदूरी',
      'काम नहीं मिलने पर बेरोजगारी भत्ता',
      'गांव से 5 किलोमीटर के दायरे में काम',
      'सामाजिक सुरक्षा और कल्याण लाभ',
    ],
  },
} as const;

const iconMap = [
  BookOpenIcon,
  CheckCircleIcon,
  UserGroupIcon,
  CurrencyRupeeIcon,
  MapPinIcon,
  SparklesIcon,
];

const colorClasses = [
  'from-blue-500 to-blue-600',
  'from-green-500 to-green-600',
  'from-purple-500 to-purple-600',
  'from-orange-500 to-orange-600',
  'from-pink-500 to-pink-600',
  'from-indigo-500 to-indigo-600',
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export default function About() {
  const { locale, setLocale } = useLocale();
  const currentContent = content[locale];
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-purple-50 overflow-hidden">
      <Navigation locale={locale} onLocaleChange={setLocale} />

      {/* Animated background elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 left-10 w-80 h-80 bg-blue-300/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-40 right-10 w-80 h-80 bg-purple-300/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-1/2 w-80 h-80 bg-pink-300/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      <div className="relative py-24 sm:py-32 px-6">
        <div className="mx-auto max-w-7xl">
          {/* Header Section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mx-auto max-w-4xl text-center mb-20"
          >
            {/* Badge */}
            <motion.div
            //@ts-ignore
            variants={itemVariants}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/40 backdrop-blur-md border border-white/60 shadow-lg hover:shadow-xl transition-all mb-6">
                <SparklesIcon className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {locale === 'en' ? 'Know Your Rights' : 'अपने अधिकारों को जानें'}
                </span>
              </div>
            </motion.div>

            {/* Subtitle */}
            <motion.h3
            //@ts-ignore
              variants={itemVariants}
              className="text-base font-semibold leading-7 text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text uppercase tracking-widest"
            >
              {currentContent.subtitle}
            </motion.h3>

            {/* Title */}
            <motion.h2
            //@ts-ignore
              variants={itemVariants}
              className="mt-4 text-5xl sm:text-6xl font-bold tracking-tight"
            >
              <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                {currentContent.title}
              </span>
            </motion.h2>

            {/* Description */}
            <motion.p
            //@ts-ignore
              variants={itemVariants}
              className="mt-8 text-lg leading-8 text-gray-700 max-w-3xl mx-auto"
            >
              {currentContent.description}
            </motion.p>

            {/* Decorative line */}
            <motion.div
            //@ts-ignore
              variants={itemVariants}
              className="mt-8 flex justify-center"
            >
              <div className="h-1 w-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full" />
            </motion.div>
          </motion.div>

          {/* Key Points Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
          >
            {currentContent.keyPoints.map((point, index) => {
              const Icon = iconMap[index % iconMap.length];
              const colorClass = colorClasses[index % colorClasses.length];

              return (
                <motion.div
                  key={index}
                  //@ts-ignore
                  variants={itemVariants}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="group relative"
                >
                  {/* Card background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${colorClass} rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                  {/* Main card */}
                  <div className="relative h-full p-8 rounded-2xl bg-white/60 backdrop-blur-xl border border-white/60 shadow-lg group-hover:shadow-2xl transition-all duration-300 hover:border-white/80">
                    
                    {/* Number badge */}
                    <motion.div
                      animate={{ scale: hoveredCard === index ? 1.1 : 1, rotate: hoveredCard === index ? 10 : 0 }}
                      transition={{ duration: 0.3 }}
                      className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${colorClass} text-white font-bold text-xl mb-4`}
                    >
                      {index + 1}
                    </motion.div>

                    {/* Icon */}
                    <motion.div
                      animate={{ y: hoveredCard === index ? -5 : 0 }}
                      transition={{ duration: 0.3 }}
                      className={`p-3 rounded-lg bg-gradient-to-br ${colorClass} text-white w-fit mb-4`}
                    >
                      <Icon className="h-6 w-6" />
                    </motion.div>

                    {/* Content */}
                    <motion.div
                      animate={{ y: hoveredCard === index ? -5 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className={`text-lg font-bold text-gray-900 mb-3 bg-gradient-to-r ${colorClass} bg-clip-text text-transparent leading-snug`}>
                        {point}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {locale === 'en' 
                          ? 'Part of your fundamental rights under MGNREGA to ensure dignified employment'
                          : 'मनरेगा के तहत आपके मौलिक अधिकार का हिस्सा सम्मानजनक रोजगार सुनिश्चित करने के लिए'
                        }
                      </p>
                    </motion.div>

                    {/* Checkmark indicator */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{
                        opacity: hoveredCard === index ? 1 : 0,
                        scale: hoveredCard === index ? 1 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="absolute top-4 right-4"
                    >
                      <CheckCircleIcon className={`h-6 w-6 bg-gradient-to-r ${colorClass} rounded-full text-white`} />
                    </motion.div>

                    {/* Progress bar */}
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: hoveredCard === index ? '100%' : '0%' }}
                      transition={{ duration: 0.3 }}
                      className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${colorClass} rounded-b-2xl`}
                    />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Call to Action Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-20 p-8 sm:p-12 rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white shadow-2xl"
          >
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-3xl sm:text-4xl font-bold mb-4">
                {locale === 'en' 
                  ? 'Ready to Know Your District\'s Performance?' 
                  : 'अपने जिले का प्रदर्शन जानने के लिए तैयार हैं?'
                }
              </h3>
              <p className="text-lg opacity-90 mb-8">
                {locale === 'en'
                  ? 'Select your district to view real-time MGNREGA performance metrics and employment data.'
                  : 'वास्तविक समय मनरेगा प्रदर्शन मेट्रिक्स और रोजगार डेटा देखने के लिए अपना जिला चुनें।'
                }
              </p>
              <motion.a
                href="/"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white  bg-gradient-to-r from-blue-600 to-purple-600 font-bold hover:shadow-lg transition-all text-xl"
              >
                {locale === 'en' ? 'Explore Metrics' : 'मेट्रिक्स देखें'}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </motion.a>
            </div>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            {[
              { label: locale === 'en' ? 'Years Active' : 'सक्रिय वर्ष', value: '19+' },
              { label: locale === 'en' ? 'States Covered' : 'राज्य कवर किए गए', value: '36' },
              { label: locale === 'en' ? 'Beneficiaries' : 'लाभार्थी', value: '130M+' },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="p-6 rounded-xl bg-white/60 backdrop-blur-xl border border-white/60 text-center shadow-lg hover:shadow-xl transition-all"
              >
                <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}