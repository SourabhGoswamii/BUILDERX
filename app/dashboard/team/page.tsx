'use client';

import React, { useState } from 'react';

// --- Mock Data ---
const initialEmployees = [
  {
    id: 'EMP-001',
    name: 'Rahul Verma',
    role: 'Site Supervisor',
    trade: 'Management',
    site: 'Plant Unit-4',
    phone: '+91 98765 43210',
    status: 'Present'
  },
  {
    id: 'EMP-002',
    name: 'Amit Singh',
    role: 'Heavy Machinery Operator',
    trade: 'Equipment',
    site: 'Plant Unit-4',
    phone: '+91 98765 43211',
    status: 'Present'
  },
  {
    id: 'EMP-003',
    name: 'Priya Sharma',
    role: 'Project Engineer',
    trade: 'Engineering',
    site: 'Steel Assembly Line',
    phone: '+91 98765 43212',
    status: 'Present'
  },
  {
    id: 'EMP-004',
    name: 'Suresh Kumar',
    role: 'Structural Welder',
    trade: 'Metalwork',
    site: 'Steel Assembly Line',
    phone: '+91 98765 43213',
    status: 'Absent'
  },
  {
    id: 'EMP-005',
    name: 'Vikram Singh',
    role: 'Site Supervisor',
    trade: 'Management',
    site: 'Warehouse B',
    phone: '+91 98765 43214',
    status: 'Present'
  },
  {
    id: 'EMP-006',
    name: 'Deepak Yadav',
    role: 'Electrician (HV)',
    trade: 'Electrical',
    site: 'Warehouse B',
    phone: '+91 98765 43215',
    status: 'On Leave'
  }
];

// --- Helper Component ---
const AttendanceBadge = ({ status }: { status: string }) => {
  if (status === 'Present') {
    return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 border border-green-200"><span className="w-1.5 h-1.5 rounded-full bg-green-600"></span>{status}</span>;
  }
  if (status === 'Absent') {
    return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800 border border-red-200"><span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>{status}</span>;
  }
  return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full bg-orange-100 text-orange-800 border border-orange-200"><span className="w-1.5 h-1.5 rounded-full bg-orange-600"></span>{status}</span>;
};

export default function EmployeeManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [siteFilter, setSiteFilter] = useState('All');

  // Filter Logic
  const filteredEmployees = initialEmployees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          emp.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSite = siteFilter === 'All' || emp.site === siteFilter;
    return matchesSearch && matchesSite;
  });

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-800">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Workforce Management</h1>
          <p className="text-sm text-slate-500 mt-1">Track employee attendance, roles, and site assignments.</p>
        </div>
        
        <button className="bg-blue-900 text-white px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 hover:bg-blue-800 transition-colors shadow-sm">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
          Add Employee
        </button>
      </div>

      {/* KPI Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Total Registered</p>
            <p className="text-2xl font-bold text-slate-900">142</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-green-50 text-green-600 rounded-lg flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Present Today</p>
            <p className="text-2xl font-bold text-slate-900">128</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-lg flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Absent / Leave</p>
            <p className="text-2xl font-bold text-slate-900">14</p>
          </div>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="bg-white border border-slate-200 shadow-sm rounded-xl overflow-hidden">
        
        {/* Filters */}
        <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </div>
            <input 
              type="text" 
              placeholder="Search by name or role..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900 transition-all bg-white"
            />
          </div>
          
          <select 
            value={siteFilter}
            onChange={(e) => setSiteFilter(e.target.value)}
            className="border border-slate-200 rounded-lg px-4 py-2 text-sm text-slate-700 focus:outline-none focus:border-blue-900 bg-white min-w-[200px]"
          >
            <option value="All">All Active Sites</option>
            <option value="Plant Unit-4">Plant Unit-4</option>
            <option value="Steel Assembly Line">Steel Assembly Line</option>
            <option value="Warehouse B">Warehouse B</option>
          </select>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500 border-b border-slate-200">
                <th className="px-6 py-4 font-medium">Employee Details</th>
                <th className="px-6 py-4 font-medium">Trade & Role</th>
                <th className="px-6 py-4 font-medium">Assigned Site</th>
                <th className="px-6 py-4 font-medium">Status Today</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredEmployees.map((emp) => (
                <tr key={emp.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
                        {emp.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900">{emp.name}</div>
                        <div className="text-xs text-slate-500">{emp.id} &bull; {emp.phone}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-slate-700">{emp.role}</div>
                    <div className="text-xs text-slate-500">{emp.trade}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="inline-flex items-center text-sm text-slate-700">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1.5 text-slate-400"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                      {emp.site}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <AttendanceBadge status={emp.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button className="text-slate-400 hover:text-blue-600 transition-colors p-2">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredEmployees.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-500">No employees found matching your search.</p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}