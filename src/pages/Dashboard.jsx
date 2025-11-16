import React from 'react';
import { motion } from 'framer-motion';
import ChartsSection from '../components/ChartsSection';

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-deep-blue via-midnight-600 to-electric-700 opacity-10 animate-gradient bg-[length:300%_300%]" />
        <div className="relative p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">SocialPulse Overview</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">Unified social analytics across posts, stories, and reels</p>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'DAU', value: 128420, delta: '+4.1%', color: 'from-electric-500 to-indigo-500', glow: 'shadow-electric-500/40' },
              { label: 'Impressions', value: 9300000, delta: '+12.3%', color: 'from-purple-500 to-pink-500', glow: 'shadow-purple-500/40' },
              { label: 'Engagement', value: 5.8, suffix: '%', delta: '+0.6%', color: 'from-teal-400 to-emerald-500', glow: 'shadow-emerald-500/40' },
              { label: 'New Followers', value: 7842, delta: '+2.2%', color: 'from-amber-400 to-rose-500', glow: 'shadow-amber-500/40' },
            ].map((k, i) => (
              <KpiCard key={k.label} index={i} {...k} />
            ))}
          </div>
        </div>
      </motion.div>

      <ChartsSection />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Highlights</h3>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: 'Best time to post', desc: 'Wed 11:00–13:00 shows peak engagement this week.' },
            { title: 'Top content', desc: 'Reels outperform images by 1.8x engagement.' },
            { title: 'Audience growth', desc: 'Creators aged 18–24 grew 3.2% WoW.' },
          ].map((h, i) => (
            <motion.div
              key={h.title}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.05 * i }}
              className="p-4 rounded-lg border border-gray-200 dark:border-gray-700"
            >
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{h.title}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{h.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function KpiCard({ label, value, suffix = '', delta, color, glow, index }) {
  const [hovered, setHovered] = React.useState(false);
  const animated = useCountUp(value, 900 + index * 150);
  const formatted =
    typeof value === 'number'
      ? value >= 1000000
        ? `${(animated / 1000000).toFixed(1)}M`
        : animated >= 1000
        ? `${Math.floor(animated).toLocaleString()}`
        : `${animated.toFixed(suffix ? 1 : 0)}`
      : value;

  const spark = makeSparkline(index);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative p-0.5 rounded-2xl"
      style={{ perspective: 700 }}
    >
      <motion.div
        className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${color} opacity-70 blur-xl transition-opacity`}
        animate={{ opacity: hovered ? 0.9 : 0.5 }}
      />
      <motion.div
        className="relative rounded-2xl bg-white/80 dark:bg-gray-900/70 border border-white/20 dark:border-white/10 backdrop-blur-xl overflow-hidden shadow-xl"
        style={{ transformStyle: 'preserve-3d' }}
        whileHover={{ rotateX: -3, rotateY: 3, translateZ: 6 }}
        transition={{ type: 'spring', stiffness: 300, damping: 18 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent pointer-events-none" />
        <div className="p-4">
          <div className="flex items-start justify-between">
            <p className="text-xs font-medium text-gray-600 dark:text-gray-300">{label}</p>
            <span className="text-[10px] px-2 py-1 rounded-full bg-emerald-100/70 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 font-semibold">
              {delta}
            </span>
          </div>
          <div className="mt-2 flex items-end justify-between">
            <div>
              <div className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                {formatted}
                {suffix}
              </div>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">vs last period</p>
            </div>
            <div className="ml-3 h-10 w-20">
              <Sparkline data={spark} colorClass={color} />
            </div>
          </div>
        </div>
        <motion.div
          className={`absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-gradient-to-tr ${color} opacity-40 ${glow}`}
          animate={{ scale: hovered ? 1.1 : 1, rotate: hovered ? 25 : 0 }}
          transition={{ duration: 0.6 }}
        />
      </motion.div>
    </motion.div>
  );
}

function Sparkline({ data, colorClass }) {
  const points = data.map((y, i) => `${(i / (data.length - 1)) * 80},${20 - y}`).join(' ');
  return (
    <svg viewBox="0 0 80 20" className="h-10 w-20">
      <polyline
        fill="none"
        strokeWidth="2"
        className={`stroke-current text-transparent`}
        points={points}
      />
      <defs>
        <linearGradient id="spark" x1="0" x2="1">
          <stop offset="0%" stopColor="currentColor" />
          <stop offset="100%" stopColor="currentColor" />
        </linearGradient>
      </defs>
      <polyline
        fill="none"
        stroke="url(#spark)"
        strokeWidth="2"
        points={points}
        className={`text-electric-500`}
      />
    </svg>
  );
}

function useCountUp(target, duration = 1000) {
  const [val, setVal] = React.useState(0);
  React.useEffect(() => {
    let raf;
    const start = performance.now();
    const from = 0;
    const to = typeof target === 'number' ? target : 0;
    const animate = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(from + (to - from) * eased);
      if (t < 1) raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return val;
}

function makeSparkline(seed = 0) {
  const len = 16;
  const arr = [];
  let prev = 10 + (seed % 5);
  for (let i = 0; i < len; i++) {
    prev = Math.max(2, Math.min(18, prev + (Math.random() * 6 - 3)));
    arr.push(prev);
  }
  return arr;
}
