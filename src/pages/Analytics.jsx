import { motion } from 'framer-motion';
import LineChart from '../components/LineChart';
import BarChart from '../components/BarChart';

export default function Analytics() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Social Analytics</h1>
        <p className="text-gray-600 dark:text-gray-300">Real-time insights across your platform</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'DAU', value: '128,420', delta: '+4.1%' },
          { label: 'Impressions', value: '9.3M', delta: '+12.3%' },
          { label: 'Engagement Rate', value: '5.8%', delta: '+0.6%' },
          { label: 'New Followers', value: '7,842', delta: '+2.2%' },
        ].map((k, i) => (
          <motion.div
            key={k.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.05 }}
            className="rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4"
          >
            <p className="text-xs text-gray-500 dark:text-gray-400">{k.label}</p>
            <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-gray-100">{k.value}</p>
            <p className="mt-2 text-xs text-emerald-600 dark:text-emerald-400">{k.delta} vs last period</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5"
        >
          <div className="mb-3">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Engagement Over Time</h3>
            <p className="text-xs text-gray-500">Daily engagement rate</p>
          </div>
          <LineChart />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5"
        >
          <div className="mb-3">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Content Performance</h3>
            <p className="text-xs text-gray-500">Top categories by impressions</p>
          </div>
          <BarChart />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5"
        >
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">Growth Funnel</h3>
          <div className="space-y-3">
            {[
              { label: 'Reach', value: '12.4M', width: '100%', tone: 'bg-indigo-500' },
              { label: 'Views', value: '7.9M', width: '70%', tone: 'bg-electric-500' },
              { label: 'Likes', value: '1.9M', width: '26%', tone: 'bg-emerald-500' },
              { label: 'Comments', value: '320k', width: '8%', tone: 'bg-amber-500' },
              { label: 'Shares', value: '210k', width: '6%', tone: 'bg-rose-500' },
            ].map((s) => (
              <div key={s.label}>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{s.label}</span>
                  <span>{s.value}</span>
                </div>
                <div className="h-3 bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden mt-1">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: s.width }}
                    transition={{ duration: 0.8 }}
                    className={`h-full ${s.tone}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5"
        >
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">Realtime Activity</h3>
          <div className="space-y-2">
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: i * 0.05 }}
                className="text-xs text-gray-600 dark:text-gray-300 p-2 rounded bg-gray-50 dark:bg-gray-900"
              >
                {Math.floor(Math.random() * 90) + 10}s ago • {['like', 'comment', 'share'][i % 3]} on Post #{(i % 8) + 1}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.1 }}
          className="rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5"
        >
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">Top Creators</h3>
          <div className="space-y-3">
            {['Ava', 'Marco', 'Zara', 'Noah', 'Leo'].map((n, i) => (
              <div key={n} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-electric-600 text-white flex items-center justify-center text-xs font-bold">
                    {n[0]}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{n}</p>
                    <p className="text-xs text-gray-500">Followers: {(100 + i * 27).toLocaleString()}</p>
                  </div>
                </div>
                <span className="text-xs px-2 py-1 rounded bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300">
                  +{(2.1 + i * 0.6).toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}


