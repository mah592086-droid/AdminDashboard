import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { FunnelIcon, MagnifyingGlassIcon, ArrowTrendingUpIcon, FlagIcon } from '@heroicons/react/24/outline';
import BarChart from '../components/BarChart';
import LineChart from '../components/LineChart';

const allPosts = Array.from({ length: 12 }).map((_, i) => ({
  id: `mp-${i}`,
  title: `Campaign Post #${i + 1}`,
  status: i % 3 === 0 ? 'scheduled' : i % 3 === 1 ? 'published' : 'draft',
  impressions: Math.floor(10000 + Math.random() * 90000),
  engagementRate: Number((2 + Math.random() * 8).toFixed(2)),
  reports: Math.floor(Math.random() * 12),
}));

export default function Posts() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');
  const [sort, setSort] = useState('impressions-desc');

  const filtered = useMemo(() => {
    let data = allPosts.filter((p) => p.title.toLowerCase().includes(query.toLowerCase()));
    if (status !== 'all') data = data.filter((p) => p.status === status);
    const [field, dir] = sort.split('-');
    data.sort((a, b) => (dir === 'asc' ? a[field] - b[field] : b[field] - a[field]));
    return data;
  }, [query, status, sort]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Posts & Campaigns</h1>
          <p className="text-gray-600 dark:text-gray-300">Manage content and track performance</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-3.5" />
            <input
              className="pl-10 pr-4 py-2 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700"
              placeholder="Search posts"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <select
              className="px-3 py-2 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="all">All statuses</option>
              <option value="published">Published</option>
              <option value="scheduled">Scheduled</option>
              <option value="draft">Draft</option>
            </select>
            <select
              className="px-3 py-2 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="impressions-desc">Impressions (high → low)</option>
              <option value="impressions-asc">Impressions (low → high)</option>
              <option value="engagementRate-desc">Engagement (high → low)</option>
              <option value="engagementRate-asc">Engagement (low → high)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-100 dark:border-gray-700"
        >
          <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Posts</h2>
            <div className="inline-flex items-center text-xs px-2 py-1 rounded bg-electric-100 dark:bg-electric-900 text-electric-700 dark:text-electric-300">
              <FunnelIcon className="h-4 w-4 mr-1" />
              {filtered.length} results
            </div>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {filtered.map((p) => (
              <div key={p.id} className="px-5 py-4 flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">{p.title}</p>
                  <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Status:{' '}
                    <span
                      className={`px-2 py-0.5 rounded ${
                        p.status === 'published'
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                          : p.status === 'scheduled'
                          ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300'
                          : 'bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {p.status}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{p.impressions.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">Impressions</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{p.engagementRate}%</p>
                    <p className="text-xs text-gray-500">Engagement</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{p.reports}</p>
                    <p className="text-xs text-gray-500">Reports</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-100 dark:border-gray-700"
        >
          <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Performance Snapshot</h3>
          </div>
          <div className="p-4 space-y-4">
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Avg ER', value: '4.2%', tone: 'text-electric-500' },
                { label: 'Total Impr.', value: '1.4M', tone: 'text-indigo-500' },
                { label: 'Reports', value: '64', tone: 'text-amber-500' },
              ].map((k) => (
                <div key={k.label} className="p-3 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
                  <p className="text-xs text-gray-500">{k.label}</p>
                  <p className={`mt-1 text-lg font-semibold ${k.tone}`}>{k.value}</p>
                </div>
              ))}
            </div>
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-3">
              <div className="flex items-center gap-2 mb-2">
                <ArrowTrendingUpIcon className="h-4 w-4 text-green-500" />
                <p className="text-xs text-gray-500">Engagement Trend</p>
              </div>
              <LineChart />
            </div>
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-3">
              <div className="flex items-center gap-2 mb-2">
                <FlagIcon className="h-4 w-4 text-amber-500" />
                <p className="text-xs text-gray-500">Reports by Category</p>
              </div>
              <BarChart />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

