import { useState, useEffect, useRef } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HomeIcon, 
  UsersIcon, 
  ChartBarIcon, 
  CogIcon,
  Bars3Icon,
  XMarkIcon,
  ClockIcon,
  UserGroupIcon,
  SunIcon,
  MoonIcon,
  BellIcon,
  UserCircleIcon,
  ChevronDownIcon,
  ArrowRightOnRectangleIcon,
  UserIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';
import { SunMedium, MoonStar, BellRing } from 'lucide-react';
import clsx from 'clsx';

const navigation = [
  { name: 'Overview', href: '/', icon: HomeIcon },
  { name: 'Feed', href: '/feed', icon: UsersIcon },
  { name: 'Posts', href: '/posts', icon: ChartBarIcon },
  { name: 'Moderation', href: '/moderation', icon: UserGroupIcon },
  { name: 'Activity', href: '/activity', icon: ClockIcon },
  { name: 'Settings', href: '/settings', icon: CogIcon },
];

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationDropdownOpen, setNotificationDropdownOpen] = useState(false);
  const [sidebarHovered, setSidebarHovered] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const profileDropdownRef = useRef(null);
  const notificationDropdownRef = useRef(null);

  // Mock user data - in a real app, this would come from authentication
  const user = {
    name: 'Zara Ahmed',
    role: 'Creator Lead',
    avatar: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?w=160&h=160&fit=crop&crop=faces'
  };

  // Mock notification data
  const notifications = [
    {
      id: 1,
      type: 'success',
      title: 'New user registered',
      message: 'Sarah Wilson has joined the team',
      time: '2 minutes ago',
      icon: '👤',
      unread: true
    },
    {
      id: 2,
      type: 'info',
      title: 'System update',
      message: 'Version 2.1.0 deployed successfully',
      time: '1 hour ago',
      icon: '🚀',
      unread: true
    },
    {
      id: 3,
      type: 'warning',
      title: 'Payment gateway error',
      message: 'Failed to process payment for order #1023',
      time: '3 hours ago',
      icon: '⚠️',
      unread: false
    },
    {
      id: 4,
      type: 'success',
      title: 'Task completed',
      message: 'Project milestone achieved',
      time: '5 hours ago',
      icon: '✅',
      unread: false
    },
    {
      id: 5,
      type: 'info',
      title: 'New feature added',
      message: 'Dark mode is now available',
      time: '1 day ago',
      icon: '🌙',
      unread: false
    }
  ];

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    
    // Save to localStorage
    localStorage.setItem('darkMode', newDarkMode.toString());
    
    // Apply dark class to document
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Initialize dark mode from localStorage on component mount
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Handle clicks outside dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
      if (notificationDropdownRef.current && !notificationDropdownRef.current.contains(event.target)) {
        setNotificationDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    // In a real app, this would clear authentication tokens
    localStorage.removeItem('authToken');
    localStorage.removeItem('darkMode'); // Clear dark mode preference
    // For demo purposes, just show an alert and refresh the page
    alert('Logged out successfully!');
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="relative flex w-64 flex-col bg-white dark:bg-gray-800 shadow-xl"
            >
              <div className="flex h-16 items-center justify-between px-4">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">SocialPulse</h1>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="text-gray-400 dark:text-gray-300 hover:text-gray-600 dark:hover:text-gray-100"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
              <nav className="flex-1 space-y-1 px-2 py-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={clsx(
                      location.pathname === item.href
                        ? 'bg-electric-100 dark:bg-electric-900 text-electric-700 dark:text-electric-300'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white',
                      'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                    )}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <div className={clsx("hidden lg:fixed lg:inset-y-0 lg:flex lg:flex-col transition-[width] duration-300", sidebarHovered ? "lg:w-72" : "lg:w-64")}>
        <motion.div 
          onMouseEnter={() => setSidebarHovered(true)} 
          onMouseLeave={() => setSidebarHovered(false)}
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative flex flex-col flex-grow bg-white/80 dark:bg-gray-900/70 border-r border-gray-200/70 dark:border-gray-700/70 backdrop-blur-xl"
        >
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-24 -right-24 h-56 w-56 rounded-full bg-electric-600/20 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-indigo-500/10 blur-3xl" />
          </div>
          <div className="flex h-16 items-center px-4 relative">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-tr from-electric-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-electric-600/30">
                <span className="text-white font-bold text-sm">SP</span>
              </div>
              <div className="hidden xl:block">
                <h1 className="text-lg font-bold text-gray-900 dark:text-white">SocialPulse</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Social Analytics</p>
              </div>
            </div>
          </div>
          <nav className="flex-1 space-y-1 px-2 py-4 relative">
            <motion.div className="absolute left-0 top-0 bottom-0 w-1 rounded-r bg-gradient-to-b from-electric-500/0 via-electric-500/30 to-electric-500/0" />
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <motion.div key={item.name} whileHover={{ x: 4 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
                  <Link
                    to={item.href}
                    className={clsx(
                      'group relative flex items-center px-3 py-2 text-sm font-medium rounded-lg overflow-hidden',
                      isActive
                        ? 'text-electric-600 dark:text-electric-300'
                        : 'text-gray-600 dark:text-gray-300'
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="sidebarActive"
                        className="absolute inset-0 rounded-lg bg-electric-500/10 dark:bg-electric-700/10 border border-electric-500/20"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className={clsx(
                      'relative z-10 mr-3 h-8 w-8 rounded-md flex items-center justify-center transition-all',
                      isActive
                        ? 'bg-gradient-to-tr from-electric-500 to-indigo-500 text-white shadow-md shadow-electric-500/30'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 group-hover:bg-gray-200 dark:group-hover:bg-gray-700'
                    )}>
                      <item.icon className="h-4 w-4" />
                    </span>
                    <span className="relative z-10">{item.name}</span>
                  </Link>
                </motion.div>
              );
            })}
          </nav>
        </motion.div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Header */}
        <header className="sticky top-0 z-40">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="relative h-16">
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="absolute inset-0 rounded-xl border border-gray-200/70 dark:border-gray-700/70 bg-white/80 dark:bg-gray-900/70 backdrop-blur-xl"
              ></motion.div>
              <div className="relative flex justify-between items-center h-16 px-3">
              {/* Left side - Project name and mobile menu */}
              <div className="flex items-center">
                <button
                  type="button"
                  className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-electric-500"
                  onClick={() => setSidebarOpen(true)}
                >
                  <Bars3Icon className="h-6 w-6" />
                </button>
                  
                  <div className="ml-4 lg:ml-0">
                    <div className="flex items-center gap-2">
                      <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">SocialPulse</h1>
                      <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] bg-electric-500/10 text-electric-600 dark:text-electric-300 border border-electric-500/20">Pro</span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 hidden sm:block">Social Media Analytics Suite</p>
                  </div>
                  
                  {/* Search (md+) */}
                  <div className="hidden md:flex items-center ml-6">
                    <div className="relative">
                      <input
                        placeholder="Search anything..."
                        className="w-64 lg:w-80 pl-10 pr-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm focus:ring-2 focus:ring-electric-500 focus:border-electric-500"
                      />
                      <svg className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18a7.5 7.5 0 006.15-3.35z" />
                      </svg>
                    </div>
                  </div>
              </div>

                {/* Right side - User info and controls */}
                <div className="flex items-center space-x-2 sm:space-x-4">
                  {/* Quick Action */}
                  <motion.button
                    whileHover={{ scale: 1.04, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-full bg-gradient-to-r from-electric-600 to-indigo-600 text-white text-sm shadow-md shadow-electric-600/30"
                    onClick={() => navigate('/posts')}
                    title="Create new post"
                  >
                    <span className="h-2 w-2 rounded-full bg-white/90" />
                    Create
                  </motion.button>
                {/* Dark mode toggle - hidden on very small screens */}
                  <motion.button
                    whileHover={{ scale: 1.05, rotate: 3 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={toggleDarkMode}
                    className="hidden sm:block p-2 rounded-full bg-gradient-to-tr from-gray-100 to-white dark:from-gray-800 dark:to-gray-700 border border-gray-200/70 dark:border-gray-700/70 shadow-sm"
                    title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                  >
                    {darkMode ? (
                      <SunMedium className="h-5 w-5 text-amber-400" />
                    ) : (
                      <MoonStar className="h-5 w-5 text-indigo-400" />
                    )}
                  </motion.button>

                {/* Notifications */}
                <div className="relative" ref={notificationDropdownRef}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setNotificationDropdownOpen(!notificationDropdownOpen)}
                    className="p-2 rounded-full bg-gradient-to-tr from-gray-100 to-white dark:from-gray-800 dark:to-gray-700 border border-gray-200/70 dark:border-gray-700/70 shadow-sm relative"
                    title="Notifications"
                  >
                    <BellRing className="h-5 w-5 text-rose-500" />
                    <span className="absolute -top-1 -right-1 h-4 w-4 bg-rose-500 text-white text-[10px] leading-4 rounded-full flex items-center justify-center">
                      {notifications.filter(n => n.unread).length}
                    </span>
                    <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full ring-4 ring-rose-500/30 animate-ping" />
                  </motion.button>

                  {/* Notification Dropdown */}
                  <AnimatePresence>
                    {notificationDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute mt-2 bg-white/95 dark:bg-gray-900/90 rounded-2xl shadow-xl border border-gray-200/70 dark:border-gray-700/70 backdrop-blur-xl py-2 z-50 overflow-y-auto"
                        style={{
                          right: 0,
                          left: 'auto',
                          width: 'min(22rem, calc(100vw - 1rem))',
                          maxHeight: 'min(70vh, 28rem)'
                        }}
                      >
                        {/* Header */}
                        <div className="px-3 sm:px-4 py-2 sm:py-3 border-b border-gray-200 dark:border-gray-700">
                          <div className="flex items-center justify-between">
                            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">Notifications</h3>
                            <button
                              onClick={() => setNotificationDropdownOpen(false)}
                              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                            >
                              <XMarkIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                            </button>
                          </div>
                          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                            {notifications.filter(n => n.unread).length} unread notifications
                          </p>
                        </div>

                        {/* Notification List */}
                        <div className="py-2">
                          {notifications.map((notification) => (
                            <motion.div
                              key={notification.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: notification.id * 0.1 }}
                              className={`px-3 sm:px-4 py-2 sm:py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer ${
                                notification.unread ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                              }`}
                            >
                              <div className="flex items-start space-x-2 sm:space-x-3">
                                <div className="text-xl sm:text-2xl">{notification.icon}</div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between">
                                    <p className={`text-xs sm:text-sm font-medium ${
                                      notification.unread 
                                        ? 'text-gray-900 dark:text-white' 
                                        : 'text-gray-700 dark:text-gray-300'
                                    }`}>
                                      {notification.title}
                                    </p>
                                    {notification.unread && (
                                      <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                                    )}
                                  </div>
                                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                                    {notification.message}
                                  </p>
                                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                                    {notification.time}
                                  </p>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>

                        {/* Footer */}
                        <div className="border-t border-gray-200 dark:border-gray-700 px-3 sm:px-4 py-2 sm:py-3">
                          <Link
                            to="/activity"
                            className="text-xs sm:text-sm text-electric-600 dark:text-electric-400 hover:text-electric-700 dark:hover:text-electric-300 font-medium"
                            onClick={() => setNotificationDropdownOpen(false)}
                          >
                            View all notifications →
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* User profile dropdown */}
                <div className="relative" ref={profileDropdownRef}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="flex items-center space-x-3 p-2 rounded-xl hover:bg-white/60 dark:hover:bg-gray-800/60 border border-transparent hover:border-gray-200/70 dark:hover:border-gray-700/70 bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl transition-colors"
                  >
                    <div className="text-right hidden sm:block">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{user.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{user.role}</p>
                    </div>
                    <div className="relative">
                      <img
                        className="h-9 w-9 rounded-xl object-cover ring-2 ring-white/80 dark:ring-gray-800/80 shadow-md"
                        src={user.avatar}
                        alt={user.name}
                      />
                      <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-emerald-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                    </div>
                    <ChevronDownIcon className={`h-4 w-4 text-gray-500 dark:text-gray-400 transition-transform ${profileDropdownOpen ? 'rotate-180' : ''}`} />
                  </motion.button>

                  {/* Profile Dropdown Menu */}
                  <AnimatePresence>
                    {profileDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-[calc(100vw-2rem)] sm:w-72 max-w-sm bg-white/90 dark:bg-gray-900/80 rounded-2xl shadow-xl border border-gray-200/70 dark:border-gray-700/70 backdrop-blur-xl overflow-hidden z-50"
                      >
                        {/* User Info Header */}
                        <div className="px-4 py-4 border-b border-gray-200/70 dark:border-gray-700/70 bg-gradient-to-r from-electric-600/10 to-indigo-600/10">
                          <div className="flex items-center space-x-3">
                            <img className="h-12 w-12 rounded-xl object-cover ring-2 ring-white/70 dark:ring-gray-800/70" src={user.avatar} alt={user.name} />
                            <div>
                              <p className="text-sm font-semibold text-gray-900 dark:text-white">{user.name}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">{user.role}</p>
                            </div>
                          </div>
                        </div>

                        {/* Menu Items */}
                        <div className="py-2">
                          <Link
                            to="/settings"
                            className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-white/70 dark:hover:bg-gray-800/70 transition-colors"
                            onClick={() => setProfileDropdownOpen(false)}
                          >
                            <UserIcon className="h-4 w-4" />
                            <span>View Profile</span>
                          </Link>
                          
                          <Link
                            to="/settings"
                            className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-white/70 dark:hover:bg-gray-800/70 transition-colors"
                            onClick={() => setProfileDropdownOpen(false)}
                          >
                            <CogIcon className="h-4 w-4" />
                            <span>Settings</span>
                          </Link>
                          
                          <Link
                            to="/security"
                            className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-white/70 dark:hover:bg-gray-800/70 transition-colors"
                            onClick={() => setProfileDropdownOpen(false)}
                          >
                            <ShieldCheckIcon className="h-4 w-4" />
                            <span>Security</span>
                          </Link>
                          
                          <div className="border-t border-gray-200/70 dark:border-gray-700/70 my-2"></div>
                          
                          <button
                            onClick={handleLogout}
                            className="flex items-center space-x-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50/70 dark:hover:bg-red-900/20 transition-colors w-full text-left rounded-b-2xl"
                          >
                            <ArrowRightOnRectangleIcon className="h-4 w-4" />
                            <span>Logout</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
}
