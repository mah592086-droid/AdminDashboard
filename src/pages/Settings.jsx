import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CogIcon, 
  UserIcon, 
  BellIcon, 
  ShieldCheckIcon,
  PaintBrushIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';

const settingsSections = [
  {
    id: 'profile',
    title: 'Profile Settings',
    icon: UserIcon,
    description: 'Manage your personal information',
  },
  {
    id: 'notifications',
    title: 'Notifications',
    icon: BellIcon,
    description: 'Configure notification preferences',
  },
  {
    id: 'security',
    title: 'Security',
    icon: ShieldCheckIcon,
    description: 'Password and security settings',
  },
  {
    id: 'appearance',
    title: 'Appearance',
    icon: PaintBrushIcon,
    description: 'Customize the look and feel',
  },
  {
    id: 'general',
    title: 'General',
    icon: CogIcon,
    description: 'General application settings',
  },
  {
    id: 'privacy',
    title: 'Privacy',
    icon: GlobeAltIcon,
    description: 'Privacy and data settings',
  },
];

export default function Settings() {
  const [activeSection, setActiveSection] = useState('profile');
  const [themeMode, setThemeMode] = useState('System');
  const [openTwoFA, setOpenTwoFA] = useState(false);

  return (
    <div className="p-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/60 backdrop-blur-xl">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -right-24 h-56 w-56 rounded-full bg-electric-600/20 blur-3xl" />
          <div className="absolute bottom-0 -left-10 h-48 w-48 rounded-full bg-indigo-500/20 blur-3xl" />
        </div>
        <div className="relative p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">Tweak preferences, personalize appearance, and secure your account</p>
        </div>
      </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Settings Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1"
          >
            <div className="bg-white/80 dark:bg-gray-900/70 rounded-2xl border border-gray-200 dark:border-gray-700 backdrop-blur-xl">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Sections</h3>
              </div>
              <nav className="p-3 space-y-2">
                {settingsSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full relative overflow-hidden flex items-center space-x-3 px-3 py-2 text-left rounded-xl transition-all ${
                      activeSection === section.id
                        ? 'bg-electric-500/10 text-electric-700 dark:text-electric-300 ring-1 ring-electric-500/30'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    {activeSection === section.id && <span className="absolute inset-y-0 left-0 w-1 bg-electric-500 rounded-r" />}
                    <span className={`h-9 w-9 rounded-lg flex items-center justify-center ${activeSection === section.id ? 'bg-gradient-to-tr from-electric-500 to-indigo-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'}`}>
                      <section.icon className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold">{section.title}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{section.description}</p>
                    </div>
                  </button>
                ))}
              </nav>
            </div>
          </motion.div>

          {/* Settings Content */}
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:col-span-3"
          >
            <div className="bg-white/90 dark:bg-gray-900/70 rounded-2xl border border-gray-200 dark:border-gray-700 backdrop-blur-xl">
              <div className="p-6">
                {activeSection === 'profile' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Profile Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          First Name
                        </label>
                        <input
                          type="text"
                          defaultValue="John"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 focus:ring-2 focus:ring-electric-500 focus:border-electric-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Last Name
                        </label>
                        <input
                          type="text"
                          defaultValue="Doe"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 focus:ring-2 focus:ring-electric-500 focus:border-electric-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          defaultValue="john@example.com"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 focus:ring-2 focus:ring-electric-500 focus:border-electric-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone
                        </label>
                        <input
                          type="tel"
                          defaultValue="+1 (555) 123-4567"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 focus:ring-2 focus:ring-electric-500 focus:border-electric-500"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <button className="px-5 py-2.5 rounded-full text-white bg-gradient-to-r from-electric-600 to-indigo-600 hover:from-electric-500 hover:to-indigo-500 shadow-lg shadow-electric-600/30 transition-all">
                        Save Changes
                      </button>
                    </div>
                  </div>
                )}

                {activeSection === 'notifications' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Notification Preferences</h3>
                    <div className="space-y-4">
                      {[
                        { name: 'Email notifications', description: 'Receive notifications via email', enabled: true },
                        { name: 'Push notifications', description: 'Receive push notifications', enabled: false },
                        { name: 'SMS notifications', description: 'Receive SMS notifications', enabled: false },
                        { name: 'Marketing emails', description: 'Receive marketing and promotional emails', enabled: true },
                      ].map((setting, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800">
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">{setting.name}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{setting.description}</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              defaultChecked={setting.enabled}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-electric-300/40 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-electric-600 peer-checked:to-indigo-600"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeSection === 'security' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Security Settings</h3>
                    <div className="space-y-4">
                      <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">Change Password</h4>
                        <div className="space-y-3">
                          <input
                            type="password"
                            placeholder="Current password"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 focus:ring-2 focus:ring-electric-500 focus:border-electric-500"
                          />
                          <input
                            type="password"
                            placeholder="New password"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 focus:ring-2 focus:ring-electric-500 focus:border-electric-500"
                          />
                          <input
                            type="password"
                            placeholder="Confirm new password"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 focus:ring-2 focus:ring-electric-500 focus:border-electric-500"
                          />
                        </div>
                        <button className="mt-3 px-5 py-2.5 rounded-full text-white bg-gradient-to-r from-electric-600 to-indigo-600 hover:from-electric-500 hover:to-indigo-500 shadow-lg shadow-electric-600/30 transition-all">
                          Update Password
                        </button>
                      </div>
                      <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800">
                        <button
                          type="button"
                          onClick={() => setOpenTwoFA(!openTwoFA)}
                          className="w-full flex items-center justify-between"
                        >
                          <span className="font-medium text-gray-900 dark:text-white">Two‑Factor Authentication</span>
                          <span className="text-sm text-gray-500">{openTwoFA ? '−' : '+'}</span>
                        </button>
                        {openTwoFA && (
                          <div className="mt-3 space-y-3">
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              Add an extra layer of security to your account.
                            </p>
                            <div className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                              <span className="text-sm text-gray-700 dark:text-gray-200">Enable 2FA</span>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" />
                                <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-electric-300/40 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-electric-600 peer-checked:to-indigo-600"></div>
                              </label>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === 'appearance' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Appearance Settings</h3>
                    <div className="inline-flex items-center p-1 rounded-full border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70">
                      {['Light','Dark','System'].map((m) => (
                        <button
                          key={m}
                          onClick={() => setThemeMode(m)}
                          className={`px-3 py-1.5 text-sm rounded-full transition-all ${themeMode === m ? 'bg-teal-600 text-white' : 'text-gray-700 dark:text-gray-300'}`}
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Theme
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 focus:ring-2 focus:ring-electric-500 focus:border-electric-500">
                          <option>Light</option>
                          <option>Dark</option>
                          <option>System</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Language
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 focus:ring-2 focus:ring-electric-500 focus:border-electric-500">
                          <option>English</option>
                          <option>Spanish</option>
                          <option>French</option>
                          <option>German</option>
                        </select>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center gap-3">
                      {['#d946ef','#6366f1','#22d3ee','#10b981','#f59e0b'].map((c) => (
                        <button key={c} className="h-8 w-8 rounded-full border border-white/50 shadow ring-2 ring-transparent hover:ring-white/50" style={{ background: c }} />
                      ))}
                    </div>
                  </div>
                )}

                {activeSection === 'general' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">General Settings</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Time Zone
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 focus:ring-2 focus:ring-electric-500 focus:border-electric-500">
                          <option>UTC-8 (Pacific Time)</option>
                          <option>UTC-5 (Eastern Time)</option>
                          <option>UTC+0 (GMT)</option>
                          <option>UTC+1 (Central European Time)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Date Format
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 focus:ring-2 focus:ring-electric-500 focus:border-electric-500">
                          <option>MM/DD/YYYY</option>
                          <option>DD/MM/YYYY</option>
                          <option>YYYY-MM-DD</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === 'privacy' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Privacy Settings</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">Analytics Tracking</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Allow analytics to improve our service</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" defaultChecked className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-electric-300/40 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-electric-600 peer-checked:to-indigo-600"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">Data Sharing</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Share anonymized data for research</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-electric-300/40 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-electric-600 peer-checked:to-indigo-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
            </div>
          </motion.div>
        </div>
      
    </div>
  );
}
