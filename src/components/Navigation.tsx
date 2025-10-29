
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, HomeIcon, XMarkIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

interface NavigationProps {
  locale: 'en' | 'hi';
  onLocaleChange: (locale: 'en' | 'hi') => void;
}

const navigation = [
  { name: 'होम', href: '/', locale: 'hi'  },
  { name: 'Home', href: '/', locale: 'en' },
  { name: 'About Mgnrega', href: '/about', locale: 'en' },
  { name: 'मनरेगा के बारे में', href: '/about', locale: 'hi' },
];

export default function Navigation({ locale, onLocaleChange }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const filteredNavigation = navigation.filter(item => item.locale === locale);

  return (
    <header className="fixed top-0 w-full z-50">
      {/* Glass effect background */}
      <div className="absolute inset-0 bg-white/30 backdrop-blur-md border border-white/20 shadow-lg" />
      
      <nav className="relative mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        {/* Logo */}
        <motion.div 
          className="flex lg:flex-1"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/" className="-m-1.5 p-1.5 group">
            <span className="sr-only">Our Voice, Our Rights</span>
            <div className="flex items-center gap-2 whitespace-nowrap">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg group-hover:shadow-lg group-hover:shadow-blue-500/50 transition-all flex-shrink-0">
                <SparklesIcon className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl lg:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 leading-tight">
                {locale === 'hi' ? 'हमारी आवाज़, हमारा अधिकार' : 'Our Voice Our Rights'}
              </span>
            </div>
          </Link>
        </motion.div>
        
        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg p-2.5 text-gray-700 hover:bg-white/20 transition-colors"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:gap-x-8">
          {filteredNavigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="relative text-md font-semibold text-gray-900 px-3 py-2 rounded-lg hover:bg-white/20 transition-all group border shadow-md"
            >
              {item.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </div>

        {/* Language Toggle */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <button
            onClick={() => onLocaleChange(locale === 'en' ? 'hi' : 'en')}
            className="px-4 py-2 text-sm font-semibold rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/50 transition-all hover:scale-105"
          >
            {locale === 'en' ? 'हिंदी में देखें' : 'View in English'}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10 bg-black/20 backdrop-blur-sm" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white/40 backdrop-blur-xl px-6 py-6 sm:max-w-sm border border-white/20 shadow-xl">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Our Voice, Our Rights</span>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {locale === 'hi' ? 'हमारी आवाज़' : 'Our Voice Our Rights'}
              </span>
            </Link>
            <button
              type="button"
              className="rounded-lg p-2.5 text-gray-700 hover:bg-white/20 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-white/20">
              <div className="space-y-2 py-6">
                {filteredNavigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block rounded-lg px-3 py-2.5 text-base font-semibold text-gray-900 hover:bg-white/20 transition-all"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="py-6">
                <button
                  onClick={() => {
                    onLocaleChange(locale === 'en' ? 'hi' : 'en');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full rounded-lg px-3 py-2.5 text-base font-semibold bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg transition-all text-left"
                >
                  {locale === 'en' ? 'हिंदी में देखें' : 'View in English'}
                </button>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}