import { motion } from 'framer-motion';

export default function SimpleChart() {
  const data = [12000, 19000, 15000, 25000, 22000, 30000, 28000, 35000, 32000, 40000, 38000, 45000];
  const maxValue = Math.max(...data);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="h-[300px] w-full"
    >
      <div className="h-full flex items-end justify-between space-x-1">
        {data.map((value, index) => {
          const height = (value / maxValue) * 100;
          return (
            <motion.div
              key={index}
              initial={{ height: 0 }}
              animate={{ height: `${height}%` }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-indigo-500 rounded-t flex-1 relative group"
            >
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                ${value.toLocaleString()}
              </div>
            </motion.div>
          );
        })}
      </div>
      <div className="flex justify-between mt-4 text-xs text-gray-500">
        {months.map((month, index) => (
          <span key={index} className="flex-1 text-center">
            {month}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
