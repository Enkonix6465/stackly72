import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../../components/Logo';
import UserAvatar from '../../components/UserAvatar';
import LanguageSelector from '../../components/LanguageSelector';
import { useTheme } from '../../context/ThemeContext';
import { useTranslation } from 'react-i18next';

const TechnicalTutorials = () => {
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 w-full z-50 bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700 nav-stable">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <Logo />

            {/* Navigation Menu */}
            <div className="hidden lg:flex items-center space-x-8">
              <div className="flex items-center space-x-6">
                {/* Home Dropdown */}
                <div className="relative" ref={homeRef}>
                  <button 
                    onClick={() => setHomeOpen(!homeOpen)}
                    className={`px-3 py-2 text-sm font-medium transition-colors flex items-center relative ${(location.pathname === '/' || location.pathname === '/home2') ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400'}`}
                  >
                    {t('nav.home')}
                    <svg className={`w-4 h-4 ml-1 transform transition-transform ${homeOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                    <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-yellow-400 transform transition-transform ${(location.pathname === '/' || location.pathname === '/home2') ? 'scale-x-100' : 'scale-x-0'}`}></span>
                  </button>
                  
                  {/* Home Dropdown Menu */}
                  <div className={`absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-200 z-50 ${homeOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                    <div className="py-2">
                      <Link to="/" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-yellow-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors">
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                          {t('home.home1')}
                        </div>
                      </Link>
                      <Link to="/home2" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-yellow-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors">
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                          {t('home.home2')}
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
                <Link to="/about" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors relative group">
                  {t('nav.about')}
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-400 transform scale-x-0 transition-transform group-hover:scale-x-100"></span>
                </Link>
                {/* Services Dropdown */}
                <div className="relative" ref={servicesRef}>
                  <button 
                    onClick={() => setServicesOpen(!servicesOpen)}
                    className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors flex items-center relative"
                  >
                    {t('nav.services')}
                    <svg className={`w-4 h-4 ml-1 transform transition-transform ${servicesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-400 transform scale-x-0 transition-transform"></span>
                  </button>
                  
                  {/* Services Dropdown Menu */}
                  <div className={`absolute left-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-200 z-50 ${servicesOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                    <div className="py-2">
                      <Link to="/services/it-infrastructure" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-yellow-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <div>
                            <div className="font-medium">{t('home.serviceDropdownTitle.itInfra')}</div>
                            <div className="text-xs text-gray-500">{t('home.serviceDropdownSubtitle.itInfra')}</div>
                          </div>
                        </div>
                      </Link>
                      <Link to="/services/cloud-migration" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-yellow-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                            </svg>
                          </div>
                          <div>
                            <div className="font-medium">{t('home.serviceDropdownTitle.cloud')}</div>
                            <div className="text-xs text-gray-500">{t('home.serviceDropdownSubtitle.cloud')}</div>
                          </div>
                        </div>
                      </Link>
                      <Link to="/services/security-compliance" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-yellow-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                            <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                          </div>
                          <div>
                            <div className="font-medium">{t('home.serviceDropdownTitle.security')}</div>
                            <div className="text-xs text-gray-500">{t('home.serviceDropdownSubtitle.security')}</div>
                          </div>
                        </div>
                      </Link>
                      <Link to="/services/managed-it" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-yellow-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                            <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          </div>
                          <div>
                            <div className="font-medium">{t('home.serviceDropdownTitle.managed')}</div>
                            <div className="text-xs text-gray-500">{t('home.serviceDropdownSubtitle.managed')}</div>
                          </div>
                        </div>
                      </Link>
                      <Link to="/services/tech-consulting" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-yellow-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                            <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                          </div>
                          <div>
                            <div className="font-medium">{t('home.serviceDropdownTitle.consulting')}</div>
                            <div className="text-xs text-gray-500">{t('home.serviceDropdownSubtitle.consulting')}</div>
                          </div>
                        </div>
                      </Link>
                      <Link to="/services/data-analytics" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-yellow-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center mr-3">
                            <svg className="w-4 h-4 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                            </svg>
                          </div>
                          <div>
                            <div className="font-medium">{t('home.serviceDropdownTitle.dataAnalytics')}</div>
                            <div className="text-xs text-gray-500">{t('home.serviceDropdownSubtitle.dataAnalytics')}</div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
                <Link to="/blog" className={`px-3 py-2 text-sm font-medium transition-colors relative group ${location.pathname.startsWith('/blog') ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400'}`}>
                  {t('nav.blog')}
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-yellow-400 transform transition-transform ${location.pathname.startsWith('/blog') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
                </Link>
                <Link to="/contact" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors relative group">
                  {t('nav.contact')}
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-400 transform scale-x-0 transition-transform group-hover:scale-x-100"></span>
                </Link>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-3">
                {/* Language Selector */}
                <LanguageSelector />
                
                {/* Theme Toggle */}
                <button 
                  onClick={toggleTheme}
                  className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white transition-colors"
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
                <Link 
                  to="/login" 
                  className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-6 py-2 rounded-lg text-sm font-semibold transition-all transform hover:scale-105 shadow-sm"
                >
                  {t('nav.signIn')}
                </Link>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button className="p-2 text-gray-700 hover:text-gray-900 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Section 1: Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 dark:from-emerald-900 dark:via-teal-900 dark:to-cyan-900 overflow-hidden">
        <div className="absolute inset-0 bg-black/20 dark:bg-black/40"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-emerald-400/30 dark:bg-emerald-600/20 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-400/30 dark:bg-cyan-600/20 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 content-rtl">
          <div className="text-center">
            <div className="inline-flex items-center px-6 py-3 bg-white/20 dark:bg-white/10 backdrop-blur-sm rounded-full mb-8 border border-white/30 dark:border-white/20">
              <svg className="w-5 h-5 text-white mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              <span className="text-white font-bold text-sm tracking-wider">TECHNICAL TUTORIALS</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tight">
              {t('tutorials.heroTitle')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-emerald-300 dark:from-cyan-200 dark:to-emerald-200">{t('tutorials.heroTitleHighlight')}</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto mb-12 leading-relaxed">
              {t('tutorials.heroSubtitle')}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="bg-white text-emerald-600 dark:bg-gray-100 dark:text-emerald-700 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 dark:hover:bg-gray-200 transition-all shadow-xl hover:shadow-2xl transform hover:scale-105">
                {t('tutorials.browseTutorials')}
              </button>
              <button className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold hover:bg-white/30 dark:hover:bg-white/10 transition-all border border-white/30 dark:border-white/20">
                {t('tutorials.watchVideoGuide')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Tutorial Categories */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 content-rtl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6">
              {t('tutorials.categoriesTitle')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">{t('tutorials.categoriesTitleHighlight')}</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {t('tutorials.categoriesSubtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Cloud Infrastructure */}
            <div className="group bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all hover:scale-105 border border-gray-100 dark:border-gray-700">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 dark:from-blue-600 dark:to-cyan-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('tutorials.cloudInfrastructure')}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">{t('tutorials.cloudDescription')}</p>
              <div className="flex items-center text-blue-600 dark:text-blue-400 font-semibold group-hover:gap-2 transition-all">
                <span>{t('tutorials.tutorials15')}</span>
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>

            {/* Container Orchestration */}
            <div className="group bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all hover:scale-105 border border-gray-100 dark:border-gray-700">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 dark:from-purple-600 dark:to-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('tutorials.kubernetesDocker')}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">{t('tutorials.kubernetesDescription')}</p>
              <div className="flex items-center text-purple-600 dark:text-purple-400 font-semibold group-hover:gap-2 transition-all">
                <span>{t('tutorials.tutorials12')}</span>
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>

            {/* Security */}
            <div className="group bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all hover:scale-105 border border-gray-100 dark:border-gray-700">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 dark:from-red-600 dark:to-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('tutorials.securityDevSecOps')}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">{t('tutorials.securityDescription')}</p>
              <div className="flex items-center text-red-600 dark:text-red-400 font-semibold group-hover:gap-2 transition-all">
                <span>{t('tutorials.tutorials18')}</span>
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>

            {/* Infrastructure as Code */}
            <div className="group bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all hover:scale-105 border border-gray-100 dark:border-gray-700">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 dark:from-green-600 dark:to-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('tutorials.infrastructureCode')}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">{t('tutorials.infrastructureDescription')}</p>
              <div className="flex items-center text-green-600 dark:text-green-400 font-semibold group-hover:gap-2 transition-all">
                <span>{t('tutorials.tutorials10')}</span>
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>

            {/* CI/CD */}
            <div className="group bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all hover:scale-105 border border-gray-100 dark:border-gray-700">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 dark:from-yellow-600 dark:to-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('tutorials.cicdPipelines')}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">{t('tutorials.cicdDescription')}</p>
              <div className="flex items-center text-orange-600 dark:text-orange-400 font-semibold group-hover:gap-2 transition-all">
                <span>{t('tutorials.tutorials14')}</span>
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>

            {/* Monitoring */}
            <div className="group bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all hover:scale-105 border border-gray-100 dark:border-gray-700">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 dark:from-indigo-600 dark:to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('tutorials.monitoringLogging')}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">{t('tutorials.monitoringDescription')}</p>
              <div className="flex items-center text-indigo-600 dark:text-indigo-400 font-semibold group-hover:gap-2 transition-all">
                <span>{t('tutorials.tutorials11')}</span>
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Featured Tutorials */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6">
              {t('tutorials.featuredTitle')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400">{t('tutorials.featuredTitleHighlight')}</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {t('tutorials.featuredSubtitle')}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Tutorial 1 */}
            <article className="group bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-800 dark:to-gray-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all">
              <div className="h-48 relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Kubernetes Dashboard"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/60 to-transparent"></div>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300 px-3 py-1 rounded-full text-xs font-bold">{t('tutorials.tutorial1LevelBadge')}</span>
                  <span className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300 px-3 py-1 rounded-full text-xs font-bold">{t('tutorials.tutorial1TimeBadge')}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {t('tutorials.tutorial1Title')}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {t('tutorials.tutorial1Desc')}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <span>{t('tutorials.tutorial1Updated')}</span>
                    <span>•</span>
                    <span>{t('tutorials.tutorial1Views')}</span>
                  </div>
                  <button className="text-emerald-600 dark:text-emerald-400 font-bold hover:gap-2 flex items-center transition-all">
                    {t('tutorials.tutorial1Button')}
                    <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </article>

            {/* Tutorial 2 */}
            <article className="group bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all">
              <div className="h-48 relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Cybersecurity Lock"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 to-transparent"></div>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300 px-3 py-1 rounded-full text-xs font-bold">{t('tutorials.tutorial2LevelBadge')}</span>
                  <span className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300 px-3 py-1 rounded-full text-xs font-bold">{t('tutorials.tutorial2TimeBadge')}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  {t('tutorials.tutorial2Title')}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {t('tutorials.tutorial2Desc')}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <span>{t('tutorials.tutorial2Updated')}</span>
                    <span>•</span>
                    <span>{t('tutorials.tutorial2Views')}</span>
                  </div>
                  <button className="text-purple-600 dark:text-purple-400 font-bold hover:gap-2 flex items-center transition-all">
                    {t('tutorials.tutorial2Button')}
                    <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </article>

            {/* Tutorial 3 */}
            <article className="group bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all">
              <div className="h-48 relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Infrastructure Code"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-900/60 to-transparent"></div>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300 px-3 py-1 rounded-full text-xs font-bold">{t('tutorials.tutorial3LevelBadge')}</span>
                  <span className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300 px-3 py-1 rounded-full text-xs font-bold">{t('tutorials.tutorial3TimeBadge')}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                  {t('tutorials.tutorial3Title')}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {t('tutorials.tutorial3Desc')}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <span>{t('tutorials.tutorial3Updated')}</span>
                    <span>•</span>
                    <span>{t('tutorials.tutorial3Views')}</span>
                  </div>
                  <button className="text-green-600 dark:text-green-400 font-bold hover:gap-2 flex items-center transition-all">
                    {t('tutorials.tutorial3Button')}
                    <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </article>

            {/* Tutorial 4 */}
            <article className="group bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all">
              <div className="h-48 relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="CI/CD Pipeline"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-orange-900/60 to-transparent"></div>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300 px-3 py-1 rounded-full text-xs font-bold">{t('tutorials.tutorial4LevelBadge')}</span>
                  <span className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300 px-3 py-1 rounded-full text-xs font-bold">{t('tutorials.tutorial4TimeBadge')}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                  {t('tutorials.tutorial4Title')}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {t('tutorials.tutorial4Desc')}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <span>{t('tutorials.tutorial4Updated')}</span>
                    <span>•</span>
                    <span>{t('tutorials.tutorial4Views')}</span>
                  </div>
                  <button className="text-orange-600 dark:text-orange-400 font-bold hover:gap-2 flex items-center transition-all">
                    {t('tutorials.tutorial4Button')}
                    <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Section 4: Learning Path */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6">
              {t('tutorials.learningPathTitle')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400">{t('tutorials.learningPathTitleHighlight')}</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {t('tutorials.learningPathSubtitle')}
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Path Step 1 */}
            <div className="relative mb-12">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 dark:from-green-600 dark:to-emerald-600 rounded-full flex items-center justify-center text-white font-black text-2xl shadow-xl">
                    1
                  </div>
                </div>
                <div className="flex-grow bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl dark:border dark:border-gray-700">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300 px-3 py-1 rounded-full text-xs font-bold">{t('tutorials.path1LevelBadge')}</span>
                    <span className="text-gray-500 dark:text-gray-400 text-sm">{t('tutorials.path1Duration')}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{t('tutorials.path1Title')}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {t('tutorials.path1Desc')}
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center text-gray-700 dark:text-gray-300">
                      <svg className="w-5 h-5 text-green-500 dark:text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {t('tutorials.path1Item1')}
                    </li>
                    <li className="flex items-center text-gray-700 dark:text-gray-300">
                      <svg className="w-5 h-5 text-green-500 dark:text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {t('tutorials.path1Item2')}
                    </li>
                    <li className="flex items-center text-gray-700 dark:text-gray-300">
                      <svg className="w-5 h-5 text-green-500 dark:text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {t('tutorials.path1Item3')}
                    </li>
                  </ul>
                </div>
              </div>
              <div className="absolute left-8 top-20 bottom-0 w-0.5 bg-gradient-to-b from-green-500 to-yellow-500 dark:from-green-600 dark:to-yellow-600"></div>
            </div>

            {/* Path Step 2 */}
            <div className="relative mb-12">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 dark:from-yellow-600 dark:to-orange-600 rounded-full flex items-center justify-center text-white font-black text-2xl shadow-xl">
                    2
                  </div>
                </div>
                <div className="flex-grow bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl dark:border dark:border-gray-700">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300 px-3 py-1 rounded-full text-xs font-bold">{t('tutorials.path2LevelBadge')}</span>
                    <span className="text-gray-500 dark:text-gray-400 text-sm">{t('tutorials.path2Duration')}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{t('tutorials.path2Title')}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {t('tutorials.path2Desc')}
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center text-gray-700 dark:text-gray-300">
                      <svg className="w-5 h-5 text-yellow-500 dark:text-yellow-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {t('tutorials.path2Item1')}
                    </li>
                    <li className="flex items-center text-gray-700 dark:text-gray-300">
                      <svg className="w-5 h-5 text-yellow-500 dark:text-yellow-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {t('tutorials.path2Item2')}
                    </li>
                    <li className="flex items-center text-gray-700 dark:text-gray-300">
                      <svg className="w-5 h-5 text-yellow-500 dark:text-yellow-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {t('tutorials.path2Item3')}
                    </li>
                  </ul>
                </div>
              </div>
              <div className="absolute left-8 top-20 bottom-0 w-0.5 bg-gradient-to-b from-yellow-500 to-red-500 dark:from-yellow-600 dark:to-red-600"></div>
            </div>

            {/* Path Step 3 */}
            <div className="relative mb-12">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 dark:from-red-600 dark:to-pink-600 rounded-full flex items-center justify-center text-white font-black text-2xl shadow-xl">
                    3
                  </div>
                </div>
                <div className="flex-grow bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl dark:border dark:border-gray-700">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300 px-3 py-1 rounded-full text-xs font-bold">{t('tutorials.path3LevelBadge')}</span>
                    <span className="text-gray-500 dark:text-gray-400 text-sm">{t('tutorials.path3Duration')}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{t('tutorials.path3Title')}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {t('tutorials.path3Desc')}
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center text-gray-700 dark:text-gray-300">
                      <svg className="w-5 h-5 text-red-500 dark:text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {t('tutorials.path3Item1')}
                    </li>
                    <li className="flex items-center text-gray-700 dark:text-gray-300">
                      <svg className="w-5 h-5 text-red-500 dark:text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {t('tutorials.path3Item2')}
                    </li>
                    <li className="flex items-center text-gray-700 dark:text-gray-300">
                      <svg className="w-5 h-5 text-red-500 dark:text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {t('tutorials.path3Item3')}
                    </li>
                  </ul>
                </div>
              </div>
              <div className="absolute left-8 top-20 bottom-0 w-0.5 bg-gradient-to-b from-red-500 to-purple-500 dark:from-red-600 dark:to-purple-600"></div>
            </div>

            {/* Path Step 4 */}
            <div className="relative">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-500 dark:from-purple-600 dark:to-indigo-600 rounded-full flex items-center justify-center text-white font-black text-2xl shadow-xl">
                    4
                  </div>
                </div>
                <div className="flex-grow bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl dark:border dark:border-gray-700">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300 px-3 py-1 rounded-full text-xs font-bold">{t('tutorials.path4LevelBadge')}</span>
                    <span className="text-gray-500 dark:text-gray-400 text-sm">{t('tutorials.path4Duration')}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{t('tutorials.path4Title')}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {t('tutorials.path4Desc')}
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center text-gray-700 dark:text-gray-300">
                      <svg className="w-5 h-5 text-purple-500 dark:text-purple-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {t('tutorials.path4Item1')}
                    </li>
                    <li className="flex items-center text-gray-700 dark:text-gray-300">
                      <svg className="w-5 h-5 text-purple-500 dark:text-purple-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {t('tutorials.path4Item2')}
                    </li>
                    <li className="flex items-center text-gray-700 dark:text-gray-300">
                      <svg className="w-5 h-5 text-purple-500 dark:text-purple-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {t('tutorials.path4Item3')}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Resources & Tools */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6">
              {t('tutorials.resourcesTitle')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400">{t('tutorials.resourcesTitleHighlight')}</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {t('tutorials.resourcesSubtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Resource 1 */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-800 dark:to-gray-800 rounded-2xl p-6 border-2 border-emerald-200 dark:border-gray-700 hover:border-emerald-400 dark:hover:border-emerald-500 transition-all hover:scale-105">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{t('tutorials.resource1Title')}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{t('tutorials.resource1Desc')}</p>
              <button className="text-emerald-600 dark:text-emerald-400 font-semibold text-sm hover:underline bg-transparent border-none cursor-pointer">
                {t('tutorials.resource1Button')}
              </button>
            </div>

            {/* Resource 2 */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-800 rounded-2xl p-6 border-2 border-purple-200 dark:border-gray-700 hover:border-purple-400 dark:hover:border-purple-500 transition-all hover:scale-105">
              <div className="text-4xl mb-4">💻</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{t('tutorials.resource2Title')}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{t('tutorials.resource2Desc')}</p>
              <button className="text-purple-600 dark:text-purple-400 font-semibold text-sm hover:underline bg-transparent border-none cursor-pointer">
                {t('tutorials.resource2Button')}
              </button>
            </div>

            {/* Resource 3 */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-800 rounded-2xl p-6 border-2 border-green-200 dark:border-gray-700 hover:border-green-400 dark:hover:border-green-500 transition-all hover:scale-105">
              <div className="text-4xl mb-4">🎥</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{t('tutorials.resource3Title')}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{t('tutorials.resource3Desc')}</p>
              <button className="text-green-600 dark:text-green-400 font-semibold text-sm hover:underline bg-transparent border-none cursor-pointer">
                {t('tutorials.resource3Button')}
              </button>
            </div>

            {/* Resource 4 */}
            <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-800 rounded-2xl p-6 border-2 border-orange-200 dark:border-gray-700 hover:border-orange-400 dark:hover:border-orange-500 transition-all hover:scale-105">
              <div className="text-4xl mb-4">🛠️</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{t('tutorials.resource4Title')}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{t('tutorials.resource4Desc')}</p>
              <button className="text-orange-600 dark:text-orange-400 font-semibold text-sm hover:underline bg-transparent border-none cursor-pointer">
                {t('tutorials.resource4Button')}
              </button>
            </div>
          </div>

          {/* Additional Resources */}
          <div className="mt-12 bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-700 dark:to-teal-700 rounded-3xl p-12 text-center">
            <h3 className="text-3xl font-black text-white mb-4">{t('tutorials.helpCtaTitle')}</h3>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              {t('tutorials.helpCtaDesc')}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="bg-white dark:bg-gray-100 text-emerald-600 dark:text-emerald-700 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 dark:hover:bg-white transition-all shadow-xl">
                {t('tutorials.helpCtaButton1')}
              </button>
              <button className="bg-white/20 dark:bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold hover:bg-white/30 dark:hover:bg-white/20 transition-all border border-white/30">
                {t('tutorials.helpCtaButton2')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Newsletter CTA */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden dark:border dark:border-gray-700">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Left side */}
              <div className="bg-gradient-to-br from-emerald-600 to-teal-600 dark:from-emerald-700 dark:to-teal-700 p-12 flex flex-col justify-center">
                <div className="text-6xl mb-6">📬</div>
                <h3 className="text-3xl font-black text-white mb-4">
                  {t('tutorials.newsletterTitle')}
                </h3>
                <p className="text-white/90 text-lg">
                  {t('tutorials.newsletterDesc')}
                </p>
              </div>

              {/* Right side */}
              <div className="p-12 flex flex-col justify-center">
                <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t('tutorials.newsletterFormTitle')}</h4>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">{t('tutorials.newsletterEmailLabel')}</label>
                    <input 
                      type="email" 
                      placeholder={t('tutorials.newsletterEmailPlaceholder')}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-emerald-500 dark:focus:border-emerald-400 focus:outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">{t('tutorials.newsletterLevelLabel')}</label>
                    <select className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-emerald-500 dark:focus:border-emerald-400 focus:outline-none transition-all">
                      <option>{t('tutorials.newsletterLevelBeginner')}</option>
                      <option>{t('tutorials.newsletterLevelIntermediate')}</option>
                      <option>{t('tutorials.newsletterLevelAdvanced')}</option>
                      <option>{t('tutorials.newsletterLevelExpert')}</option>
                    </select>
                  </div>
                  <button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-700 dark:to-teal-700 text-white py-4 rounded-xl font-bold hover:from-emerald-700 hover:to-teal-700 dark:hover:from-emerald-800 dark:hover:to-teal-800 transition-all shadow-lg hover:shadow-xl"
                  >
                    {t('tutorials.newsletterButton')}
                  </button>
                </form>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-4 text-center">
                  {t('tutorials.newsletterFooterText')}
                </p>
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

export default TechnicalTutorials;
