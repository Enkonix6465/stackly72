import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../../components/Logo';
import UserAvatar from '../../components/UserAvatar';
import LanguageSelector from '../../components/LanguageSelector';
import { useTheme } from '../../context/ThemeContext';
import { useTranslation } from 'react-i18next';

const ITInfrastructure = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const location = useLocation();
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
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 w-full h-full">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            style={{ zIndex: 0 }}
          >
            <source src="https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_25fps.mp4" type="video/mp4" />
            <source src="https://videos.pexels.com/video-files/8097804/8097804-uhd_2560_1440_25fps.mp4" type="video/mp4" />
            <source src="https://videos.pexels.com/video-files/852421/852421-hd_1920_1080_25fps.mp4" type="video/mp4" />
          </video>
        </div>
        
        {/* Video Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-cyan-900/85 to-indigo-900/90 dark:from-gray-900/95 dark:via-gray-800/95 dark:to-gray-900/95" style={{ zIndex: 1 }}></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-cyan-500/20 to-blue-600/20 dark:from-blue-700/30 dark:via-cyan-600/30 dark:to-blue-700/30" style={{ zIndex: 1 }}></div>
        
        {/* Animated Background Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 dark:from-blue-600/30 dark:to-cyan-600/30 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-xl opacity-50 dark:opacity-40 animate-pulse" style={{ zIndex: 2 }}></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 dark:from-cyan-600/30 dark:to-blue-600/30 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-xl opacity-50 dark:opacity-40 animate-pulse" style={{ zIndex: 2 }}></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ zIndex: 10 }}>
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-6 py-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl mb-8 shadow-lg border border-white/30 dark:border-gray-700/30">
              <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mr-3 animate-pulse"></div>
              <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
              </svg>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 text-sm font-bold tracking-wide">
                {t('itInfra.heroBadge')}
              </span>
            </div>
            
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-white mb-8 tracking-tight drop-shadow-2xl">
              <span className="block">{t('itInfra.heroTitle1')}</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 dark:from-blue-300 dark:via-cyan-300 dark:to-blue-300">
                {t('itInfra.heroTitle2')}
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-100 dark:text-gray-200 max-w-4xl mx-auto mb-12 leading-relaxed font-light drop-shadow-lg">
              {t('itInfra.heroSubtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-700 dark:to-cyan-700 text-white px-10 py-5 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-cyan-700 dark:hover:from-blue-800 dark:hover:to-cyan-800 transition-all transform hover:scale-105 shadow-2xl">
                {t('itInfra.getStarted')}
              </Link>
              <button className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-sm border-2 border-white/30 dark:border-gray-600/30 text-white px-10 py-5 rounded-xl font-semibold text-lg hover:bg-white/20 dark:hover:bg-gray-700/40 transition-all shadow-xl">
                {t('itInfra.scheduleConsult')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Key Features */}
      <section className="py-24 bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-30 dark:opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 dark:bg-blue-600 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-300 dark:bg-cyan-600 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-purple-300 dark:bg-purple-600 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 animate-fade-in-up">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-full mb-6">
              <span className="text-blue-600 dark:text-blue-400 font-bold text-sm tracking-wider">{t('itInfra.section2Badge')}</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-6 bg-clip-text">
              {t('itInfra.section2Title')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400">{t('itInfra.section2TitleHighlight')}</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t('itInfra.section2Subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Card 1 */}
            <div className="group bg-white dark:bg-gray-800/80 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-500 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{t('itInfra.feature1Title')}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">{t('itInfra.feature1Desc')}</p>
                <div className="flex items-center text-blue-600 dark:text-blue-400 font-semibold group-hover:gap-2 transition-all">
                  <span>{t('itInfra.learnMore')}</span>
                  <svg className="w-5 h-5 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Feature Card 2 */}
            <div className="group bg-white dark:bg-gray-800/80 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 dark:border-gray-700 hover:border-cyan-200 dark:hover:border-cyan-500 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-600 to-blue-500 rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">{t('itInfra.feature2Title')}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">{t('itInfra.feature2Desc')}</p>
                <div className="flex items-center text-cyan-600 dark:text-cyan-400 font-semibold group-hover:gap-2 transition-all">
                  <span>{t('itInfra.learnMore')}</span>
                  <svg className="w-5 h-5 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Feature Card 3 */}
            <div className="group bg-white dark:bg-gray-800/80 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 dark:border-gray-700 hover:border-indigo-200 dark:hover:border-indigo-500 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-500 rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{t('itInfra.feature3Title')}</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">{t('itInfra.feature3Desc')}</p>
              <div className="flex items-center text-indigo-600 dark:text-indigo-400 font-semibold group-hover:gap-2 transition-all">
                <span>{t('itInfra.learnMore')}</span>
                <svg className="w-5 h-5 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>

            {/* Feature Card 4 */}
            <div className="group bg-white dark:bg-gray-800/80 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 dark:border-gray-700 hover:border-purple-200 dark:hover:border-purple-500 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-500 rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">{t('itInfra.feature4Title')}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">{t('itInfra.feature4Desc')}</p>
                <div className="flex items-center text-purple-600 dark:text-purple-400 font-semibold group-hover:gap-2 transition-all">
                  <span>{t('itInfra.learnMore')}</span>
                  <svg className="w-5 h-5 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Feature Card 5 */}
            <div className="group bg-white dark:bg-gray-800/80 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 dark:border-gray-700 hover:border-green-200 dark:hover:border-green-500 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">{t('itInfra.feature5Title')}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">{t('itInfra.feature5Desc')}</p>
                <div className="flex items-center text-green-600 dark:text-green-400 font-semibold group-hover:gap-2 transition-all">
                  <span>{t('itInfra.learnMore')}</span>
                  <svg className="w-5 h-5 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Feature Card 6 */}
            <div className="group bg-white dark:bg-gray-800/80 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 dark:border-gray-700 hover:border-orange-200 dark:hover:border-orange-500 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-600 to-yellow-500 rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">{t('itInfra.feature6Title')}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">{t('itInfra.feature6Desc')}</p>
                <div className="flex items-center text-orange-600 dark:text-orange-400 font-semibold group-hover:gap-2 transition-all">
                  <span>{t('itInfra.learnMore')}</span>
                  <svg className="w-5 h-5 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Benefits */}
      <section className="py-24 bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-gray-900 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-20 dark:opacity-10">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-400 to-cyan-400 dark:from-blue-600 dark:to-cyan-600 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl animate-blob"></div>
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-400 to-purple-400 dark:from-cyan-600 dark:to-purple-600 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl animate-blob animation-delay-2000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="animate-fade-in-up">
                <div className="inline-flex items-center px-5 py-2 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-full mb-6">
                  <span className="text-blue-600 dark:text-blue-400 font-bold text-sm tracking-wider">{t('itInfra.section3Badge')}</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6">
                  {t('itInfra.section3Title')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400">{t('itInfra.section3TitleHighlight')}</span>
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                  {t('itInfra.section3Subtitle')}
                </p>
              </div>

              <div className="space-y-6">
                {/* Benefit 1 */}
                <div className="group flex items-start bg-white dark:bg-gray-800/80 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-x-2 border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-500">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center mr-5 flex-shrink-0 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{t('itInfra.benefit1Title')}</h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{t('itInfra.benefit1Desc')}</p>
                  </div>
                </div>

                {/* Benefit 2 */}
                <div className="group flex items-start bg-white dark:bg-gray-800/80 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-x-2 border border-gray-100 dark:border-gray-700 hover:border-cyan-200 dark:hover:border-cyan-500">
                  <div className="w-14 h-14 bg-gradient-to-br from-cyan-600 to-blue-500 rounded-xl flex items-center justify-center mr-5 flex-shrink-0 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">{t('itInfra.benefit2Title')}</h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{t('itInfra.benefit2Desc')}</p>
                  </div>
                </div>

                {/* Benefit 3 */}
                <div className="group flex items-start bg-white dark:bg-gray-800/80 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-x-2 border border-gray-100 dark:border-gray-700 hover:border-indigo-200 dark:hover:border-indigo-500">
                  <div className="w-14 h-14 bg-gradient-to-br from-indigo-600 to-purple-500 rounded-xl flex items-center justify-center mr-5 flex-shrink-0 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{t('itInfra.benefit3Title')}</h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{t('itInfra.benefit3Desc')}</p>
                  </div>
                </div>

                {/* Benefit 4 */}
                <div className="group flex items-start bg-white dark:bg-gray-800/80 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-x-2 border border-gray-100 dark:border-gray-700 hover:border-purple-200 dark:hover:border-purple-500">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-500 rounded-xl flex items-center justify-center mr-5 flex-shrink-0 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">{t('itInfra.benefit4Title')}</h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{t('itInfra.benefit4Desc')}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl transform transition-all duration-500 group-hover:scale-105 group-hover:rotate-1">
                <img 
                  src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                  alt="IT Infrastructure" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              
              {/* Stats Cards */}
              <div className="absolute -bottom-8 -left-8 bg-white dark:bg-gray-800/90 p-8 rounded-2xl shadow-2xl transform transition-all duration-500 hover:scale-110 border border-gray-100 dark:border-gray-700">
                <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 mb-2">{t('itInfra.stat1Number')}</div>
                <div className="text-gray-600 dark:text-gray-300 font-semibold">{t('itInfra.stat1Label')}</div>
              </div>
              
              <div className="absolute -top-8 -right-8 bg-white dark:bg-gray-800/90 p-8 rounded-2xl shadow-2xl transform transition-all duration-500 hover:scale-110 border border-gray-100 dark:border-gray-700">
                <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-purple-600 dark:from-cyan-400 dark:to-purple-400 mb-2">{t('itInfra.stat2Number')}</div>
                <div className="text-gray-600 dark:text-gray-300 font-semibold">{t('itInfra.stat2Label')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Process */}
      <section className="py-24 bg-white dark:bg-gray-900 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-100 via-cyan-100 to-purple-100 dark:from-blue-900 dark:via-cyan-900 dark:to-purple-900"></div>
          <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-gradient-to-r from-blue-300 to-cyan-300 dark:from-blue-600 dark:to-cyan-600 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl animate-blob"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 animate-fade-in-up">
            <div className="inline-flex items-center px-5 py-2 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-full mb-6">
              <span className="text-blue-600 dark:text-blue-400 font-bold text-sm tracking-wider">{t('itInfra.section4Badge')}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6">
              {t('itInfra.section4Title')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400">{t('itInfra.section4TitleHighlight')}</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {t('itInfra.section4Subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Connecting Line */}
            <div className="hidden lg:block absolute top-10 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-cyan-200 to-purple-200 dark:from-blue-800 dark:via-cyan-800 dark:to-purple-800" style={{width: 'calc(100% - 5rem)', left: '2.5rem'}}></div>

            {/* Step 1 */}
            <div className="group text-center relative">
              <div className="relative inline-block">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 relative z-10">
                  <span className="text-4xl font-black text-white">1</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
              </div>
              <div className="bg-white dark:bg-gray-800/80 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-2 border border-gray-100 dark:border-gray-700 group-hover:border-blue-200 dark:group-hover:border-blue-500">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{t('itInfra.step1Title')}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{t('itInfra.step1Desc')}</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="group text-center relative">
              <div className="relative inline-block">
                <div className="w-24 h-24 bg-gradient-to-br from-cyan-600 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 relative z-10">
                  <span className="text-4xl font-black text-white">2</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
              </div>
              <div className="bg-white dark:bg-gray-800/80 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-2 border border-gray-100 dark:border-gray-700 group-hover:border-cyan-200 dark:group-hover:border-cyan-500">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">{t('itInfra.step2Title')}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{t('itInfra.step2Desc')}</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="group text-center relative">
              <div className="relative inline-block">
                <div className="w-24 h-24 bg-gradient-to-br from-indigo-600 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 relative z-10">
                  <span className="text-4xl font-black text-white">3</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
              </div>
              <div className="bg-white dark:bg-gray-800/80 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-2 border border-gray-100 dark:border-gray-700 group-hover:border-indigo-200 dark:group-hover:border-indigo-500">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{t('itInfra.step3Title')}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{t('itInfra.step3Desc')}</p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="group text-center relative">
              <div className="relative inline-block">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-600 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 relative z-10">
                  <span className="text-4xl font-black text-white">4</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
              </div>
              <div className="bg-white dark:bg-gray-800/80 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-2 border border-gray-100 dark:border-gray-700 group-hover:border-purple-200 dark:group-hover:border-purple-500">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">{t('itInfra.step4Title')}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{t('itInfra.step4Desc')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Pricing */}
      <section className="py-24 bg-gradient-to-br from-gray-50 via-blue-50/30 to-cyan-50/30 dark:from-gray-900 dark:via-blue-900/20 dark:to-cyan-900/20 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-20 dark:opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400 to-cyan-400 dark:from-blue-600 dark:to-cyan-600 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl animate-blob"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-cyan-400 to-purple-400 dark:from-cyan-600 dark:to-purple-600 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl animate-blob animation-delay-2000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 animate-fade-in-up">
            <div className="inline-flex items-center px-5 py-2 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-full mb-6">
              <span className="text-blue-600 dark:text-blue-400 font-bold text-sm tracking-wider">{t('itInfra.section5Badge')}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6">
              {t('itInfra.section5Title')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400">{t('itInfra.section5TitleHighlight')}</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {t('itInfra.section5Subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Starter Plan */}
            <div className="group bg-white dark:bg-gray-800/80 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-500">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{t('itInfra.starterPlan')}</h3>
              <div className="mb-6">
                <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400">{t('itInfra.starterPrice')}</span>
                <span className="text-gray-600 dark:text-gray-300 text-lg">{t('itInfra.perMonth')}</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-gray-600 dark:text-gray-300 group/item hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center mr-3 flex-shrink-0 transform group-hover/item:scale-110 group-hover/item:rotate-12 transition-all duration-300">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  {t('itInfra.starterFeature1')}
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-300 group/item hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center mr-3 flex-shrink-0 transform group-hover/item:scale-110 group-hover/item:rotate-12 transition-all duration-300">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  {t('itInfra.starterFeature2')}
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-300 group/item hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center mr-3 flex-shrink-0 transform group-hover/item:scale-110 group-hover/item:rotate-12 transition-all duration-300">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  {t('itInfra.starterFeature3')}
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-300 group/item hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center mr-3 flex-shrink-0 transform group-hover/item:scale-110 group-hover/item:rotate-12 transition-all duration-300">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  {t('itInfra.starterFeature4')}
                </li>
              </ul>
              <Link to="/contact" className="block w-full text-center bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-700 dark:to-cyan-700 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-cyan-700 dark:hover:from-blue-800 dark:hover:to-cyan-800 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl">
                {t('itInfra.getStartedBtn')}
              </Link>
            </div>

            {/* Professional Plan - Popular */}
            <div className="group bg-gradient-to-br from-blue-600 to-cyan-600 dark:from-blue-700 dark:to-cyan-700 rounded-3xl p-8 shadow-2xl transform scale-105 hover:scale-110 transition-all duration-500 relative border-4 border-yellow-400 dark:border-yellow-500">
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 dark:text-gray-900 px-6 py-2 rounded-full text-sm font-black shadow-lg animate-pulse">
                  {t('itInfra.popularBadge')}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{t('itInfra.professionalPlan')}</h3>
              <div className="mb-6">
                <span className="text-5xl font-black text-white">{t('itInfra.professionalPrice')}</span>
                <span className="text-blue-100 text-lg">{t('itInfra.perMonth')}</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-white group/item">
                  <div className="w-6 h-6 bg-yellow-400 rounded-lg flex items-center justify-center mr-3 flex-shrink-0 transform group-hover/item:scale-110 group-hover/item:rotate-12 transition-all duration-300">
                    <svg className="w-4 h-4 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  {t('itInfra.professionalFeature1')}
                </li>
                <li className="flex items-center text-white group/item">
                  <div className="w-6 h-6 bg-yellow-400 rounded-lg flex items-center justify-center mr-3 flex-shrink-0 transform group-hover/item:scale-110 group-hover/item:rotate-12 transition-all duration-300">
                    <svg className="w-4 h-4 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  {t('itInfra.professionalFeature2')}
                </li>
                <li className="flex items-center text-white group/item">
                  <div className="w-6 h-6 bg-yellow-400 rounded-lg flex items-center justify-center mr-3 flex-shrink-0 transform group-hover/item:scale-110 group-hover/item:rotate-12 transition-all duration-300">
                    <svg className="w-4 h-4 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  {t('itInfra.professionalFeature3')}
                </li>
                <li className="flex items-center text-white group/item">
                  <div className="w-6 h-6 bg-yellow-400 rounded-lg flex items-center justify-center mr-3 flex-shrink-0 transform group-hover/item:scale-110 group-hover/item:rotate-12 transition-all duration-300">
                    <svg className="w-4 h-4 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  {t('itInfra.professionalFeature4')}
                </li>
                <li className="flex items-center text-white group/item">
                  <div className="w-6 h-6 bg-yellow-400 rounded-lg flex items-center justify-center mr-3 flex-shrink-0 transform group-hover/item:scale-110 group-hover/item:rotate-12 transition-all duration-300">
                    <svg className="w-4 h-4 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  {t('itInfra.professionalFeature5')}
                </li>
              </ul>
              <Link to="/contact" className="block w-full text-center bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 py-4 rounded-xl font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl">
                {t('itInfra.getStartedBtn')}
              </Link>
            </div>

            {/* Enterprise Plan */}
            <div className="group bg-white dark:bg-gray-800/80 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700 hover:border-purple-200 dark:hover:border-purple-500">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">{t('itInfra.enterprisePlan')}</h3>
              <div className="mb-6">
                <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">{t('itInfra.customPrice')}</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-gray-600 dark:text-gray-300 group/item hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center mr-3 flex-shrink-0 transform group-hover/item:scale-110 group-hover/item:rotate-12 transition-all duration-300">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  {t('itInfra.enterpriseFeature1')}
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-300 group/item hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center mr-3 flex-shrink-0 transform group-hover/item:scale-110 group-hover/item:rotate-12 transition-all duration-300">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  {t('itInfra.enterpriseFeature2')}
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-300 group/item hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center mr-3 flex-shrink-0 transform group-hover/item:scale-110 group-hover/item:rotate-12 transition-all duration-300">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  {t('itInfra.enterpriseFeature3')}
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-300 group/item hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center mr-3 flex-shrink-0 transform group-hover/item:scale-110 group-hover/item:rotate-12 transition-all duration-300">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  {t('itInfra.enterpriseFeature4')}
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-300 group/item hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center mr-3 flex-shrink-0 transform group-hover/item:scale-110 group-hover/item:rotate-12 transition-all duration-300">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  {t('itInfra.enterpriseFeature5')}
                </li>
              </ul>
              <Link to="/contact" className="block w-full text-center bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-700 dark:to-pink-700 text-white py-4 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 dark:hover:from-purple-800 dark:hover:to-pink-800 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl">
                {t('itInfra.contactSales')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: CTA */}
      <section className="py-24 bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 dark:bg-blue-600/20 rounded-full mix-blend-overlay dark:mix-blend-lighten filter blur-3xl animate-blob"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-300/20 dark:bg-cyan-600/20 rounded-full mix-blend-overlay dark:mix-blend-lighten filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-300/20 dark:bg-blue-600/20 rounded-full mix-blend-overlay dark:mix-blend-lighten filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center px-5 py-2 bg-white/20 dark:bg-gray-700/30 backdrop-blur-sm rounded-full mb-6">
              <span className="text-white dark:text-gray-200 font-bold text-sm tracking-wider">{t('itInfra.section6Badge')}</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
              {t('itInfra.section6Title')} <span className="text-yellow-300 dark:text-cyan-300">{t('itInfra.section6TitleHighlight')}</span>
            </h2>
            <p className="text-xl text-blue-100 dark:text-gray-200 mb-10 leading-relaxed max-w-2xl mx-auto">
              {t('itInfra.section6Subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link 
                to="/contact" 
                className="group bg-white dark:bg-gray-800 text-blue-600 dark:text-cyan-400 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all transform hover:scale-110 hover:-translate-y-1 shadow-2xl inline-flex items-center justify-center"
              >
                {t('itInfra.scheduleConsultationBtn')}
                <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <button className="group border-3 border-white dark:border-gray-600 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white hover:text-blue-600 dark:hover:bg-gray-700 dark:hover:text-cyan-400 dark:hover:border-gray-500 transition-all transform hover:scale-110 hover:-translate-y-1 shadow-2xl inline-flex items-center justify-center">
                <svg className="w-5 h-5 mr-2 transform group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {t('itInfra.downloadBrochure')}
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-16 pt-12 border-t border-white/20 dark:border-gray-700/30">
              <p className="text-blue-100 dark:text-gray-300 mb-8 text-sm uppercase tracking-wider font-semibold">{t('itInfra.trustedByLeaders')}</p>
              <div className="flex flex-wrap justify-center items-center gap-12">
                <div className="group flex flex-col items-center transform hover:scale-110 transition-all duration-300">
                  <div className="text-white font-black text-3xl mb-1 opacity-90 group-hover:opacity-100 transition-opacity">{t('itInfra.companyMicrosoft')}</div>
                  <div className="h-1 w-0 group-hover:w-full bg-yellow-400 dark:bg-cyan-400 transition-all duration-300"></div>
                </div>
                <div className="group flex flex-col items-center transform hover:scale-110 transition-all duration-300">
                  <div className="text-white font-black text-3xl mb-1 opacity-90 group-hover:opacity-100 transition-opacity">{t('itInfra.companyAmazon')}</div>
                  <div className="h-1 w-0 group-hover:w-full bg-yellow-400 dark:bg-cyan-400 transition-all duration-300"></div>
                </div>
                <div className="group flex flex-col items-center transform hover:scale-110 transition-all duration-300">
                  <div className="text-white font-black text-3xl mb-1 opacity-90 group-hover:opacity-100 transition-opacity">{t('itInfra.companyGoogle')}</div>
                  <div className="h-1 w-0 group-hover:w-full bg-yellow-400 dark:bg-cyan-400 transition-all duration-300"></div>
                </div>
                <div className="group flex flex-col items-center transform hover:scale-110 transition-all duration-300">
                  <div className="text-white font-black text-3xl mb-1 opacity-90 group-hover:opacity-100 transition-opacity">{t('itInfra.companyIBM')}</div>
                  <div className="h-1 w-0 group-hover:w-full bg-yellow-400 dark:bg-cyan-400 transition-all duration-300"></div>
                </div>
              </div>
            </div>
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
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

export default ITInfrastructure;
