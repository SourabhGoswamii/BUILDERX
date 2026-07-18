"use client";

import React, { useState } from "react";

export default function SettingsPage() {
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Pre-filled state matching your sidebar profile
  const [formData, setFormData] = useState({
    firstName: "Sourabh",
    lastName: "Goswami",
    email: "sourabh@buildx.com",
    phone: "+91 98765 43210",
    role: "Global Builder",
    notifications: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setShowSuccess(false);

    // Simulate an API call for the demo
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);

      // Hide success message after 3 seconds
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-800">
      {/* Page Header */}
      <div className="mb-8 max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
          Profile Settings
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage your account details and application preferences.
        </p>
      </div>

      <div className="max-w-4xl mx-auto bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Settings Navigation (Tabs) */}
        <div className="flex border-b border-slate-200 bg-slate-50/50 px-6">
          <button className="py-4 px-2 border-b-2 border-blue-900 text-sm font-medium text-blue-900">
            My Profile
          </button>
          <button className="py-4 px-6 border-b-2 border-transparent text-sm font-medium text-slate-500 hover:text-slate-700 transition-colors">
            Security
          </button>
          <button className="py-4 px-6 border-b-2 border-transparent text-sm font-medium text-slate-500 hover:text-slate-700 transition-colors">
            Team Access
          </button>
        </div>

        <form onSubmit={handleSave} className="p-6 md:p-8">
          {/* Avatar Section */}
          <div className="flex items-center gap-6 mb-10">
            <div className="w-20 h-20 rounded-full bg-blue-100 border-2 border-blue-200 flex items-center justify-center text-blue-800 font-bold text-2xl shadow-sm">
              SG
            </div>
            <div>
              <h3 className="text-lg font-medium text-slate-900">
                Profile Picture
              </h3>
              <p className="text-sm text-slate-500 mb-3">PNG, JPG under 5MB</p>
              <div className="flex gap-3">
                <button
                  type="button"
                  className="px-4 py-2 bg-white border border-slate-200 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors shadow-sm"
                >
                  Upload New
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-white border border-slate-200 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 transition-colors shadow-sm"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>

          <hr className="border-slate-100 mb-8" />

          {/* Personal Information */}
          <h3 className="text-lg font-bold text-slate-900 mb-6">
            Personal Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900 transition-all bg-white text-slate-900"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900 transition-all bg-white text-slate-900"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900 transition-all bg-white text-slate-900"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900 transition-all bg-white text-slate-900"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
                System Role
              </label>
              <input
                type="text"
                name="role"
                value={formData.role}
                disabled
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm bg-slate-50 text-slate-500 cursor-not-allowed"
              />
              <p className="text-xs text-slate-400 mt-1.5">
                Contact your system administrator to change your organizational
                role.
              </p>
            </div>
          </div>

          <hr className="border-slate-100 mb-8" />

          {/* Preferences */}
          <h3 className="text-lg font-bold text-slate-900 mb-6">Preferences</h3>

          <div className="mb-10">
            <label className="flex items-start gap-3 cursor-pointer">
              <div className="relative flex items-center mt-0.5">
                <input
                  type="checkbox"
                  name="notifications"
                  checked={formData.notifications}
                  onChange={handleChange}
                  className="peer sr-only"
                />
                <div className="w-10 h-5 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-900"></div>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900">
                  Email Notifications
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Receive daily summary reports and critical site alerts via
                  email.
                </p>
              </div>
            </label>
          </div>

          {/* Action Buttons & Success Message */}
          <div className="flex items-center gap-4 pt-6 border-t border-slate-100">
            <button
              type="submit"
              disabled={isSaving}
              className={`px-6 py-2.5 bg-blue-900 text-white rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center gap-2 ${isSaving ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-800"}`}
            >
              {isSaving ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
            <button
              type="button"
              className="px-6 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm"
            >
              Cancel
            </button>

            {/* Success Toast */}
            {showSuccess && (
              <div className="ml-auto flex items-center gap-2 text-green-600 text-sm font-medium animate-fade-in-up">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                Profile updated successfully
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
