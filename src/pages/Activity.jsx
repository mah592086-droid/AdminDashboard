import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChartBarIcon, 
  ClockIcon, 
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  BoltIcon
} from '@heroicons/react/24/outline';
import ActivityFeed from '../components/ActivityFeed';

const activities = [
  {
    id: 1,
    type: 'success',
    title: 'Payment processed successfully',
    description: 'Payment of $1,250.00 from customer@example.com',
    time: '2 minutes ago',
    icon: CheckCircleIcon,
  },
  {
    id: 2,
    type: 'warning',
    title: 'High server load detected',
    description: 'Server CPU usage reached 85% on production',
    time: '5 minutes ago',
    icon: ExclamationTriangleIcon,
  },
  {
    id: 3,
    type: 'info',
    title: 'New user registration',
    description: 'User john.doe@example.com has registered',
    time: '10 minutes ago',
    icon: InformationCircleIcon,
  },
  {
    id: 4,
    type: 'success',
    title: 'Database backup completed',
    description: 'Daily backup completed successfully',
    time: '1 hour ago',
    icon: CheckCircleIcon,
  },
  {
    id: 5,
    type: 'warning',
    title: 'SSL certificate expires soon',
    description: 'SSL certificate will expire in 15 days',
    time: '2 hours ago',
    icon: ExclamationTriangleIcon,
  },
  {
    id: 6,
    type: 'info',
    title: 'System maintenance scheduled',
    description: 'Maintenance window scheduled for tomorrow 2 AM',
    time: '3 hours ago',
    icon: InformationCircleIcon,
  },
];

const getActivityColor = (type) => {
  switch (type) {
    case 'success':
      return 'text-emerald-600 bg-emerald-100';
    case 'warning':
      return 'text-amber-600 bg-amber-100';
    case 'info':
      return 'text-sky-600 bg-sky-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
};

export default function Activity() {
  return (
    <div className="p-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/60 backdrop-blur-xl">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -right-24 h-56 w-56 rounded-full bg-electric-600/20 blur-3xl" />
          <div className="absolute bottom-0 -left-10 h-48 w-48 rounded-full bg-indigo-500/20 blur-3xl" />
        </div>
        <div className="relative p-6 sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-electric-600 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-electric-600/30">
                <BoltIcon className="h-5 w-5" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Live Activity</h1>
                <p className="text-gray-600 dark:text-gray-300">System events, user actions, and alerts</p>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-xs">
              <span className="px-2 py-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">Realtime</span>
              <span className="px-2 py-1 rounded-full bg-sky-500/15 text-sky-600 dark:text-sky-400">Synced</span>
            </div>
          </div>
          <div className="mt-5 relative overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
            <div className="whitespace-nowrap animate-scroll text-xs text-gray-600 dark:text-gray-300 py-2">
              <span className="mx-6">New user registration •</span>
              <span className="mx-6">Backup completed •</span>
              <span className="mx-6">Payment processed •</span>
              <span className="mx-6">System maintenance scheduled •</span>
              <span className="mx-6">SSL cert check •</span>
            </div>
          </div>
        </div>
      </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 overflow-hidden"
          >
            <div className="flex items-center">
              <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                <CheckCircleIcon className="h-6 w-6 text-emerald-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Successful Events</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">1,234</p>
              </div>
            </div>
            <div className="mt-4 h-2 rounded-full bg-gray-100 dark:bg-gray-700">
              <motion.div initial={{ width: 0 }} animate={{ width: '78%' }} transition={{ duration: 0.8 }} className="h-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 overflow-hidden"
          >
            <div className="flex items-center">
              <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/30">
                <ExclamationTriangleIcon className="h-6 w-6 text-amber-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Warnings</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">23</p>
              </div>
            </div>
            <div className="mt-4 h-2 rounded-full bg-gray-100 dark:bg-gray-700">
              <motion.div initial={{ width: 0 }} animate={{ width: '32%' }} transition={{ duration: 0.8 }} className="h-2 rounded-full bg-gradient-to-r from-amber-500 to-rose-500" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 overflow-hidden"
          >
            <div className="flex items-center">
              <div className="p-2 rounded-lg bg-sky-100 dark:bg-sky-900/30">
                <ClockIcon className="h-6 w-6 text-sky-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Events</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">5,678</p>
              </div>
            </div>
            <div className="mt-4 h-2 rounded-full bg-gray-100 dark:bg-gray-700">
              <motion.div initial={{ width: 0 }} animate={{ width: '64%' }} transition={{ duration: 0.8 }} className="h-2 rounded-full bg-gradient-to-r from-sky-500 to-indigo-500" />
            </div>
          </motion.div>
        </div>

        {/* Live Activity Feed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-6"
        >
          <ActivityFeed />
        </motion.div>

        {/* Activity List */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.15 }} className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h3>
          </div>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-electric-500/0 via-electric-500/30 to-electric-500/0" />
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              <AnimatePresence>
                {activities.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35, delay: index * 0.05 }}
                    className="p-6"
                  >
                    <div className="flex items-start gap-4">
                      <div className="relative">
                        <div className={`p-2 rounded-lg ${getActivityColor(activity.type)} shadow-sm`}><activity.icon className="h-5 w-5" /></div>
                        <div className="absolute left-1/2 -translate-x-1/2 top-9 h-8 w-0.5 bg-gray-200 dark:bg-gray-700" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">{activity.title}</p>
                          <span className="text-xs text-gray-400">{activity.time}</span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{activity.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        
      </motion.div>
    </div>
  );
}
