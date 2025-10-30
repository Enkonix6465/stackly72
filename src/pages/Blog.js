import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Logo from '../components/Logo';
import UserAvatar from '../components/UserAvatar';
import LanguageSelector from '../components/LanguageSelector';
import { useTheme } from '../context/ThemeContext';

// Animated Counter Component
const AnimatedCounter = ({ end, suffix = '', prefix = '', duration = 2000, start = 0 }) => {
  const [count, setCount] = useState(start);
  const [hasAnimated, setHasAnimated] = useState(false);
  const counterRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            
            const startTime = Date.now();
            const startValue = start;
            const endValue = end;

            const animate = () => {
              const currentTime = Date.now();
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              
              // Cubic easing for smooth animation
              const easeOutCubic = 1 - Math.pow(1 - progress, 3);
              const currentCount = startValue + (endValue - startValue) * easeOutCubic;

              setCount(currentCount);

              if (progress < 1) {
                requestAnimationFrame(animate);
              } else {
                setCount(endValue);
              }
            };

            animate();
          }
        });
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
  }, [end, duration, start, hasAnimated]);

  const displayValue = Math.floor(count);

  return (
    <span ref={counterRef}>
      {prefix}{displayValue}{suffix}
    </span>
  );
};

const Blog = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { t } = useTranslation();

  // Dropdown states
  const [servicesOpen, setServicesOpen] = useState(false);
  const [homeOpen, setHomeOpen] = useState(false);
  const servicesRef = useRef(null);
  const homeRef = useRef(null);

  const [visibleArticles, setVisibleArticles] = useState(3);
  const [allArticles] = useState([
    {
      id: 1,
      titleKey: "article1Title",
      categoryKey: "security",
      categoryColors: "from-blue-600 to-cyan-600",
      borderColor: "border-blue-300",
      textColor: "text-blue-600",
      dateKey: "article1Date",
      excerptKey: "article1Excerpt",
      readTimeKey: "article1ReadTime",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      imageAlt: "Cybersecurity Shield"
    },
    {
      id: 2,
      titleKey: "article2Title",
      categoryKey: "cloud",
      categoryColors: "from-emerald-600 to-teal-600",
      borderColor: "border-emerald-300",
      textColor: "text-emerald-600",
      dateKey: "article2Date",
      excerptKey: "article2Excerpt",
      readTimeKey: "article2ReadTime",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      imageAlt: "Cloud Computing"
    },
    {
      id: 3,
      titleKey: "article3Title",
      categoryKey: "aiml",
      categoryColors: "from-purple-600 to-pink-600",
      borderColor: "border-purple-300",
      textColor: "text-purple-600",
      dateKey: "article3Date",
      excerptKey: "article3Excerpt",
      readTimeKey: "article3ReadTime",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      imageAlt: "AI and Machine Learning"
    },
    {
      id: 4,
      titleKey: "article4Title",
      categoryKey: "cloud",
      categoryColors: "from-emerald-600 to-teal-600",
      borderColor: "border-emerald-300",
      textColor: "text-emerald-600",
      dateKey: "article4Date",
      excerptKey: "article4Excerpt",
      readTimeKey: "article4ReadTime",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      imageAlt: "Microservices Architecture"
    },
    {
      id: 5,
      titleKey: "article5Title",
      categoryKey: "security",
      categoryColors: "from-blue-600 to-cyan-600",
      borderColor: "border-blue-300",
      textColor: "text-blue-600",
      dateKey: "article5Date",
      excerptKey: "article5Excerpt",
      readTimeKey: "article5ReadTime",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      imageAlt: "Zero-Day Security"
    },
    {
      id: 6,
      titleKey: "article6Title",
      categoryKey: "aiml",
      categoryColors: "from-purple-600 to-pink-600",
      borderColor: "border-purple-300",
      textColor: "text-purple-600",
      dateKey: "article6Date",
      excerptKey: "article6Excerpt",
      readTimeKey: "article6ReadTime",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      imageAlt: "Quantum Computing"
    }
  ]);

  const loadMoreArticles = () => {
    setVisibleArticles(prevCount => Math.min(prevCount + 3, allArticles.length));
  };

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
                  
                  <div className={`absolute left-0 mt-2 w-56 max-h-[calc(100vh-120px)] overflow-y-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 ${servicesOpen ? 'opacity-100 visible' : 'opacity-0 invisible'} transition-all duration-200 z-50`}>
                    <div className="py-2">
                      <Link to="/services/it-infrastructure" className="flex items-center px-4 py-2 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                          </svg>
                        </div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{t('home.serviceDropdownTitle.itInfra')}</span>
                      </Link>

                      <Link to="/services/cloud-migration" className="flex items-center px-4 py-2 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors">
                        <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                          </svg>
                        </div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{t('home.serviceDropdownTitle.cloud')}</span>
                      </Link>

                      <Link to="/services/security-compliance" className="flex items-center px-4 py-2 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors">
                        <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                        </div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{t('home.serviceDropdownTitle.security')}</span>
                      </Link>

                      <Link to="/services/managed-it" className="flex items-center px-4 py-2 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors">
                        <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{t('home.serviceDropdownTitle.managed')}</span>
                      </Link>

                      <Link to="/services/tech-consulting" className="flex items-center px-4 py-2 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                        </div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{t('home.serviceDropdownTitle.consulting')}</span>
                      </Link>

                      <Link to="/services/data-analytics" className="flex items-center px-4 py-2 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors">
                        <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                          </svg>
                        </div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{t('home.serviceDropdownTitle.dataAnalytics')}</span>
                      </Link>
                    </div>
                  </div>
                </div>

                <Link to="/blog" className="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors border-b-2 border-blue-600">{t('nav.blog')}</Link>
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
              <button className="text-gray-900 hover:text-blue-600">
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
        {/* Modern Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-cyan-500/5 dark:from-blue-500/10 dark:via-purple-500/10 dark:to-cyan-500/10"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 dark:from-blue-600/20 dark:to-cyan-600/20 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-pink-400/20 dark:from-purple-600/20 dark:to-pink-600/20 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-xl opacity-70 animate-pulse"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Modern Badge */}
            <div className="inline-flex items-center px-6 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl mb-8 shadow-lg border border-white/20 dark:border-gray-700/20">
              <div className="w-2 h-2 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full mr-3 animate-pulse"></div>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 text-sm font-semibold tracking-wide">
                {t('blog.heroBadge')}
              </span>
            </div>
            
            {/* Modern Typography */}
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-gray-900 dark:text-white mb-8 tracking-tight">
              <span className="block">{t('blog.heroTitle1')}</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 dark:from-blue-400 dark:via-purple-400 dark:to-cyan-400">
                {t('blog.heroTitle2')}
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto mb-16 leading-relaxed font-light">
              {t('blog.heroSubtitle')}
            </p>
            
            {/* Modern Stats Cards */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-4xl mx-auto">
              <div className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl px-8 py-6 shadow-xl border border-white/20 dark:border-gray-700/20 hover:shadow-2xl hover:scale-105 transition-all duration-300">
                <div className="text-3xl font-black bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent mb-2">
                  <AnimatedCounter end={150} suffix="+" duration={3000} />
                </div>
                <div className="text-gray-600 dark:text-gray-300 text-sm font-medium tracking-wide">{t('blog.articlesPublished')}</div>
                <div className="w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500 dark:from-blue-400 dark:to-cyan-400 rounded-full mt-3 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <div className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl px-8 py-6 shadow-xl border border-white/20 dark:border-gray-700/20 hover:shadow-2xl hover:scale-105 transition-all duration-300">
                <div className="text-3xl font-black bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent mb-2">
                  <AnimatedCounter end={50} suffix="K+" duration={3000} />
                </div>
                <div className="text-gray-600 dark:text-gray-300 text-sm font-medium tracking-wide">{t('blog.monthlyReaders')}</div>
                <div className="w-full h-1 bg-gradient-to-r from-emerald-500 to-teal-500 dark:from-emerald-400 dark:to-teal-400 rounded-full mt-3 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <div className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl px-8 py-6 shadow-xl border border-white/20 dark:border-gray-700/20 hover:shadow-2xl hover:scale-105 transition-all duration-300">
                <div className="text-3xl font-black bg-gradient-to-r from-purple-600 to-pink-500 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-2">{t('blog.weekly')}</div>
                <div className="text-gray-600 dark:text-gray-300 text-sm font-medium tracking-wide">{t('blog.newContent')}</div>
                <div className="w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-400 dark:to-pink-400 rounded-full mt-3 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Featured Blog Posts */}
      <section className="py-24 bg-white dark:bg-gray-900 relative">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-30 dark:opacity-10" style={{backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(99,102,241,0.15) 1px, transparent 0)', backgroundSize: '20px 20px'}}></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 text-sm font-semibold">{t('blog.featuredBadge')}</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-6 tracking-tight">
              {t('blog.featuredTitle')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">{t('blog.featuredTitleHighlight')}</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-light">
              {t('blog.featuredSubtitle')}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Featured Article */}
            <div className="lg:col-span-2">
              <article className="group relative bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 dark:from-gray-800 dark:via-blue-900/10 dark:to-purple-900/10 rounded-3xl p-8 h-full border border-gray-100 dark:border-gray-700 shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden">
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-2xl text-xs font-bold tracking-wider shadow-lg">
                      {t('blog.featured')}
                    </div>
                    <span className="ml-4 text-gray-500 dark:text-gray-400 text-sm font-medium">{t('blog.featuredMainDate')}</span>
                  </div>
                  
                  <h3 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-6 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 dark:group-hover:from-blue-400 dark:group-hover:to-purple-400 transition-all duration-300">
                    {t('blog.featuredMainTitle')}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 text-lg mb-8 leading-relaxed font-light">
                    {t('blog.featuredMainDesc')}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                        <span className="text-white font-bold text-sm">MC</span>
                      </div>
                      <div>
                        <div className="font-bold text-gray-900 dark:text-white text-lg">{t('blog.featuredMainAuthor')}</div>
                        <div className="text-gray-500 dark:text-gray-400 text-sm font-medium">{t('blog.featuredMainAuthorTitle')}</div>
                      </div>
                    </div>
                    <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl">
                      {t('common.readMore')}
                    </button>
                  </div>
                </div>
              </article>
            </div>

            {/* Sidebar Articles */}
            <div className="space-y-8">
              <article className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-100 dark:border-gray-700 rounded-3xl p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300 hover:bg-gradient-to-br hover:from-emerald-50/50 hover:to-teal-50/50 dark:hover:from-emerald-900/20 dark:hover:to-teal-900/20">
                <div className="flex items-center mb-4">
                  <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-3 py-1 rounded-xl text-xs font-bold tracking-wider shadow-lg">
                    {t('blog.cloud')}
                  </div>
                  <span className="ml-3 text-gray-500 dark:text-gray-400 text-xs font-medium">{t('blog.sidebar1Date')}</span>
                </div>
                <h4 className="text-xl font-black text-gray-900 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-emerald-600 group-hover:to-teal-600 dark:group-hover:from-emerald-400 dark:group-hover:to-teal-400 transition-all">
                  {t('blog.sidebar1Title')}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">
                  {t('blog.sidebar1Desc')}
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 font-bold text-sm">{t('blog.sidebar1ReadTime')}</div>
                  <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </article>

              <article className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-100 dark:border-gray-700 rounded-3xl p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300 hover:bg-gradient-to-br hover:from-red-50/50 hover:to-pink-50/50 dark:hover:from-red-900/20 dark:hover:to-pink-900/20">
                <div className="flex items-center mb-4">
                  <div className="bg-gradient-to-r from-red-600 to-pink-600 text-white px-3 py-1 rounded-xl text-xs font-bold tracking-wider shadow-lg">
                    {t('blog.security')}
                  </div>
                  <span className="ml-3 text-gray-500 dark:text-gray-400 text-xs font-medium">{t('blog.sidebar2Date')}</span>
                </div>
                <h4 className="text-xl font-black text-gray-900 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-red-600 group-hover:to-pink-600 dark:group-hover:from-red-400 dark:group-hover:to-pink-400 transition-all">
                  {t('blog.sidebar2Title')}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">
                  {t('blog.sidebar2Desc')}
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-pink-600 font-bold text-sm">{t('blog.sidebar2ReadTime')}</div>
                  <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </article>

              <article className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-100 dark:border-gray-700 rounded-3xl p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300 hover:bg-gradient-to-br hover:from-purple-50/50 hover:to-indigo-50/50 dark:hover:from-purple-900/20 dark:hover:to-indigo-900/20">
                <div className="flex items-center mb-4">
                  <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-3 py-1 rounded-xl text-xs font-bold tracking-wider shadow-lg">
                    {t('blog.aiml')}
                  </div>
                  <span className="ml-3 text-gray-500 dark:text-gray-400 text-xs font-medium">{t('blog.sidebar3Date')}</span>
                </div>
                <h4 className="text-xl font-black text-gray-900 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-indigo-600 dark:group-hover:from-purple-400 dark:group-hover:to-indigo-400 transition-all">
                  {t('blog.sidebar3Title')}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">
                  {t('blog.sidebar3Desc')}
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 font-bold text-sm">{t('blog.sidebar3ReadTime')}</div>
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Blog Categories (3 Different Types) */}
      <section className="relative py-24 bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
        {/* Modern background elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-40 dark:opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-300/30 to-purple-300/30 dark:from-blue-600/20 dark:to-purple-600/20 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-cyan-300/30 to-teal-300/30 dark:from-cyan-600/20 dark:to-teal-600/20 rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-6 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl mb-8 shadow-lg border border-white/20 dark:border-gray-700/20">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 text-sm font-bold tracking-wider">{t('blog.categoriesBadge')}</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-6 tracking-tight">
              {t('blog.categoriesTitle')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">{t('blog.categoriesTitleHighlight')}</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-light">
              {t('blog.categoriesSubtitle')}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-10">
            {/* Technical Tutorials */}
            <div className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 border border-white/20 dark:border-gray-700/20 overflow-hidden">
              {/* Gradient background on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 rounded-3xl flex items-center justify-center mb-8 shadow-xl group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                
                <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-6 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-cyan-600 dark:group-hover:from-blue-400 dark:group-hover:to-cyan-400 transition-all duration-300">
                  {t('blog.technicalTutorialsTitle')}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg leading-relaxed">
                  {t('blog.technicalTutorialsDesc')}
                </p>
                
                <div className="space-y-6 mb-8">
                  <article className="group/item bg-gradient-to-r from-blue-50/50 to-cyan-50/50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-4 border-l-4 border-blue-500 hover:shadow-lg transition-all">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2 group-hover/item:text-blue-600 dark:group-hover/item:text-blue-400 transition-colors">{t('blog.tutorial1Title')}</h4>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">{t('blog.tutorial1Desc')}</p>
                    <div className="flex items-center text-xs font-medium">
                      <span className="bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-lg">{t('blog.tutorial1ReadTime')}</span>
                      <span className="mx-2 text-gray-300 dark:text-gray-600">•</span>
                      <span className="bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 px-2 py-1 rounded-lg">{t('blog.tutorial1Level')}</span>
                    </div>
                  </article>

                  <article className="group/item bg-gradient-to-r from-blue-50/50 to-cyan-50/50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-4 border-l-4 border-blue-500 hover:shadow-lg transition-all">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2 group-hover/item:text-blue-600 dark:group-hover/item:text-blue-400 transition-colors">{t('blog.tutorial2Title')}</h4>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">{t('blog.tutorial2Desc')}</p>
                    <div className="flex items-center text-xs font-medium">
                      <span className="bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-lg">{t('blog.tutorial2ReadTime')}</span>
                      <span className="mx-2 text-gray-300 dark:text-gray-600">•</span>
                      <span className="bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 px-2 py-1 rounded-lg">{t('blog.tutorial2Level')}</span>
                    </div>
                  </article>

                  <article className="group/item bg-gradient-to-r from-blue-50/50 to-cyan-50/50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-4 border-l-4 border-blue-500 hover:shadow-lg transition-all">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2 group-hover/item:text-blue-600 dark:group-hover/item:text-blue-400 transition-colors">{t('blog.tutorial3Title')}</h4>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">{t('blog.tutorial3Desc')}</p>
                    <div className="flex items-center text-xs font-medium">
                      <span className="bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-lg">{t('blog.tutorial3ReadTime')}</span>
                      <span className="mx-2 text-gray-300 dark:text-gray-600">•</span>
                      <span className="bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300 px-2 py-1 rounded-lg">{t('blog.tutorial3Level')}</span>
                    </div>
                  </article>
                </div>

                <Link to="/blog/technical-tutorials" className="block w-full">
                  <button className="w-full bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 text-white py-4 rounded-2xl font-bold hover:from-blue-700 hover:to-cyan-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl">
                    {t('blog.viewAllTutorials')}
                  </button>
                </Link>
              </div>
            </div>

            {/* Industry Insights */}
            <div className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 border border-white/20 dark:border-gray-700/20 overflow-hidden">
              {/* Gradient background on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-teal-500/5 dark:from-emerald-500/10 dark:to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-600 via-green-700 to-teal-600 rounded-3xl flex items-center justify-center mb-8 shadow-xl group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 00-2-2z" />
                  </svg>
                </div>
                
                <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-6 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-emerald-600 group-hover:to-teal-600 dark:group-hover:from-emerald-400 dark:group-hover:to-teal-400 transition-all duration-300">
                  {t('blog.industryInsightsTitle')}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg leading-relaxed">
                  {t('blog.industryInsightsDesc')}
                </p>
                
                <div className="space-y-6 mb-8">
                  <article className="group/item bg-gradient-to-r from-emerald-50/50 to-teal-50/50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-2xl p-4 border-l-4 border-emerald-500 hover:shadow-lg transition-all">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2 group-hover/item:text-emerald-600 dark:group-hover/item:text-emerald-400 transition-colors">{t('blog.insight1Title')}</h4>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">{t('blog.insight1Desc')}</p>
                    <div className="flex items-center text-xs font-medium">
                      <span className="bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 px-2 py-1 rounded-lg">{t('blog.insight1ReadTime')}</span>
                      <span className="mx-2 text-gray-300 dark:text-gray-600">•</span>
                      <span className="bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-lg">{t('blog.insight1Badge')}</span>
                    </div>
                  </article>

                  <article className="group/item bg-gradient-to-r from-emerald-50/50 to-teal-50/50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-2xl p-4 border-l-4 border-emerald-500 hover:shadow-lg transition-all">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2 group-hover/item:text-emerald-600 dark:group-hover/item:text-emerald-400 transition-colors">{t('blog.insight2Title')}</h4>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">{t('blog.insight2Desc')}</p>
                    <div className="flex items-center text-xs font-medium">
                      <span className="bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 px-2 py-1 rounded-lg">{t('blog.insight2ReadTime')}</span>
                      <span className="mx-2 text-gray-300 dark:text-gray-600">•</span>
                      <span className="bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300 px-2 py-1 rounded-lg">{t('blog.insight2Badge')}</span>
                    </div>
                  </article>

                  <article className="group/item bg-gradient-to-r from-emerald-50/50 to-teal-50/50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-2xl p-4 border-l-4 border-emerald-500 hover:shadow-lg transition-all">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2 group-hover/item:text-emerald-600 dark:group-hover/item:text-emerald-400 transition-colors">{t('blog.insight3Title')}</h4>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">{t('blog.insight3Desc')}</p>
                    <div className="flex items-center text-xs font-medium">
                      <span className="bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 px-2 py-1 rounded-lg">{t('blog.insight3ReadTime')}</span>
                      <span className="mx-2 text-gray-300 dark:text-gray-600">•</span>
                      <span className="bg-pink-100 text-pink-700 px-2 py-1 rounded-lg">{t('blog.insight3Badge')}</span>
                    </div>
                  </article>
                </div>

                <Link to="/blog/industry-insights" className="block w-full">
                  <button className="w-full bg-gradient-to-r from-emerald-600 via-green-700 to-teal-600 text-white py-4 rounded-2xl font-bold hover:from-emerald-700 hover:to-teal-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl">
                    {t('blog.viewAllInsights')}
                  </button>
                </Link>
              </div>
            </div>

            {/* Case Studies */}
            <div className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 border border-white/20 dark:border-gray-700/20 overflow-hidden">
              {/* Gradient background on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 dark:from-purple-500/10 dark:to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600 rounded-3xl flex items-center justify-center mb-8 shadow-xl group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                
                <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-6 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 dark:group-hover:from-purple-400 dark:group-hover:to-pink-400 transition-all duration-300">
                  {t('blog.caseStudiesTitle')}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg leading-relaxed">
                  {t('blog.caseStudiesDesc')}
                </p>
                
                <div className="space-y-6 mb-8">
                  <article className="group/item bg-gradient-to-r from-purple-50/50 to-pink-50/50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-4 border-l-4 border-purple-500 hover:shadow-lg transition-all">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2 group-hover/item:text-purple-600 dark:group-hover/item:text-purple-400 transition-colors">{t('blog.case1Title')}</h4>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">{t('blog.case1Desc')}</p>
                    <div className="flex items-center text-xs font-medium">
                      <span className="bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 px-2 py-1 rounded-lg">{t('blog.case1ReadTime')}</span>
                      <span className="mx-2 text-gray-300 dark:text-gray-600">•</span>
                      <span className="bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 px-2 py-1 rounded-lg">{t('blog.case1Badge')}</span>
                    </div>
                  </article>

                  <article className="group/item bg-gradient-to-r from-purple-50/50 to-pink-50/50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-4 border-l-4 border-purple-500 hover:shadow-lg transition-all">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2 group-hover/item:text-purple-600 dark:group-hover/item:text-purple-400 transition-colors">{t('blog.case2Title')}</h4>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">{t('blog.case2Desc')}</p>
                    <div className="flex items-center text-xs font-medium">
                      <span className="bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 px-2 py-1 rounded-lg">{t('blog.case2ReadTime')}</span>
                      <span className="mx-2 text-gray-300 dark:text-gray-600">•</span>
                      <span className="bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300 px-2 py-1 rounded-lg">{t('blog.case2Badge')}</span>
                    </div>
                  </article>

                  <article className="group/item bg-gradient-to-r from-purple-50/50 to-pink-50/50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-4 border-l-4 border-purple-500 hover:shadow-lg transition-all">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2 group-hover/item:text-purple-600 dark:group-hover/item:text-purple-400 transition-colors">{t('blog.case3Title')}</h4>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">{t('blog.case3Desc')}</p>
                    <div className="flex items-center text-xs font-medium">
                      <span className="bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 px-2 py-1 rounded-lg">{t('blog.case3ReadTime')}</span>
                      <span className="mx-2 text-gray-300 dark:text-gray-600">•</span>
                      <span className="bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300 px-2 py-1 rounded-lg">{t('blog.case3Badge')}</span>
                    </div>
                  </article>
                </div>

                <Link to="/blog/case-studies" className="block w-full">
                  <button className="w-full bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600 text-white py-4 rounded-2xl font-bold hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl">
                    {t('blog.viewAllCaseStudies')}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Latest Posts */}
      <section className="py-24 bg-white dark:bg-gray-900 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-5 dark:opacity-[0.02]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="blog-grid" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                <circle cx="40" cy="40" r="2" fill="#3b82f6"/>
                <path d="M40 40 L60 40 M40 40 L40 60" stroke="#3b82f6" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#blog-grid)"/>
          </svg>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-24 h-24 bg-gradient-to-br from-blue-400/10 to-cyan-400/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-40 right-40 w-32 h-32 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-xl animate-pulse animation-delay-1000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl mb-8 shadow-lg">
              <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 text-sm font-bold tracking-wider">{t('blog.latestBadge')}</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-6 tracking-tight">
              {t('blog.latestTitle')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">{t('blog.latestTitleHighlight')}</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-light">
              {t('blog.latestSubtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allArticles.slice(0, visibleArticles).map((article) => (
              <article key={article.id} className={`group bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-2 border-gray-200 dark:border-gray-700 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:${article.borderColor}`}>
                <div className="relative aspect-w-16 aspect-h-9 overflow-hidden">
                  <img 
                    src={article.image} 
                    alt={article.imageAlt}
                    className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`bg-gradient-to-r ${article.categoryColors} text-white px-3 py-1 rounded-xl text-xs font-black tracking-wider shadow-lg`}>
                      {t(`blog.${article.categoryKey}`).toUpperCase()}
                    </div>
                    <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">{t(`blog.${article.dateKey}`)}</span>
                  </div>
                  <h3 className={`text-xl font-black text-gray-900 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:${article.categoryColors} transition-all leading-tight`}>
                    {t(`blog.${article.titleKey}`)}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    {t(`blog.${article.excerptKey}`)}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className={`flex items-center ${article.textColor} font-bold text-sm group-hover:translate-x-2 transition-transform`}>
                      {t('common.readMore')}
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                    <div className="flex items-center text-gray-400 dark:text-gray-500 text-xs">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {t(`blog.${article.readTimeKey}`)}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {visibleArticles < allArticles.length && (
            <div className="text-center mt-16">
              <button 
                onClick={loadMoreArticles}
                className="group relative bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 text-white px-12 py-5 rounded-2xl font-black text-lg transition-all transform hover:scale-105 shadow-xl hover:shadow-2xl overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center">
                  {t('blog.loadMore')}
                  <svg className="w-5 h-5 ml-2 transform group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Section 5: Newsletter Subscription */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6">
            <span className="text-cyan-100 font-medium">{t('blog.newsletterBadge')}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t('blog.newsletterTitle')}
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            {t('blog.newsletterSubtitle')}
          </p>
          
          <div className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                placeholder={t('blog.newsletterPlaceholder')}
                className="flex-1 px-6 py-4 rounded-xl text-gray-900 dark:text-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button className="bg-white dark:bg-gray-700 text-blue-600 dark:text-white px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                {t('blog.newsletterButton')}
              </button>
            </div>
            <p className="text-blue-100 dark:text-gray-300 text-sm mt-4">
              {t('blog.newsletterDisclaimer')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">{t('blog.weekly')}</div>
              <div className="text-cyan-200">{t('blog.newsletterFreshContent')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">{t('blog.newsletterExpertInsights')}</div>
              <div className="text-cyan-200">{t('blog.newsletterExpertSubtitle')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">{t('blog.newsletterExclusiveResources')}</div>
              <div className="text-cyan-200">{t('blog.newsletterExclusiveSubtitle')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Popular Tags & Authors */}
      <section className="py-24 bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-200/30 to-purple-200/30 dark:from-blue-600/20 dark:to-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-200/30 to-pink-200/30 dark:from-purple-600/20 dark:to-pink-600/20 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Popular Tags */}
            <div className="group">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                </div>
                <h2 className="text-4xl font-black text-gray-900 dark:text-white">
                  {t('blog.popularTagsTitle')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">{t('blog.popularTagsHighlight')}</span>
                </h2>
              </div>
              <div className="flex flex-wrap gap-3">
                <span className="group/tag relative bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 text-blue-800 dark:text-blue-300 px-5 py-3 rounded-2xl text-sm font-bold hover:from-blue-600 hover:to-cyan-600 hover:text-white transition-all cursor-pointer transform hover:scale-110 shadow-md hover:shadow-xl">
                  <span className="relative z-10">{t('blog.tagCybersecurity')}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl opacity-0 group-hover/tag:opacity-100 transition-opacity"></div>
                </span>
                <span className="group/tag relative bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-900/30 dark:to-emerald-800/30 text-emerald-800 dark:text-emerald-300 px-5 py-3 rounded-2xl text-sm font-bold hover:from-emerald-600 hover:to-teal-600 hover:text-white transition-all cursor-pointer transform hover:scale-110 shadow-md hover:shadow-xl">
                  <span className="relative z-10">{t('blog.tagCloudComputing')}</span>
                </span>
                <span className="group/tag relative bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 text-purple-800 dark:text-purple-300 px-5 py-3 rounded-2xl text-sm font-bold hover:from-purple-600 hover:to-pink-600 hover:text-white transition-all cursor-pointer transform hover:scale-110 shadow-md hover:shadow-xl">
                  <span className="relative z-10">{t('blog.tagArtificialIntelligence')}</span>
                </span>
                <span className="group/tag relative bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30 text-orange-800 dark:text-orange-300 px-5 py-3 rounded-2xl text-sm font-bold hover:from-orange-600 hover:to-red-600 hover:text-white transition-all cursor-pointer transform hover:scale-110 shadow-md hover:shadow-xl">
                  <span className="relative z-10">{t('blog.tagDevOps')}</span>
                </span>
                <span className="group/tag relative bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/30 text-red-800 dark:text-red-300 px-5 py-3 rounded-2xl text-sm font-bold hover:from-red-600 hover:to-pink-600 hover:text-white transition-all cursor-pointer transform hover:scale-110 shadow-md hover:shadow-xl">
                  <span className="relative z-10">{t('blog.tagInfrastructure')}</span>
                </span>
                <span className="group/tag relative bg-gradient-to-r from-indigo-50 to-indigo-100 dark:from-indigo-900/30 dark:to-indigo-800/30 text-indigo-800 dark:text-indigo-300 px-5 py-3 rounded-2xl text-sm font-bold hover:from-indigo-600 hover:to-purple-600 hover:text-white transition-all cursor-pointer transform hover:scale-110 shadow-md hover:shadow-xl">
                  <span className="relative z-10">{t('blog.tagKubernetes')}</span>
                </span>
                <span className="group/tag relative bg-gradient-to-r from-teal-50 to-teal-100 dark:from-teal-900/30 dark:to-teal-800/30 text-teal-800 dark:text-teal-300 px-5 py-3 rounded-2xl text-sm font-bold hover:from-teal-600 hover:to-cyan-600 hover:text-white transition-all cursor-pointer transform hover:scale-110 shadow-md hover:shadow-xl">
                  <span className="relative z-10">{t('blog.tagZeroTrust')}</span>
                </span>
                <span className="group/tag relative bg-gradient-to-r from-pink-50 to-pink-100 dark:from-pink-900/30 dark:to-pink-800/30 text-pink-800 dark:text-pink-300 px-5 py-3 rounded-2xl text-sm font-bold hover:from-pink-600 hover:to-rose-600 hover:text-white transition-all cursor-pointer transform hover:scale-110 shadow-md hover:shadow-xl">
                  <span className="relative z-10">{t('blog.tagMachineLearning')}</span>
                </span>
                <span className="group/tag relative bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/30 dark:to-yellow-800/30 text-yellow-800 dark:text-yellow-300 px-5 py-3 rounded-2xl text-sm font-bold hover:from-yellow-600 hover:to-orange-600 hover:text-white transition-all cursor-pointer transform hover:scale-110 shadow-md hover:shadow-xl">
                  <span className="relative z-10">{t('blog.tagAutomation')}</span>
                </span>
                <span className="group/tag relative bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700/30 dark:to-gray-600/30 text-gray-800 dark:text-gray-300 px-5 py-3 rounded-2xl text-sm font-bold hover:from-gray-600 hover:to-slate-600 hover:text-white transition-all cursor-pointer transform hover:scale-110 shadow-md hover:shadow-xl">
                  <span className="relative z-10">{t('blog.tagBestPractices')}</span>
                </span>
              </div>
            </div>

            {/* Featured Authors */}
            <div className="group">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h2 className="text-4xl font-black text-gray-900 dark:text-white">
                  {t('blog.featuredAuthorsTitle')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400">{t('blog.featuredAuthorsHighlight')}</span>
                </h2>
              </div>
              <div className="space-y-6">
                <div className="group/author relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500 transform hover:-translate-y-2 overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-2xl opacity-0 group-hover/author:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative flex items-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl flex items-center justify-center mr-4 shadow-lg transform group-hover/author:scale-110 group-hover/author:rotate-6 transition-all duration-300">
                      <span className="text-white font-black text-lg">MC</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-black text-gray-900 dark:text-white text-lg group-hover/author:text-blue-600 dark:group-hover/author:text-blue-400 transition-colors">{t('blog.author1Name')}</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm font-medium">{t('blog.author1Title')}</p>
                      <p className="text-gray-500 dark:text-gray-400 text-xs mt-1 flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        {t('blog.author1Stats')}
                      </p>
                    </div>
                    <button className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2 rounded-xl font-bold text-sm hover:from-blue-700 hover:to-cyan-700 transition-all transform hover:scale-105 shadow-lg">
                      {t('blog.author1Button')}
                    </button>
                  </div>
                </div>

                <div className="group/author relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-500 transform hover:-translate-y-2 overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-full blur-2xl opacity-0 group-hover/author:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative flex items-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-600 to-teal-500 rounded-2xl flex items-center justify-center mr-4 shadow-lg transform group-hover/author:scale-110 group-hover/author:rotate-6 transition-all duration-300">
                      <span className="text-white font-black text-lg">DR</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-black text-gray-900 dark:text-white text-lg group-hover/author:text-emerald-600 dark:group-hover/author:text-emerald-400 transition-colors">{t('blog.author2Name')}</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm font-medium">{t('blog.author2Title')}</p>
                      <p className="text-gray-500 dark:text-gray-400 text-xs mt-1 flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        {t('blog.author2Stats')}
                      </p>
                    </div>
                    <button className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-2 rounded-xl font-bold text-sm hover:from-emerald-700 hover:to-teal-700 transition-all transform hover:scale-105 shadow-lg">
                      {t('blog.author2Button')}
                    </button>
                  </div>
                </div>

                <div className="group/author relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-500 transform hover:-translate-y-2 overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-2xl opacity-0 group-hover/author:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative flex items-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-500 rounded-2xl flex items-center justify-center mr-4 shadow-lg transform group-hover/author:scale-110 group-hover/author:rotate-6 transition-all duration-300">
                      <span className="text-white font-black text-lg">JS</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-black text-gray-900 dark:text-white text-lg group-hover/author:text-purple-600 dark:group-hover/author:text-purple-400 transition-colors">{t('blog.author3Name')}</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm font-medium">{t('blog.author3Title')}</p>
                      <p className="text-gray-500 dark:text-gray-400 text-xs mt-1 flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        {t('blog.author3Stats')}
                      </p>
                    </div>
                    <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-xl font-bold text-sm hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg">
                      {t('blog.author3Button')}
                    </button>
                  </div>
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

export default Blog;
