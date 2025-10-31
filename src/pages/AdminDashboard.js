import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getTranslation } from "../translations/translations";
import { useLanguage } from "../context/LanguageContext";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const { currentUser, logout } = useAuth();
  const { language } = useLanguage();
    const t = (key) => getTranslation(language, key);
  const navigate = useNavigate();

  const loadUsers = () => {
    const allUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(allUsers);
  };

  useEffect(() => {
    if (!currentUser || currentUser.userType !== 'admin') {
      navigate('/login');
      return;
    }
    loadUsers();
  }, [currentUser, navigate]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showLanguageDropdown && !event.target.closest('.language-dropdown')) {
        setShowLanguageDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showLanguageDropdown]);

  const handleDelete = (userId) => {
    if (userId === currentUser.id) {
      alert(t('admin.cannotDeleteSelf'));
      return;
    }

    if (window.confirm(t('admin.deleteConfirm'))) {
      const updatedUsers = users.filter(user => user.id !== userId);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      setUsers(updatedUsers);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  

  

  // Calculate statistics
  const totalStudents = users.filter(u => u.userType === 'user').length;
  const totalCourses = 35;
  const activeInstructors = 12;
  const assignmentsCompleted = 420;

  // Render different content based on active tab
  const renderContent = () => {
    if (activeTab === 'home') {
      return (
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-xl p-6 shadow-sm border`}>
              <h3 className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-sm font-medium mb-2`}>{t('admin.totalStudents')}</h3>
              <p className="text-3xl font-bold text-blue-600">{totalStudents > 0 ? totalStudents : '1500'}</p>
            </div>
            <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-xl p-6 shadow-sm border`}>
              <h3 className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-sm font-medium mb-2`}>{t('admin.totalCourses')}</h3>
              <p className="text-3xl font-bold text-blue-600">{totalCourses}</p>
            </div>
            <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-xl p-6 shadow-sm border`}>
              <h3 className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-sm font-medium mb-2`}>{t('admin.activeInstructors')}</h3>
              <p className="text-3xl font-bold text-blue-600">{activeInstructors}</p>
            </div>
            <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-xl p-6 shadow-sm border`}>
              <h3 className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-sm font-medium mb-2`}>{t('admin.assignmentsCompleted')}</h3>
              <p className="text-3xl font-bold text-blue-600">{assignmentsCompleted}</p>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Student Distribution Pie Chart */}
            <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-xl p-6 shadow-sm border`}>
              <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-6`}>{t('admin.studentDistribution')}</h3>
              <div className="flex items-center justify-center">
                <div className="relative w-48 h-48">
                  {/* Pie Chart */}
                  <svg viewBox="0 0 100 100" className="transform -rotate-90">
                    {/* Segment 1 - 40% */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#3B82F6"
                      strokeWidth="20"
                      strokeDasharray="251.2"
                      strokeDashoffset="0"
                      className="transition-all duration-300"
                    />
                    {/* Segment 2 - 30% */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#10B981"
                      strokeWidth="20"
                      strokeDasharray="75.36 175.84"
                      strokeDashoffset="-100.48"
                      className="transition-all duration-300"
                    />
                    {/* Segment 3 - 20% */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#F59E0B"
                      strokeWidth="20"
                      strokeDasharray="50.24 200.96"
                      strokeDashoffset="-175.84"
                      className="transition-all duration-300"
                    />
                    {/* Segment 4 - 10% */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#EF4444"
                      strokeWidth="20"
                      strokeDasharray="25.12 226.08"
                      strokeDashoffset="-226.08"
                      className="transition-all duration-300"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>1500</p>
                      <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{t('admin.total')}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{t('admin.active')}</span>
                  </div>
                  <span className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>40%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{t('admin.graduated')}</span>
                  </div>
                  <span className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>30%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                    <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{t('admin.inactive')}</span>
                  </div>
                  <span className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>20%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{t('admin.probation')}</span>
                  </div>
                  <span className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>10%</span>
                </div>
              </div>
            </div>

            {/* Course Categories Pie Chart */}
            <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-xl p-6 shadow-sm border`}>
              <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-6`}>{t('admin.courseCategories')}</h3>
              <div className="flex items-center justify-center">
                <div className="relative w-48 h-48">
                  {/* Donut Chart */}
                  <svg viewBox="0 0 100 100" className="transform -rotate-90">
                    {/* Segment 1 - 35% */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#8B5CF6"
                      strokeWidth="20"
                      strokeDasharray="87.92 163.28"
                      strokeDashoffset="0"
                      className="transition-all duration-300"
                    />
                    {/* Segment 2 - 25% */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#06B6D4"
                      strokeWidth="20"
                      strokeDasharray="62.8 188.4"
                      strokeDashoffset="-87.92"
                      className="transition-all duration-300"
                    />
                    {/* Segment 3 - 25% */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#F97316"
                      strokeWidth="20"
                      strokeDasharray="62.8 188.4"
                      strokeDashoffset="-150.72"
                      className="transition-all duration-300"
                    />
                    {/* Segment 4 - 15% */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#EC4899"
                      strokeWidth="20"
                      strokeDasharray="37.68 213.52"
                      strokeDashoffset="-213.52"
                      className="transition-all duration-300"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>35</p>
                      <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{t('admin.courses')}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                    <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{t('admin.itTech')}</span>
                  </div>
                  <span className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>35%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
                    <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{t('admin.business')}</span>
                  </div>
                  <span className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>25%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                    <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{t('admin.design')}</span>
                  </div>
                  <span className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>25%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-pink-500"></div>
                    <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{t('admin.marketing')}</span>
                  </div>
                  <span className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>15%</span>
                </div>
              </div>
            </div>

            {/* Performance Metrics Pie Chart */}
            <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-xl p-6 shadow-sm border`}>
              <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-6`}>{t('admin.performanceMetrics')}</h3>
              <div className="flex items-center justify-center">
                <div className="relative w-48 h-48">
                  {/* Donut Chart */}
                  <svg viewBox="0 0 100 100" className="transform -rotate-90">
                    {/* Segment 1 - 45% */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#22C55E"
                      strokeWidth="20"
                      strokeDasharray="113.04 138.16"
                      strokeDashoffset="0"
                      className="transition-all duration-300"
                    />
                    {/* Segment 2 - 30% */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#3B82F6"
                      strokeWidth="20"
                      strokeDasharray="75.36 175.84"
                      strokeDashoffset="-113.04"
                      className="transition-all duration-300"
                    />
                    {/* Segment 3 - 15% */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#FBBF24"
                      strokeWidth="20"
                      strokeDasharray="37.68 213.52"
                      strokeDashoffset="-188.4"
                      className="transition-all duration-300"
                    />
                    {/* Segment 4 - 10% */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#EF4444"
                      strokeWidth="20"
                      strokeDasharray="25.12 226.08"
                      strokeDashoffset="-226.08"
                      className="transition-all duration-300"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>420</p>
                      <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{t('admin.tasks')}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{t('admin.excellent')}</span>
                  </div>
                  <span className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>45%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{t('admin.good')}</span>
                  </div>
                  <span className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>30%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{t('admin.average')}</span>
                  </div>
                  <span className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>15%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{t('admin.poor')}</span>
                  </div>
                  <span className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>10%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (activeTab === 'students') {
      return (
        <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-xl shadow-sm border`}>
          <div className={`p-6 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}>
            <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{t('admin.userManagement')}</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className={isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}>
                <tr>
                  <th className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} uppercase tracking-wider`}>{t('admin.name')}</th>
                  <th className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} uppercase tracking-wider`}>{t('admin.email')}</th>
                  <th className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} uppercase tracking-wider`}>{t('admin.userType')}</th>
                  <th className={`px-6 py-3 text-right text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} uppercase tracking-wider`}>{t('admin.actions')}</th>
                </tr>
              </thead>
              <tbody className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} divide-y ${isDarkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
                {users.filter(u => u.userType !== 'admin').length === 0 ? (
                  <tr>
                    <td colSpan={4} className={`px-6 py-8 text-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{t('admin.noUsers')}</td>
                  </tr>
                ) : (
                  users.filter(u => u.userType !== 'admin').map((user) => (
                    <tr key={user.id} className={`${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} transition-colors`}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-100 text-blue-700 font-semibold">
                            {user.fullName ? user.fullName.split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase() : 'U'}
                          </div>
                          <div className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{user.fullName}</div>
                        </div>
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>{user.email}</td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                        {user.userType === 'admin' ? t('admin.admin') : t('admin.user')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleDelete(user.id)}
                          className={`inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-lg ${isDarkMode ? 'text-red-400 bg-red-900/30 hover:bg-red-900/50' : 'text-red-700 bg-red-50 hover:bg-red-100'} transition`}
                        >
                          {t('admin.delete')}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      );
    } else if (activeTab === 'courses') {
      // Sample course data
      const courses = [
        { id: 1, nameKey: 'reactFundamentals', category: 'IT & Tech', instructorKey: 'johnSmith', students: 245, duration: 8, status: 'Active' },
        { id: 2, nameKey: 'advancedJavaScript', category: 'IT & Tech', instructorKey: 'sarahJohnson', students: 189, duration: 10, status: 'Active' },
        { id: 3, nameKey: 'pythonDataScience', category: 'IT & Tech', instructorKey: 'michaelChen', students: 312, duration: 12, status: 'Active' },
        { id: 4, nameKey: 'digitalMarketing', category: 'Marketing', instructorKey: 'emilyDavis', students: 156, duration: 6, status: 'Active' },
        { id: 5, nameKey: 'uiuxPrinciples', category: 'Design', instructorKey: 'robertTaylor', students: 203, duration: 8, status: 'Active' },
        { id: 6, nameKey: 'businessAnalytics', category: 'Business', instructorKey: 'lisaAnderson', students: 178, duration: 10, status: 'Completed' },
        { id: 7, nameKey: 'cloudComputingAWS', category: 'IT & Tech', instructorKey: 'davidWilson', students: 267, duration: 12, status: 'Active' },
        { id: 8, nameKey: 'machineLearning', category: 'IT & Tech', instructorKey: 'jenniferBrown', students: 294, duration: 14, status: 'Active' },
      ];

      return (
        <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-xl shadow-sm border`}>
          <div className={`p-6 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}>
            <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{t('admin.coursesManagement')}</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className={isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}>
                <tr>
                  <th className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} uppercase tracking-wider`}>{t('admin.courseName')}</th>
                  <th className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} uppercase tracking-wider`}>{t('admin.category')}</th>
                  <th className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} uppercase tracking-wider`}>{t('admin.instructor')}</th>
                  <th className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} uppercase tracking-wider`}>{t('admin.students')}</th>
                  <th className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} uppercase tracking-wider`}>{t('admin.duration')}</th>
                  <th className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} uppercase tracking-wider`}>{t('admin.status')}</th>
                </tr>
              </thead>
              <tbody className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} divide-y ${isDarkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
                {courses.map((course) => (
                  <tr key={course.id} className={`${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} transition-colors`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                        </div>
                        <div className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{t(`admin.${course.nameKey}`)}</div>
                      </div>
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        course.category === 'IT & Tech' ? 'bg-purple-100 text-purple-800' :
                        course.category === 'Marketing' ? 'bg-pink-100 text-pink-800' :
                        course.category === 'Design' ? 'bg-orange-100 text-orange-800' :
                        'bg-cyan-100 text-cyan-800'
                      }`}>
                        {course.category === 'IT & Tech' ? t('admin.itTech') :
                         course.category === 'Marketing' ? t('admin.marketing') :
                         course.category === 'Design' ? t('admin.design') :
                         t('admin.business')}
                      </span>
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>{t(`admin.${course.instructorKey}`)}</td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        {course.students}
                      </div>
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>{course.duration} {t('admin.weeks')}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        course.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {course.status === 'Active' ? t('admin.activeStatus') : t('admin.completedStatus')}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    } else {
      return (
        <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-xl p-8 shadow-sm border text-center`}>
          <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h3>
          <p className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>This section is under development.</p>
        </div>
      );
    }
  };

  return (
    <div className={`flex min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Sidebar */}
      <aside className={`w-64 ${isDarkMode ? 'bg-gradient-to-b from-gray-800 to-gray-900' : 'bg-gradient-to-b from-blue-600 to-purple-600'} text-white flex flex-col`}>
        <div className="p-6">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" opacity="0.8"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-xl font-bold">{t('admin.adminTitle')}</span>
          </div>
          <p className="text-sm text-blue-100">{t('admin.dashboard')}</p>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          <button
            onClick={() => setActiveTab('home')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'home' ? 'bg-white/20 text-white' : 'text-blue-100 hover:bg-white/10'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            {t('admin.home')}
          </button>

          <button
            onClick={() => setActiveTab('courses')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'courses' ? 'bg-white/20 text-white' : 'text-blue-100 hover:bg-white/10'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            {t('admin.courses')}
          </button>

          <button
            onClick={() => setActiveTab('students')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'students' ? 'bg-white/20 text-white' : 'text-blue-100 hover:bg-white/10'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            {t('admin.users')}
          </button>

          <button
            onClick={() => setActiveTab('instructors')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'instructors' ? 'bg-white/20 text-white' : 'text-blue-100 hover:bg-white/10'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            {t('admin.activeInstructors')}
          </button>

          <button
            onClick={() => setActiveTab('assignments')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'assignments' ? 'bg-white/20 text-white' : 'text-blue-100 hover:bg-white/10'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            {t('admin.assignmentsCompleted')}
          </button>

          <button
            onClick={() => setActiveTab('reports')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'reports' ? 'bg-white/20 text-white' : 'text-blue-100 hover:bg-white/10'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            {t('admin.analyticsReports')}
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b px-8 py-4`}>
          <div className="flex items-center justify-between">
            <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{t('admin.welcomeBack')}</h1>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition"
              >
                {isDarkMode ? 'Light' : 'Dark'}
              </button>
              
             

              <button
                onClick={handleLogout}
                className={`px-4 py-2 ${isDarkMode ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} text-sm font-medium rounded-lg transition`}
              >
                {t('admin.logout')}
              </button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className={`flex-1 p-8 overflow-y-auto ${isDarkMode ? 'bg-gray-900' : ''}`}>
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;