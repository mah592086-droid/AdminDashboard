import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldExclamationIcon, XMarkIcon, CheckIcon, MagnifyingGlassIcon, SparklesIcon } from '@heroicons/react/24/outline';

const mockReports = Array.from({ length: 18 }).map((_, i) => ({
  id: `r-${i}`,
  postTitle: `Post ${i + 1}`,
  reason: ['Spam', 'Harassment', 'Nudity', 'Misinformation'][i % 4],
  reporter: ['alice', 'bob', 'chris', 'diana'][i % 4],
  createdAt: `${Math.floor(Math.random() * 59) + 1}m`,
  severity: ['low', 'medium', 'high'][i % 3],
  status: 'open',
}));

export default function Moderation() {
  const [query, setQuery] = useState('');
  const [onlyHigh, setOnlyHigh] = useState(false);
  const [reports, setReports] = useState(mockReports);
  const [tab, setTab] = useState('open');

  const filtered = useMemo(() => {
    return reports.filter((r) => {
      const matches = `${r.postTitle} ${r.reason} ${r.reporter}`.toLowerCase().includes(query.toLowerCase());
      const high = !onlyHigh || r.severity === 'high';
      return matches && high && r.status === tab;
    });
  }, [reports, query, onlyHigh, tab]);

  const resolve = (id) => {
    setReports((prev) => prev.map((r) => (r.id === id ? { ...r, status: 'resolved' } : r)));
  };
  const reject = (id) => {
    setReports((prev) => prev.map((r) => (r.id === id ? { ...r, status: 'rejected' } : r)));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/60 backdrop-blur-xl"
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-20 -right-20 h-64 w-64 bg-electric-600/20 blur-3xl rounded-full" />
          <div className="absolute bottom-0 -left-10 h-52 w-52 bg-indigo-500/20 blur-3xl rounded-full" />
        </div>
        <div className="relative p-6 sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-amber-500 to-rose-500 text-white flex items-center justify-center shadow-lg shadow-rose-500/30">
                <ShieldExclamationIcon className="h-5 w-5" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Moderation Center</h1>
                <p className="text-gray-600 dark:text-gray-300">Review reports, protect community, stay fair</p>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-3">
              <label className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                <input type="checkbox" checked={onlyHigh} onChange={(e) => setOnlyHigh(e.target.checked)} />
                High severity
              </label>
            </div>
          </div>
          {/* Tabs */}
          <div className="mt-5 flex items-center gap-2">
            {['open','resolved','rejected'].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-3 py-1.5 rounded-lg text-sm border transition-all ${
                  tab === t
                    ? 'bg-electric-600 text-white border-electric-600'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                {t[0].toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Top stats & filters */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4"
        >
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600 dark:text-gray-300">Open Reports</p>
            <SparklesIcon className="h-4 w-4 text-amber-500" />
          </div>
          <div className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">{reports.filter(r => r.status === 'open').length}</div>
          <div className="mt-3 h-2 rounded-full bg-gray-100 dark:bg-gray-700">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(100, (filtered.length / Math.max(1, reports.length)) * 100)}%` }}
              transition={{ duration: 0.6 }}
              className="h-2 rounded-full bg-gradient-to-r from-amber-500 to-rose-500"
            />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4"
        >
          <p className="text-sm text-gray-600 dark:text-gray-300">Severity Mix</p>
          <div className="mt-3 flex items-center gap-2">
            {['low','medium','high'].map((s, i) => {
              const count = reports.filter(r => r.status === tab && r.severity === s).length;
              const colors = s === 'high' ? 'bg-rose-500' : s === 'medium' ? 'bg-amber-500' : 'bg-emerald-500';
              return (
                <div key={s} className="flex-1">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="capitalize">{s}</span><span>{count}</span>
                  </div>
                  <div className="mt-1 h-2 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${Math.min(100, count * 8)}%` }} transition={{ duration: 0.6, delay: i * 0.05 }} className={`h-2 ${colors}`} />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.1 }}
          className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4"
        >
          <div className="relative">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
            <input
              className="pl-10 pr-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 w-full"
              placeholder="Search reports, reasons, reporters"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
            Showing {filtered.length} of {reports.filter(r => r.status === tab).length} {tab}
          </div>
        </motion.div>
      </div>

      {/* List */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldExclamationIcon className="h-5 w-5 text-amber-500" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 capitalize">{tab} Reports</h2>
            <span className="text-xs px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300">
              {filtered.length}
            </span>
          </div>
        </div>

        <div className="divide-y divide-gray-100 dark:divide-gray-700">
          <AnimatePresence initial={false}>
            {filtered.map((r, i) => {
              const badge =
                r.severity === 'high'
                  ? 'bg-rose-500/15 text-rose-500'
                  : r.severity === 'medium'
                  ? 'bg-amber-500/15 text-amber-500'
                  : 'bg-emerald-500/15 text-emerald-500';
              return (
                <motion.div
                  key={r.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, delay: i * 0.02 }}
                  className="px-5 py-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className={`h-10 w-10 rounded-xl flex items-center justify-center text-sm font-semibold ${badge} border border-white/10`}>
                        {r.severity[0].toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-gray-900 dark:text-white">{r.postTitle}</p>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full capitalize ${badge} border border-transparent`}>
                            {r.severity}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {r.reason} • reported by <span className="font-medium text-gray-700 dark:text-gray-300">@{r.reporter}</span> • {r.createdAt}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {tab === 'open' ? (
                        <>
                          <motion.button
                            whileHover={{ scale: 1.03, y: -1 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => reject(r.id)}
                            className="relative overflow-hidden inline-flex items-center gap-2 px-3 py-2 rounded-full border border-rose-300/50 text-rose-600 dark:text-rose-300 bg-white dark:bg-gray-900 hover:bg-rose-500/10 shadow-sm hover:shadow-rose-500/20"
                          >
                            <motion.span
                              aria-hidden
                              initial={{ x: '-120%' }}
                              whileHover={{ x: '120%' }}
                              transition={{ duration: 0.8 }}
                              className="pointer-events-none absolute inset-y-0 -left-10 w-10 bg-gradient-to-r from-rose-400/0 via-rose-400/20 to-rose-400/0"
                            />
                            <XMarkIcon className="h-5 w-5" />
                            <span className="text-sm font-medium">Dismiss</span>
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.06, y: -1 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => resolve(r.id)}
                            className="relative overflow-hidden inline-flex items-center gap-2 px-3 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md hover:shadow-emerald-500/30"
                          >
                            <motion.span
                              aria-hidden
                              initial={{ x: '-120%' }}
                              whileHover={{ x: '120%' }}
                              transition={{ duration: 0.8 }}
                              className="pointer-events-none absolute inset-y-0 -left-10 w-10 bg-white/20"
                            />
                            <CheckIcon className="h-5 w-5" />
                            <span className="text-sm font-semibold">Resolve</span>
                          </motion.button>
                        </>
                      ) : (
                        <span className="text-xs px-2 py-1 rounded bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-300 capitalize">
                          {tab}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}


