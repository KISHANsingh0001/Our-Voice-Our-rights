// 'use client';

// import { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { CheckIcon, MapPinIcon } from '@heroicons/react/24/outline';
// import { Combobox } from '@headlessui/react';
// import { District, getDistrictsByState, searchDistricts } from '@/data/districts';

// interface DistrictSelectorProps {
//   locale: 'en' | 'hi';
//   onDistrictSelect: (district: District | null) => void;
// }

// const content = {
//   en: {
//     title: 'Select Your District',
//     subtitle: 'Choose your district to see MGNREGA performance',
//     searchPlaceholder: 'Type your district name...',
//     stateLabel: 'State',
//     districtLabel: 'District',
//     detectLocation: 'Detect my location',
//     noResults: 'No districts found',
//     detecting: 'Detecting your location...',
//     orText: 'or',
//     selectState: 'Select State'
//   },
//   hi: {
//     title: 'अपना जिला चुनें',
//     subtitle: 'मनरेगा प्रदर्शन देखने के लिए अपना जिला चुनें',
//     searchPlaceholder: 'अपने जिले का नाम टाइप करें...',
//     stateLabel: 'राज्य',
//     districtLabel: 'जिला',
//     detectLocation: 'मेरा स्थान पता करें',
//     noResults: 'कोई जिला नहीं मिला',
//     detecting: 'आपका स्थान पता लगा रहे हैं...',
//     orText: 'या',
//     selectState: 'राज्य चुनें'
//   }
// };

// export default function DistrictSelector({ locale, onDistrictSelect }: DistrictSelectorProps) {
//   const [query, setQuery] = useState('');
//   const [selectedState, setSelectedState] = useState<string>('');
//   const [selectedDistrict, setSelectedDistrict] = useState<District | null>(null);
//   const [districts, setDistricts] = useState<{ [state: string]: District[] }>({});
//   const [isDetectingLocation, setIsDetectingLocation] = useState(false);
//   const text = content[locale];

//   useEffect(() => {
//     const groupedDistricts = getDistrictsByState();
//     setDistricts(groupedDistricts);
//   }, []);

//   const filteredDistricts = query === ''
//     ? (selectedState ? districts[selectedState] || [] : [])
//     : searchDistricts(query);

//   const handleStateChange = (state: string) => {
//     setSelectedState(state);
//     setQuery('');
//   };

//   const handleDistrictSelect = (district: District | null) => {
//     setSelectedDistrict(district);
//     onDistrictSelect(district);
//   };

//   // const handleDetectLocation = () => {
//   //   setIsDetectingLocation(true);
//   //   if ('geolocation' in navigator) {
//   //     navigator.geolocation.getCurrentPosition(
//   //       async (position) => {
//   //         try {
//   //           const response = await fetch(
//   //             `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}&zoom=8`
//   //           );
//   //           const data = await response.json();
            
//   //           // Try to match the district from the address
//   //           const address = data.address;
//   //           const possibleDistrict = searchDistricts(address.city || address.county || address.state_district || '')[0];
            
//   //           if (possibleDistrict) {
//   //             handleDistrictSelect(possibleDistrict);
//   //           }
//   //         } catch (error) {
//   //           console.error('Error getting location details:', error);
//   //         } finally {
//   //           setIsDetectingLocation(false);
//   //         }
//   //       },
//   //       (error) => {
//   //         console.error('Error getting location:', error);
//   //         setIsDetectingLocation(false);
//   //       }
//   //     );
//   //   }
//   // };

//     const handleDetectLocation = () => {
//     setIsDetectingLocation(true);
//     if ('geolocation' in navigator) {
//       navigator.geolocation.getCurrentPosition(
//         async (position) => {
//           try {
//             const response = await fetch(
//               `/api/geolocation?lat=${position.coords.latitude}&lon=${position.coords.longitude}`
//             );
//             const data = await response.json();
            
//             // Try to match district from multiple search terms
//             let possibleDistrict = null;
//             if (data.searchTerms) {
//               for (const term of data.searchTerms) {
//                 const results = searchDistricts(term);
//                 if (results.length > 0) {
//                   possibleDistrict = results[0];
//                   break;
//                 }
//               }
//             }
            
//             // Fallback: search by district or city
//             if (!possibleDistrict) {
//               possibleDistrict = searchDistricts(data.district || data.city || data.state || '')[0];
//             }
            
