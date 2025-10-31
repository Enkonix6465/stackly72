import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import UserAvatar from '../components/UserAvatar';
import { useTheme } from '../context/ThemeContext';
import LanguageSelector from '../../src/components/LanguageSelector';

import { getTranslation } from "../translations/translations";
import { useLanguage } from "../context/LanguageContext";

// Animated Counter Component
const AnimatedCounter = ({ start = 0, end, duration = 2000, suffix = "", prefix = "" }) => {
  const [count, setCount] = useState(start);
  const counterRef = useRef(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    let animationFrameId = null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true;
          
          let startTime;

          const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
            const range = end - start;
            const currentCount = Math.floor(start + (easeOutCubic * range));
            
            setCount(currentCount);

            if (progress < 1) {
              animationFrameId = requestAnimationFrame(animate);
            } else {
              setCount(end);
            }
          };

          animationFrameId = requestAnimationFrame(animate);
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
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [start, end, duration]);

  return (
    <span ref={counterRef}>
      {prefix}{count}{suffix}
    </span>
  );
};

const Contact = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { language } = useLanguage();
    const t = (key) => getTranslation(language, key);

  // Dropdown states
  const [servicesOpen, setServicesOpen] = useState(false);
  const [homeOpen, setHomeOpen] = useState(false);
  const servicesRef = useRef(null);
  const homeRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: '',
    message: ''
  });

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

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    // Add your form submission logic here
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
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
                    className="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors flex items-center"
                  >
                    {t('nav.services')}
                    <svg className={`w-4 h-4 ml-1 transform ${servicesOpen ? 'rotate-180' : ''} transition-transform`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  <div className={`absolute left-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 ${servicesOpen ? 'opacity-100 visible' : 'opacity-0 invisible'} transition-all duration-200 z-50`}>
                    <div className="py-2">
                      <Link to="/services/it-infrastructure" className="flex items-center px-4 py-2 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                          </svg>
                        </div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{t('services.itInfrastructure')}</span>
                      </Link>

                      <Link to="/services/cloud-migration" className="flex items-center px-4 py-2 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors">
                        <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                          </svg>
                        </div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{t('services.cloudMigration')}</span>
                      </Link>

                      <Link to="/services/security-compliance" className="flex items-center px-4 py-2 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors">
                        <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                        </div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{t('services.security')}</span>
                      </Link>

                      <Link to="/services/managed-it" className="flex items-center px-4 py-2 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors">
                        <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{t('services.managedIT')}</span>
                      </Link>

                      <Link to="/services/tech-consulting" className="flex items-center px-4 py-2 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                        </div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{t('services.consulting')}</span>
                      </Link>

                      <Link to="/services/data-analytics" className="flex items-center px-4 py-2 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors">
                        <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                        </div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{t('services.dataAnalytics')}</span>
                      </Link>
                    </div>
                  </div>
                </div>

                <Link to="/blog" className="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors">{t('nav.blog')}</Link>
                <Link to="/contact" className="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors border-b-2 border-blue-600">{t('nav.contact')}</Link>
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
                <Link 
                  to="/login" 
                  className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-6 py-2 rounded-lg text-sm font-semibold transition-all transform hover:scale-105 shadow-sm"
                >
                  {t('nav.signIn')}
                </Link>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button className="text-gray-900 hover:text-blue-600 p-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Section 1: Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="https://cdn.pixabay.com/video/2019/08/26/26174-355913958_large.mp4" type="video/mp4" />
            <source src="https://cdn.pixabay.com/video/2022/12/06/142634-777875514_large.mp4" type="video/mp4" />
          </video>
        </div>
        
        {/* Video Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/70 via-blue-900/60 to-indigo-900/70"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Modern Badge */}
            <div className="inline-flex items-center px-6 py-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl mb-8 shadow-lg border border-white/30 dark:border-gray-700/30">
              <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mr-3 animate-pulse"></div>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 text-sm font-semibold tracking-wide">
                {t('contact.heroBadge')}
              </span>
            </div>
            
            {/* Modern Typography */}
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-white mb-8 tracking-tight drop-shadow-2xl">
              <span className="block">{t('contact.heroTitle1')}</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400">
                {t('contact.heroTitle2')}
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-100 dark:text-gray-200 max-w-4xl mx-auto mb-16 leading-relaxed font-light drop-shadow-lg">
              {t('contact.heroSubtitle')}
            </p>
            
            {/* Contact Stats */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-4xl mx-auto">
              <div className="group bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-3xl px-8 py-6 shadow-2xl border border-white/30 dark:border-gray-700/30 hover:shadow-2xl hover:scale-105 transition-all duration-300">
                <div className="text-3xl font-black bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent mb-2">{t('contact.support247')}</div>
                <div className="text-gray-700 dark:text-gray-300 text-sm font-medium tracking-wide">{t('contact.supportAvailable')}</div>
                <div className="w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500 dark:from-blue-400 dark:to-cyan-400 rounded-full mt-3 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <div className="group bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-3xl px-8 py-6 shadow-2xl border border-white/30 dark:border-gray-700/30 hover:shadow-2xl hover:scale-105 transition-all duration-300">
                <div className="text-3xl font-black bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent mb-2">
                  <AnimatedCounter end={500} suffix="+" duration={3000} />
                </div>
                <div className="text-gray-700 dark:text-gray-300 text-sm font-medium tracking-wide">{t('contact.clientsServed')}</div>
                <div className="w-full h-1 bg-gradient-to-r from-emerald-500 to-teal-500 dark:from-emerald-400 dark:to-teal-400 rounded-full mt-3 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <div className="group bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-3xl px-8 py-6 shadow-2xl border border-white/30 dark:border-gray-700/30 hover:shadow-2xl hover:scale-105 transition-all duration-300">
                <div className="text-3xl font-black bg-gradient-to-r from-purple-600 to-pink-500 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-2">{t('contact.responseTime')}</div>
                <div className="text-gray-700 dark:text-gray-300 text-sm font-medium tracking-wide">{t('contact.responseTimeLabel')}</div>
                <div className="w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-400 dark:to-pink-400 rounded-full mt-3 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Contact Form & Information */}
      <section className="py-24 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="contact-grid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                <circle cx="30" cy="30" r="2" fill="#3b82f6"/>
                <path d="M30 30 L50 30 M30 30 L30 50" stroke="#3b82f6" strokeWidth="0.5" opacity="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#contact-grid)"/>
          </svg>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 dark:from-blue-600/20 dark:to-cyan-600/20 rounded-full blur-xl animate-bounce"></div>
          <div className="absolute bottom-40 right-20 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-400/20 dark:from-purple-600/20 dark:to-pink-600/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 dark:from-emerald-600/20 dark:to-teal-600/20 rounded-full blur-xl animate-pulse animation-delay-1000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="group bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/40 dark:border-gray-700/40 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="mb-8">
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full mb-4">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 text-xs font-bold tracking-wider">{t('contact.formBadge')}</span>
                </div>
                <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4">{t('contact.formTitle')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">{t('contact.formTitleHighlight')}</span></h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">{t('contact.formSubtitle')}</p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="group/input">
                    <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">{t('contact.fullName')}</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-blue-300 dark:hover:border-blue-500 bg-white/80 dark:bg-gray-700/80 dark:text-white"
                      placeholder={t('contact.fullNamePlaceholder')}
                      required
                    />
                  </div>
                  <div className="group/input">
                    <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">{t('contact.emailAddress')}</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-blue-300 dark:hover:border-blue-500 bg-white/80 dark:bg-gray-700/80 dark:text-white"
                      placeholder={t('contact.emailPlaceholder')}
                      required
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="group/input">
                    <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">{t('contact.company')}</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-blue-300 dark:hover:border-blue-500 bg-white/80 dark:bg-gray-700/80 dark:text-white"
                      placeholder={t('contact.companyPlaceholder')}
                    />
                  </div>
                  <div className="group/input">
                    <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">{t('contact.phoneNumber')}</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-blue-300 dark:hover:border-blue-500 bg-white/80 dark:bg-gray-700/80 dark:text-white"
                      placeholder={t('contact.phonePlaceholder')}
                    />
                  </div>
                </div>
                
                <div className="group/input">
                  <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">{t('contact.serviceInterest')}</label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-blue-300 dark:hover:border-blue-500 bg-white/80 dark:bg-gray-700/80 dark:text-white cursor-pointer"
                  >
                    <option value="">{t('contact.selectService')}</option>
                    <option value="it-infrastructure">{t('contact.itInfrastructure')}</option>
                    <option value="cloud-migration">{t('contact.cloudMigration')}</option>
                    <option value="cybersecurity">{t('contact.cybersecurity')}</option>
                    <option value="managed-it">{t('contact.managedIT')}</option>
                    <option value="consulting">{t('contact.consulting')}</option>
                    <option value="other">{t('contact.other')}</option>
                  </select>
                </div>
                
                <div className="group/input">
                  <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">{t('contact.message')}</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none hover:border-blue-300 dark:hover:border-blue-500 bg-white/80 dark:bg-gray-700/80 dark:text-white"
                    placeholder={t('contact.messagePlaceholder')}
                    required
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="group/btn relative w-full bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 text-white py-4 rounded-2xl font-black text-lg overflow-hidden transition-all transform hover:scale-105 shadow-xl hover:shadow-2xl"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    {t('contact.sendMessage')}
                    <svg className="w-5 h-5 ml-2 transform group-hover/btn:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
                </button>
              </form>
            </div>
            
            {/* Contact Information */}
            <div className="space-y-8">
              <div className="group bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-3xl p-8 border border-blue-100 dark:border-blue-800/30 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 dark:from-blue-600/20 dark:to-cyan-600/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{t('contact.visitOffice')}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed" style={{ whiteSpace: 'pre-line' }}>{t('contact.officeAddress')}</p>
                  <p className="text-sm text-blue-600 dark:text-blue-400 font-bold">{t('contact.officeHours')}</p>
                </div>
              </div>
              
              <div className="group bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-3xl p-8 border border-emerald-100 dark:border-emerald-800/30 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 dark:from-emerald-600/20 dark:to-teal-600/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-600 to-teal-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{t('contact.callUs')}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-2 leading-relaxed">
                    <span className="font-bold">{t('contact.salesPhone')}</span> +1 (555) 123-4567
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-2 leading-relaxed">
                    <span className="font-bold">{t('contact.supportPhone')}</span> +1 (555) 123-4568
                  </p>
                  <p className="text-sm text-emerald-600 dark:text-emerald-400 font-bold">{t('contact.emergency247')}</p>
                </div>
              </div>
              
              <div className="group bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-3xl p-8 border border-purple-100 dark:border-purple-800/30 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-400/20 dark:from-purple-600/20 dark:to-pink-600/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">{t('contact.emailUs')}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-2 leading-relaxed">
                    <span className="font-bold">{t('contact.generalEmail')}</span> info@cybertech.com
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-2 leading-relaxed">
                    <span className="font-bold">{t('contact.salesEmail')}</span> sales@cybertech.com
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    <span className="font-bold">{t('contact.supportEmail')}</span> support@cybertech.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Our Locations */}
      <section className="py-24 bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-6 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl mb-8 shadow-lg border border-white/20 dark:border-gray-700/20">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 text-sm font-bold tracking-wider">{t('contact.locationsBadge')}</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-6 tracking-tight">
              {t('contact.locationsTitle')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">{t('contact.locationsTitleHighlight')}</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-light">
              {t('contact.locationsSubtitle')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* San Francisco HQ */}
            <div className="group bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 border border-white/20 dark:border-gray-700/20">
              {/* Google Maps Embed */}
              <div className="relative w-full h-64 overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0867736434886!2d-122.41941968468186!3d37.77492977975903!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c6c8f4459%3A0xb10ed6d9b5050fa5!2sTwitter%20HQ!5e0!3m2!1sen!2sus!4v1635174000000!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  className="grayscale group-hover:grayscale-0 transition-all duration-500"
                  title="San Francisco Office Location"
                ></iframe>
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              
              <div className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m11 0v-5.5a2 2 0 00-2-2h-1M4 21h2m0 0h4v-7a1 1 0 011-1h2a1 1 0 011 1v7m-8 0V11a1 1 0 011-1h2a1 1 0 011 1v10" />
                    </svg>
                  </div>
                  <span className="bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-xs font-bold">{t('contact.headquarters')}</span>
                </div>
                <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{t('contact.sanFrancisco')}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed" style={{ whiteSpace: 'pre-line' }}>
                  {t('contact.sfAddress')}
                </p>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-500 dark:text-gray-400">
                    <span className="font-bold">{t('contact.salesPhone')}</span> +1 921234567
                  </p>
                  <p className="text-gray-500 dark:text-gray-400">
                    <span className="font-bold">{t('contact.generalEmail')}</span> sf@enkonix.in
                  </p>
                </div>
              </div>
            </div>
            
            {/* New York Office */}
            <div className="group bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 border border-white/20 dark:border-gray-700/20">
              {/* Google Maps Embed */}
              <div className="relative w-full h-64 overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.6173690259845!2d-73.98784368459394!3d40.74844097932847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1635174100000!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  className="grayscale group-hover:grayscale-0 transition-all duration-500"
                  title="New York Office Location"
                ></iframe>
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              
              <div className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-600 via-green-700 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m11 0v-5.5a2 2 0 00-2-2h-1M4 21h2m0 0h4v-7a1 1 0 011-1h2a1 1 0 011 1v7m-8 0V11a1 1 0 011-1h2a1 1 0 011 1v10" />
                    </svg>
                  </div>
                  <span className="bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 text-emerald-700 dark:text-emerald-300 px-3 py-1 rounded-full text-xs font-bold">{t('contact.regionalOffice')}</span>
                </div>
                <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-4 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{t('contact.newYork')}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed" style={{ whiteSpace: 'pre-line' }}>
                  {t('contact.nyAddress')}
                </p>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-500 dark:text-gray-400">
                    <span className="font-bold">{t('contact.salesPhone')}</span> +1 (212) 555-0456
                  </p>
                  <p className="text-gray-500 dark:text-gray-400">
                    <span className="font-bold">{t('contact.generalEmail')}</span> ny@cybertech.com
                  </p>
                </div>
              </div>
            </div>
            
            {/* London Office */}
            <div className="group bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 border border-white/20 dark:border-gray-700/20">
              {/* Google Maps Embed */}
              <div className="relative w-full h-64 overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.5281102078705!2d-0.12765708422872767!3d51.50735187963548!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604b900d26973%3A0x4291f3172409ea92!2slastminute.com%20London%20Eye!5e0!3m2!1sen!2sus!4v1635174200000!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  className="grayscale group-hover:grayscale-0 transition-all duration-500"
                  title="London Office Location"
                ></iframe>
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              
              <div className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m11 0v-5.5a2 2 0 00-2-2h-1M4 21h2m0 0h4v-7a1 1 0 011-1h2a1 1 0 011 1v7m-8 0V11a1 1 0 011-1h2a1 1 0 011 1v10" />
                    </svg>
                  </div>
                  <span className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-full text-xs font-bold">{t('contact.international')}</span>
                </div>
                <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-4 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">{t('contact.london')}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed" style={{ whiteSpace: 'pre-line' }}>
                  {t('contact.londonAddress')}
                </p>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-500 dark:text-gray-400">
                    <span className="font-bold">{t('contact.salesPhone')}</span> +44 20 7123 4567
                  </p>
                  <p className="text-gray-500 dark:text-gray-400">
                    <span className="font-bold">{t('contact.generalEmail')}</span> london@cybertech.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: FAQ */}
      <section className="py-24 bg-white dark:bg-gray-900 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-100/40 to-purple-100/40 dark:from-blue-600/20 dark:to-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-100/40 to-pink-100/40 dark:from-purple-600/20 dark:to-pink-600/20 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl mb-8 shadow-lg">
              <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 text-sm font-bold tracking-wider">{t('contact.faqBadge')}</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-6 tracking-tight">
              {t('contact.faqTitle')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">{t('contact.faqTitleHighlight')}</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-light">
              {t('contact.faqSubtitle')}
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6">
            {[
              {
                questionKey: "faq1Q",
                answerKey: "faq1A",
                gradient: "from-blue-500 to-cyan-500"
              },
              {
                questionKey: "faq2Q",
                answerKey: "faq2A",
                gradient: "from-emerald-500 to-teal-500"
              },
              {
                questionKey: "faq3Q",
                answerKey: "faq3A",
                gradient: "from-purple-500 to-pink-500"
              },
              {
                questionKey: "faq4Q",
                answerKey: "faq4A",
                gradient: "from-orange-500 to-red-500"
              },
              {
                questionKey: "faq5Q",
                answerKey: "faq5A",
                gradient: "from-indigo-500 to-purple-500"
              },
              {
                questionKey: "faq6Q",
                answerKey: "faq6A",
                gradient: "from-pink-500 to-rose-500"
              }
            ].map((faq, index) => (
              <div key={index} className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-2 border-gray-200 dark:border-gray-700 rounded-3xl p-6 hover:shadow-2xl transition-all duration-500 hover:border-transparent hover:-translate-y-1 relative overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-r ${faq.gradient} opacity-0 group-hover:opacity-5 dark:group-hover:opacity-10 transition-opacity duration-500`}></div>
                <details className="cursor-pointer relative">
                  <summary className={`flex items-center justify-between font-black text-lg text-gray-900 dark:text-white transition-all list-none`}>
                    <span className="flex items-center">
                      <span className={`w-10 h-10 rounded-xl bg-gradient-to-r ${faq.gradient} flex items-center justify-center mr-4 text-white font-black text-sm shadow-lg transform group-hover:scale-110 transition-transform`}>
                        {index + 1}
                      </span>
                      {t(`contact.${faq.questionKey}`)}
                    </span>
                    <svg className={`w-6 h-6 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all transform group-hover:rotate-180 flex-shrink-0 ml-4`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <p className="mt-6 text-gray-600 dark:text-gray-300 leading-relaxed pl-14 text-base">{t(`contact.${faq.answerKey}`)}</p>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Support Channels */}
      <section className="py-24 bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-6 tracking-tight">
              {t('contact.supportChannelsTitle')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">{t('contact.supportChannelsTitleHighlight')}</span> Channels
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-light">
              {t('contact.supportChannelsSubtitle')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Live Chat */}
            <div className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 text-center shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 border border-white/20 dark:border-gray-700/20">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-cyan-600 dark:group-hover:from-blue-400 dark:group-hover:to-cyan-400 transition-all">{t('contact.liveChat')}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">{t('contact.liveChatDesc')}</p>
              <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-3 py-1 rounded-full text-sm font-bold inline-block">{t('contact.availableNow')}</div>
            </div>
            
            {/* Email Support */}
            <div className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 text-center shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 border border-white/20 dark:border-gray-700/20">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-emerald-600 group-hover:to-teal-600 dark:group-hover:from-emerald-400 dark:group-hover:to-teal-400 transition-all">{t('contact.emailSupport')}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">{t('contact.emailSupportDesc')}</p>
              <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-bold inline-block">{t('contact.hourResponse')}</div>
            </div>
            
            {/* Phone Support */}
            <div className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 text-center shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 border border-white/20 dark:border-gray-700/20">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 dark:group-hover:from-purple-400 dark:group-hover:to-pink-400 transition-all">{t('contact.phoneSupport')}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">{t('contact.phoneSupportDesc')}</p>
              <div className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-3 py-1 rounded-full text-sm font-bold inline-block">{t('contact.emergency')}</div>
            </div>
            
            {/* Remote Support */}
            <div className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 text-center shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 border border-white/20 dark:border-gray-700/20">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-600 to-red-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-600 group-hover:to-red-600 dark:group-hover:from-orange-400 dark:group-hover:to-red-400 transition-all">{t('contact.remoteSupport')}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">{t('contact.remoteSupportDesc')}</p>
              <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-full text-sm font-bold inline-block">{t('contact.secureAccess')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Call-to-Action */}
      <section className="py-24 bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 text-white relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-600/20"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/30 to-cyan-400/30 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-full filter blur-3xl animate-pulse"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-black mb-8 tracking-tight">
              {t('contact.ctaTitle')} 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300"> {t('contact.ctaTitleHighlight')}</span>
            </h2>
            
            <p className="text-xl md:text-2xl text-blue-100 mb-12 leading-relaxed font-light">
              {t('contact.ctaSubtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <Link 
                to="#"
                className="group bg-white text-blue-900 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-blue-50 transition-all transform hover:scale-105 shadow-2xl flex items-center"
              >
                {t('contact.scheduleFree')}
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              
              <Link 
                to="tel:+15551234567"
                className="group bg-transparent border-2 border-white/30 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/10 hover:border-white/50 transition-all transform hover:scale-105 backdrop-blur-sm flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {t('contact.callNow')}
              </Link>
            </div>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-blue-200">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">{t('contact.freeConsultation')}</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">{t('contact.noContracts')}</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">{t('contact.supportIncluded')}</span>
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

export default Contact;
