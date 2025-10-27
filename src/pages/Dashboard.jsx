import { motion } from 'framer-motion';
import { 
  ChartBarIcon, 
  UsersIcon, 
  CurrencyDollarIcon, 
  ArrowUpIcon,
  ArrowDownIcon
} from '@heroicons/react/24/outline';
import LineChart from '../components/LineChart';
import StatsGrid from '../components/StatsGrid';
import ErrorBoundary from '../components/ErrorBoundary';
import ChartsSection from '../components/ChartsSection';

const stats = [
  {
    name: 'Total Revenue',
    value: '$45,231',
    change: '+12.5%',
    changeType: 'positive',
    icon: CurrencyDollarIcon,
  },
  {
    name: 'Active Users',
    value: '2,847',
    change: '+8.2%',
    changeType: 'positive',
    icon: UsersIcon,
  },
  {
    name: 'Conversion Rate',
    value: '3.2%',
    change: '-2.1%',
    changeType: 'negative',
    icon: ChartBarIcon,
  },
  {
    name: 'Total Orders',
    value: '1,234',
    change: '+15.3%',
    changeType: 'positive',
    icon: ChartBarIcon,
  },
];

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-6"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 opacity-5 rounded-xl" />
          <div className="relative p-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg">Welcome to your admin dashboard</p>
            <div className="mt-4 flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span>System Online</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <span>Last updated: {new Date().toLocaleTimeString()}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <StatsGrid stats={stats} />

        {/* Charts Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <ChartsSection />
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
        >
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4">
            <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
            <p className="text-indigo-100 text-sm">Latest system events</p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {[
                { action: 'New user registered', time: '2 minutes ago', type: 'user', icon: '👤' },
                { action: 'Order #1234 completed', time: '5 minutes ago', type: 'order', icon: '📦' },
                { action: 'Payment received', time: '10 minutes ago', type: 'payment', icon: '💳' },
                { action: 'New product added', time: '15 minutes ago', type: 'product', icon: '🛍️' },
              ].map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="flex items-center space-x-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-lg hover:from-gray-100 hover:to-gray-200 dark:hover:from-gray-600 dark:hover:to-gray-500 transition-all duration-200 group"
                >
                  <div className="text-2xl">{activity.icon}</div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {activity.action}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${
                    activity.type === 'user' ? 'bg-blue-500' :
                    activity.type === 'order' ? 'bg-green-500' :
                    activity.type === 'payment' ? 'bg-purple-500' : 'bg-orange-500'
                  } animate-pulse`} />
                </motion.div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-600">
              <button className="w-full text-center text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium">
                View All Activity →
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
