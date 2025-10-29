'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { District } from '@/data/districts';

interface PerformanceModalProps {
  isOpen: boolean;
  district: District | null;
  onClose: () => void;
  onViewDetails: () => void;
  locale: 'en' | 'hi';
}

const content = {
  en: {
    title: 'Performance Metrics Generated',
    message: 'Your district performance data is ready!',
    viewDetails: 'View Full Metrics',
    close: 'Close',
    ready: 'Ready to explore'
  },
  hi: {
    title: 'प्रदर्शन मेट्रिक्स उत्पन्न',
    message: 'आपके जिले का प्रदर्शन डेटा तैयार है!',
    viewDetails: 'पूर्ण मेट्रिक्स देखें',
    close: 'बंद करें',
    ready: 'अन्वेषण के लिए तैयार'
  }
};

export default function PerformanceModal({
  isOpen,
  district,
  onClose,
  onViewDetails,
  locale
}: PerformanceModalProps) {
  const text = content[locale];

  return (
    <AnimatePresence>
      {isOpen && district && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.4, type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="relative max-w-md w-full rounded-2xl bg-gradient-to-br from-white to-gray-50 shadow-2xl border border-white/20 overflow-hidden">
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5" />

              {/* Close button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 rounded-lg bg-white/80 hover:bg-white transition-all"
              >
                <XMarkIcon className="h-6 w-6 text-gray-900" />
              </motion.button>

              {/* Content */}
              <div className="relative p-8 text-center">
                {/* Success checkmark animation */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  className="mb-6 flex justify-center"
                >
                  <div className="relative">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-lg opacity-50"
                    />
                    <div className="relative p-4 rounded-full bg-gradient-to-br from-green-400 to-green-600 text-white">
                      <CheckCircleIcon className="h-10 w-10" />
                    </div>
                  </div>
                </motion.div>

                {/* Title */}
                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-2xl sm:text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                >
                  {text.title}
                </motion.h2>

                {/* Message */}
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-gray-600 mb-6"
                >
                  {text.message}
                </motion.p>

                {/* District info */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 mb-6"
                >
                  <p className="text-sm text-gray-600 mb-1">
                    {locale === 'en' ? 'District' : 'जिला'}
                  </p>
                  <p className="text-xl font-bold text-gray-900">
                    {locale === 'hi' ? district.nameHi : district.name}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {locale === 'hi' ? district.stateHi : district.state}
                  </p>
                </motion.div>

                {/* Status badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700 font-semibold mb-6"
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="h-2 w-2 rounded-full bg-green-500"
                  />
                  {text.ready}
                </motion.div>

                {/* Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="flex gap-3"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onViewDetails}
                    className="flex-1 px-4 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg hover:shadow-purple-500/50 transition-all"
                  >
                    {text.viewDetails}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onClose}
                    className="flex-1 px-4 py-3 rounded-xl font-semibold text-gray-900 bg-gray-100 hover:bg-gray-200 transition-all"
                  >
                    {text.close}
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}