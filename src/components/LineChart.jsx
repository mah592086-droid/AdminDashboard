import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import SimpleChart from './SimpleChart';

// Dynamic import to avoid SSR issues
let Chart;
try {
  Chart = require('react-apexcharts').default;
} catch (error) {
  console.warn('ApexCharts not available, using fallback chart');
}

export default function LineChart() {
  const chartRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);
  const [useFallback, setUseFallback] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const options = {
    chart: {
      type: 'line',
      height: 300,
      toolbar: {
        show: false,
      },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
      },
      redrawOnParentResize: true,
      redrawOnWindowResize: true,
    },
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    colors: ['#6366f1'],
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      labels: {
        style: {
          colors: '#6b7280',
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: '#6b7280',
        },
        formatter: (value) => `$${value.toLocaleString()}`,
      },
    },
    grid: {
      borderColor: '#f3f4f6',
    },
    tooltip: {
      theme: 'light',
      y: {
        formatter: (value) => `$${value.toLocaleString()}`,
      },
    },
  };

  const series = [
    {
      name: 'Revenue',
      data: [12000, 19000, 15000, 25000, 22000, 30000, 28000, 35000, 32000, 40000, 38000, 45000],
    },
  ];

  if (!isMounted) {
    return (
      <div className="h-[300px] flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Loading chart...</div>
      </div>
    );
  }

  // Use fallback chart if ApexCharts is not available or there's an error
  if (!Chart || useFallback) {
    return <SimpleChart />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Chart
        ref={chartRef}
        options={options}
        series={series}
        type="line"
        height={300}
        width="100%"
        onError={() => setUseFallback(true)}
      />
    </motion.div>
  );
}
