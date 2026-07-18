'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();
  // State for our Demo Magic Role Switcher
  const [currentRole, setCurrentRole] = useState<'Builder' | 'Supervisor'>('Builder');

  // We add a 'roles' array to each item to control visibility
  const navItems = [
    {
      name: 'Overview',
      href: '/dashboard/overview',
      roles: ['Builder'], // Only Builder sees this
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="9"></rect><rect x="14" y="3" width="7" height="5"></rect><rect x="14" y="12" width="7" height="9"></rect><rect x="3" y="16" width="7" height="5"></rect></svg>
      )
    },
    {
      name: 'All Sites',
      href: '/dashboard/sites',
      roles: ['Builder'], // Only Builder sees this
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><path d="M9 22v-4h6v4"></path><path d="M8 6h.01"></path><path d="M16 6h.01"></path><path d="M12 6h.01"></path><path d="M12 10h.01"></path><path d="M12 14h.01"></path><path d="M16 10h.01"></path><path d="M16 14h.01"></path><path d="M8 10h.01"></path><path d="M8 14h.01"></path></svg>
      )
    },
    {
      name: 'My Site (Unit-4)',
      href: '/dashboard/plant-unit-4', // Hardcoded redirect for demo purposes
      roles: ['Supervisor'], // Only Supervisor sees this
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
      )
    },
    {
      name: 'Daily Updates',
      href: '/dashboard/reports',
      roles: ['Builder', 'Supervisor'], // Both see this
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline><circle cx="12" cy="13" r="3"></circle><line x1="12" y1="13" x2="12" y2="13.01"></line></svg>
      )
    },
    {
      name: 'Employee Mgmt',
      href: '/dashboard/team',
      roles: ['Builder'], // Only Builder sees this
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
      )
    }
  ];

  // Filter items based on the active role
  const visibleNavItems = navItems.filter(item => item.roles.includes(currentRole));

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 min-h-screen fixed left-0 top-0 text-slate-600 z-50">
      
      {/* Top: Company Name & Logo */}
      <div className="h-20 flex items-center px-6 border-b border-slate-200">
        <div className="flex items-center gap-2.5 text-slate-900">
          <div className="w-8 h-8 bg-blue-900 rounded-md flex items-center justify-center shadow-sm">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4" />
            </svg>
          </div>
          <span className="text-xl font-semibold tracking-tight">BuildX</span>
        </div>
      </div>

      {/* Middle: Navigation Links */}
      <nav className="flex-1 py-8 px-4 space-y-1 overflow-y-auto">
        <div className="flex justify-between items-center mb-4 px-3">
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest">
            Menu
          </p>
          {/* Demo Magic: Role Toggle Badge */}
          <button 
            onClick={() => setCurrentRole(currentRole === 'Builder' ? 'Supervisor' : 'Builder')}
            className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider transition-colors ${
              currentRole === 'Builder' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'
            }`}
            title="Click to toggle view for demo"
          >
            {currentRole} View
          </button>
        </div>
        
        {visibleNavItems.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
          
          return (
            <Link 
              key={item.name} 
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors duration-150 group ${
                isActive 
                  ? 'bg-slate-100 text-blue-900 font-medium' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className={`${isActive ? 'text-blue-900' : 'text-slate-400 group-hover:text-slate-600'}`}>
                {item.icon}
              </div>
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Bottom: Settings & Profile */}
      <div className="p-4 border-t border-slate-200">
        
        <Link 
          href="/dashboard/settings" 
          className="flex items-center gap-3 px-3 py-2.5 rounded-md text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-colors mb-4"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
          <span className="text-sm">Settings</span>
        </Link>
        
        <div className="flex items-center gap-3 px-3 py-2 mt-2">
          <div className="w-9 h-9 rounded-full bg-blue-100 border border-slate-200 flex items-center justify-center text-blue-800 font-semibold text-xs">
            SG
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-medium text-slate-800 truncate">Sourabh Goswami</p>
            <p className="text-xs text-slate-400 truncate">{currentRole === 'Builder' ? 'Global Builder' : 'Site Supervisor'}</p>
          </div>
          <button 
            onClick={() => {
              localStorage.removeItem("buildx_user");
              window.location.href = '/login';
            }}
            className="text-slate-300 hover:text-red-500 transition-colors p-1 rounded-md hover:bg-red-50"
            title="Log out"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
          </button>
        </div>
      </div>
    </aside>
  );
}