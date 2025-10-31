import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

const LanguageSelector = () => {
 
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
const {  changeLanguage } = useLanguage()
 
 
 

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  
  const handleLanguageChange = (lang) => {
    changeLanguage(lang);
  
  };

  const languages = [
    { 
      code: 'en', 
      name: 'English', 
      nativeName: 'English',
      flag: 'US',
      countryCode: 'US'
    },
    { 
      code: 'ar', 
      name: 'Arabic', 
      nativeName: 'العربية',
      flag: 'SA',
      countryCode: 'SA'
    },
    { 
      code: 'he', 
      name: 'Hebrew', 
      nativeName: 'עברית',
      flag: 'IL',
      countryCode: 'IL'
    }
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Language Button with Globe Icon */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>
      
      {/* Language Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-600 z-50 overflow-hidden">
          <div className="py-1">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-full flex items-center justify-between px-4 py-2.5 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors `}>
                <div className="flex items-center gap-3">
                  <span className="font-medium text-xs">{lang.countryCode}</span>
                  <span className="text-sm">{lang.nativeName}</span>
                </div>
               
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;