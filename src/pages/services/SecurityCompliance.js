import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../../components/Logo';
import UserAvatar from '../../components/UserAvatar';
import { useTheme } from '../../context/ThemeContext';
 import LanguageSelector from '../../../src/components/LanguageSelector';
import { getTranslation } from "../../../src/translations/translations";
import { useLanguage } from "../../../src/context/LanguageContext";

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

const SecurityCompliance = () => {
  const location = useLocation();
  const { isDarkMode, toggleTheme } = useTheme();
  const { language } = useLanguage();
    const t = (key) => getTranslation(language, key);
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
      <section className="relative pt-32 pb-24 bg-gradient-to-br from-red-900 via-gray-900 to-black dark:from-red-950 dark:via-gray-950 dark:to-black overflow-hidden">
        {/* Animated Security Grid Background */}
        <div className="absolute inset-0 opacity-20 dark:opacity-10">
          <div className="absolute inset-0" style={{backgroundImage: 'linear-gradient(#ef4444 1px, transparent 1px), linear-gradient(90deg, #ef4444 1px, transparent 1px)', backgroundSize: '100px 100px'}}></div>
        </div>
        
        {/* Pulsing Shield Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-600 dark:bg-red-700 rounded-full opacity-10 dark:opacity-5 blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-600 dark:bg-pink-700 rounded-full opacity-10 dark:opacity-5 blur-3xl animate-pulse animation-delay-2000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Animated Badge */}
            <div className="inline-flex items-center px-6 py-3 bg-red-600/20 backdrop-blur-sm border border-red-500/30 rounded-full mb-8 animate-fade-in-up">
              <svg className="w-5 h-5 text-red-400 mr-2 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="text-red-400 text-sm font-bold tracking-wider">{t('securityCompliance.badge')}</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight animate-fade-in-up animation-delay-500">
              {t('securityCompliance.heroTitle')}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-pink-500 to-red-500 animate-fade-in-up animation-delay-1000">
                {t('securityCompliance.heroSubtitle')}
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed animate-fade-in-up animation-delay-1500">
              {t('securityCompliance.heroDescription')}
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16 animate-fade-in-up animation-delay-2000">
              <Link to="/contact" className="group relative bg-gradient-to-r from-red-600 to-pink-600 text-white px-10 py-5 rounded-2xl font-black text-lg hover:from-red-700 hover:to-pink-700 transition-all transform hover:scale-105 hover:-translate-y-1 shadow-2xl overflow-hidden">
                <span className="relative z-10 flex items-center justify-center">
                  <svg className="w-6 h-6 mr-2 transform group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  {t('securityCompliance.requestAudit')}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Link>
              <button className="group relative border-3 border-red-500 text-red-400 px-10 py-5 rounded-2xl font-black text-lg hover:bg-red-600 hover:text-white hover:border-red-600 transition-all transform hover:scale-105 hover:-translate-y-1 shadow-2xl">
                <span className="flex items-center justify-center">
                  <svg className="w-6 h-6 mr-2 transform group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  {t('securityCompliance.securityAssessment')}
                </span>
              </button>
            </div>

            {/* Security Stats with Hexagon Style */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-pink-600 opacity-20 blur-xl group-hover:opacity-40 transition-opacity rounded-2xl"></div>
                <div className="relative bg-gray-900/50 backdrop-blur-sm border border-red-500/30 p-6 rounded-2xl transform group-hover:-translate-y-2 transition-all duration-300">
                  <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-400 mb-2">
                    <AnimatedCounter end={1000} suffix="+" duration={4000} />
                  </div>
                  <div className="text-gray-400 font-semibold text-sm">{t('securityCompliance.stat1')}</div>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-600 to-red-600 opacity-20 blur-xl group-hover:opacity-40 transition-opacity rounded-2xl"></div>
                <div className="relative bg-gray-900/50 backdrop-blur-sm border border-pink-500/30 p-6 rounded-2xl transform group-hover:-translate-y-2 transition-all duration-300">
                  <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-red-400 mb-2">
                    <AnimatedCounter end={100} suffix="%" duration={4000} />
                  </div>
                  <div className="text-gray-400 font-semibold text-sm">{t('securityCompliance.stat2')}</div>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 opacity-20 blur-xl group-hover:opacity-40 transition-opacity rounded-2xl"></div>
                <div className="relative bg-gray-900/50 backdrop-blur-sm border border-purple-500/30 p-6 rounded-2xl transform group-hover:-translate-y-2 transition-all duration-300">
                  <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-2">24/7</div>
                  <div className="text-gray-400 font-semibold text-sm">{t('securityCompliance.stat3')}</div>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-600 to-red-600 opacity-20 blur-xl group-hover:opacity-40 transition-opacity rounded-2xl"></div>
                <div className="relative bg-gray-900/50 backdrop-blur-sm border border-orange-500/30 p-6 rounded-2xl transform group-hover:-translate-y-2 transition-all duration-300">
                  <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400 mb-2">
                    <AnimatedCounter end={0} duration={4000} prefix="Zero" />
                  </div>
                  <div className="text-gray-400 font-semibold text-sm">{t('securityCompliance.stat4')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Security Services */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-red-50/30 dark:from-gray-900 dark:to-red-950/30 relative overflow-hidden">
        {/* Animated Circuit Pattern */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle, #dc2626 1px, transparent 1px)', backgroundSize: '30px 30px'}}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-5 py-2 bg-gradient-to-r from-red-100 to-pink-100 dark:from-red-900/30 dark:to-pink-900/30 rounded-full mb-6">
              <span className="text-red-600 dark:text-red-400 font-bold text-sm tracking-wider">{t('securityCompliance.servicesTitle')}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6">
              {t('securityCompliance.servicesHeading')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t('securityCompliance.servicesDescription')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="group relative bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-gray-100 dark:border-gray-700 hover:border-red-300 dark:hover:border-red-600 transform hover:-translate-y-3 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-200 to-pink-200 dark:from-red-800 dark:to-pink-800 rounded-full opacity-0 group-hover:opacity-30 dark:group-hover:opacity-20 blur-2xl transition-opacity duration-500"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-pink-500 dark:from-red-500 dark:to-pink-400 rounded-2xl flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-black text-gray-900 dark:text-white mb-3 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">{t('securityCompliance.service1Title')}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">{t('securityCompliance.service1Description')}</p>
                <div className="flex items-center text-red-600 dark:text-red-400 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>{t('securityCompliance.learnMore')}</span>
                  <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Service 2 */}
            <div className="group relative bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-gray-100 dark:border-gray-700 hover:border-pink-300 dark:hover:border-pink-600 transform hover:-translate-y-3 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-200 to-red-200 dark:from-pink-800 dark:to-red-800 rounded-full opacity-0 group-hover:opacity-30 dark:group-hover:opacity-20 blur-2xl transition-opacity duration-500"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-600 to-red-500 dark:from-pink-500 dark:to-red-400 rounded-2xl flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-black text-gray-900 dark:text-white mb-3 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">{t('securityCompliance.service2Title')}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">{t('securityCompliance.service2Description')}</p>
                <div className="flex items-center text-pink-600 dark:text-pink-400 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>{t('securityCompliance.learnMore')}</span>
                  <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Service 3 */}
            <div className="group relative bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-gray-100 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 transform hover:-translate-y-3 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-200 to-indigo-200 dark:from-purple-800 dark:to-indigo-800 rounded-full opacity-0 group-hover:opacity-30 dark:group-hover:opacity-20 blur-2xl transition-opacity duration-500"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-indigo-500 dark:from-purple-500 dark:to-indigo-400 rounded-2xl flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-black text-gray-900 dark:text-white mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">{t('securityCompliance.service3Title')}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">{t('securityCompliance.service3Description')}</p>
                <div className="flex items-center text-purple-600 dark:text-purple-400 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>{t('securityCompliance.learnMore')}</span>
                  <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Service 4 */}
            <div className="group relative bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-gray-100 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-600 transform hover:-translate-y-3 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-200 to-red-200 dark:from-orange-800 dark:to-red-800 rounded-full opacity-0 group-hover:opacity-30 dark:group-hover:opacity-20 blur-2xl transition-opacity duration-500"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-600 to-red-500 dark:from-orange-500 dark:to-red-400 rounded-2xl flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-black text-gray-900 dark:text-white mb-3 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">{t('securityCompliance.service4Title')}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">{t('securityCompliance.service4Description')}</p>
                <div className="flex items-center text-orange-600 dark:text-orange-400 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>{t('securityCompliance.learnMore')}</span>
                  <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Service 5 */}
            <div className="group relative bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-gray-100 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transform hover:-translate-y-3 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-200 to-cyan-200 dark:from-blue-800 dark:to-cyan-800 rounded-full opacity-0 group-hover:opacity-30 dark:group-hover:opacity-20 blur-2xl transition-opacity duration-500"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-500 dark:from-blue-500 dark:to-cyan-400 rounded-2xl flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-black text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{t('securityCompliance.service5Title')}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">{t('securityCompliance.service5Description')}</p>
                <div className="flex items-center text-blue-600 dark:text-blue-400 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>{t('securityCompliance.learnMore')}</span>
                  <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Service 6 */}
            <div className="group relative bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-gray-100 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600 transform hover:-translate-y-3 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-200 to-purple-200 dark:from-indigo-800 dark:to-purple-800 rounded-full opacity-0 group-hover:opacity-30 dark:group-hover:opacity-20 blur-2xl transition-opacity duration-500"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-500 dark:from-indigo-500 dark:to-purple-400 rounded-2xl flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                  </svg>
                </div>
                <h3 className="text-xl font-black text-gray-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{t('securityCompliance.service6Title')}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">{t('securityCompliance.service6Description')}</p>
                <div className="flex items-center text-indigo-600 dark:text-indigo-400 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>{t('securityCompliance.learnMore')}</span>
                  <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Compliance Standards */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-red-950 to-black relative overflow-hidden">
        {/* Hexagonal Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{backgroundImage: 'linear-gradient(30deg, #dc2626 12%, transparent 12.5%, transparent 87%, #dc2626 87.5%, #dc2626), linear-gradient(150deg, #dc2626 12%, transparent 12.5%, transparent 87%, #dc2626 87.5%, #dc2626)', backgroundSize: '80px 140px'}}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-5 py-2 bg-red-600/20 backdrop-blur-sm border border-red-500/30 rounded-full mb-6">
              <span className="text-red-400 font-bold text-sm tracking-wider">{t('securityCompliance.complianceTitle')}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              {t('securityCompliance.complianceHeading')}
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              {t('securityCompliance.complianceDescription')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* GDPR */}
            <div className="group relative bg-gray-900/50 backdrop-blur-sm border border-red-500/30 p-8 rounded-2xl text-center hover:border-red-400 transition-all duration-300 transform hover:-translate-y-2 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
              <div className="relative">
                <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-400 mb-3 group-hover:scale-110 transition-transform inline-block">GDPR</div>
                <div className="text-gray-400 text-sm leading-relaxed">{t('securityCompliance.gdprDesc')}</div>
              </div>
            </div>

            {/* HIPAA */}
            <div className="group relative bg-gray-900/50 backdrop-blur-sm border border-pink-500/30 p-8 rounded-2xl text-center hover:border-pink-400 transition-all duration-300 transform hover:-translate-y-2 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
              <div className="relative">
                <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-red-400 mb-3 group-hover:scale-110 transition-transform inline-block">HIPAA</div>
                <div className="text-gray-400 text-sm leading-relaxed">{t('securityCompliance.hipaaDesc')}</div>
              </div>
            </div>

            {/* SOC 2 */}
            <div className="group relative bg-gray-900/50 backdrop-blur-sm border border-purple-500/30 p-8 rounded-2xl text-center hover:border-purple-400 transition-all duration-300 transform hover:-translate-y-2 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
              <div className="relative">
                <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-3 group-hover:scale-110 transition-transform inline-block">SOC 2</div>
                <div className="text-gray-400 text-sm leading-relaxed">{t('securityCompliance.soc2Desc')}</div>
              </div>
            </div>

            {/* ISO 27001 */}
            <div className="group relative bg-gray-900/50 backdrop-blur-sm border border-indigo-500/30 p-8 rounded-2xl text-center hover:border-indigo-400 transition-all duration-300 transform hover:-translate-y-2 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
              <div className="relative">
                <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-3 group-hover:scale-110 transition-transform inline-block">ISO 27001</div>
                <div className="text-gray-400 text-sm leading-relaxed">{t('securityCompliance.iso27001Desc')}</div>
              </div>
            </div>

            {/* PCI DSS */}
            <div className="group relative bg-gray-900/50 backdrop-blur-sm border border-blue-500/30 p-8 rounded-2xl text-center hover:border-blue-400 transition-all duration-300 transform hover:-translate-y-2 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
              <div className="relative">
                <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-3 group-hover:scale-110 transition-transform inline-block">PCI DSS</div>
                <div className="text-gray-400 text-sm leading-relaxed">{t('securityCompliance.pciDssDesc')}</div>
              </div>
            </div>

            {/* NIST */}
            <div className="group relative bg-gray-900/50 backdrop-blur-sm border border-orange-500/30 p-8 rounded-2xl text-center hover:border-orange-400 transition-all duration-300 transform hover:-translate-y-2 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
              <div className="relative">
                <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400 mb-3 group-hover:scale-110 transition-transform inline-block">NIST</div>
                <div className="text-gray-400 text-sm leading-relaxed">{t('securityCompliance.nistDesc')}</div>
              </div>
            </div>

            {/* CCPA */}
            <div className="group relative bg-gray-900/50 backdrop-blur-sm border border-cyan-500/30 p-8 rounded-2xl text-center hover:border-cyan-400 transition-all duration-300 transform hover:-translate-y-2 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
              <div className="relative">
                <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-3 group-hover:scale-110 transition-transform inline-block">CCPA</div>
                <div className="text-gray-400 text-sm leading-relaxed">{t('securityCompliance.ccpaDesc')}</div>
              </div>
            </div>

            {/* FedRAMP */}
            <div className="group relative bg-gray-900/50 backdrop-blur-sm border border-teal-500/30 p-8 rounded-2xl text-center hover:border-teal-400 transition-all duration-300 transform hover:-translate-y-2 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
              <div className="relative">
                <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400 mb-3 group-hover:scale-110 transition-transform inline-block">FedRAMP</div>
                <div className="text-gray-400 text-sm leading-relaxed">{t('securityCompliance.fedrampDesc')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Audit Process */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
        {/* Animated Dots Background */}
        <div className="absolute inset-0 opacity-30 dark:opacity-10">
          <div className="absolute top-10 left-10 w-3 h-3 bg-red-400 dark:bg-red-500 rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-20 w-2 h-2 bg-pink-400 dark:bg-pink-500 rounded-full animate-pulse animation-delay-1000"></div>
          <div className="absolute bottom-20 left-1/4 w-3 h-3 bg-purple-400 dark:bg-purple-500 rounded-full animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-40 right-1/3 w-2 h-2 bg-red-400 dark:bg-red-500 rounded-full animate-pulse animation-delay-500"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-5 py-2 bg-gradient-to-r from-red-100 to-pink-100 dark:from-red-900/30 dark:to-pink-900/30 rounded-full mb-6">
              <span className="text-red-600 dark:text-red-400 font-bold text-sm tracking-wider">{t('securityCompliance.processTitle')}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6">
              {t('securityCompliance.processHeading')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t('securityCompliance.processDescription')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="group relative text-center transform hover:-translate-y-3 transition-all duration-300">
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-pink-500 dark:from-red-700 dark:to-pink-600 rounded-full blur-lg opacity-50 dark:opacity-30 group-hover:opacity-70 dark:group-hover:opacity-50 transition-opacity"></div>
                <div className="relative w-24 h-24 bg-gradient-to-br from-red-600 to-pink-500 dark:from-red-500 dark:to-pink-400 rounded-full flex items-center justify-center mx-auto shadow-2xl transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                  <span className="text-4xl font-black text-white">1</span>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg group-hover:shadow-xl transition-all border-2 border-red-100 dark:border-red-800 group-hover:border-red-300 dark:group-hover:border-red-600">
                <h3 className="text-xl font-black text-gray-900 dark:text-white mb-3 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">{t('securityCompliance.step1Title')}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{t('securityCompliance.step1Description')}</p>
              </div>
              {/* Connecting Line */}
              <div className="hidden lg:block absolute top-12 left-full w-full h-1 bg-gradient-to-r from-pink-300 dark:from-pink-700 to-transparent -z-10"></div>
            </div>

            {/* Step 2 */}
            <div className="group relative text-center transform hover:-translate-y-3 transition-all duration-300 animation-delay-500">
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-500 dark:from-pink-700 dark:to-purple-600 rounded-full blur-lg opacity-50 dark:opacity-30 group-hover:opacity-70 dark:group-hover:opacity-50 transition-opacity"></div>
                <div className="relative w-24 h-24 bg-gradient-to-br from-pink-600 to-purple-500 dark:from-pink-500 dark:to-purple-400 rounded-full flex items-center justify-center mx-auto shadow-2xl transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                  <span className="text-4xl font-black text-white">2</span>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg group-hover:shadow-xl transition-all border-2 border-pink-100 dark:border-pink-800 group-hover:border-pink-300 dark:group-hover:border-pink-600">
                <h3 className="text-xl font-black text-gray-900 dark:text-white mb-3 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">{t('securityCompliance.step2Title')}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{t('securityCompliance.step2Description')}</p>
              </div>
              {/* Connecting Line */}
              <div className="hidden lg:block absolute top-12 left-full w-full h-1 bg-gradient-to-r from-purple-300 dark:from-purple-700 to-transparent -z-10"></div>
            </div>

            {/* Step 3 */}
            <div className="group relative text-center transform hover:-translate-y-3 transition-all duration-300 animation-delay-1000">
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-500 dark:from-purple-700 dark:to-indigo-600 rounded-full blur-lg opacity-50 dark:opacity-30 group-hover:opacity-70 dark:group-hover:opacity-50 transition-opacity"></div>
                <div className="relative w-24 h-24 bg-gradient-to-br from-purple-600 to-indigo-500 dark:from-purple-500 dark:to-indigo-400 rounded-full flex items-center justify-center mx-auto shadow-2xl transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                  <span className="text-4xl font-black text-white">3</span>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg group-hover:shadow-xl transition-all border-2 border-purple-100 dark:border-purple-800 group-hover:border-purple-300 dark:group-hover:border-purple-600">
                <h3 className="text-xl font-black text-gray-900 dark:text-white mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">{t('securityCompliance.step3Title')}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{t('securityCompliance.step3Description')}</p>
              </div>
              {/* Connecting Line */}
              <div className="hidden lg:block absolute top-12 left-full w-full h-1 bg-gradient-to-r from-indigo-300 dark:from-indigo-700 to-transparent -z-10"></div>
            </div>

            {/* Step 4 */}
            <div className="group relative text-center transform hover:-translate-y-3 transition-all duration-300 animation-delay-1500">
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-500 dark:from-indigo-700 dark:to-blue-600 rounded-full blur-lg opacity-50 dark:opacity-30 group-hover:opacity-70 dark:group-hover:opacity-50 transition-opacity"></div>
                <div className="relative w-24 h-24 bg-gradient-to-br from-indigo-600 to-blue-500 dark:from-indigo-500 dark:to-blue-400 rounded-full flex items-center justify-center mx-auto shadow-2xl transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                  <span className="text-4xl font-black text-white">4</span>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg group-hover:shadow-xl transition-all border-2 border-indigo-100 dark:border-indigo-800 group-hover:border-indigo-300 dark:group-hover:border-indigo-600">
                <h3 className="text-xl font-black text-gray-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{t('securityCompliance.step4Title')}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{t('securityCompliance.step4Description')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Pricing */}
      <section className="py-24 bg-gradient-to-br from-gray-900 to-black relative overflow-hidden">
        {/* Radial Gradient Orbs */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-red-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-5 py-2 bg-red-600/20 backdrop-blur-sm border border-red-500/30 rounded-full mb-6">
              <span className="text-red-400 font-bold text-sm tracking-wider">{t('securityCompliance.pricingTitle')}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              {t('securityCompliance.pricingHeading')}
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              {t('securityCompliance.pricingDescription')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Basic Tier */}
            <div className="group relative bg-gray-900/50 backdrop-blur-sm border-2 border-red-500/30 rounded-3xl p-8 hover:border-red-400 transition-all duration-300 transform hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl"></div>
              <div className="relative">
                <h3 className="text-2xl font-black text-white mb-4 group-hover:text-red-400 transition-colors">{t('securityCompliance.basicPlan')}</h3>
                <div className="mb-6">
                  <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-400">{t('securityCompliance.basicPlanPrice')}</span>
                  <span className="text-gray-400 text-lg">/{t('securityCompliance.perAudit')}</span>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center text-gray-300">
                    <svg className="w-5 h-5 text-red-400 mr-3 flex-shrink-0 transform group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {t('securityCompliance.basicPlanFeature1')}
                  </li>
                  <li className="flex items-center text-gray-300">
                    <svg className="w-5 h-5 text-red-400 mr-3 flex-shrink-0 transform group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {t('securityCompliance.basicPlanFeature2')}
                  </li>
                  <li className="flex items-center text-gray-300">
                    <svg className="w-5 h-5 text-red-400 mr-3 flex-shrink-0 transform group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {t('securityCompliance.basicPlanFeature3')}
                  </li>
                  <li className="flex items-center text-gray-300">
                    <svg className="w-5 h-5 text-red-400 mr-3 flex-shrink-0 transform group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {t('securityCompliance.basicPlanFeature4')}
                  </li>
                </ul>
                <Link to="/contact" className="block w-full text-center bg-gradient-to-r from-red-600 to-pink-600 text-white py-4 rounded-2xl font-black hover:from-red-700 hover:to-pink-700 transition-all transform group-hover:scale-105 shadow-lg">
                  {t('securityCompliance.getStarted')}
                </Link>
              </div>
            </div>

            <div className="group relative bg-gradient-to-br from-red-600 to-pink-600 rounded-3xl p-8 shadow-2xl transform scale-105 hover:scale-110 transition-all duration-300">
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 px-6 py-2 rounded-full text-sm font-black shadow-lg animate-pulse">
                ⭐ {t('securityCompliance.recommended')}
              </div>
              <div className="relative">
                <h3 className="text-2xl font-black text-white mb-4">{t('securityCompliance.advancedPlan')}</h3>
                <div className="mb-6">
                  <span className="text-5xl font-black text-white">{t('securityCompliance.advancedPlanPrice')}</span>
                  <span className="text-red-100 text-lg">/{t('securityCompliance.perAudit')}</span>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center text-white">
                    <svg className="w-5 h-5 text-yellow-300 mr-3 flex-shrink-0 transform group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {t('securityCompliance.advancedPlanFeature1')}
                  </li>
                  <li className="flex items-center text-white">
                    <svg className="w-5 h-5 text-yellow-300 mr-3 flex-shrink-0 transform group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {t('securityCompliance.advancedPlanFeature2')}
                  </li>
                  <li className="flex items-center text-white">
                    <svg className="w-5 h-5 text-yellow-300 mr-3 flex-shrink-0 transform group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {t('securityCompliance.advancedPlanFeature3')}
                  </li>
                  <li className="flex items-center text-white">
                    <svg className="w-5 h-5 text-yellow-300 mr-3 flex-shrink-0 transform group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {t('securityCompliance.advancedPlanFeature4')}
                  </li>
                  <li className="flex items-center text-white">
                    <svg className="w-5 h-5 text-yellow-300 mr-3 flex-shrink-0 transform group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {t('securityCompliance.advancedPlanFeature5')}
                  </li>
                </ul>
                <Link to="/contact" className="block w-full text-center bg-white text-red-600 py-4 rounded-2xl font-black hover:bg-gray-100 transition-all transform group-hover:scale-105 shadow-lg">
                  {t('securityCompliance.getStarted')}
                </Link>
              </div>
            </div>

            {/* Enterprise Tier */}
            <div className="group relative bg-gray-900/50 backdrop-blur-sm border-2 border-purple-500/30 rounded-3xl p-8 hover:border-purple-400 transition-all duration-300 transform hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl"></div>
              <div className="relative">
                <h3 className="text-2xl font-black text-white mb-4 group-hover:text-purple-400 transition-colors">{t('securityCompliance.enterprisePlan')}</h3>
                <div className="mb-6">
                  <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">{t('securityCompliance.enterprisePlanPrice')}</span>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center text-gray-300">
                    <svg className="w-5 h-5 text-purple-400 mr-3 flex-shrink-0 transform group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {t('securityCompliance.enterprisePlanFeature1')}
                  </li>
                  <li className="flex items-center text-gray-300">
                    <svg className="w-5 h-5 text-purple-400 mr-3 flex-shrink-0 transform group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {t('securityCompliance.enterprisePlanFeature2')}
                  </li>
                  <li className="flex items-center text-gray-300">
                    <svg className="w-5 h-5 text-purple-400 mr-3 flex-shrink-0 transform group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {t('securityCompliance.enterprisePlanFeature3')}
                  </li>
                  <li className="flex items-center text-gray-300">
                    <svg className="w-5 h-5 text-purple-400 mr-3 flex-shrink-0 transform group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {t('securityCompliance.enterprisePlanFeature4')}
                  </li>
                  <li className="flex items-center text-gray-300">
                    <svg className="w-5 h-5 text-purple-400 mr-3 flex-shrink-0 transform group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {t('securityCompliance.enterprisePlanFeature5')}
                  </li>
                </ul>
                <Link to="/contact" className="block w-full text-center bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-2xl font-black hover:from-purple-700 hover:to-pink-700 transition-all transform group-hover:scale-105 shadow-lg">
                  {t('securityCompliance.contactSales')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: CTA */}
      <section className="py-24 bg-gradient-to-br from-red-900 via-gray-900 to-black relative overflow-hidden">
        {/* Security Grid Pattern */}
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'linear-gradient(#ef4444 1px, transparent 1px), linear-gradient(90deg, #ef4444 1px, transparent 1px)', backgroundSize: '100px 100px'}}></div>
        
        {/* Floating Lock Elements */}
        <div className="absolute top-20 left-1/4 w-16 h-16 border-2 border-red-500/30 rounded-lg transform rotate-12 animate-pulse"></div>
        <div className="absolute bottom-20 right-1/4 w-20 h-20 border-2 border-pink-500/30 rounded-full animate-pulse animation-delay-1000"></div>
        <div className="absolute top-1/2 right-20 w-12 h-12 border-2 border-red-500/30 rounded-lg transform -rotate-12 animate-pulse animation-delay-2000"></div>

        <div className="relative max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center px-5 py-2 bg-red-600/20 backdrop-blur-sm border border-red-500/30 rounded-full mb-8">
            <svg className="w-5 h-5 text-red-400 mr-2 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span className="text-red-400 font-bold text-sm tracking-wider">{t('securityCompliance.ctaBadge')}</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
            {t('securityCompliance.ctaTitle')}
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            {t('securityCompliance.ctaDescription')}
          </p>

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mb-12">
            <div className="text-center">
              <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-400 mb-2">{t('securityCompliance.ctaStat1')}</div>
              <div className="text-gray-400 text-sm">{t('securityCompliance.ctaStat1Label')}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 mb-2">{t('securityCompliance.ctaStat2')}</div>
              <div className="text-gray-400 text-sm">{t('securityCompliance.ctaStat2Label')}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-red-400 mb-2">{t('securityCompliance.ctaStat3')}</div>
              <div className="text-gray-400 text-sm">{t('securityCompliance.ctaStat3Label')}</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/contact" className="group relative bg-gradient-to-r from-red-600 to-pink-600 text-white px-10 py-5 rounded-2xl font-black text-lg hover:from-red-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-2xl overflow-hidden">
              <span className="relative z-10 flex items-center justify-center">
                <svg className="w-6 h-6 mr-2 transform group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                {t('securityCompliance.ctaButton1')}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Link>
            
            <button className="group relative border-3 border-red-500 text-red-400 px-10 py-5 rounded-2xl font-black text-lg hover:bg-red-600 hover:text-white hover:border-red-600 transition-all transform hover:scale-105 shadow-2xl backdrop-blur-sm bg-red-600/10">
              <span className="flex items-center justify-center">
                <svg className="w-6 h-6 mr-2 transform group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {t('securityCompliance.ctaButton2')}
              </span>
            </button>
          </div>

          {/* Small Print */}
          <p className="text-gray-500 text-sm mt-8">
            {t('securityCompliance.ctaCertifications')}
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

export default SecurityCompliance;
