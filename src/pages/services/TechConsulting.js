import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Logo from '../../components/Logo';
import UserAvatar from '../../components/UserAvatar';
import LanguageSelector from '../../components/LanguageSelector';
import { useTheme } from '../../context/ThemeContext';

// Animated Counter Component
const AnimatedCounter = ({ start = 0, end, duration = 2000, suffix = "", prefix = "" }) => {
  const [count, setCount] = useState(start);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = counterRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const range = end - start;
      const currentCount = parseFloat((start + (easeOutCubic * range)).toFixed(1));
      
      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isVisible, start, end, duration]);

  return (
    <span ref={counterRef}>
      {prefix}{count}{suffix}
    </span>
  );
};

const TechConsulting = () => {
  const location = useLocation();
  const { isDarkMode, toggleTheme } = useTheme();
  const { t } = useTranslation();

  // Dropdown states
  const [servicesOpen, setServicesOpen] = useState(false);
  const [homeOpen, setHomeOpen] = useState(false);
  const servicesRef = useRef(null);
  const homeRef = useRef(null);

  // Click outside handler
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
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

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
                    className={`${location.pathname === '/' || location.pathname === '/home2' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white'} hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors flex items-center`}
                  >
                    {t('nav.home')}
                    <svg className={`w-4 h-4 ml-1 transform ${homeOpen ? 'rotate-180' : ''} transition-transform`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className={`absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 ${homeOpen ? 'opacity-100 visible' : 'opacity-0 invisible'} transition-all duration-200 z-50`}>
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
                    className={`${location.pathname.startsWith('/services') ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white'} hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors flex items-center`}
                  >
                    {t('nav.services')}
                    <svg className={`w-4 h-4 ml-1 transform ${servicesOpen ? 'rotate-180' : ''} transition-transform`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  <div className={`absolute left-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 ${servicesOpen ? 'opacity-100 visible' : 'opacity-0 invisible'} transition-all duration-200 z-50`}>
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
      <section className="relative pt-32 pb-24 bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-20 dark:opacity-30">
          <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500 dark:bg-purple-600 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500 dark:bg-indigo-600 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-pink-500 dark:bg-pink-600 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
        </div>

        {/* Floating Light Bulb Icons */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-1/4 w-4 h-4 bg-purple-400 dark:bg-purple-600 rounded-full animate-bounce"></div>
          <div className="absolute top-40 right-1/4 w-3 h-3 bg-indigo-400 dark:bg-indigo-600 rounded-full animate-bounce animation-delay-500"></div>
          <div className="absolute bottom-32 left-1/3 w-5 h-5 bg-pink-400 dark:bg-pink-600 rounded-full animate-bounce animation-delay-1000"></div>
          <div className="absolute bottom-20 right-1/3 w-4 h-4 bg-purple-300 dark:bg-purple-600 rounded-full animate-bounce animation-delay-1500"></div>
        </div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10" style={{backgroundImage: 'linear-gradient(#a855f7 1px, transparent 1px), linear-gradient(90deg, #a855f7 1px, transparent 1px)', backgroundSize: '60px 60px'}}></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-6 py-3 bg-purple-600/20 dark:bg-purple-700/30 backdrop-blur-sm border border-purple-500/30 dark:border-purple-600/30 rounded-full mb-8 animate-fade-in-up">
              <svg className="w-5 h-5 text-purple-400 dark:text-purple-300 mr-2 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <span className="text-purple-300 dark:text-purple-200 text-sm font-black tracking-wider">{t('techConsulting.badge')}</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight animate-fade-in-up animation-delay-500">
              {t('techConsulting.heroTitle1')}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 dark:from-purple-300 dark:via-pink-300 dark:to-indigo-300 mt-2">
                {t('techConsulting.heroTitle2')}
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 dark:text-gray-200 max-w-4xl mx-auto mb-12 leading-relaxed animate-fade-in-up animation-delay-1000">
              {t('techConsulting.heroSubtitle')} <span className="text-purple-400 dark:text-purple-300 font-bold">{t('techConsulting.heroHighlight')}</span> {t('techConsulting.heroDescription')}
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16 animate-fade-in-up animation-delay-1500">
              <Link to="/contact" className="group relative bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-700 dark:to-indigo-700 text-white px-10 py-5 rounded-2xl font-black text-lg hover:from-purple-700 hover:to-indigo-700 dark:hover:from-purple-800 dark:hover:to-indigo-800 transition-all transform hover:scale-105 hover:-translate-y-1 shadow-2xl overflow-hidden">
                <span className="relative z-10 flex items-center justify-center">
                  <svg className="w-6 h-6 mr-2 transform group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {t('techConsulting.scheduleConsultation')}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-800 dark:to-purple-800 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Link>
              <button className="group relative border-3 border-purple-500 dark:border-purple-600 text-purple-300 dark:text-purple-200 px-10 py-5 rounded-2xl font-black text-lg hover:bg-purple-600 dark:hover:bg-purple-700 hover:text-white hover:border-purple-600 dark:hover:border-purple-700 transition-all transform hover:scale-105 hover:-translate-y-1 shadow-2xl backdrop-blur-sm">
                <span className="flex items-center justify-center">
                  <svg className="w-6 h-6 mr-2 transform group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  {t('techConsulting.viewCaseStudies')}
                </span>
              </button>
            </div>

            {/* Innovation Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              <div className="relative group animate-fade-in-up animation-delay-2000">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 dark:from-purple-700 dark:to-pink-700 opacity-20 dark:opacity-30 blur-xl group-hover:opacity-40 transition-opacity rounded-2xl"></div>
                <div className="relative bg-gray-900/50 dark:bg-gray-800/50 backdrop-blur-sm border border-purple-500/30 dark:border-purple-600/30 p-6 rounded-2xl transform group-hover:-translate-y-2 transition-all duration-300">
                  <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 dark:from-purple-300 dark:to-pink-300 mb-2">
                    <AnimatedCounter end={200} suffix="+" duration={4000} />
                  </div>
                  <div className="text-gray-400 dark:text-gray-300 font-semibold text-sm">{t('techConsulting.stat1Label')}</div>
                </div>
              </div>
              <div className="relative group animate-fade-in-up animation-delay-2000">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-blue-600 dark:from-indigo-700 dark:to-blue-700 opacity-20 dark:opacity-30 blur-xl group-hover:opacity-40 transition-opacity rounded-2xl"></div>
                <div className="relative bg-gray-900/50 dark:bg-gray-800/50 backdrop-blur-sm border border-indigo-500/30 dark:border-indigo-600/30 p-6 rounded-2xl transform group-hover:-translate-y-2 transition-all duration-300">
                  <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400 dark:from-indigo-300 dark:to-blue-300 mb-2">
                    <AnimatedCounter end={95} suffix="%" duration={4000} />
                  </div>
                  <div className="text-gray-400 dark:text-gray-300 font-semibold text-sm">{t('techConsulting.stat2Label')}</div>
                </div>
              </div>
              <div className="relative group animate-fade-in-up animation-delay-2000">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-600 to-purple-600 dark:from-pink-700 dark:to-purple-700 opacity-20 dark:opacity-30 blur-xl group-hover:opacity-40 transition-opacity rounded-2xl"></div>
                <div className="relative bg-gray-900/50 dark:bg-gray-800/50 backdrop-blur-sm border border-pink-500/30 dark:border-pink-600/30 p-6 rounded-2xl transform group-hover:-translate-y-2 transition-all duration-300">
                  <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 dark:from-pink-300 dark:to-purple-300 mb-2">
                    <AnimatedCounter end={15} suffix="+" duration={4000} />
                  </div>
                  <div className="text-gray-400 dark:text-gray-300 font-semibold text-sm">{t('techConsulting.stat3Label')}</div>
                </div>
              </div>
              <div className="relative group animate-fade-in-up animation-delay-2000">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 opacity-20 dark:opacity-30 blur-xl group-hover:opacity-40 transition-opacity rounded-2xl"></div>
                <div className="relative bg-gray-900/50 dark:bg-gray-800/50 backdrop-blur-sm border border-blue-500/30 dark:border-blue-600/30 p-6 rounded-2xl transform group-hover:-translate-y-2 transition-all duration-300">
                  <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 dark:from-blue-300 dark:to-indigo-300 mb-2">
                    <AnimatedCounter end={50} suffix="+" duration={4000} />
                  </div>
                  <div className="text-gray-400 dark:text-gray-300 font-semibold text-sm">{t('techConsulting.stat4Label')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Consulting Services */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-purple-50/30 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
        {/* Animated Innovation Pattern */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="innovation-grid" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                <circle cx="40" cy="40" r="2" fill="#a855f7"/>
                <path d="M40 40 L60 40 M40 40 L40 60" stroke="#a855f7" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#innovation-grid)"/>
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-5 py-2 bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 rounded-full mb-6">
              <span className="text-purple-600 dark:text-purple-400 font-bold text-sm tracking-wider">{t('techConsulting.section2Badge')}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6">
              {t('techConsulting.section2Title')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400">{t('techConsulting.section2TitleHighlight')}</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t('techConsulting.section2Subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="group relative bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-gray-100 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 transform hover:-translate-y-3 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-200 to-indigo-200 dark:from-purple-700 dark:to-indigo-700 rounded-full opacity-0 group-hover:opacity-30 dark:group-hover:opacity-20 blur-2xl transition-opacity duration-500"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-indigo-500 dark:from-purple-500 dark:to-indigo-400 rounded-2xl flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-black text-gray-900 dark:text-white mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">{t('techConsulting.service1Title')}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">{t('techConsulting.service1Desc')}</p>
                <div className="flex items-center text-purple-600 dark:text-purple-400 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>{t('techConsulting.learnMore')}</span>
                  <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Service 2 */}
            <div className="group relative bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-gray-100 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600 transform hover:-translate-y-3 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-200 to-purple-200 dark:from-indigo-700 dark:to-purple-700 rounded-full opacity-0 group-hover:opacity-30 dark:group-hover:opacity-20 blur-2xl transition-opacity duration-500"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-500 dark:from-indigo-500 dark:to-purple-400 rounded-2xl flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-black text-gray-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{t('techConsulting.service2Title')}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">{t('techConsulting.service2Desc')}</p>
                <div className="flex items-center text-indigo-600 dark:text-indigo-400 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>{t('techConsulting.learnMore')}</span>
                  <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Service 3 */}
            <div className="group relative bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-gray-100 dark:border-gray-700 hover:border-pink-300 dark:hover:border-pink-600 transform hover:-translate-y-3 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-200 to-purple-200 dark:from-pink-700 dark:to-purple-700 rounded-full opacity-0 group-hover:opacity-30 dark:group-hover:opacity-20 blur-2xl transition-opacity duration-500"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-600 to-purple-500 dark:from-pink-500 dark:to-purple-400 rounded-2xl flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <h3 className="text-xl font-black text-gray-900 dark:text-white mb-3 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">{t('techConsulting.service3Title')}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">{t('techConsulting.service3Desc')}</p>
                <div className="flex items-center text-pink-600 dark:text-pink-400 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>{t('techConsulting.learnMore')}</span>
                  <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Service 4 */}
            <div className="group relative bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-gray-100 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transform hover:-translate-y-3 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-200 to-cyan-200 dark:from-blue-700 dark:to-cyan-700 rounded-full opacity-0 group-hover:opacity-30 dark:group-hover:opacity-20 blur-2xl transition-opacity duration-500"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-500 dark:from-blue-500 dark:to-cyan-400 rounded-2xl flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                </div>
                <h3 className="text-xl font-black text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{t('techConsulting.service4Title')}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">{t('techConsulting.service4Desc')}</p>
                <div className="flex items-center text-blue-600 dark:text-blue-400 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>{t('techConsulting.learnMore')}</span>
                  <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Service 5 */}
            <div className="group relative bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-gray-100 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-600 transform hover:-translate-y-3 overflow-hidden">
              {/* Decorative Wave Line */}
              <div className="absolute top-1/2 right-0 w-48 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <svg className="w-full h-8" viewBox="0 0 200 30" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 15 Q 25 5, 50 15 T 100 15 T 150 15 T 200 15" stroke="#10b981" strokeWidth="3" fill="none"/>
                </svg>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-200 to-teal-200 dark:from-green-700 dark:to-teal-700 rounded-full opacity-0 group-hover:opacity-30 dark:group-hover:opacity-20 blur-2xl transition-opacity duration-500"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-teal-500 dark:from-green-500 dark:to-teal-400 rounded-2xl flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-black text-gray-900 dark:text-white mb-3 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">{t('techConsulting.service5Title')}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">{t('techConsulting.service5Desc')}</p>
                <div className="flex items-center text-green-600 dark:text-green-400 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>{t('techConsulting.learnMore')}</span>
                  <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Service 6 */}
            <div className="group relative bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-gray-100 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-600 transform hover:-translate-y-3 overflow-hidden">
              {/* Decorative Wave Line */}
              <div className="absolute top-1/3 right-0 w-56 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <svg className="w-full h-12" viewBox="0 0 220 40" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 20 Q 30 10, 60 20 T 120 20 T 180 20 T 220 20" stroke="#f97316" strokeWidth="3" fill="none"/>
                </svg>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-200 to-red-200 dark:from-orange-700 dark:to-red-700 rounded-full opacity-0 group-hover:opacity-30 dark:group-hover:opacity-20 blur-2xl transition-opacity duration-500"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-600 to-red-500 dark:from-orange-500 dark:to-red-400 rounded-2xl flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-black text-gray-900 dark:text-white mb-3 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">{t('techConsulting.service6Title')}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">{t('techConsulting.service6Desc')}</p>
                <div className="flex items-center text-orange-600 dark:text-orange-400 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>{t('techConsulting.learnMore')}</span>
                  <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Why Choose Us */}
      <section className="py-24 bg-gradient-to-br from-purple-900 via-indigo-900 to-pink-900 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
        {/* Animated Circuit Pattern */}
        <div className="absolute inset-0 opacity-10 dark:opacity-5">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="tech-circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <circle cx="50" cy="50" r="2" fill="#a855f7"/>
                <line x1="50" y1="50" x2="100" y2="50" stroke="#a855f7" strokeWidth="0.5"/>
                <line x1="50" y1="50" x2="50" y2="100" stroke="#a855f7" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#tech-circuit)"/>
          </svg>
        </div>

        {/* Floating Lightbulb Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-16 h-16 border-2 border-purple-500/30 dark:border-purple-600/20 rounded-full animate-pulse"></div>
          <div className="absolute bottom-32 right-20 w-20 h-20 border-2 border-pink-500/30 dark:border-pink-600/20 rounded-full animate-pulse animation-delay-1000"></div>
          <div className="absolute top-1/2 right-1/4 w-12 h-12 border-2 border-indigo-500/30 dark:border-indigo-600/20 rounded-full animate-pulse animation-delay-2000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 dark:from-purple-600 dark:to-pink-600 opacity-20 dark:opacity-30 blur-3xl rounded-3xl animate-pulse"></div>
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt={t('techConsulting.imageAlt')}
                className="relative rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute -bottom-8 -right-8 bg-gradient-to-br from-purple-600 to-pink-600 dark:from-purple-700 dark:to-pink-700 p-8 rounded-2xl shadow-2xl border-4 border-purple-900 dark:border-gray-900 animate-fade-in-up w-[220px]">
                <div className="text-5xl font-black text-white mb-2 tabular-nums w-full text-center">
                  <AnimatedCounter end={500} duration={3000} suffix="+" />
                </div>
                <div className="text-purple-200 dark:text-gray-200 font-semibold whitespace-nowrap text-center">{t('techConsulting.section3StatLabel')}</div>
              </div>
            </div>

            <div>
              <div className="inline-flex items-center px-5 py-2 bg-purple-600/20 dark:bg-purple-700/30 backdrop-blur-sm border border-purple-500/30 dark:border-purple-600/30 rounded-full mb-8">
                <span className="text-purple-300 dark:text-purple-200 font-bold text-sm tracking-wider">{t('techConsulting.section3Badge')}</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                {t('techConsulting.section3Title1')}
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 dark:from-purple-300 dark:to-pink-300">{t('techConsulting.section3Title2')}</span>
              </h2>
              <p className="text-xl text-gray-300 dark:text-gray-200 mb-12 leading-relaxed">
                {t('techConsulting.section3Subtitle')}
              </p>

              <div className="space-y-6">
                <div className="group flex items-start transform hover:-translate-y-1 transition-all duration-300">
                  <div className="w-14 h-14 bg-purple-600/20 dark:bg-purple-700/30 backdrop-blur-sm border border-purple-500/30 dark:border-purple-600/30 rounded-2xl flex items-center justify-center mr-5 flex-shrink-0 group-hover:bg-purple-600 dark:group-hover:bg-purple-700 transition-all">
                    <svg className="w-7 h-7 text-purple-400 dark:text-purple-300 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white mb-2 group-hover:text-purple-400 dark:group-hover:text-purple-300 transition-colors">{t('techConsulting.benefit1Title')}</h3>
                    <p className="text-gray-400 dark:text-gray-300">{t('techConsulting.benefit1Desc')}</p>
                  </div>
                </div>

                <div className="group flex items-start transform hover:-translate-y-1 transition-all duration-300">
                  <div className="w-14 h-14 bg-indigo-600/20 dark:bg-indigo-700/30 backdrop-blur-sm border border-indigo-500/30 dark:border-indigo-600/30 rounded-2xl flex items-center justify-center mr-5 flex-shrink-0 group-hover:bg-indigo-600 dark:group-hover:bg-indigo-700 transition-all">
                    <svg className="w-7 h-7 text-indigo-400 dark:text-indigo-300 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white mb-2 group-hover:text-indigo-400 dark:group-hover:text-indigo-300 transition-colors">{t('techConsulting.benefit2Title')}</h3>
                    <p className="text-gray-400 dark:text-gray-300">{t('techConsulting.benefit2Desc')}</p>
                  </div>
                </div>

                <div className="group flex items-start transform hover:-translate-y-1 transition-all duration-300">
                  <div className="w-14 h-14 bg-pink-600/20 dark:bg-pink-700/30 backdrop-blur-sm border border-pink-500/30 dark:border-pink-600/30 rounded-2xl flex items-center justify-center mr-5 flex-shrink-0 group-hover:bg-pink-600 dark:group-hover:bg-pink-700 transition-all">
                    <svg className="w-7 h-7 text-pink-400 dark:text-pink-300 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white mb-2 group-hover:text-pink-400 dark:group-hover:text-pink-300 transition-colors">{t('techConsulting.benefit3Title')}</h3>
                    <p className="text-gray-400 dark:text-gray-300">{t('techConsulting.benefit3Desc')}</p>
                  </div>
                </div>

                <div className="group flex items-start transform hover:-translate-y-1 transition-all duration-300">
                  <div className="w-14 h-14 bg-blue-600/20 dark:bg-blue-700/30 backdrop-blur-sm border border-blue-500/30 dark:border-blue-600/30 rounded-2xl flex items-center justify-center mr-5 flex-shrink-0 group-hover:bg-blue-600 dark:group-hover:bg-blue-700 transition-all">
                    <svg className="w-7 h-7 text-blue-400 dark:text-blue-300 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white mb-2 group-hover:text-blue-400 dark:group-hover:text-blue-300 transition-colors">{t('techConsulting.benefit4Title')}</h3>
                    <p className="text-gray-400 dark:text-gray-300">{t('techConsulting.benefit4Desc')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Consulting Methodology */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-20 dark:opacity-10">
          <div className="absolute top-10 left-10 w-3 h-3 bg-purple-400 dark:bg-purple-600 rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-20 w-2 h-2 bg-indigo-400 dark:bg-indigo-600 rounded-full animate-pulse animation-delay-1000"></div>
          <div className="absolute bottom-20 left-1/4 w-4 h-4 bg-pink-400 dark:bg-pink-600 rounded-full animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-40 right-1/3 w-3 h-3 bg-purple-400 dark:bg-purple-600 rounded-full animate-pulse animation-delay-500"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-5 py-2 bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 rounded-full mb-6">
              <span className="text-purple-600 dark:text-purple-400 font-bold text-sm tracking-wider">{t('techConsulting.section4Badge')}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6">
              {t('techConsulting.section4Title')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t('techConsulting.section4Subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group relative transform hover:-translate-y-3 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-indigo-600 dark:from-purple-700 dark:to-indigo-700 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
              <div className="relative bg-gradient-to-br from-purple-600 to-indigo-600 dark:from-purple-700 dark:to-indigo-700 text-white p-8 rounded-3xl shadow-2xl h-full">
                <div className="text-6xl font-black mb-6 text-white/30 group-hover:text-white/40 transition-colors">01</div>
                <h3 className="text-2xl font-black mb-4 group-hover:scale-105 transition-transform">{t('techConsulting.step1Title')}</h3>
                <p className="text-purple-100 dark:text-purple-200 leading-relaxed">{t('techConsulting.step1Desc')}</p>
                <div className="absolute top-4 right-4 w-10 h-10 border-2 border-white/30 rounded-full flex items-center justify-center group-hover:rotate-180 transition-transform duration-500">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="group relative transform hover:-translate-y-3 transition-all duration-500 animation-delay-500">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-600 dark:from-indigo-700 dark:to-purple-700 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
              <div className="relative bg-gradient-to-br from-indigo-600 to-purple-600 dark:from-indigo-700 dark:to-purple-700 text-white p-8 rounded-3xl shadow-2xl h-full">
                <div className="text-6xl font-black mb-6 text-white/30 group-hover:text-white/40 transition-colors">02</div>
                <h3 className="text-2xl font-black mb-4 group-hover:scale-105 transition-transform">{t('techConsulting.step2Title')}</h3>
                <p className="text-indigo-100 dark:text-indigo-200 leading-relaxed">{t('techConsulting.step2Desc')}</p>
                <div className="absolute top-4 right-4 w-10 h-10 border-2 border-white/30 rounded-full flex items-center justify-center group-hover:rotate-180 transition-transform duration-500">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="group relative transform hover:-translate-y-3 transition-all duration-500 animation-delay-1000">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-600 to-purple-600 dark:from-pink-700 dark:to-purple-700 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
              <div className="relative bg-gradient-to-br from-pink-600 to-purple-600 dark:from-pink-700 dark:to-purple-700 text-white p-8 rounded-3xl shadow-2xl h-full">
                <div className="text-6xl font-black mb-6 text-white/30 group-hover:text-white/40 transition-colors">03</div>
                <h3 className="text-2xl font-black mb-4 group-hover:scale-105 transition-transform">{t('techConsulting.step3Title')}</h3>
                <p className="text-pink-100 dark:text-pink-200 leading-relaxed">{t('techConsulting.step3Desc')}</p>
                <div className="absolute top-4 right-4 w-10 h-10 border-2 border-white/30 rounded-full flex items-center justify-center group-hover:rotate-180 transition-transform duration-500">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="group relative transform hover:-translate-y-3 transition-all duration-500 animation-delay-1500">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 dark:from-purple-700 dark:to-pink-700 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
              <div className="relative bg-gradient-to-br from-purple-600 to-pink-600 dark:from-purple-700 dark:to-pink-700 text-white p-8 rounded-3xl shadow-2xl h-full">
                <div className="text-6xl font-black mb-6 text-white/30 group-hover:text-white/40 transition-colors">04</div>
                <h3 className="text-2xl font-black mb-4 group-hover:scale-105 transition-transform">{t('techConsulting.step4Title')}</h3>
                <p className="text-purple-100 dark:text-purple-200 leading-relaxed">{t('techConsulting.step4Desc')}</p>
                <div className="absolute top-4 right-4 w-10 h-10 border-2 border-white/30 rounded-full flex items-center justify-center group-hover:rotate-180 transition-transform duration-500">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Pricing */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <div className="absolute top-20 left-20 w-96 h-96 bg-purple-400 dark:bg-purple-600 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-400 dark:bg-indigo-600 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-5 py-2 bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 rounded-full mb-6">
              <span className="text-purple-600 dark:text-purple-400 font-bold text-sm tracking-wider">{t('techConsulting.section5Badge')}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6">
              {t('techConsulting.section5Title')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t('techConsulting.section5Subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Project-Based */}
            <div className="group relative bg-white dark:bg-gray-800/50 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 transform hover:-translate-y-2">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-200 to-indigo-200 dark:from-purple-700 dark:to-indigo-700 rounded-full opacity-0 group-hover:opacity-30 dark:group-hover:opacity-20 blur-2xl transition-opacity duration-500"></div>
              <div className="relative">
                <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-6 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">{t('techConsulting.planBasicTitle')}</h3>
                <div className="mb-8">
                  <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400">{t('techConsulting.planBasicPrice')}</span>
                  <span className="text-gray-500 dark:text-gray-400 text-lg">/project</span>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start text-gray-700 dark:text-gray-300">
                    <svg className="w-6 h-6 text-green-500 dark:text-green-400 mr-3 flex-shrink-0 mt-0.5 transform group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="leading-relaxed">{t('techConsulting.planBasicFeature1')}</span>
                  </li>
                  <li className="flex items-start text-gray-700 dark:text-gray-300">
                    <svg className="w-6 h-6 text-green-500 dark:text-green-400 mr-3 flex-shrink-0 mt-0.5 transform group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="leading-relaxed">{t('techConsulting.planBasicFeature2')}</span>
                  </li>
                  <li className="flex items-start text-gray-700 dark:text-gray-300">
                    <svg className="w-6 h-6 text-green-500 dark:text-green-400 mr-3 flex-shrink-0 mt-0.5 transform group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="leading-relaxed">{t('techConsulting.planBasicFeature3')}</span>
                  </li>
                  <li className="flex items-start text-gray-700 dark:text-gray-300">
                    <svg className="w-6 h-6 text-green-500 dark:text-green-400 mr-3 flex-shrink-0 mt-0.5 transform group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="leading-relaxed">{t('techConsulting.planBasicFeature4')}</span>
                  </li>
                </ul>
                <Link to="/contact" className="block w-full text-center bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-700 dark:to-indigo-700 text-white py-4 rounded-2xl font-black hover:from-purple-700 hover:to-indigo-700 dark:hover:from-purple-800 dark:hover:to-indigo-800 transition-all transform group-hover:scale-105 shadow-lg">
                  {t('techConsulting.planBasicButton')}
                </Link>
              </div>
            </div>

            {/* Retained Advisor - Featured */}
            <div className="group relative bg-gradient-to-br from-purple-600 to-indigo-600 dark:from-purple-700 dark:to-indigo-700 rounded-3xl p-8 shadow-2xl transform scale-105 hover:scale-110 transition-all duration-500 border-4 border-purple-400 dark:border-purple-600">
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 to-indigo-500 dark:from-blue-600 dark:to-indigo-600 text-white px-6 py-2 rounded-full text-sm font-black shadow-lg animate-pulse">
                {t('techConsulting.planAdvancedBadge')}
              </div>
              <div className="relative">
                <h3 className="text-2xl font-black text-white mb-6">{t('techConsulting.planAdvancedTitle')}</h3>
                <div className="mb-8">
                  <span className="text-5xl font-black text-white">{t('techConsulting.planAdvancedPrice')}</span>
                  <span className="text-purple-100 dark:text-gray-200 text-lg">/month</span>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start text-white">
                    <svg className="w-6 h-6 text-indigo-300 dark:text-gray-200 mr-3 flex-shrink-0 mt-0.5 transform group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="leading-relaxed">{t('techConsulting.planAdvancedFeature1')}</span>
                  </li>
                  <li className="flex items-start text-white">
                    <svg className="w-6 h-6 text-indigo-300 dark:text-gray-200 mr-3 flex-shrink-0 mt-0.5 transform group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="leading-relaxed">{t('techConsulting.planAdvancedFeature2')}</span>
                  </li>
                  <li className="flex items-start text-white">
                    <svg className="w-6 h-6 text-indigo-300 dark:text-gray-200 mr-3 flex-shrink-0 mt-0.5 transform group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="leading-relaxed">{t('techConsulting.planAdvancedFeature3')}</span>
                  </li>
                  <li className="flex items-start text-white">
                    <svg className="w-6 h-6 text-indigo-300 dark:text-gray-200 mr-3 flex-shrink-0 mt-0.5 transform group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="leading-relaxed">{t('techConsulting.planAdvancedFeature4')}</span>
                  </li>
                  <li className="flex items-start text-white">
                    <svg className="w-6 h-6 text-indigo-300 dark:text-gray-200 mr-3 flex-shrink-0 mt-0.5 transform group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="leading-relaxed">{t('techConsulting.planAdvancedFeature5')}</span>
                  </li>
                </ul>
                <Link to="/contact" className="block w-full text-center bg-white dark:bg-gray-900 text-purple-600 dark:text-purple-400 py-4 rounded-2xl font-black hover:bg-gray-100 dark:hover:bg-gray-800 transition-all transform group-hover:scale-105 shadow-lg">
                  {t('techConsulting.planAdvancedButton')}
                </Link>
              </div>
            </div>

            {/* Enterprise */}
            <div className="group relative bg-white dark:bg-gray-800/50 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 transform hover:-translate-y-2">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-200 to-purple-200 dark:from-indigo-700 dark:to-purple-700 rounded-full opacity-0 group-hover:opacity-30 dark:group-hover:opacity-20 blur-2xl transition-opacity duration-500"></div>
              <div className="relative">
                <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-6 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">{t('techConsulting.planEnterpriseTitle')}</h3>
                <div className="mb-8">
                  <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400">{t('techConsulting.planEnterprisePrice')}</span>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start text-gray-700 dark:text-gray-300">
                    <svg className="w-6 h-6 text-green-500 dark:text-green-400 mr-3 flex-shrink-0 mt-0.5 transform group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="leading-relaxed">{t('techConsulting.planEnterpriseFeature1')}</span>
                  </li>
                  <li className="flex items-start text-gray-700 dark:text-gray-300">
                    <svg className="w-6 h-6 text-green-500 dark:text-green-400 mr-3 flex-shrink-0 mt-0.5 transform group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="leading-relaxed">{t('techConsulting.planEnterpriseFeature2')}</span>
                  </li>
                  <li className="flex items-start text-gray-700 dark:text-gray-300">
                    <svg className="w-6 h-6 text-green-500 dark:text-green-400 mr-3 flex-shrink-0 mt-0.5 transform group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="leading-relaxed">{t('techConsulting.planEnterpriseFeature3')}</span>
                  </li>
                  <li className="flex items-start text-gray-700 dark:text-gray-300">
                    <svg className="w-6 h-6 text-green-500 dark:text-green-400 mr-3 flex-shrink-0 mt-0.5 transform group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="leading-relaxed">{t('techConsulting.planEnterpriseFeature4')}</span>
                  </li>
                  <li className="flex items-start text-gray-700 dark:text-gray-300">
                    <svg className="w-6 h-6 text-green-500 dark:text-green-400 mr-3 flex-shrink-0 mt-0.5 transform group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="leading-relaxed">{t('techConsulting.planEnterpriseFeature5')}</span>
                  </li>
                </ul>
                <Link to="/contact" className="block w-full text-center bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-700 dark:to-indigo-700 text-white py-4 rounded-2xl font-black hover:from-purple-700 hover:to-indigo-700 dark:hover:from-purple-800 dark:hover:to-indigo-800 transition-all transform group-hover:scale-105 shadow-lg">
                  {t('techConsulting.planEnterpriseButton')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: CTA */}
      <section className="py-24 bg-gradient-to-br from-purple-900 via-indigo-900 to-violet-900 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
        {/* Animated Network Pattern */}
        <div className="absolute inset-0 opacity-10 dark:opacity-5">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="network-cta" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <circle cx="50" cy="50" r="2" fill="#a855f7"/>
                <line x1="50" y1="50" x2="100" y2="50" stroke="#a855f7" strokeWidth="0.5"/>
                <line x1="50" y1="50" x2="50" y2="100" stroke="#a855f7" strokeWidth="0.5"/>
                <line x1="50" y1="50" x2="75" y2="25" stroke="#a855f7" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#network-cta)"/>
          </svg>
        </div>

        {/* Floating Lightbulb Elements */}
        <div className="absolute top-20 left-1/4 w-20 h-20 border-2 border-purple-500/30 dark:border-purple-600/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-1/4 w-16 h-16 border-2 border-indigo-500/30 dark:border-indigo-600/20 rounded-lg transform rotate-45 animate-pulse animation-delay-1000"></div>
        <div className="absolute top-1/2 right-20 w-12 h-12 border-2 border-violet-500/30 dark:border-violet-600/20 rounded-full animate-pulse animation-delay-2000"></div>

        <div className="relative max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center px-5 py-2 bg-purple-600/20 dark:bg-purple-700/30 backdrop-blur-sm border border-purple-500/30 dark:border-purple-600/30 rounded-full mb-8 animate-fade-in-up">
            <svg className="w-5 h-5 text-purple-400 dark:text-purple-300 mr-2 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <span className="text-purple-300 dark:text-purple-200 font-black text-sm tracking-wider">{t('techConsulting.ctaBadge')}</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight animate-fade-in-up animation-delay-500">
            {t('techConsulting.ctaTitle')}
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-300 dark:text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in-up animation-delay-1000">
            {t('techConsulting.ctaSubtitle')}
          </p>

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mb-12 animate-fade-in-up animation-delay-1500">
            <div className="text-center">
              <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 dark:from-purple-300 dark:to-indigo-300 mb-2">{t('techConsulting.ctaStat1')}</div>
              <div className="text-gray-400 dark:text-gray-300 text-sm">{t('techConsulting.ctaStat1Label')}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400 dark:from-indigo-300 dark:to-violet-300 mb-2">{t('techConsulting.ctaStat2')}</div>
              <div className="text-gray-400 dark:text-gray-300 text-sm">{t('techConsulting.ctaStat2Label')}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-400 dark:from-violet-300 dark:to-purple-300 mb-2">{t('techConsulting.ctaStat3')}</div>
              <div className="text-gray-400 dark:text-gray-300 text-sm">{t('techConsulting.ctaStat3Label')}</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up animation-delay-2000">
            <Link to="/contact" className="group relative bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-700 dark:to-indigo-700 text-white px-10 py-5 rounded-2xl font-black text-lg hover:from-purple-700 hover:to-indigo-700 dark:hover:from-purple-800 dark:hover:to-indigo-800 transition-all transform hover:scale-105 hover:-translate-y-1 shadow-2xl overflow-hidden">
              <span className="relative z-10 flex items-center justify-center">
                <svg className="w-6 h-6 mr-2 transform group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {t('techConsulting.ctaButton1')}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-800 dark:to-purple-800 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Link>
            
            <button className="group relative border-3 border-purple-500 dark:border-purple-600 text-purple-300 dark:text-purple-200 px-10 py-5 rounded-2xl font-black text-lg hover:bg-purple-600 dark:hover:bg-purple-700 hover:text-white hover:border-purple-600 dark:hover:border-purple-700 transition-all transform hover:scale-105 hover:-translate-y-1 shadow-2xl backdrop-blur-sm bg-purple-600/10 dark:bg-purple-700/20">
              <span className="flex items-center justify-center">
                <svg className="w-6 h-6 mr-2 transform group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {t('techConsulting.ctaButton2')}
              </span>
            </button>
          </div>

          {/* Small Print */}
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-8">
            {t('techConsulting.ctaFooterText')}
          </p>
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

export default TechConsulting;
