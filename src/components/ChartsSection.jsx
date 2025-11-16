import { Suspense } from 'react';
import AreaChart from './AreaChart';
import DonutChart from './DonutChart';
import HeatmapChart from './HeatmapChart';
import Skeleton from './Skeleton';
import ErrorBoundary from './ErrorBoundary';

export default function ChartsSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Impressions & Engagement</h3>
        <Suspense fallback={<Skeleton className="h-[300px] w-full" />}>
          <ErrorBoundary>
            <AreaChart />
          </ErrorBoundary>
        </Suspense>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Content Mix</h3>
        <Suspense fallback={<Skeleton className="h-[300px] w-full" />}>
          <ErrorBoundary>
            <DonutChart />
          </ErrorBoundary>
        </Suspense>
      </div>

      <div className="lg:col-span-3 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Weekly Activity Heatmap</h3>
        <Suspense fallback={<Skeleton className="h-[300px] w-full" />}>
          <ErrorBoundary>
            <HeatmapChart />
          </ErrorBoundary>
        </Suspense>
      </div>
    </div>
  );
}
