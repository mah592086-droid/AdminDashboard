import { useEffect, useMemo, useRef, useState } from 'react';
import SimpleBarChart from './SimpleBarChart';

export default function DonutChart() {
  const containerRef = useRef(null);
  const chartRef = useRef(null);
  const [hasError, setHasError] = useState(false);

  const option = useMemo(() => {
    return {
      tooltip: { trigger: 'item' },
      legend: { bottom: 0, textStyle: { color: '#9CA3AF' } },
      color: ['#22d3ee', '#a855f7', '#f59e0b', '#ef4444'],
      series: [
        {
          name: 'Content Mix',
          type: 'pie',
          radius: ['55%', '80%'],
          avoidLabelOverlap: false,
          itemStyle: { borderRadius: 6, borderColor: '#111827', borderWidth: 2 },
          label: { show: false },
          emphasis: { label: { show: true, fontSize: 14, fontWeight: 600 } },
          labelLine: { show: false },
          data: [
            { value: 44, name: 'Images' },
            { value: 26, name: 'Reels' },
            { value: 18, name: 'Stories' },
            { value: 12, name: 'Threads' }
          ]
        }
      ]
    };
  }, []);

  useEffect(() => {
    let disposed = false;
    import('echarts')
      .then((echarts) => {
        if (!containerRef.current) return;
        const instance = echarts.init(containerRef.current);
        chartRef.current = instance;
        instance.setOption(option);
        const onResize = () => instance.resize();
        window.addEventListener('resize', onResize);
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
    return <SimpleBarChart />;
  }
  return <div ref={containerRef} style={{ height: 280, width: '100%' }} />;
}


