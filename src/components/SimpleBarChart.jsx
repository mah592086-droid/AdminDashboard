import { motion } from 'framer-motion';

export default function SimpleBarChart() {
  const data = [
    { label: 'CPU Usage', value: 75, color: 'bg-green-500' },
    { label: 'Memory', value: 68, color: 'bg-yellow-500' },
    { label: 'Disk I/O', value: 45, color: 'bg-red-500' },
    { label: 'Network', value: 82, color: 'bg-purple-500' },
  ];

  return (
    <div className="h-[300px] w-full p-4">
      <div className="h-full flex items-end justify-between space-x-3">
        {data.map((item, index) => (
          <div key={item.label} className="flex-1 flex flex-col items-center h-full">
            <div className="flex-1 flex items-end w-full">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${item.value}%` }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className={`w-full ${item.color} rounded-t relative group min-h-[20px]`}
                style={{ minHeight: '20px' }}
              >
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {item.value}%
                </div>
              </motion.div>
            </div>
            <div className="mt-2 text-xs text-gray-600 text-center font-medium">
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
