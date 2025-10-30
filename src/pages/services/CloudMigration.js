import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Logo from '../../components/Logo';
import UserAvatar from '../../components/UserAvatar';
import LanguageSelector from '../../components/LanguageSelector';
import { useTheme } from '../../context/ThemeContext';
import AnimatedCounter from '../../components/AnimatedCounter';

// CloudMigration Component
const CloudMigration = () => {
  const location = useLocation();
  const { isDarkMode, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const [servicesOpen, setServicesOpen] = useState(false);
  const [homeOpen, setHomeOpen] = useState(false);
  const servicesRef = useRef(null);
  const homeRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (servicesRef.current && !servicesRef.current.contains(event.target)) {
        setServicesOpen(false);
      }
      if (homeRef.current && !homeRef.current.contains(event.target)) {
        setHomeOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 w-full z-50 bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Logo />

            <div className="hidden lg:flex items-center space-x-8">
              <div className="flex items-center space-x-6">
                <div className="relative" ref={homeRef}>
                  <button 
                    onClick={() => setHomeOpen(!homeOpen)}
                    className="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors flex items-center"
                  >
                    {t('nav.home')}
                    <svg className={`w-4 h-4 ml-1 transform transition-transform ${homeOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className={`absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-200 z-50 ${homeOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                    <div className="py-2">
                      <Link to="/" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors">
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                          {t('home.home1')}
                        </div>
                      </Link>
                      <Link to="/home2" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors">
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                          {t('home.home2')}
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>

                <Link to="/about" className="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors">{t('nav.about')}</Link>
                
                {/* Services Dropdown */}
                <div className="relative" ref={servicesRef}>
                  <button 
                    onClick={() => setServicesOpen(!servicesOpen)}
                    className="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors flex items-center"
                  >
                    {t('nav.services')}
                    <svg className={`w-4 h-4 ml-1 transform transition-transform ${servicesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  <div className={`absolute left-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-200 z-50 ${servicesOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                    <div className="p-2 grid grid-cols-1 gap-1">
                      <Link to="/services/it-infrastructure" className="flex items-center p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mr-2 flex-shrink-0">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white text-sm">{t('services.itInfrastructure')}</h3>
                        </div>
                      </Link>

                      <Link to="/services/cloud-migration" className="flex items-center p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors">
                        <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center mr-2 flex-shrink-0">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white text-sm">{t('services.cloudMigration')}</h3>
                        </div>
                      </Link>

                      <Link to="/services/security-compliance" className="flex items-center p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors">
                        <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex items-center justify-center mr-2 flex-shrink-0">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white text-sm">{t('services.security')}</h3>
                        </div>
                      </Link>

                      <Link to="/services/managed-it" className="flex items-center p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors">
                        <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center mr-2 flex-shrink-0">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white text-sm">{t('services.managedIT')}</h3>
                        </div>
                      </Link>

                      <Link to="/services/tech-consulting" className="flex items-center p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center mr-2 flex-shrink-0">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white text-sm">{t('services.consulting')}</h3>
                        </div>
                      </Link>

                      <Link to="/services/data-analytics" className="flex items-center p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors">
                        <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-lg flex items-center justify-center mr-2 flex-shrink-0">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white text-sm">{t('services.dataAnalytics')}</h3>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>

                <Link to="/blog" className="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors">{t('nav.blog')}</Link>
                <Link to="/contact" className="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors">{t('nav.contact')}</Link>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-3">
                {/* Language Selector */}
                <LanguageSelector />
                
                {/* Theme Toggle */}
                <button 
                  onClick={toggleTheme}
                  className="p-2 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white transition-colors"
                  aria-label="Toggle theme"
                >
                  {isDarkMode ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                  )}
                </button>

                {/* User Avatar */}
                <UserAvatar />

                {/* Client Portal Button */}
                <Link to="/login" className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-6 py-2 rounded-lg text-sm font-semibold transition-all transform hover:scale-105 shadow-sm">
                   {t('nav.signIn')}
                </Link>
              </div>
            </div>

            <div className="lg:hidden">
              <button className="text-gray-900 hover:text-blue-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Section 1: Hero */}
      <section className="relative pt-32 pb-24 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 overflow-hidden">
        {/* Animated Background with Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-green-400 to-emerald-400 dark:from-green-600 dark:to-emerald-600 rounded-full blur-3xl opacity-20 dark:opacity-10 animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-teal-400 to-cyan-400 dark:from-teal-600 dark:to-cyan-600 rounded-full blur-3xl opacity-20 dark:opacity-10 animate-pulse animation-delay-2000"></div>
          
          {/* Floating Cloud Icons */}
          <div className="absolute top-40 right-1/4 animate-bounce animation-delay-1000">
            <svg className="w-16 h-16 text-green-200 dark:text-green-800" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
            </svg>
          </div>
          <div className="absolute bottom-40 left-1/4 animate-bounce animation-delay-3000">
            <svg className="w-12 h-12 text-teal-200 dark:text-teal-800" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
            </svg>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center px-6 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full mb-8 shadow-lg transform hover:scale-105 transition-all duration-300">
              <svg className="w-5 h-5 text-green-600 dark:text-green-400 mr-2 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
              </svg>
              <span className="text-green-600 dark:text-green-400 text-sm font-bold tracking-wide">{t('cloudMigration.heroBadge')}</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white mb-8 leading-tight">
              <span className="inline-block animate-fade-in-up">{t('cloudMigration.heroTitle1')}</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500 dark:from-green-400 dark:via-emerald-400 dark:to-teal-400 animate-fade-in-up animation-delay-500">
                {t('cloudMigration.heroTitle2')}
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed animate-fade-in-up animation-delay-1000">
              {t('cloudMigration.heroSubtitle')} <span className="font-bold text-green-600 dark:text-green-400">{t('cloudMigration.heroSubtitleHighlight')}</span>.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up animation-delay-1500">
              <Link to="/contact" className="group relative bg-gradient-to-r from-green-600 to-teal-600 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:from-green-700 hover:to-teal-700 transition-all transform hover:scale-105 hover:-translate-y-1 shadow-xl hover:shadow-2xl overflow-hidden">
                <span className="relative z-10 flex items-center justify-center">
                  {t('cloudMigration.startMigration')}
                  <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              <button className="group relative border-3 border-green-600 text-green-600 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-green-600 hover:text-white transition-all transform hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-xl overflow-hidden">
                <span className="relative z-10 flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2 transform group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {t('cloudMigration.freeAssessment')}
                </span>
              </button>
            </div>

            {/* Stats Bar */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 animate-fade-in-up animation-delay-2000">
              <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm p-6 rounded-2xl shadow-lg transform hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
                <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 mb-2">
                  <AnimatedCounter value={500} duration={2} className="text-4xl font-black text-green-400 mb-2" />
                </div>
                <div className="text-green-400 text-lg font-bold">{t('cloudMigration.heroStat1Label')}</div>
              </div>
              <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm p-6 rounded-2xl shadow-lg transform hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
                <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 mb-2">
                  <AnimatedCounter value={99.9} decimals={1} duration={2} className="text-4xl font-black text-green-400 mb-2" />
                </div>
                <div className="text-green-400 text-lg font-bold">{t('cloudMigration.heroStat2Label')}</div>
              </div>
              <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm p-6 rounded-2xl shadow-lg transform hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
                <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-600 dark:from-teal-400 dark:to-cyan-400 mb-2">
                  <AnimatedCounter value={0} duration={2} className="text-4xl font-black text-green-400 mb-2" />
                </div>
                <div className="text-green-400 text-lg font-bold">{t('cloudMigration.heroStat3Label')}</div>
              </div>
              <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm p-6 rounded-2xl shadow-lg transform hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
                <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 mb-2">
                  <AnimatedCounter value={24} suffix="/7" duration={2} className="text-4xl font-black text-green-400 mb-2" />
                </div>
                <div className="text-green-400 text-lg font-bold">{t('cloudMigration.heroStat4Label')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Cloud Platforms */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 dark:from-green-600 dark:via-emerald-600 dark:to-teal-600"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-5 py-2 bg-gradient-to-r from-green-100 to-teal-100 dark:from-green-900/30 dark:to-teal-900/30 rounded-full mb-6 animate-fade-in-up">
              <span className="text-green-600 dark:text-green-400 font-bold text-sm tracking-wider">{t('cloudMigration.section2Badge')}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6 animate-fade-in-up animation-delay-500">
              {t('cloudMigration.section2Title')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-600 dark:from-green-400 dark:to-teal-400">{t('cloudMigration.section2TitleHighlight')}</span> {t('cloudMigration.section2Title2')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto animate-fade-in-up animation-delay-1000">
              {t('cloudMigration.section2Subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {/* AWS Card */}
            <div className="group relative bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border-2 border-transparent hover:border-orange-200 dark:hover:border-orange-600 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-yellow-500 dark:from-orange-600 dark:to-yellow-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-500">
                  <span className="text-3xl font-black text-white">AWS</span>
                </div>
                <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-4 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">{t('cloudMigration.awsTitle')}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">{t('cloudMigration.awsDesc')}</p>
                
                <div className="flex items-center justify-center space-x-2 text-sm text-orange-600 dark:text-orange-400 font-semibold">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span>{t('cloudMigration.awsCertified')}</span>
                </div>
              </div>
            </div>

            {/* Azure Card */}
            <div className="group relative bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border-2 border-transparent hover:border-blue-200 dark:hover:border-blue-600 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-500 dark:from-blue-600 dark:to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-500">
                  <span className="text-2xl font-black text-white">Azure</span>
                </div>
                <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{t('cloudMigration.azureTitle')}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">{t('cloudMigration.azureDesc')}</p>
                
                <div className="flex items-center justify-center space-x-2 text-sm text-blue-600 dark:text-blue-400 font-semibold">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span>{t('cloudMigration.azureCertified')}</span>
                </div>
              </div>
            </div>

            {/* GCP Card */}
            <div className="group relative bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border-2 border-transparent hover:border-red-200 dark:hover:border-red-600 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-orange-500 dark:from-red-600 dark:to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-500">
                  <span className="text-2xl font-black text-white">GCP</span>
                </div>
                <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-4 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">{t('cloudMigration.gcpTitle')}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">{t('cloudMigration.gcpDesc')}</p>
                
                <div className="flex items-center justify-center space-x-2 text-sm text-red-600 dark:text-red-400 font-semibold">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span>{t('cloudMigration.gcpCertified')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid with Different Animation */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="group relative bg-gradient-to-br from-green-500 to-emerald-500 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-rotate-2 hover:scale-105 overflow-hidden">
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
              <div className="relative">
                <div className="text-5xl font-black text-white mb-3">
                  <AnimatedCounter value={500} suffix="+" duration={4} className="text-5xl font-black text-white" />
                </div>
                <div className="text-green-100 font-semibold">{t('cloudMigration.stat2_1Label')}</div>
              </div>
            </div>
            <div className="group relative bg-gradient-to-br from-teal-500 to-cyan-500 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:rotate-2 hover:scale-105 overflow-hidden">
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
              <div className="relative">
                <div className="text-5xl font-black text-white mb-3">
                  <AnimatedCounter value={99.9} decimals={1} suffix="%" duration={4} className="text-5xl font-black text-white" />
                </div>
                <div className="text-teal-100 font-semibold">{t('cloudMigration.stat2_2Label')}</div>
              </div>
            </div>
            <div className="group relative bg-gradient-to-br from-blue-500 to-indigo-500 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-rotate-2 hover:scale-105 overflow-hidden">
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
              <div className="relative">
                <div className="text-5xl font-black text-white mb-3">
                  <AnimatedCounter value={0} duration={2} className="text-5xl font-black text-white" />
                </div>
                <div className="text-blue-100 font-semibold">{t('cloudMigration.stat2_3Label')}</div>
              </div>
            </div>
            <div className="group relative bg-gradient-to-br from-cyan-500 to-blue-500 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:rotate-2 hover:scale-105 overflow-hidden">
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
              <div className="relative">
                <div className="text-5xl font-black text-white mb-3">
                  <AnimatedCounter value={24} suffix="/7" duration={2} className="text-5xl font-black text-white" />
                </div>
                <div className="text-cyan-100 font-semibold">{t('cloudMigration.stat2_4Label')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Services */}
      <section className="py-24 bg-white dark:bg-gray-900 relative overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle, #10b981 1px, transparent 1px)', backgroundSize: '50px 50px'}}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-5 py-2 bg-gradient-to-r from-green-100 to-teal-100 dark:from-green-900/30 dark:to-teal-900/30 rounded-full mb-6">
              <span className="text-green-600 dark:text-green-400 font-bold text-sm tracking-wider">{t('cloudMigration.section3Badge')}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6">
              {t('cloudMigration.section3Title')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-600 dark:from-green-400 dark:to-teal-400">{t('cloudMigration.section3TitleHighlight')}</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t('cloudMigration.section3Subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="group relative bg-gradient-to-br from-white to-green-50 dark:from-gray-800 dark:to-green-900/20 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-green-100 dark:border-green-800 hover:border-green-300 dark:hover:border-green-600 transform hover:-translate-y-3">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-200 to-transparent dark:from-green-800 dark:to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-50 transition-opacity"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-500 dark:from-green-500 dark:to-emerald-400 rounded-2xl flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-xl font-black text-gray-900 dark:text-white mb-3 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">{t('cloudMigration.service1Title')}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">{t('cloudMigration.service1Desc')}</p>
                <div className="flex items-center text-green-600 dark:text-green-400 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>{t('cloudMigration.learnMore')}</span>
                  <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Service 2 */}
            <div className="group relative bg-gradient-to-br from-white to-teal-50 dark:from-gray-800 dark:to-teal-900/20 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-teal-100 dark:border-teal-800 hover:border-teal-300 dark:hover:border-teal-600 transform hover:-translate-y-3">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-teal-200 to-transparent dark:from-teal-800 dark:to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-50 transition-opacity"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-600 to-cyan-500 dark:from-teal-500 dark:to-cyan-400 rounded-2xl flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-black text-gray-900 dark:text-white mb-3 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">{t('cloudMigration.service2Title')}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">{t('cloudMigration.service2Desc')}</p>
                <div className="flex items-center text-teal-600 dark:text-teal-400 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>{t('cloudMigration.learnMore')}</span>
                  <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Service 3 */}
            <div className="group relative bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-blue-900/20 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-blue-100 dark:border-blue-800 hover:border-blue-300 dark:hover:border-blue-600 transform hover:-translate-y-3">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-200 to-transparent dark:from-blue-800 dark:to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-50 transition-opacity"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-500 dark:from-blue-500 dark:to-indigo-400 rounded-2xl flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                  </svg>
                </div>
                <h3 className="text-xl font-black text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{t('cloudMigration.service3Title')}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">{t('cloudMigration.service3Desc')}</p>
                <div className="flex items-center text-blue-600 dark:text-blue-400 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>{t('cloudMigration.learnMore')}</span>
                  <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Service 4 */}
            <div className="group relative bg-gradient-to-br from-white to-purple-50 dark:from-gray-800 dark:to-purple-900/20 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-purple-100 dark:border-purple-800 hover:border-purple-300 dark:hover:border-purple-600 transform hover:-translate-y-3">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-200 to-transparent dark:from-purple-800 dark:to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-50 transition-opacity"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-500 dark:from-purple-500 dark:to-pink-400 rounded-2xl flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-black text-gray-900 dark:text-white mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">{t('cloudMigration.service4Title')}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">{t('cloudMigration.service4Desc')}</p>
                <div className="flex items-center text-purple-600 dark:text-purple-400 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>{t('cloudMigration.learnMore')}</span>
                  <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Service 5 */}
            <div className="group relative bg-gradient-to-br from-white to-orange-50 dark:from-gray-800 dark:to-orange-900/20 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-orange-100 dark:border-orange-800 hover:border-orange-300 dark:hover:border-orange-600 transform hover:-translate-y-3">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-200 to-transparent dark:from-orange-800 dark:to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-50 transition-opacity"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-600 to-yellow-500 dark:from-orange-500 dark:to-yellow-400 rounded-2xl flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-black text-gray-900 dark:text-white mb-3 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">{t('cloudMigration.service5Title')}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">{t('cloudMigration.service5Desc')}</p>
                <div className="flex items-center text-orange-600 dark:text-orange-400 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>{t('cloudMigration.learnMore')}</span>
                  <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Service 6 */}
            <div className="group relative bg-gradient-to-br from-white to-red-50 dark:from-gray-800 dark:to-red-900/20 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-red-100 dark:border-red-800 hover:border-red-300 dark:hover:border-red-600 transform hover:-translate-y-3">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-200 to-transparent dark:from-red-800 dark:to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-50 transition-opacity"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-pink-500 dark:from-red-500 dark:to-pink-400 rounded-2xl flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-black text-gray-900 dark:text-white mb-3 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">{t('cloudMigration.service6Title')}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">{t('cloudMigration.service6Desc')}</p>
                <div className="flex items-center text-red-600 dark:text-red-400 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>{t('cloudMigration.learnMore')}</span>
                  <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Migration Process */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-green-50/30 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-10 dark:opacity-5">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-green-400 to-teal-400 dark:from-green-600 dark:to-teal-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-5 py-2 bg-gradient-to-r from-green-100 to-teal-100 dark:from-green-900/30 dark:to-teal-900/30 rounded-full mb-6">
              <span className="text-green-600 dark:text-green-400 font-bold text-sm tracking-wider">{t('cloudMigration.section4Badge')}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6">
              {t('cloudMigration.section4Title')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-600 dark:from-green-400 dark:to-teal-400">{t('cloudMigration.section4TitleHighlight')}</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t('cloudMigration.section4Subtitle')}
            </p>
          </div>

          {/* Timeline Style Process */}
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-green-500 via-teal-500 to-cyan-500 dark:from-green-600 dark:via-teal-600 dark:to-cyan-600 hidden md:block"></div>

            <div className="space-y-12">
              {/* Phase 1 */}
              <div className="relative flex items-start gap-8 group">
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-500 dark:from-green-500 dark:to-emerald-400 rounded-2xl flex items-center justify-center shadow-xl transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                    <span className="text-2xl font-black text-white">1</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-400 dark:from-green-600 dark:to-emerald-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-75 transition-opacity"></div>
                </div>
                <div className="flex-1 bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg group-hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-2 border-l-4 border-green-500 dark:border-green-400">
                  <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-3 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">{t('cloudMigration.phase1Title')}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">{t('cloudMigration.phase1Desc')}</p>
                  <div className="mt-4 flex items-center text-green-600 dark:text-green-400 font-semibold text-sm">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{t('cloudMigration.phase1Duration')}</span>
                  </div>
                </div>
              </div>

              {/* Phase 2 */}
              <div className="relative flex items-start gap-8 group">
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-600 to-cyan-500 dark:from-teal-500 dark:to-cyan-400 rounded-2xl flex items-center justify-center shadow-xl transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                    <span className="text-2xl font-black text-white">2</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-cyan-400 dark:from-teal-600 dark:to-cyan-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-75 transition-opacity"></div>
                </div>
                <div className="flex-1 bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg group-hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-2 border-l-4 border-teal-500 dark:border-teal-400">
                  <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-3 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">{t('cloudMigration.phase2Title')}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">{t('cloudMigration.phase2Desc')}</p>
                  <div className="mt-4 flex items-center text-teal-600 dark:text-teal-400 font-semibold text-sm">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{t('cloudMigration.phase2Duration')}</span>
                  </div>
                </div>
              </div>

              {/* Phase 3 */}
              <div className="relative flex items-start gap-8 group">
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-500 dark:from-blue-500 dark:to-indigo-400 rounded-2xl flex items-center justify-center shadow-xl transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                    <span className="text-2xl font-black text-white">3</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-400 dark:from-blue-600 dark:to-indigo-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-75 transition-opacity"></div>
                </div>
                <div className="flex-1 bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg group-hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-2 border-l-4 border-blue-500 dark:border-blue-400">
                  <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{t('cloudMigration.phase3Title')}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">{t('cloudMigration.phase3Desc')}</p>
                  <div className="mt-4 flex items-center text-blue-600 dark:text-blue-400 font-semibold text-sm">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{t('cloudMigration.phase3Duration')}</span>
                  </div>
                </div>
              </div>

              {/* Phase 4 */}
              <div className="relative flex items-start gap-8 group">
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-500 dark:from-purple-500 dark:to-pink-400 rounded-2xl flex items-center justify-center shadow-xl transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                    <span className="text-2xl font-black text-white">4</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-400 dark:from-purple-600 dark:to-pink-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-75 transition-opacity"></div>
                </div>
                <div className="flex-1 bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg group-hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-2 border-l-4 border-purple-500 dark:border-purple-400">
                  <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">{t('cloudMigration.phase4Title')}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">{t('cloudMigration.phase4Desc')}</p>
                  <div className="mt-4 flex items-center text-purple-600 dark:text-purple-400 font-semibold text-sm">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{t('cloudMigration.phase4Duration')}</span>
                  </div>
                </div>
              </div>

              {/* Phase 5 */}
              <div className="relative flex items-start gap-8 group">
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-600 to-red-500 dark:from-orange-500 dark:to-red-400 rounded-2xl flex items-center justify-center shadow-xl transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                    <span className="text-2xl font-black text-white">5</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-red-400 dark:from-orange-600 dark:to-red-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-75 transition-opacity"></div>
                </div>
                <div className="flex-1 bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg group-hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-2 border-l-4 border-orange-500 dark:border-orange-400">
                  <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-3 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">{t('cloudMigration.phase5Title')}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">{t('cloudMigration.phase5Desc')}</p>
                  <div className="mt-4 flex items-center text-orange-600 dark:text-orange-400 font-semibold text-sm">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{t('cloudMigration.phase5Duration')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Pricing */}
      <section className="py-24 bg-white dark:bg-gray-900 relative overflow-hidden">
        {/* Animated Dots Background */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle, #10b981 2px, transparent 2px)', backgroundSize: '40px 40px'}}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-5 py-2 bg-gradient-to-r from-green-100 to-teal-100 dark:from-green-900/30 dark:to-teal-900/30 rounded-full mb-6">
              <span className="text-green-600 dark:text-green-400 font-bold text-sm tracking-wider">{t('cloudMigration.section5Badge')}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6">
              {t('cloudMigration.section5Title')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-600 dark:from-green-400 dark:to-teal-400">{t('cloudMigration.section5TitleHighlight')}</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t('cloudMigration.section5Subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Basic Plan */}
            <div className="group relative bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-gray-200 dark:border-gray-700 hover:border-green-400 dark:hover:border-green-600 transform hover:scale-105">
              <div className="absolute -top-3 -right-3 w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-400 dark:from-green-600 dark:to-emerald-600 rounded-full opacity-20 group-hover:opacity-40 transition-opacity blur-2xl"></div>
              <div className="relative">
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-2xl mb-4 transform group-hover:rotate-12 transition-all duration-300">
                    <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2">{t('cloudMigration.basicPlan')}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">{t('cloudMigration.basicPlanDesc')}</p>
                </div>
                <div className="mb-8">
                  <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400">{t('cloudMigration.basicPlanPrice')}</span>
                  <span className="text-gray-600 dark:text-gray-400 text-lg">/project</span>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start text-gray-600 dark:text-gray-300 group/item hover:text-green-600 dark:hover:text-green-400 transition-colors">
                    <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center mr-3 flex-shrink-0 mt-0.5 transform group-hover/item:scale-110 group-hover/item:rotate-6 transition-all">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>{t('cloudMigration.basicPlanFeature1')}</span>
                  </li>
                  <li className="flex items-start text-gray-600 group/item hover:text-green-600 transition-colors">
                    <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center mr-3 flex-shrink-0 mt-0.5 transform group-hover/item:scale-110 group-hover/item:rotate-6 transition-all">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>{t('cloudMigration.basicPlanFeature2')}</span>
                  </li>
                  <li className="flex items-start text-gray-600 group/item hover:text-green-600 transition-colors">
                    <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center mr-3 flex-shrink-0 mt-0.5 transform group-hover/item:scale-110 group-hover/item:rotate-6 transition-all">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>{t('cloudMigration.basicPlanFeature3')}</span>
                  </li>
                  <li className="flex items-start text-gray-600 group/item hover:text-green-600 transition-colors">
                    <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center mr-3 flex-shrink-0 mt-0.5 transform group-hover/item:scale-110 group-hover/item:rotate-6 transition-all">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>{t('cloudMigration.basicPlanFeature4')}</span>
                  </li>
                </ul>
                <Link to="/contact" className="block w-full text-center bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-2xl font-bold hover:from-green-700 hover:to-emerald-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl">
                  {t('cloudMigration.getStarted')}
                </Link>
              </div>
            </div>

            {/* Advanced Plan - Popular */}
            <div className="group relative bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 rounded-3xl p-8 shadow-2xl transform scale-105 hover:scale-110 transition-all duration-500 border-4 border-yellow-400">
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 px-6 py-2 rounded-full text-sm font-black shadow-xl flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span>MOST POPULAR</span>
                </div>
              </div>
              <div className="relative">
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-4 transform group-hover:rotate-12 transition-all duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-black text-white mb-2">{t('cloudMigration.advancedPlan')}</h3>
                  <p className="text-green-100 text-sm">{t('cloudMigration.advancedPlanDesc')}</p>
                </div>
                <div className="mb-8">
                  <span className="text-5xl font-black text-white">{t('cloudMigration.advancedPlanPrice')}</span>
                  <span className="text-green-100 text-lg">/project</span>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start text-white group/item">
                    <div className="w-6 h-6 bg-yellow-400 rounded-lg flex items-center justify-center mr-3 flex-shrink-0 mt-0.5 transform group-hover/item:scale-110 group-hover/item:rotate-6 transition-all">
                      <svg className="w-4 h-4 text-green-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>{t('cloudMigration.advancedPlanFeature1')}</span>
                  </li>
                  <li className="flex items-start text-white group/item">
                    <div className="w-6 h-6 bg-yellow-400 rounded-lg flex items-center justify-center mr-3 flex-shrink-0 mt-0.5 transform group-hover/item:scale-110 group-hover/item:rotate-6 transition-all">
                      <svg className="w-4 h-4 text-green-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>{t('cloudMigration.advancedPlanFeature2')}</span>
                  </li>
                  <li className="flex items-start text-white group/item">
                    <div className="w-6 h-6 bg-yellow-400 rounded-lg flex items-center justify-center mr-3 flex-shrink-0 mt-0.5 transform group-hover/item:scale-110 group-hover/item:rotate-6 transition-all">
                      <svg className="w-4 h-4 text-green-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>{t('cloudMigration.advancedPlanFeature3')}</span>
                  </li>
                  <li className="flex items-start text-white group/item">
                    <div className="w-6 h-6 bg-yellow-400 rounded-lg flex items-center justify-center mr-3 flex-shrink-0 mt-0.5 transform group-hover/item:scale-110 group-hover/item:rotate-6 transition-all">
                      <svg className="w-4 h-4 text-green-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>{t('cloudMigration.advancedPlanFeature4')}</span>
                  </li>
                  <li className="flex items-start text-white group/item">
                    <div className="w-6 h-6 bg-yellow-400 rounded-lg flex items-center justify-center mr-3 flex-shrink-0 mt-0.5 transform group-hover/item:scale-110 group-hover/item:rotate-6 transition-all">
                      <svg className="w-4 h-4 text-green-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>{t('cloudMigration.advancedPlanFeature5')}</span>
                  </li>
                </ul>
                <Link to="/contact" className="block w-full text-center bg-white text-green-600 py-4 rounded-2xl font-bold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl">
                  {t('cloudMigration.getStarted')}
                </Link>
              </div>
            </div>

            {/* Enterprise Plan */}
            <div className="group relative bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-gray-200 dark:border-gray-700 hover:border-teal-400 dark:hover:border-teal-600 transform hover:scale-105">
              <div className="absolute -top-3 -left-3 w-20 h-20 bg-gradient-to-br from-teal-400 to-cyan-400 dark:from-teal-600 dark:to-cyan-600 rounded-full opacity-20 group-hover:opacity-40 transition-opacity blur-2xl"></div>
              <div className="relative">
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-teal-100 to-cyan-100 dark:from-teal-900/30 dark:to-cyan-900/30 rounded-2xl mb-4 transform group-hover:rotate-12 transition-all duration-300">
                    <svg className="w-8 h-8 text-teal-600 dark:text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2">{t('cloudMigration.enterprisePlan')}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">{t('cloudMigration.enterprisePlanDesc')}</p>
                </div>
                <div className="mb-8">
                  <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-600 dark:from-teal-400 dark:to-cyan-400">{t('cloudMigration.enterprisePlanPrice')}</span>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start text-gray-600 dark:text-gray-300 group/item hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                    <div className="w-6 h-6 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-lg flex items-center justify-center mr-3 flex-shrink-0 mt-0.5 transform group-hover/item:scale-110 group-hover/item:rotate-6 transition-all">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>{t('cloudMigration.enterprisePlanFeature1')}</span>
                  </li>
                  <li className="flex items-start text-gray-600 group/item hover:text-teal-600 transition-colors">
                    <div className="w-6 h-6 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-lg flex items-center justify-center mr-3 flex-shrink-0 mt-0.5 transform group-hover/item:scale-110 group-hover/item:rotate-6 transition-all">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>{t('cloudMigration.enterprisePlanFeature2')}</span>
                  </li>
                  <li className="flex items-start text-gray-600 group/item hover:text-teal-600 transition-colors">
                    <div className="w-6 h-6 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-lg flex items-center justify-center mr-3 flex-shrink-0 mt-0.5 transform group-hover/item:scale-110 group-hover/item:rotate-6 transition-all">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>{t('cloudMigration.enterprisePlanFeature3')}</span>
                  </li>
                  <li className="flex items-start text-gray-600 group/item hover:text-teal-600 transition-colors">
                    <div className="w-6 h-6 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-lg flex items-center justify-center mr-3 flex-shrink-0 mt-0.5 transform group-hover/item:scale-110 group-hover/item:rotate-6 transition-all">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>{t('cloudMigration.enterprisePlanFeature4')}</span>
                  </li>
                  <li className="flex items-start text-gray-600 group/item hover:text-teal-600 transition-colors">
                    <div className="w-6 h-6 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-lg flex items-center justify-center mr-3 flex-shrink-0 mt-0.5 transform group-hover/item:scale-110 group-hover/item:rotate-6 transition-all">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>{t('cloudMigration.enterprisePlanFeature5')}</span>
                  </li>
                </ul>
                <Link to="/contact" className="block w-full text-center bg-gradient-to-r from-teal-600 to-cyan-600 text-white py-4 rounded-2xl font-bold hover:from-teal-700 hover:to-cyan-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl">
                  {t('cloudMigration.contactSales')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: CTA */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-teal-600 dark:from-green-700 dark:to-teal-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t('cloudMigration.section6Title')}
          </h2>
          <p className="text-xl text-green-100 dark:text-green-50 mb-8">
            {t('cloudMigration.section6Subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="bg-white text-green-600 dark:text-green-700 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 dark:hover:bg-gray-200 transition-all transform hover:scale-105 shadow-lg">
              {t('cloudMigration.getFreeAssessment')}
            </Link>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 dark:hover:bg-white/20 transition-all">
              {t('cloudMigration.viewCaseStudies')}
            </button>
          </div>
        </div>
      </section>

       {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="md:col-span-1">
              <div className="mb-4">
                <Logo linkTo="/" />
              </div>
              <p className="text-gray-400 text-sm mb-4">
                {t('home.footerCompanyDesc')}
              </p>
              <div className="flex space-x-4">
                <button className="w-10 h-10 rounded-full bg-blue-500 hover:bg-blue-600 flex items-center justify-center transition-all transform hover:scale-110" aria-label="Follow us on Twitter">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </button>
                <button className="w-10 h-10 rounded-full bg-blue-700 hover:bg-blue-800 flex items-center justify-center transition-all transform hover:scale-110" aria-label="Follow us on LinkedIn">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </button>
                <button className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 flex items-center justify-center transition-all transform hover:scale-110" aria-label="Follow us on Instagram">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t('home.footerQuickLinks')}</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-400 hover:text-white transition-colors text-sm">{t('home.footerHome1')}</Link></li>
                <li><Link to="/home2" className="text-gray-400 hover:text-white transition-colors text-sm">{t('home.footerHome2')}</Link></li>
                <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors text-sm">{t('footer.about')}</Link></li>
                <li><Link to="/services/it-infrastructure" className="text-gray-400 hover:text-white transition-colors text-sm">{t('footer.services')}</Link></li>
                <li><Link to="/blog" className="text-gray-400 hover:text-white transition-colors text-sm">{t('footer.blog')}</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">{t('footer.contact')}</Link></li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t('home.footerOurServices')}</h3>
              <ul className="space-y-2">
                <li><Link to="/services/it-infrastructure" className="text-gray-400 hover:text-white transition-colors text-sm">{t('home.serviceDropdownTitle.itInfra')}</Link></li>
                <li><Link to="/services/cloud-migration" className="text-gray-400 hover:text-white transition-colors text-sm">{t('home.serviceDropdownTitle.cloud')}</Link></li>
                <li><Link to="/services/security-compliance" className="text-gray-400 hover:text-white transition-colors text-sm">{t('home.serviceDropdownTitle.security')}</Link></li>
                <li><Link to="/services/managed-it" className="text-gray-400 hover:text-white transition-colors text-sm">{t('home.serviceDropdownTitle.managed')}</Link></li>
                <li><Link to="/services/tech-consulting" className="text-gray-400 hover:text-white transition-colors text-sm">{t('home.serviceDropdownTitle.consulting')}</Link></li>
                <li><Link to="/services/data-analytics" className="text-gray-400 hover:text-white transition-colors text-sm">{t('home.serviceDropdownTitle.dataAnalytics')}</Link></li>
              </ul>
            </div>

            {/* Contact Us */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t('home.footerContactUs')}</h3>
              <div className="space-y-2 text-sm text-gray-400">
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {t('footer.phone')}
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8m-18 8h3.564v5.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  {t('footer.email')}
                </div>
                <div className="flex items-start">
                  <svg className="w-4 h-4 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {t('footer.address')}
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                {t('footer.copyright')}
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <Link to="#" className="text-gray-400 hover:text-white text-sm transition-colors">{t('footer.privacyPolicy')}</Link>
                <Link to="#" className="text-gray-400 hover:text-white text-sm transition-colors">{t('footer.termsOfService')}</Link>
                <Link to="#" className="text-gray-400 hover:text-white text-sm transition-colors">{t('footer.cookiePolicy')}</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CloudMigration;
