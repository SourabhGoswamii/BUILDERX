import React from 'react';
import Sidebar from './sidebar'; // Assumes default export from sidebar.tsx

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* The persistent sidebar */}
      <Sidebar />
      
      {/* The dynamic content area (overview, reports, sites, team) */}
      <main className="flex-1 w-full md:ml-64 min-h-screen overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}