import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import SimpleChart from './SimpleChart';

export default function AreaChart() {
  const containerRef = useRef(null);
  const chartRef = useRef(null);
  const [hasError, setHasError] = useState(false);

  const option = useMemo(() => {
    return {
      grid: { left: 24, right: 16, top: 32, bottom: 24, containLabel: true },
      tooltip: { trigger: 'axis' },
      legend: { top: 0, textStyle: { color: '#9CA3AF' } },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        boundaryGap: false,
        axisLine: { lineStyle: { color: '#374151' } },
        axisLabel: { color: '#9CA3AF' }
      },
      yAxis: {
        type: 'value',
        axisLine: { show: false },
        splitLine: { lineStyle: { color: 'rgba(148,163,184,0.2)' } },
        axisLabel: { color: '#9CA3AF' }
      },
      color: ['#a855f7', '#22d3ee'],
      series: [
        {
          name: 'Impressions',
          type: 'line',
          smooth: true,
          data: [920, 1040, 990, 1250, 1430, 1510, 1320],
          areaStyle: { opacity: 0.25 },
          lineStyle: { width: 3 }
        },
        {
          name: 'Engagements',
          type: 'line',
          smooth: true,
          data: [120, 160, 150, 210, 240, 260, 230],
          areaStyle: { opacity: 0.25 },
          lineStyle: { width: 3 }
        }
      ]
    };
  }, []);

  useEffect(() => {
    let echartsModule;
    let disposed = false;
    import('echarts')
      .then((echarts) => {
        if (!containerRef.current) return;
        echartsModule = echarts;
        const instance = echarts.init(containerRef.current);
        chartRef.current = instance;
        instance.setOption(option);
        const onResize = () => instance.resize();
        window.addEventListener('resize', onResize);
        // Apply gradient areas after init (for widest compat)
        try {
          const opts = instance.getOption();
          if (echarts.graphic && opts.series) {
            const setGrad = (colorTop, colorBottom) =>
              new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: colorTop },
                { offset: 1, color: colorBottom },
              ]);
            opts.series[0].areaStyle = { opacity: 0.25, color: setGrad('rgba(168,85,247,0.4)', 'rgba(168,85,247,0.05)') };
            opts.series[1].areaStyle = { opacity: 0.25, color: setGrad('rgba(34,211,238,0.35)', 'rgba(34,211,238,0.05)') };
            instance.setOption(opts);
          }
        } catch {}
        return () => {
          window.removeEventListener('resize', onResize);
          if (!disposed) {
            instance.dispose();
            chartRef.current = null;
          }
        };
      })
      .catch(() => setHasError(true));
    return () => {
      disposed = true;
      if (chartRef.current) {
        try {
          chartRef.current.dispose();
        } catch {}
        chartRef.current = null;
      }
    };
  }, [option]);

  if (hasError) {
    return <SimpleChart />;
  }

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <div ref={containerRef} style={{ height: 320, width: '100%' }} />
    </motion.div>
  );
}


