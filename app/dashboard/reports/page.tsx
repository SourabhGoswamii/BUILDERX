'use client';

import React, { useState } from 'react';

// --- Mock Data ---
const initialReports = [
  {
    id: '101',
    author: 'Rahul Verma',
    role: 'Site Supervisor',
    site: 'Plant Unit-4',
    date: 'Today at 2:30 PM',
    text: 'Completed the pouring of the foundation for Section B. Curing process has started. Expected to take 48 hours. No safety incidents.',
    image: 'https://images.unsplash.com/photo-1541888081622-c430fae3b330?q=80&w=800&auto=format&fit=crop',
    likes: 2
  },
  {
    id: '102',
    author: 'Priya Sharma',
    role: 'Project Engineer',
    site: 'Steel Assembly Line',
    date: 'Yesterday at 5:15 PM',
    text: 'Structural steel columns for the main hall are 50% erected. We had a slight delay due to crane maintenance, but we caught up by extending the shift by 1 hour.',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800&auto=format&fit=crop',
    likes: 1
  },
  {
    id: '103',
    author: 'Vikram Singh',
    role: 'Site Supervisor',
    site: 'Warehouse B',
    date: 'Yesterday at 11:00 AM',
    text: 'Roofing sheets delivery received. Quality check passed. Installation will begin tomorrow morning.',
    image: null,
    likes: 0
  }
];

export default function DailyUpdates() {
  const [reports, setReports] = useState(initialReports);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form State
  const [selectedSite, setSelectedSite] = useState('Plant Unit-4');
  const [updateText, setUpdateText] = useState('');
  const [hasPhoto, setHasPhoto] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!updateText.trim()) return;

    setIsSubmitting(true);

    // Simulate network delay for the demo
    setTimeout(() => {
      const newReport = {
        id: Math.random().toString(),
        author: 'Sourabh Goswami', // Using the logged-in name from our fake auth
        role: 'Global Builder',
        site: selectedSite,
        date: 'Just now',
        text: updateText,
        // Fake an image upload if they clicked the dropzone
        image: hasPhoto ? 'https://images.unsplash.com/photo-1508450859948-4e04fabaa4ea?q=80&w=800&auto=format&fit=crop' : null,
        likes: 0
      };

      setReports([newReport, ...reports]);
      setUpdateText('');
      setHasPhoto(false);
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-800">
      
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Daily Updates</h1>
        <p className="text-sm text-slate-500 mt-1">Real-time progress feed and field reports from all sites.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left Column: Submit New Update Form */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 sticky top-8">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-blue-600"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
              Post an Update
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Site Selector */}
              <div>
                <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Select Site</label>
                <select 
                  value={selectedSite}
                  onChange={(e) => setSelectedSite(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:border-blue-900 bg-slate-50"
                >
                  <option value="Plant Unit-4">Plant Unit-4</option>
                  <option value="Steel Assembly Line">Steel Assembly Line</option>
                  <option value="Warehouse B">Warehouse B</option>
                  <option value="Admin Block A">Admin Block A</option>
                </select>
              </div>

              {/* Text Area */}
              <div>
                <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Work Completed</label>
                <textarea 
                  required
                  value={updateText}
                  onChange={(e) => setUpdateText(e.target.value)}
                  placeholder="What was completed today? Any issues or delays?"
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:border-blue-900 h-28 resize-none bg-slate-50"
                />
              </div>

              {/* Photo Dropzone (Fake for demo) */}
              <div>
                <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Attach Photo</label>
                <button 
                  type="button"
                  onClick={() => setHasPhoto(!hasPhoto)}
                  className={`w-full border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center transition-colors ${
                    hasPhoto ? 'border-blue-500 bg-blue-50' : 'border-slate-300 hover:border-slate-400 bg-slate-50'
                  }`}
                >
                  {hasPhoto ? (
                    <>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500 mb-2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      <span className="text-sm font-medium text-blue-700">Photo Attached (IMG_492.jpg)</span>
                      <span className="text-xs text-blue-500 mt-1">Click to remove</span>
                    </>
                  ) : (
                    <>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 mb-2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                      <span className="text-sm font-medium text-slate-600">Tap to upload a photo</span>
                    </>
                  )}
                </button>
              </div>

              {/* Submit */}
              <button 
                type="submit" 
                disabled={isSubmitting || !updateText.trim()}
                className={`w-full bg-blue-900 text-white py-2.5 rounded-lg text-sm font-medium transition-colors flex justify-center items-center gap-2 ${
                  (isSubmitting || !updateText.trim()) ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-800'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    Posting...
                  </>
                ) : (
                  <>
                    Submit Report
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: The Feed */}
        <div className="lg:w-2/3">
          <div className="space-y-6">
            {reports.map((report) => (
              <div key={report.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                
                {/* Post Header */}
                <div className="p-4 flex justify-between items-start border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 font-bold text-sm">
                      {report.author.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{report.author}</p>
                      <p className="text-xs text-slate-500">{report.role}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-2 py-1 bg-blue-50 text-blue-700 border border-blue-100 rounded text-xs font-semibold mb-1">
                      {report.site}
                    </span>
                    <p className="text-xs text-slate-400">{report.date}</p>
                  </div>
                </div>

                {/* Post Body (Text) */}
                <div className="p-4 text-sm text-slate-700 leading-relaxed">
                  {report.text}
                </div>

                {/* Post Body (Image) */}
                {report.image && (
                  <div className="w-full h-64 sm:h-80 bg-slate-100 border-t border-b border-slate-100 relative">
                    <img src={report.image} alt="Site update" className="w-full h-full object-cover" />
                  </div>
                )}

                {/* Post Footer (Actions) */}
                <div className="px-4 py-3 bg-slate-50/50 flex gap-4">
                  <button className="text-xs font-medium text-slate-500 hover:text-blue-600 flex items-center gap-1.5 transition-colors">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
                    Acknowledge
                  </button>
                  <button className="text-xs font-medium text-slate-500 hover:text-blue-600 flex items-center gap-1.5 transition-colors">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                    Add Comment
                  </button>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}