'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { ErrorBoundary } from '@/components/ErrorBoundary';

// Dynamically import the dashboard with no SSR
const DashboardClient = dynamic(() => import('./DashboardClient'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-400 mx-auto mb-4"></div>
        <h2 className="text-2xl font-semibold mb-2">Loading Dashboard...</h2>
        <p className="text-gray-400">Initializing dashboard</p>
      </div>
    </div>
  ),
});

export default function DashboardPage() {
  return (
    <ErrorBoundary>
      <Suspense fallback={
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-400 mx-auto mb-4"></div>
            <h2 className="text-2xl font-semibold mb-2">Loading Dashboard...</h2>
            <p className="text-gray-400">Initializing dashboard</p>
          </div>
        </div>
      }>
        <DashboardClient />
      </Suspense>
    </ErrorBoundary>
  );
}