//             if (possibleDistrict) {
//               handleDistrictSelect(possibleDistrict);
//               handleStateChange(possibleDistrict.state)
//               // Optional: Log matched location
//               console.log(`Matched: ${possibleDistrict.name}, ${possibleDistrict.state}`);
//             } else {
//               console.warn('Could not find matching district for:', data);
//             }
//           } catch (error) {
//             console.error('Error getting location details:', error);
//           } finally {
//             setIsDetectingLocation(false);
//           }
//         },
//         (error) => {
//           console.error('Error getting location:', error);
//           alert('Please enable location access in your browser settings');
//           setIsDetectingLocation(false);
//         }
//       );
//     } else {
//       alert('Geolocation is not supported by your browser');
//       setIsDetectingLocation(false);
//     }
//   };
//   return (
//     <div className="w-full max-w-md mx-auto">
//       <Combobox value={selectedDistrict} onChange={handleDistrictSelect} nullable>
//         <div className="relative">
//           <div className="space-y-4">
//             {/* State selector */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 {text.stateLabel}
//               </label>
//               <select
//                 value={selectedState}
//                 onChange={(e) => handleStateChange(e.target.value)}
//                 className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
//               >
//                 <option value="">{text.selectState}</option>
//                 {Object.keys(districts).sort().map((state) => (
//                   <option key={state} value={state}>
//                     {locale === 'hi' ? districts[state][0].stateHi : state}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div className="relative">
//               <Combobox.Input
//                 className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
//                 onChange={(event) => setQuery(event.target.value)}
//                 placeholder={text.searchPlaceholder}
//                 displayValue={(district: District | null) => 
//                   district ? (locale === 'hi' ? district.nameHi || district.name : district.name) : ''
//                 }
//               />
//               <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
//                 <MapPinIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
//               </Combobox.Button>
//             </div>
//           </div>

//           <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
//             {filteredDistricts.length === 0 && query !== '' ? (
//               <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
//                 {text.noResults}
//               </div>
//             ) : (
//               filteredDistricts.map((district) => (
//                 <Combobox.Option
//                   key={district.id}
//                   value={district}
//                   className={({ active }) =>
//                     `relative cursor-default select-none py-2 pl-3 pr-9 ${
//                       active ? 'bg-primary-600 text-white' : 'text-gray-900'
//                     }`
//                   }
//                 >
//                   {({ active, selected }) => (
//                     <>
//                       <div className="flex items-center">
//                         <span className={`block truncate ${selected ? 'font-semibold' : ''}`}>
//                           {locale === 'hi' ? district.nameHi : district.name}
//                         </span>
//                         <span
//                           className={`ml-2 truncate text-sm ${
//                             active ? 'text-primary-200' : 'text-gray-500'
//                           }`}
//                         >
//                           {locale === 'hi' ? district.stateHi : district.state}
//                         </span>
//                       </div>

//                       {selected && (
//                         <span
//                           className={`absolute inset-y-0 right-0 flex items-center pr-4 ${
//                             active ? 'text-white' : 'text-primary-600'
//                           }`}
//                         >
//                           <CheckIcon className="h-5 w-5" aria-hidden="true" />
//                         </span>
//                       )}
//                     </>
//                   )}
//                 </Combobox.Option>
//               ))
//             )}
//           </Combobox.Options>
//         </div>
//       </Combobox>

//       <div className="mt-4">
//         <button
//           type="button"
//           onClick={handleDetectLocation}
//           disabled={isDetectingLocation}
//           className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
//         >
//           {isDetectingLocation ? (
//             <>
//               <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//               </svg>
//               {text.detecting}
//             </>
//           ) : (
//             text.detectLocation
//           )}
//         </button>
//       </div>
//     </div>
//   );
// }

'use client';
import PerformanceModal from './PerformanceModal';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckIcon, MapPinIcon, SparklesIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Combobox } from '@headlessui/react';
import { District, getDistrictsByState, searchDistricts } from '@/data/districts';

interface DistrictSelectorProps {
  locale: 'en' | 'hi';
  onDistrictSelect: (district: District | null) => void;
}

