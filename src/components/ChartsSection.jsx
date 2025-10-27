import { Suspense } from 'react';
import LineChart from './LineChart';
import BarChart from './BarChart';
import Skeleton from './Skeleton';
import ErrorBoundary from './ErrorBoundary';

export default function ChartsSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Revenue Overview</h3>
        <Suspense fallback={<Skeleton className="h-[300px] w-full" />}>
          <ErrorBoundary>
            <LineChart />
          </ErrorBoundary>
        </Suspense>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Performance Metrics</h3>
        <Suspense fallback={<Skeleton className="h-[300px] w-full" />}>
          <ErrorBoundary>
            <BarChart />
          </ErrorBoundary>
        </Suspense>
      </div>
    </div>
  );
}
