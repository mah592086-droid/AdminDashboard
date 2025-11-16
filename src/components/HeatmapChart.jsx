import { useEffect, useMemo, useRef, useState } from 'react';
import SimpleBarChart from './SimpleBarChart';

function generateData(count, yrange) {
  const series = [];
  for (let i = 0; i < count; i++) {
    series.push({
      x: `W${i + 1}`,
      y: Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min
    });
  }
  return series;
}

export default function HeatmapChart() {
  const containerRef = useRef(null);
  const chartRef = useRef(null);
  const [hasError, setHasError] = useState(false);
  useEffect(() => {}, []);

  const option = useMemo(() => {
    const hours = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
    const days = Array.from({ length: 10 }).map((_, i) => `W${i + 1}`);
    const data = [];
    for (let i = 0; i < hours.length; i++) {
      for (let j = 0; j < days.length; j++) {
        data.push([j, i, Math.floor(Math.random() * 80)]);
      }
    }
    return {
      tooltip: { position: 'top' },
      grid: { left: 40, right: 16, top: 24, bottom: 24 },
      xAxis: {
        type: 'category',
        data: days,
        splitArea: { show: true },
        axisLabel: { color: '#9CA3AF' },
        axisLine: { lineStyle: { color: '#374151' } }
      },
      yAxis: {
        type: 'category',
        data: hours,
        splitArea: { show: true },
        axisLabel: { color: '#9CA3AF' },
        axisLine: { lineStyle: { color: '#374151' } }
      },
      visualMap: {
        min: 0,
        max: 80,
        calculable: true,
        orient: 'horizontal',
        left: 'center',
        bottom: 0,
        inRange: { color: ['#111827', '#0ea5e9', '#22d3ee', '#a855f7'] },
        textStyle: { color: '#9CA3AF' }
      },
      series: [
        {
          name: 'Activity',
          type: 'heatmap',
          data,
          label: { show: false },
          emphasis: { itemStyle: { shadowBlur: 10, shadowColor: 'rgba(0,0,0,0.3)' } }
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
  return <div ref={containerRef} style={{ height: 300, width: '100%' }} />;
}


