'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// --- Type Definitions ---
interface SiteData {
  id: string;
  name: string;
  progress: number;
  status: 'On Schedule' | 'Delayed' | 'Under Budget';
}

interface AlertData {
  id: string;
  level: 'critical' | 'warning' | 'info';
  message: string;
}

interface TrendData {
  day: string;
  expense: number;
}

// --- Mock Data ---
const mockSites: SiteData[] = [
  { id: 'plant-unit-4', name: 'Plant Unit-4', progress: 68, status: 'On Schedule' },
  { id: 'steel-assembly-line', name: 'Steel Assembly Line', progress: 42, status: 'Delayed' },
  { id: 'warehouse-b', name: 'Warehouse B', progress: 91, status: 'Under Budget' },
  { id: 'admin-block-a', name: 'Admin Block A', progress: 15, status: 'On Schedule' },
];

const mockAlerts: AlertData[] = [
  { id: '1', level: 'critical', message: 'Low Stock: Structural Steel at Plant Unit-4 (< 10 tons)' },
  { id: '2', level: 'warning', message: 'Pending Approval: $50,000 Heavy Machinery rental at Warehouse B' },
  { id: '3', level: 'warning', message: 'Safety Inspection due for Steel Assembly Line in 3 days.' },
];

// 7-day expense data (in thousands)
const mockTrend: TrendData[] = [
  { day: 'Mon', expense: 180 },
  { day: 'Tue', expense: 220 },
  { day: 'Wed', expense: 190 },
  { day: 'Thu', expense: 310 },
  { day: 'Fri', expense: 280 },
  { day: 'Sat', expense: 150 },
  { day: 'Sun', expense: 90 },
];

// --- Helper Components ---

const StatusBadge: React.FC<{ status: SiteData['status'] }> = ({ status }) => {
  const colorMap = {
    'On Schedule': 'bg-green-100 text-green-800 border-green-200',
    'Delayed': 'bg-orange-100 text-orange-800 border-orange-200',
    'Under Budget': 'bg-blue-100 text-blue-800 border-blue-200',
  };
  
  return (
    <span className={`px-2.5 py-1 text-xs font-medium rounded-full border ${colorMap[status]}`}>
      {status}
    </span>
  );
};

const AlertDot: React.FC<{ level: AlertData['level'] }> = ({ level }) => {
  const colorMap = {
    critical: 'bg-red-500',
    warning: 'bg-orange-500',
    info: 'bg-blue-500',
  };
  return <span className={`inline-block w-2.5 h-2.5 rounded-full ${colorMap[level]}`} />;
};

// Simple SVG Line Chart
const ExpenseChart: React.FC<{ data: TrendData[] }> = ({ data }) => {
  const maxExpense = Math.max(...data.map(d => d.expense));
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * 100;
    const y = 100 - (d.expense / maxExpense) * 80; // 80% height to leave room for padding
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="relative h-48 w-full mt-4">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full overflow-visible">
        {/* Grid lines */}
        <line x1="0" y1="20" x2="100" y2="20" stroke="#e2e8f0" strokeWidth="0.5" />
        <line x1="0" y1="50" x2="100" y2="50" stroke="#e2e8f0" strokeWidth="0.5" />
        <line x1="0" y1="80" x2="100" y2="80" stroke="#e2e8f0" strokeWidth="0.5" />
        
        {/* Area fill */}
        <polygon points={`0,100 ${points} 100,100`} fill="#1e3a8a" opacity="0.1" />
        
        {/* Line */}
        <polyline 
          points={points} 
          fill="none" 
          stroke="#1e3a8a" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          vectorEffect="non-scaling-stroke"
        />
        
        {/* Points */}
        {data.map((d, i) => {
           const x = (i / (data.length - 1)) * 100;
           const y = 100 - (d.expense / maxExpense) * 80;
           return <circle key={d.day} cx={x} cy={y} r="1.5" fill="#1e3a8a" vectorEffect="non-scaling-stroke" />;
        })}
      </svg>
      <div className="flex justify-between text-xs text-slate-400 mt-2">
        {data.map(d => <span key={d.day}>{d.day}</span>)}
      </div>
    </div>
  );
};

// --- Main Dashboard Component ---

