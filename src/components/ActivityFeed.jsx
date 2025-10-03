import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { io } from 'socket.io-client';
import { useDashboardStore } from '../store/dashboard.js';

export default function ActivityFeed(){
  const { notifications, pushNotification } = useDashboardStore();

  useEffect(() => {
    const socket = io('https://example-socket-server.invalid', { autoConnect: false });
    // Demo: simulate incoming events instead of connecting for real
    const interval = setInterval(() => {
      const t = ['User signup','Payment received','Bug fixed','Deployed to prod'][Math.floor(Math.random()*4)];
      pushNotification({ t, at: new Date().toLocaleTimeString() });
    }, 2000);
    return () => clearInterval(interval);
  }, [pushNotification]);

  return (
    <div className='p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white/60 dark:bg-gray-950/40'>
      <h3 className='font-semibold mb-3'>Live activity</h3>
      <AnimatePresence initial={false}>
        {notifications.map((n, idx) => (
          <motion.div key={idx} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className='py-2 border-b border-gray-100 dark:border-gray-800'>
            <div className='text-sm'>{n.t}</div>
            <div className='text-xs text-gray-500'>{n.at}</div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
