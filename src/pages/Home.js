import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import UserAvatar from '../components/UserAvatar';
import LanguageSelector from '../components/LanguageSelector';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';

// Animated Counter Component
const AnimatedCounter = ({ start = 0, end, duration = 5000, suffix = "", prefix = "" }) => {
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
    <span ref={counterRef} className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg">
      {prefix}{count}{suffix}
    </span>
  );
};

const Home = () => {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 dark:from-gray-900 dark:via-gray-800 dark:to-black">
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
                    className="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors flex items-center relative"
                  >
                    {t('nav.home')}
                    <svg className={`w-4 h-4 ml-1 transform ${homeOpen ? 'rotate-180' : ''} transition-transform`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-400 transform scale-x-100 transition-transform"></span>
                  </button>
                  
                  {/* Home Dropdown Menu */}
                    <div className={`absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 ${homeOpen ? 'opacity-100 visible' : 'opacity-0 invisible'} transition-all duration-200 z-50`}>
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
                    <svg className={`w-4 h-4 ml-1 transform ${servicesOpen ? 'rotate-180' : ''} transition-transform`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-400 transform scale-x-0 transition-transform group-hover:scale-x-100"></span>
                  </button>
                  
                  {/* Services Dropdown Menu */}
                  <div className={`absolute left-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 ${servicesOpen ? 'opacity-100 visible' : 'opacity-0 invisible'} transition-all duration-200 z-50`}>
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
                <Link to="/blog" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors relative group">
                  {t('nav.blog')}
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-400 transform scale-x-0 transition-transform group-hover:scale-x-100"></span>
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

      {/* Hero Section */}
      <section className="pt-24 pb-16 relative overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="https://cdn.pixabay.com/video/2022/12/06/142634-777875514_large.mp4" type="video/mp4" />
            <source src="https://cdn.pixabay.com/video/2019/08/26/26174-355913958_large.mp4" type="video/mp4" />
          </video>
        </div>
        
        {/* Video Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-blue-900/70 to-indigo-900/80"></div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-cyan-400/15 rounded-full filter blur-xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/15 rounded-full filter blur-2xl animate-pulse animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500/15 rounded-full filter blur-xl animate-pulse animation-delay-4000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-2xl">
              {t('home.heroTitle1')}
              <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent drop-shadow-lg">
                {t('home.heroTitle2')}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
              {t('home.heroSubtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#contact" 
                className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all transform hover:scale-105 shadow-2xl hover:shadow-2xl backdrop-blur-sm"
              >
                {t('home.getStartedFree')}
              </a>
              <a 
                href="#services" 
                className="border-2 border-white/40 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white/20 transition-all backdrop-blur-md shadow-xl hover:shadow-2xl"
              >
                {t('home.ourServices')}
              </a>
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20 hover:bg-white/15 hover:scale-105 transition-all duration-300">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg">
                <AnimatedCounter end={500} suffix="+" duration={5000} />
              </div>
              <div className="text-blue-200 text-sm md:text-base drop-shadow">{t('home.clientsProtected')}</div>
            </div>
            <div className="text-center bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20 hover:bg-white/15 hover:scale-105 transition-all duration-300">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg">
                <AnimatedCounter start={50.7} end={99.9} suffix="%" duration={4000} />
              </div>
              <div className="text-blue-200 text-sm md:text-base drop-shadow">{t('home.uptimeGuarantee')}</div>
            </div>
            <div className="text-center bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20 hover:bg-white/15 hover:scale-105 transition-all duration-300">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg">24/7</div>
              <div className="text-blue-200 text-sm md:text-base drop-shadow">{t('home.supportAvailable')}</div>
            </div>
            <div className="text-center bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20 hover:bg-white/15 hover:scale-105 transition-all duration-300">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg">ISO</div>
              <div className="text-blue-200 text-sm md:text-base drop-shadow">{t('home.isoCertified')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t('home.servicesTitle')}
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              {t('home.servicesSubtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* IT Services */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{t('home.itServicesTitle')}</h3>
              <p className="text-blue-100 mb-6 leading-relaxed">
                {t('home.itServicesDesc')}
              </p>
              <ul className="space-y-2 text-blue-200">
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {t('home.networkManagement')}
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {t('home.helpDeskSupport')}
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {t('home.systemMonitoring')}
                </li>
              </ul>
            </div>

            {/* Cloud Services */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{t('home.cloudSolutionsTitle')}</h3>
              <p className="text-blue-100 mb-6 leading-relaxed">
                {t('home.cloudSolutionsDesc')}
              </p>
              <ul className="space-y-2 text-blue-200">
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-blue-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {t('home.awsAzureMigration')}
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-blue-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {t('home.backupSolutions')}
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-blue-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {t('home.costOptimization')}
                </li>
              </ul>
            </div>

            {/* Cybersecurity */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-r from-red-400 to-pink-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{t('home.cybersecurityTitle')}</h3>
              <p className="text-blue-100 mb-6 leading-relaxed">
                {t('home.cybersecurityDesc')}
              </p>
              <ul className="space-y-2 text-blue-200">
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {t('home.threatDetection')}
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {t('home.securityAudits')}
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {t('home.complianceSupport')}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Why Choose Us */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('home.whyChooseTitle')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t('home.whyChooseSubtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{t('home.lightningFastTitle')}</h3>
              <p className="text-gray-600 dark:text-gray-300">{t('home.lightningFastDesc')}</p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{t('home.provenExpertiseTitle')}</h3>
              <p className="text-gray-600 dark:text-gray-300">{t('home.provenExpertiseDesc')}</p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{t('home.bankLevelSecurityTitle')}</h3>
              <p className="text-gray-600 dark:text-gray-300">{t('home.bankLevelSecurityDesc')}</p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-600 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{t('home.scalableSolutionsTitle')}</h3>
              <p className="text-gray-600 dark:text-gray-300">{t('home.scalableSolutionsDesc')}</p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{t('home.support247Title')}</h3>
              <p className="text-gray-600 dark:text-gray-300">{t('home.support247Desc')}</p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-teal-600 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{t('home.costEffectiveTitle')}</h3>
              <p className="text-gray-600 dark:text-gray-300">{t('home.costEffectiveDesc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Client Testimonials */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('home.testimonialsTitle')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {t('home.testimonialsSubtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-700 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6 italic">
                "{t('home.testimonial1')}"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  JD
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-gray-900 dark:text-white">{t('home.testimonial1Name')}</h4>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">{t('home.testimonial1Title')}</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-700 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6 italic">
                "{t('home.testimonial2')}"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  SM
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-gray-900 dark:text-white">{t('home.testimonial2Name')}</h4>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">{t('home.testimonial2Title')}</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-700 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6 italic">
                "{t('home.testimonial3')}"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  MR
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-gray-900 dark:text-white">{t('home.testimonial3Name')}</h4>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">{t('home.testimonial3Title')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Technology Partners */}
      <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-gradient-to-r from-blue-100/30 to-cyan-100/30 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-gradient-to-r from-purple-100/30 to-pink-100/30 dark:from-purple-900/20 dark:to-pink-900/20 rounded-full filter blur-3xl animate-pulse animation-delay-2000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            {/* Modern Badge */}
            <div className="inline-flex items-center px-6 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl mb-8 shadow-lg border border-white/20 dark:border-gray-700/20">
              <div className="w-2 h-2 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full mr-3 animate-pulse"></div>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600 text-sm font-semibold tracking-wide">
                {t('home.partnersBadge')}
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white mb-6 tracking-tight">
              {t('home.technologyText')}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500">
                {t('home.partnersTitle')}
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {t('home.partnersSubtitle')}
            </p>
          </div>

          {/* Modern Partner Logos Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-16">
            {/* AWS */}
            <div className="group relative">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 dark:border-gray-700/20 hover:shadow-2xl hover:scale-105 transition-all duration-500 hover:bg-white/90 dark:hover:bg-gray-700/90">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto transform group-hover:rotate-3 transition-transform duration-300">
                  <svg className="w-10 h-10" viewBox="0 0 24 24" fill="white">
                    <path d="M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.048.16-.152.24l-.503.335c-.072.048-.144.072-.208.072-.08 0-.16-.04-.239-.112-.112-.12-.207-.248-.279-.384-.08-.135-.159-.287-.256-.455-.64.756-1.448 1.135-2.416 1.135-.687 0-1.239-.2-1.639-.586-.4-.39-.607-.92-.607-1.59 0-.711.255-1.286.776-1.735.52-.448 1.215-.672 2.088-.672.287 0 .583.024.895.064.32.04.647.104.991.176V6.68c0-.672-.144-1.144-.423-1.422-.287-.279-.775-.423-1.471-.423-.319 0-.647.04-.983.127-.336.088-.664.2-.968.336-.144.064-.248.104-.312.128-.063.024-.112.04-.135.04-.12 0-.183-.088-.183-.264v-.415c0-.136.016-.24.056-.312.04-.071.112-.136.231-.2.32-.168.704-.304 1.144-.424.44-.112.912-.168 1.415-.168 1.08 0 1.871.247 2.384.74.504.494.759 1.24.759 2.232v2.936zm-3.332 1.247c.279 0 .568-.048.879-.143.312-.096.591-.28.815-.536.136-.16.231-.336.288-.535.056-.2.088-.432.088-.696V9.47c-.224-.056-.463-.104-.727-.136-.263-.032-.527-.048-.791-.048-.567 0-.984.112-1.256.336-.271.224-.407.543-.407.967 0 .4.103.703.319.911.208.216.519.32.951.32zm6.318.815c-.152 0-.256-.024-.312-.08-.064-.048-.12-.16-.176-.311L7.678 4.463c-.056-.16-.08-.263-.08-.32 0-.128.064-.2.192-.2h.783c.16 0 .264.024.32.08.064.048.112.16.168.311l1.448 5.703 1.344-5.703c.048-.16.104-.263.16-.311.064-.048.176-.08.328-.08h.64c.16 0 .264.024.328.08.064.048.12.16.168.311l1.36 5.767 1.496-5.767c.056-.16.112-.263.176-.311.064-.048.168-.08.32-.08h.743c.128 0 .2.064.2.2 0 .08-.016.16-.032.239-.016.08-.048.168-.088.28l-2.096 7.247c-.056.16-.112.263-.176.311-.064.048-.168.08-.32.08h-.688c-.16 0-.264-.024-.328-.08-.064-.056-.12-.16-.168-.311l-1.336-5.551-1.328 5.543c-.048.16-.104.263-.168.311-.064.048-.176.08-.328.08h-.688zm10.358.215c-.416 0-.831-.048-1.231-.143-.4-.096-.711-.2-.911-.32-.128-.08-.215-.168-.247-.24-.032-.072-.048-.151-.048-.223v-.431c0-.176.064-.264.184-.264.063 0 .127.016.191.04.064.024.16.064.28.112.367.16.759.279 1.168.36.416.08.823.12 1.231.12.655 0 1.167-.12 1.528-.36.36-.239.543-.583.543-1.024 0-.304-.096-.56-.279-.768-.191-.207-.551-.391-1.071-.551l-1.535-.479c-.775-.248-1.352-.615-1.711-1.088-.36-.472-.543-1.008-.543-1.599 0-.455.096-.863.279-1.215.192-.351.448-.655.775-.903.328-.247.704-.44 1.12-.567.423-.127.863-.191 1.328-.191.183 0 .375.008.56.032.191.024.375.056.551.088.175.04.343.08.503.127.159.048.295.096.407.144.12.064.207.127.263.191.056.056.096.135.096.231v.4c0 .176-.064.264-.184.264-.072 0-.207-.048-.391-.112-.559-.255-1.191-.383-1.895-.383-.607 0-1.087.104-1.423.32-.336.215-.511.535-.511.967 0 .303.104.56.304.767.2.208.575.416 1.12.608l1.503.479c.767.247 1.328.591 1.671 1.04.344.448.512.96.512 1.536 0 .464-.096.888-.287 1.255-.192.368-.456.688-.791.959-.336.272-.744.48-1.224.624-.481.143-1.001.215-1.561.215z"/>
                  </svg>
                </div>
                <div className="w-full h-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <p className="text-center mt-4 text-sm font-semibold text-gray-700 dark:text-gray-300">{t('home.partnerAWS')}</p>
              </div>
            </div>

            {/* Azure */}
            <div className="group relative">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 dark:border-gray-700/20 hover:shadow-2xl hover:scale-105 transition-all duration-500 hover:bg-white/90 dark:hover:bg-gray-700/90">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto transform group-hover:rotate-3 transition-transform duration-300">
                  <svg className="w-10 h-10" viewBox="0 0 24 24" fill="white">
                    <path d="M5.483 17.823L8.866 7.78h3.144l3.383 10.043h-2.852l-.645-2.133H8.98l-.645 2.133H5.483zm4.064-4.271h2.117l-1.058-3.49-1.059 3.49zm9.305-4.719l-2.438 6.122-2.438-6.122h-1.411v9.99h2.304v-6.396l2.133 6.396h1.823l2.133-6.396v6.396h2.304v-9.99h-4.41z"/>
                  </svg>
                </div>
                <div className="w-full h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <p className="text-center mt-4 text-sm font-semibold text-gray-700 dark:text-gray-300">{t('home.partnerAzure')}</p>
              </div>
            </div>

            {/* Google Cloud */}
            <div className="group relative">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 dark:border-gray-700/20 hover:shadow-2xl hover:scale-105 transition-all duration-500 hover:bg-white/90 dark:hover:bg-gray-700/90">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto transform group-hover:rotate-3 transition-transform duration-300">
                  <svg className="w-10 h-10" viewBox="0 0 24 24" fill="white">
                    <path d="M12.19 2.38a9.344 9.344 0 0 1 9.451 9.451c0 5.188-4.211 9.399-9.399 9.399a9.344 9.344 0 0 1-9.451-9.451c0-5.188 4.211-9.399 9.399-9.399m.606 13.543v-4.685h5.188c.14.729.211 1.473.211 2.232 0 3.162-1.711 5.922-4.248 7.42l-1.151-4.967m6.882-6.882l-3.515 3.515h-4.362l1.117-1.117c1.15-1.151 2.768-1.865 4.547-1.865.406 0 .814.044 1.213.13m-7.934 0c.39-.086.798-.13 1.213-.13 1.779 0 3.397.714 4.547 1.865l1.117 1.117h-4.362L11.744 9.04m-6.882 6.882c-.086-.399-.13-.807-.13-1.213 0-1.779.714-3.397 1.865-4.547l1.117-1.117v4.362L4.862 15.922z"/>
                  </svg>
                </div>
                <div className="w-full h-1 bg-gradient-to-r from-green-500 to-green-600 rounded-full mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <p className="text-center mt-4 text-sm font-semibold text-gray-700 dark:text-gray-300">{t('home.partnerGoogleCloud')}</p>
              </div>
            </div>

            {/* VMware */}
            <div className="group relative">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 dark:border-gray-700/20 hover:shadow-2xl hover:scale-105 transition-all duration-500 hover:bg-white/90 dark:hover:bg-gray-700/90">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl flex items-center justify-center mx-auto transform group-hover:rotate-3 transition-transform duration-300">
                  <svg className="w-10 h-10" viewBox="0 0 24 24" fill="white">
                    <path d="M11.994 0C5.373 0 0 5.373 0 12s5.373 12 11.994 12C18.63 24 24 18.627 24 12S18.63 0 11.994 0zm6.427 15.538c-.48.995-1.48 1.693-2.675 1.693-1.627 0-2.945-1.318-2.945-2.945 0-.265.035-.523.1-.768l-3.428-1.697c-.48.995-1.48 1.693-2.675 1.693-1.627 0-2.945-1.318-2.945-2.945s1.318-2.945 2.945-2.945c1.195 0 2.195.698 2.675 1.693l3.428-1.697c-.065-.245-.1-.503-.1-.768 0-1.627 1.318-2.945 2.945-2.945 1.627 0 2.945 1.318 2.945 2.945 0 .265-.035.523-.1.768l1.75.866c.167-.066.345-.101.531-.101.873 0 1.58.707 1.58 1.58s-.707 1.58-1.58 1.58c-.873 0-1.58-.707-1.58-1.58 0-.186.035-.363.1-.53l-1.75-.866c-.48.995-1.48 1.693-2.675 1.693-.186 0-.366-.02-.54-.057l-1.427 2.882c.827.48 1.385 1.377 1.385 2.407 0 .035-.002.069-.003.103l2.083.206c.21-1.042 1.133-1.827 2.238-1.827 1.267 0 2.293 1.027 2.293 2.293s-1.026 2.293-2.293 2.293z"/>
                  </svg>
                </div>
                <div className="w-full h-1 bg-gradient-to-r from-gray-700 to-gray-800 rounded-full mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <p className="text-center mt-4 text-sm font-semibold text-gray-700 dark:text-gray-300">{t('home.partnerVMware')}</p>
              </div>
            </div>

            {/* Oracle */}
            <div className="group relative">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 dark:border-gray-700/20 hover:shadow-2xl hover:scale-105 transition-all duration-500 hover:bg-white/90 dark:hover:bg-gray-700/90">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto transform group-hover:rotate-3 transition-transform duration-300">
                  <svg className="w-10 h-10" viewBox="0 0 24 24" fill="white">
                    <path d="M16.412 4.412h-8.824A7.588 7.588 0 0 0 0 12a7.588 7.588 0 0 0 7.588 7.588h8.824A7.588 7.588 0 0 0 24 12a7.588 7.588 0 0 0-7.588-7.588zm0 11.647h-8.824a4.059 4.059 0 1 1 0-8.118h8.824a4.059 4.059 0 1 1 0 8.118z"/>
                  </svg>
                </div>
                <div className="w-full h-1 bg-gradient-to-r from-red-500 to-red-600 rounded-full mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <p className="text-center mt-4 text-sm font-semibold text-gray-700 dark:text-gray-300">{t('home.partnerOracle')}</p>
              </div>
            </div>

            {/* Cisco */}
            <div className="group relative">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 dark:border-gray-700/20 hover:shadow-2xl hover:scale-105 transition-all duration-500 hover:bg-white/90 dark:hover:bg-gray-700/90">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mx-auto transform group-hover:rotate-3 transition-transform duration-300">
                  <svg className="w-10 h-10" viewBox="0 0 24 24" fill="white">
                    <path d="M1.803 12L0 8.755 1.27 6h1.541L4.08 8.755zm3.75 0L3.75 8.755 5.02 6h1.541l1.271 2.755zm3.746 0L7.496 8.755 8.766 6h1.541l1.271 2.755zm3.75 0l-1.803-3.245L12.516 6h1.541l1.271 2.755zm3.75 0l-1.803-3.245L15.266 6h1.541l1.271 2.755zM21.562 12L19.76 8.755 21.03 6h1.541L24 8.755zM1.803 15.245l1.803 3.255H5.02l-1.27-2.754zm3.75 0l1.803 3.255h1.414L7.496 15.245zm3.746 0l1.803 3.255h1.414L11.242 15.245zm3.75 0l1.803 3.255h1.414l-1.274-2.754zm3.75 0l1.803 3.255h1.414l-1.274-2.754zm3.763 0l1.803 3.255H24l-1.27-2.754z"/>
                  </svg>
                </div>
                <div className="w-full h-1 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <p className="text-center mt-4 text-sm font-semibold text-gray-700 dark:text-gray-300">{t('home.partnerCisco')}</p>
              </div>
            </div>
          </div>

          {/* Partnership Benefits */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group text-center">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl flex items-center justify-center mx-auto shadow-xl group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <div className="absolute -inset-2 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur"></div>
              </div>
              <h3 className="text-xl font-black text-gray-900 dark:text-white mb-3">{t('home.certifiedExcellenceTitle')}</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{t('home.certifiedExcellenceDesc')}</p>
            </div>

            <div className="group text-center">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-3xl flex items-center justify-center mx-auto shadow-xl group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="absolute -inset-2 bg-gradient-to-r from-emerald-400/20 to-blue-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur"></div>
              </div>
              <h3 className="text-xl font-black text-gray-900 dark:text-white mb-3">{t('home.expertTeamTitle')}</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{t('home.expertTeamDesc')}</p>
            </div>

            <div className="group text-center">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-500 rounded-3xl flex items-center justify-center mx-auto shadow-xl group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="absolute -inset-2 bg-gradient-to-r from-purple-400/20 to-pink-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur"></div>
              </div>
              <h3 className="text-xl font-black text-gray-900 dark:text-white mb-3">{t('home.rapidDeploymentTitle')}</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{t('home.rapidDeploymentDesc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-20 bg-gradient-to-r from-cyan-600 to-blue-700 dark:from-blue-900 dark:to-indigo-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t('home.ctaTitle')}
          </h2>
          <p className="text-xl text-blue-100 dark:text-gray-300 mb-8">
            {t('home.ctaSubtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/signup" 
              className="bg-white dark:bg-gray-700 text-blue-600 dark:text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-50 dark:hover:bg-gray-600 transition-all transform hover:scale-105 shadow-lg"
            >
              {t('home.startFreeTrial')}
            </Link>
            <a 
              href="tel:+1-555-CYBER-TECH" 
              className="border-2 border-white text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white/10 transition-all"
            >
              {t('home.callUs')}
            </a>
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

export default Home;