const overview: React.FC = () => {
  const router = useRouter();
  const [currentTime, setCurrentTime] = useState(new Date());

  // Live Clock
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSiteClick = (siteId: string) => {
    router.push(`/dashboard/${siteId}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-800">
      
      {/* Section A: Header & Greeting */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
            Welcome back, Sourabh
          </h1>
          <p className="text-sm md:text-base text-slate-500 font-medium mt-1">
            Global Builder | BuildX Project
          </p>
        </div>
        <div className="mt-4 md:mt-0 text-right bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm">
          <p className="text-xs text-slate-400 uppercase tracking-wider">Current Time</p>
          <p className="text-lg font-mono font-semibold text-blue-900">
            {currentTime.toLocaleTimeString()}
          </p>
          <p className="text-xs text-slate-500">
            {currentTime.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </header>

      {/* Section B: High-Level Overview Cards (KPIs) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Active Sites */}
        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm">
          <p className="text-sm text-slate-500 font-medium mb-1">Total Active Sites</p>
          <div className="flex items-baseline">
            <span className="text-3xl font-bold text-blue-900">4</span>
            <span className="ml-2 text-sm text-slate-400">Sites</span>
          </div>
        </div>
        
        {/* Workforce */}
        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm">
          <p className="text-sm text-slate-500 font-medium mb-1">Total Workforce Today</p>
          <div className="flex items-baseline">
            <span className="text-3xl font-bold text-blue-900">345</span>
            <span className="ml-2 text-sm text-slate-400">Workers Present</span>
          </div>
        </div>
        
        {/* Monthly Spend */}
        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm">
          <p className="text-sm text-slate-500 font-medium mb-1">Total Monthly Spend</p>
          <div className="flex items-baseline">
            <span className="text-3xl font-bold text-blue-900">$1.2M</span>
            <span className="ml-2 text-sm text-orange-500 font-medium">▲ 4% vs last month</span>
          </div>
        </div>
        
        {/* Active Alerts */}
        <div className="bg-white p-5 rounded-lg border border-red-200 shadow-sm bg-red-50">
          <p className="text-sm text-red-400 font-medium mb-1">Active Alerts</p>
          <div className="flex items-baseline">
            <span className="text-3xl font-bold text-red-600">2</span>
            <span className="ml-2 text-sm text-red-500 font-medium">Critical Issues</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        
        {/* Section C: Critical Alerts & Notice Board */}
        <div className="lg:col-span-1 bg-white p-5 rounded-lg border border-slate-200 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
            <span className="w-1 h-5 bg-red-500 rounded mr-2"></span>
            Critical Alerts
          </h2>
          <div className="space-y-3">
            {mockAlerts.map(alert => (
              <div key={alert.id} className="flex items-start space-x-3 p-3 bg-slate-50 rounded border border-slate-100">
                <div className="mt-1.5"><AlertDot level={alert.level} /></div>
                <div>
                  <p className="text-sm font-medium text-slate-700">{alert.message}</p>
                  <span className={`text-xs font-bold mt-1 inline-block uppercase tracking-wide ${
                    alert.level === 'critical' ? 'text-red-500' : 'text-orange-500'
                  }`}>
                    {alert.level}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section D: Financial Trend */}
        <div className="lg:col-span-2 bg-white p-5 rounded-lg border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center">
              <span className="w-1 h-5 bg-blue-900 rounded mr-2"></span>
              Expense Trend (Last 7 Days)
            </h2>
            <select className="text-sm border border-slate-200 rounded p-1.5 text-slate-600 focus:outline-none focus:border-blue-900">
              <option>7 Days</option>
              <option>30 Days</option>
            </select>
          </div>
          <div className="pl-2">
            <ExpenseChart data={mockTrend} />
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between text-sm">
            <div>
              <p className="text-slate-400">Total Spent (7d)</p>
              <p className="font-bold text-slate-800">$1,420,000</p>
            </div>
            <div>
              <p className="text-slate-400">Avg Daily Burn</p>
              <p className="font-bold text-slate-800">$202,857</p>
            </div>
            <div>
              <p className="text-slate-400">Projected Month-End</p>
              <p className="font-bold text-red-600">$1.8M</p>
            </div>
          </div>
        </div>
      </div>

      {/* Section E: Active Sites Quick-List */}
      <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
          <span className="w-1 h-5 bg-blue-900 rounded mr-2"></span>
          Active Sites
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockSites.map(site => (
            <button
              key={site.id}
              onClick={() => handleSiteClick(site.id)}
              className="text-left p-4 border border-slate-200 rounded-lg hover:border-blue-900 hover:shadow-md transition-all duration-200 group"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-semibold text-slate-800 group-hover:text-blue-900">{site.name}</h3>
                <StatusBadge status={site.status} />
              </div>
              
              <div className="mb-2 flex justify-between items-center">
                <span className="text-xs text-slate-500 font-medium uppercase">Progress</span>
                <span className="text-sm font-bold text-slate-700">{site.progress}%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-900 rounded-full transition-all duration-500" 
                  style={{ width: `${site.progress}%` }}
                ></div>
              </div>
              
              <div className="mt-4 text-xs text-slate-400 group-hover:text-blue-900 flex items-center font-medium">
                View Site Details 
                <svg className="w-3 h-3 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
              </div>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};

export default overview;