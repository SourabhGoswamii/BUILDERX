'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

// --- Mock Data ---
const allSites = [
  {
    id: 'plant-unit-4',
    name: 'Plant Unit-4',
    type: 'Heavy Manufacturing',
    manager: 'Rahul Verma',
    progress: 68,
    status: 'On Schedule',
    budget: '$24.5M',
    deadline: 'Dec 2026',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'steel-assembly-line',
    name: 'Steel Assembly Line',
    type: 'Assembly Plant',
    manager: 'Priya Sharma',
    progress: 42,
    status: 'Delayed',
    budget: '$12.0M',
    deadline: 'Oct 2026',
    image: 'https://images.unsplash.com/photo-1504917595217-d4f3b392ee84?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'warehouse-b',
    name: 'Warehouse B',
    type: 'Storage & Logistics',
    manager: 'Vikram Singh',
    progress: 91,
    status: 'Under Budget',
    budget: '$8.2M',
    deadline: 'Aug 2026',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'admin-block-a',
    name: 'Admin Block A',
    type: 'Commercial Office',
    manager: 'Neha Gupta',
    progress: 15,
    status: 'On Schedule',
    budget: '$4.5M',
    deadline: 'Mar 2027',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&auto=format&fit=crop'
  }
];

// --- Helper Component ---
const StatusBadge = ({ status }: { status: string }) => {
  const colorMap: Record<string, string> = {
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

export default function AllSites() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Filter logic for the search bar and dropdown
  const filteredSites = allSites.filter(site => {
    const matchesSearch = site.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          site.manager.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || site.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-800">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">All Sites</h1>
          <p className="text-sm text-slate-500 mt-1">Manage and track your active industrial projects.</p>
        </div>
        
        <button className="bg-blue-900 text-white px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 hover:bg-blue-800 transition-colors shadow-sm">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          Add New Site
        </button>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-8 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </div>
          <input 
            type="text" 
            placeholder="Search by site name or manager..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900 transition-all"
          />
        </div>
        
        <select 
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-slate-200 rounded-lg px-4 py-2 text-sm text-slate-700 focus:outline-none focus:border-blue-900"
        >
          <option value="All">All Statuses</option>
          <option value="On Schedule">On Schedule</option>
          <option value="Delayed">Delayed</option>
          <option value="Under Budget">Under Budget</option>
        </select>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredSites.map(site => (
          <div key={site.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow duration-300">
            
            {/* Thumbnail Image */}
            <div className="h-32 w-full relative bg-slate-200">
              <img src={site.image} alt={site.name} className="w-full h-full object-cover filter grayscale-[30%]" />
              <div className="absolute top-3 right-3">
                <StatusBadge status={site.status} />
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col">
              {/* Header */}
              <div className="mb-4">
                <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">{site.type}</p>
                <h3 className="text-lg font-bold text-slate-900 leading-tight">{site.name}</h3>
              </div>

              {/* Progress Bar */}
              <div className="mb-5">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-xs text-slate-500 font-medium">Overall Progress</span>
                  <span className="text-sm font-bold text-slate-800">{site.progress}%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-900 rounded-full transition-all duration-500" 
                    style={{ width: `${site.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Meta Details */}
              <div className="grid grid-cols-2 gap-y-3 mb-6 flex-1">
                <div>
                  <p className="text-xs text-slate-400 mb-0.5">Project Manager</p>
                  <p className="text-sm font-medium text-slate-700 flex items-center gap-1">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-400"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    {site.manager}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 mb-0.5">Total Budget</p>
                  <p className="text-sm font-medium text-slate-700 flex items-center gap-1">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-400"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                    {site.budget}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 mb-0.5">Est. Deadline</p>
                  <p className="text-sm font-medium text-slate-700 flex items-center gap-1">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-400"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    {site.deadline}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <button 
                onClick={() => router.push(`/dashboard/${site.id}`)}
                className="w-full py-2.5 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 rounded-lg text-sm font-medium text-slate-700 hover:text-blue-900 transition-colors flex items-center justify-center gap-2 group"
              >
                Manage Site
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </button>
            </div>
            
          </div>
        ))}
      </div>

      {filteredSites.length === 0 && (
        <div className="text-center py-16 bg-white rounded-xl border border-slate-200">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="mx-auto text-slate-300 mb-4"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><path d="M9 22v-4h6v4"></path></svg>
          <h3 className="text-lg font-medium text-slate-900 mb-1">No sites found</h3>
          <p className="text-slate-500">Try adjusting your search or filters.</p>
        </div>
      )}

    </div>
  );
}