const content = {
  en: {
    title: 'Select Your District',
    subtitle: 'Choose your district to see MGNREGA performance',
    searchPlaceholder: 'Search district name...',
    stateLabel: 'State',
    districtLabel: 'District',
    detectLocation: 'Detect My Location',
    noResults: 'No districts found',
    detecting: 'Detecting location...',
    orText: 'or',
    selectState: 'Select State',
    searchDistrict: 'Search District'
  },
  hi: {
    title: 'अपना जिला चुनें',
    subtitle: 'मनरेगा प्रदर्शन देखने के लिए अपना जिला चुनें',
    searchPlaceholder: 'जिले का नाम खोजें...',
    stateLabel: 'राज्य',
    districtLabel: 'जिला',
    detectLocation: 'मेरा स्थान पता करें',
    noResults: 'कोई जिला नहीं मिला',
    detecting: 'स्थान पता लगा रहे हैं...',
    orText: 'या',
    selectState: 'राज्य चुनें',
    searchDistrict: 'जिला खोजें'
  }
};

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function DistrictSelector({ locale, onDistrictSelect }: DistrictSelectorProps) {
  const [query, setQuery] = useState('');
  const [selectedState, setSelectedState] = useState<string>('');
  const [selectedDistrict, setSelectedDistrict] = useState<District | null>(null);
  const [districts, setDistricts] = useState<{ [state: string]: District[] }>({});
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const text = content[locale];
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const groupedDistricts = getDistrictsByState();
    setDistricts(groupedDistricts);
  }, []);

  const filteredDistricts = query === ''
    ? (selectedState ? districts[selectedState] || [] : [])
    : searchDistricts(query);

  const handleStateChange = (state: string) => {
    setSelectedState(state);
    setQuery('');
  };

  const handleDistrictSelect = (district: District | null) => {
    setSelectedDistrict(district);
    onDistrictSelect(district);
    setIsOpen(false);
    if (district) {
      setTimeout(() => setShowModal(true), 300);
    }
  };
  const handleViewDetails = () => {
    setShowModal(false);
    // Scroll to performance metrics
    setTimeout(() => {
      const metricsSection = document.getElementById('performance-metrics');
      metricsSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 300);
  };

  const handleDetectLocation = () => {
    setIsDetectingLocation(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const response = await fetch(
              `/api/geolocation?lat=${position.coords.latitude}&lon=${position.coords.longitude}`
            );
            const data = await response.json();
            
            let possibleDistrict = null;
            if (data.searchTerms) {
              for (const term of data.searchTerms) {
                const results = searchDistricts(term);
                if (results.length > 0) {
                  possibleDistrict = results[0];
                  break;
                }
              }
            }
            
            if (!possibleDistrict) {
              possibleDistrict = searchDistricts(data.district || data.city || data.state || '')[0];
            }
            
            if (possibleDistrict) {
              handleDistrictSelect(possibleDistrict);
              handleStateChange(possibleDistrict.state);
              console.log(`Matched: ${possibleDistrict.name}, ${possibleDistrict.state}`);
            } else {
              console.warn('Could not find matching district for:', data);
            }
          } catch (error) {
            console.error('Error getting location details:', error);
          } finally {
            setIsDetectingLocation(false);
          }
        },
        (error) => {
          console.error('Error getting location:', error);
          alert(locale === 'en' ? 'Please enable location access in your browser settings' : 'कृपया अपने ब्राउज़र सेटिंग्स में स्थान पहुंच सक्षम करें');
          setIsDetectingLocation(false);
        }
      );
    } else {
      alert(locale === 'en' ? 'Geolocation is not supported by your browser' : 'आपके ब्राउज़र द्वारा जियोलोकेशन समर्थित नहीं है');
      setIsDetectingLocation(false);
    }
  };

  const stateOptions = Object.keys(districts).sort();

  return (
    <>
   
    <section className="py-20 px-6 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-300/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-300/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
      </div>

      <div className="mx-auto max-w-2xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200 mb-4">
            <SparklesIcon className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-semibold text-blue-600">
              {locale === 'en' ? 'Easy Selection' : 'आसान चयन'}
            </span>
          </motion.div>

          <motion.h2 variants={itemVariants} className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              {text.title}
            </span>
          </motion.h2>

          <motion.p variants={itemVariants} className="text-lg text-gray-600">
            {text.subtitle}
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-6"
        >
          {/* State Selector */}
          <motion.div variants={itemVariants}>
            <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                <MapPinIcon className="h-4 w-4" />
              </div>
              {text.stateLabel}
            </label>
            <div className="relative group">
              <select
                value={selectedState}
                onChange={(e) => handleStateChange(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-white/80 backdrop-blur-sm font-medium text-gray-900 focus:border-blue-500 focus:outline-none transition-all duration-300 group-hover:border-blue-300 appearance-none cursor-pointer shadow-lg hover:shadow-xl"
              >
                <option value="">{text.selectState}</option>
                {stateOptions.map((state) => (
                  <option key={state} value={state}>
                    {locale === 'hi' ? districts[state][0].stateHi : state}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </div>
          </motion.div>

          {/* District Search */}
          <motion.div variants={itemVariants}>
            <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                <MagnifyingGlassIcon className="h-4 w-4" />
              </div>
              {text.searchDistrict}
            </label>
            
            <Combobox value={selectedDistrict} onChange={handleDistrictSelect} nullable>
              <div className="relative">
                <Combobox.Input
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={text.searchPlaceholder}
                  displayValue={(district: District | null) => 
                    district ? (locale === 'hi' ? district.nameHi || district.name : district.name) : ''
                  }
                  onFocus={() => setIsOpen(true)}
                  className="w-full px-4 py-3 pl-4 rounded-xl border-2 border-gray-200 bg-white/80 backdrop-blur-sm font-medium text-gray-900 placeholder-gray-500 focus:border-purple-500 focus:outline-none transition-all duration-300 shadow-lg focus:shadow-xl"
                />
                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-xl px-4 focus:outline-none">
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </motion.div>
                </Combobox.Button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Combobox.Options className="absolute z-10 mt-2 max-h-72 w-full overflow-auto rounded-xl bg-white/95 backdrop-blur-md shadow-2xl ring-1 ring-black/10 focus:outline-none divide-y divide-gray-100">
                        {filteredDistricts.length === 0 && query !== '' ? (
                          <div className="relative cursor-default select-none px-4 py-8 text-center text-gray-500">
                            <MagnifyingGlassIcon className="h-8 w-8 mx-auto mb-2 opacity-50" />
                            {text.noResults}
                          </div>
                        ) : filteredDistricts.length === 0 ? (
                          <div className="relative cursor-default select-none px-4 py-8 text-center text-gray-500">
                            {locale === 'en' ? 'Select a state first' : 'पहले एक राज्य चुनें'}
                          </div>
                        ) : (
                          filteredDistricts.map((district, index) => (
                            <Combobox.Option
                              key={district.id}
                              value={district}
                              className={({ active }) =>
                                `relative cursor-pointer select-none py-3 px-4 transition-colors ${
                                  active 
                                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' 
                                    : 'text-gray-900 hover:bg-gray-50'
                                }`
                              }
                            >
                              {({ active, selected }) => (
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-3 flex-1">
                                    <motion.div
                                      initial={{ scale: 0 }}
                                      animate={{ scale: 1 }}
                                      transition={{ delay: index * 0.05 }}
                                      className={`h-2 w-2 rounded-full ${active ? 'bg-white' : 'bg-blue-500'}`}
                                    />
                                    <div className="flex-1">
                                      <span className={`block truncate font-semibold ${selected ? 'font-bold' : ''}`}>
                                        {locale === 'hi' ? district.nameHi : district.name}
                                      </span>
                                      <span className={`text-xs truncate ${active ? 'text-blue-100' : 'text-gray-500'}`}>
                                        {locale === 'hi' ? district.stateHi : district.state}
                                      </span>
                                    </div>
                                  </div>
                                  {selected && (
                                    <motion.div
                                      initial={{ scale: 0, rotate: -180 }}
                                      animate={{ scale: 1, rotate: 0 }}
                                      className={`flex-shrink-0 ${active ? 'text-white' : 'text-blue-600'}`}
                                    >
                                      <CheckIcon className="h-5 w-5" />
                                    </motion.div>
                                  )}
                                </div>
                              )}
                            </Combobox.Option>
                          ))
                        )}
                      </Combobox.Options>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Combobox>
          </motion.div>

          {/* Divider */}
          <motion.div variants={itemVariants} className="flex items-center gap-4">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
            <span className="text-sm font-medium text-gray-500">{text.orText}</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
          </motion.div>

          {/* Detect Location Button */}
          <motion.div variants={itemVariants}>
            <motion.button
              onClick={handleDetectLocation}
              disabled={isDetectingLocation}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full relative group px-6 py-4 rounded-xl font-semibold text-white overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 group-hover:from-blue-700 group-hover:via-purple-700 group-hover:to-pink-700 transition-all duration-300" />
              
              {/* Animated shine effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              
              {/* Content */}
              <div className="relative flex items-center justify-center gap-2">
                {isDetectingLocation ? (
                  <>
                    <motion.svg
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      className="w-5 h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </motion.svg>
                    {text.detecting}
                  </>
                ) : (
                  <>
                    <MapPinIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    {text.detectLocation}
                  </>
                )}
              </div>
            </motion.button>
          </motion.div>

          {/* Selected District Display */}
          <AnimatePresence>
            {selectedDistrict && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-4 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-green-500 text-white">
                    <CheckIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      {locale === 'en' ? 'Selected District' : 'चुना गया जिला'}
                    </p>
                    <p className="font-bold text-green-700">
                      {locale === 'hi' ? selectedDistrict.nameHi : selectedDistrict.name}
                      <span className="text-gray-600 font-normal"> • {locale === 'hi' ? selectedDistrict.stateHi : selectedDistrict.state}</span>
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
     <PerformanceModal
        isOpen={showModal}
        district={selectedDistrict}
        onClose={() => setShowModal(false)}
        onViewDetails={handleViewDetails}
        locale={locale}
      />
   </>
  );
}