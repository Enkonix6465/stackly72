import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import LanguageSelector from '../components/LanguageSelector';

const ForgotPassword = () => {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [step, setStep] = useState(1); // 1: email, 2: new password
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleContinue = (e) => {
    e.preventDefault();
    setError('');
    
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some(u => u.email === email);
    
    if (!userExists) {
      setError(t('forgotPassword.errorNoAccount'));
      return;
    }
    
    setStep(2);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    setError('');
    
    if (newPassword.length < 6) {
      setError(t('forgotPassword.errorPasswordLength'));
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setError(t('forgotPassword.errorPasswordMismatch'));
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex(u => u.email === email);
    
    if (userIndex !== -1) {
      users[userIndex].password = newPassword;
      localStorage.setItem('users', JSON.stringify(users));
      
      setSuccess(t('forgotPassword.successMessage'));
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } else {
      setError(t('forgotPassword.errorOccurred'));
    }
  };

  const handleBack = () => {
    setStep(1);
    setNewPassword('');
    setConfirmPassword('');
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 relative overflow-hidden">
      {/* Navigation Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center group">
              <img 
                src={require('../assets/images/logo1.png')} 
                alt="Stackly Logo" 
                className="h-10 w-auto"
              />
            </Link>

            {/* Right side - Language Selector, Theme Toggle */}
            <div className="flex items-center gap-2">
              <LanguageSelector />
              
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content - with padding-top to account for fixed nav */}
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 pt-24">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-rose-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-4xl w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 border border-white/30 dark:border-purple-500/30 relative z-10">
        {/* Left side - Decorative panel */}
        <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-700 dark:from-violet-700 dark:via-purple-700 dark:to-fuchsia-800 p-12 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6bTAtMTRjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-10"></div>
          <div className="space-y-6 text-center px-6 relative z-10">
            <div className="w-32 h-32 mx-auto bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 p-4">
              <img 
                src={require('../assets/images/logo1.png')} 
                alt="CyberTech Solutions Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <h2 className="text-4xl font-bold tracking-tight">{t('forgotPassword.pageTitle')}</h2>
            <p className="text-lg opacity-90">{t('forgotPassword.pageSubtitle')}</p>
            <div className="flex justify-center gap-2 mt-8">
              <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
            </div>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="p-8 sm:p-12 bg-white/50 dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 backdrop-blur-sm">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">{t('forgotPassword.formTitle')}</h3>
              <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                {step === 1 ? t('forgotPassword.step1Subtitle') : t('forgotPassword.step2Subtitle')}
              </p>
            </div>

            {step === 1 ? (
              <form className="mt-8 space-y-6" onSubmit={handleContinue}>
                {error && (
                  <div className="rounded-xl bg-red-50 border border-red-200 p-4 animate-shake">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-red-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <p className="text-sm font-medium text-red-700">{error}</p>
                    </div>
                  </div>
                )}

                <div className="space-y-5">
                  <div className="group">
                    <label className="block">
                      <span className="text-sm font-semibold text-gray-700 dark:text-purple-300 mb-2 block">{t('forgotPassword.emailLabel')}</span>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg className="h-5 w-5 text-gray-400 dark:text-purple-400 group-hover:text-indigo-500 dark:group-hover:text-purple-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                          </svg>
                        </div>
                        <input
                          id="email-address"
                          name="email"
                          type="email"
                          autoComplete="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-purple-500/30 rounded-xl text-gray-900 dark:text-white bg-white dark:bg-gray-800/50 placeholder-gray-400 dark:placeholder-purple-400/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:border-indigo-300 dark:hover:border-purple-400"
                          placeholder={t('forgotPassword.emailPlaceholder')}
                        />
                      </div>
                    </label>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
                    >
                      <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                        <svg className="h-5 w-5 text-indigo-300 group-hover:text-indigo-200 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </span>
                      {t('forgotPassword.continueButton')}
                    </button>
                  </div>

                  <div className="text-center">
                    <Link to="/login" className="inline-flex items-center text-sm font-medium text-indigo-600 dark:text-purple-400 hover:text-indigo-700 dark:hover:text-purple-300 transition-colors group">
                      <svg className="mr-1 w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                      </svg>
                      {t('forgotPassword.backToSignIn')}
                    </Link>
                  </div>
                </div>
              </form>
            ) : (
              <form className="mt-8 space-y-6" onSubmit={handleResetPassword}>
                {error && (
                  <div className="rounded-xl bg-red-50 border border-red-200 p-4 animate-shake">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-red-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <p className="text-sm font-medium text-red-700">{error}</p>
                    </div>
                  </div>
                )}
                {success && (
                  <div className="rounded-xl bg-green-50 border border-green-200 p-4 animate-fade-in">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <p className="text-sm font-medium text-green-700">{success}</p>
                    </div>
                  </div>
                )}
                
                <div className="space-y-5">
                  <div className="group">
                    <label className="block">
                      <span className="text-sm font-semibold text-gray-700 dark:text-purple-300 mb-2 block">{t('forgotPassword.newPasswordLabel')}</span>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg className="h-5 w-5 text-gray-400 dark:text-purple-400 group-hover:text-indigo-500 dark:group-hover:text-purple-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                        </div>
                        <input
                          id="new-password"
                          name="newPassword"
                          type="password"
                          autoComplete="new-password"
                          required
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-purple-500/30 rounded-xl text-gray-900 dark:text-white bg-white dark:bg-gray-800/50 placeholder-gray-400 dark:placeholder-purple-400/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:border-indigo-300 dark:hover:border-purple-400"
                          placeholder={t('forgotPassword.newPasswordPlaceholder')}
                        />
                      </div>
                    </label>
                  </div>

                  <div className="group">
                    <label className="block">
                      <span className="text-sm font-semibold text-gray-700 dark:text-purple-300 mb-2 block">{t('forgotPassword.confirmPasswordLabel')}</span>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg className="h-5 w-5 text-gray-400 dark:text-purple-400 group-hover:text-indigo-500 dark:group-hover:text-purple-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <input
                          id="confirm-password"
                          name="confirmPassword"
                          type="password"
                          autoComplete="new-password"
                          required
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-purple-500/30 rounded-xl text-gray-900 dark:text-white bg-white dark:bg-gray-800/50 placeholder-gray-400 dark:placeholder-purple-400/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:border-indigo-300 dark:hover:border-purple-400"
                          placeholder={t('forgotPassword.confirmPasswordPlaceholder')}
                        />
                      </div>
                    </label>
                  </div>

                  <div className="flex gap-4 pt-2">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="flex-1 flex justify-center py-3.5 px-4 border border-gray-300 dark:border-purple-500/50 rounded-xl text-sm font-semibold text-gray-700 dark:text-purple-300 bg-white dark:bg-gray-800/50 hover:bg-gray-50 dark:hover:bg-purple-900/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-purple-500 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                      </svg>
                      {t('forgotPassword.backButton')}
                    </button>
                    <button
                      type="submit"
                      className="flex-1 flex justify-center py-3.5 px-4 border border-transparent rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
                    >
                      {t('forgotPassword.resetPasswordButton')}
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default ForgotPassword;