import { motion } from 'framer-motion';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/outline';

export default function StatsGrid({ stats }) {
  const getGradientColors = (index) => {
    const gradients = [
      'from-blue-500 to-blue-600',
      'from-green-500 to-green-600', 
      'from-purple-500 to-purple-600',
      'from-orange-500 to-orange-600'
    ];
    return gradients[index % gradients.length];
  };

  const getIconBgColor = (index) => {
    const colors = [
      'bg-blue-100',
      'bg-green-100',
      'bg-purple-100', 
      'bg-orange-100'
    ];
    return colors[index % colors.length];
  };

  const getIconColor = (index) => {
    const colors = [
      'text-blue-600',
      'text-green-600',
      'text-purple-600',
      'text-orange-600'
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.name}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            duration: 0.6, 
            delay: index * 0.1,
            type: "spring",
            stiffness: 100
          }}
          whileHover={{ 
            scale: 1.02,
            y: -2,
            transition: { duration: 0.2 }
          }}
          className="relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
        >
          {/* Gradient Background */}
          <div className={`absolute inset-0 bg-gradient-to-br ${getGradientColors(index)} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
          
          {/* Content */}
          <div className="relative p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${getIconBgColor(index)} group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className={`h-6 w-6 ${getIconColor(index)}`} />
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
                  stat.changeType === 'positive' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {stat.changeType === 'positive' ? (
                  <ArrowUpIcon className="h-3 w-3" />
                ) : (
                  <ArrowDownIcon className="h-3 w-3" />
                )}
                <span>{stat.change}</span>
              </motion.div>
            </div>
            
            <div className="space-y-2">
              <motion.p 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="text-sm font-medium text-gray-600"
              >
                {stat.name}
              </motion.p>
              <motion.p 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="text-3xl font-bold text-gray-900"
              >
                {stat.value}
              </motion.p>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-20 h-20 opacity-10">
              <div className={`w-full h-full bg-gradient-to-br ${getGradientColors(index)} rounded-full transform translate-x-8 -translate-y-8`} />
            </div>
          </div>

          {/* Hover Effect Border */}
          <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-indigo-200 transition-colors duration-300" />
        </motion.div>
      ))}
    </div>
  );
}
