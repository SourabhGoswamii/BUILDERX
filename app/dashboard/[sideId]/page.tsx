"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

// --- Helper to format the URL slug back to a readable name ---
const formatSiteName = (slug: string) => {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export default function SiteDetail() {
  const params = useParams();
  const router = useRouter();
  const [isExporting, setIsExporting] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Ensure params.siteId is a string
  const siteId = Array.isArray(params?.siteId)
    ? params.siteId[0]
    : params?.siteId || "";
  const siteName = siteId ? formatSiteName(siteId) : "Loading Site...";

  // --- Mock Data specific to this site ---
  const materials = [
    {
      id: 1,
      item: "Structural Steel (Tons)",
      received: 2500,
      used: 2450,
      alert: true,
    },
    {
      id: 2,
      item: "Ready-Mix Concrete (Cu.m)",
      received: 5000,
      used: 3200,
      alert: false,
    },
    {
      id: 3,
      item: "Heavy Duty Cables (Coils)",
      received: 120,
      used: 45,
      alert: false,
    },
  ];

  const expenses = [
    { id: 1, category: "Labor & Wages", budget: 1200000, actual: 950000 },
    { id: 2, category: "Raw Materials", budget: 8500000, actual: 8600000 }, // Over budget
    {
      id: 3,
      category: "Heavy Machinery Rental",
      budget: 450000,
      actual: 200000,
    },
  ];

  const handleExport = () => {
    setIsExporting(true);
    // Simulate network/PDF generation delay
    setTimeout(() => {
      setIsExporting(false);
      setShowToast(true);
      // Hide the toast after 3 seconds
      setTimeout(() => setShowToast(false), 3000);
    }, 1500);
  };

  const formatCurrency = (val: number) =>
    "$" + (val / 1000000).toFixed(2) + "M";

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-800 relative">
      {showToast && (
        <div className="absolute top-4 right-8 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg shadow-sm flex items-center gap-3 animate-fade-in-up z-50">
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
          <div className="text-sm">
            <span className="font-bold block">Report Generated</span>
            Weekly summary sent to owner@buildx.com
          </div>
        </div>
      )}

      {/* Back button & Header */}
      <div className="mb-8">
        <button
          onClick={() => router.back()}
          className="text-sm font-medium text-slate-500 hover:text-blue-600 flex items-center gap-1.5 transition-colors mb-4"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to All Sites
        </button>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
              {siteName}
            </h1>
            <p className="text-sm text-slate-500 mt-1 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              Active Construction Phase
            </p>
          </div>
          <button
            onClick={handleExport}
            disabled={isExporting}
            className={`bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg font-medium transition-colors shadow-sm flex items-center gap-2 ${isExporting ? "opacity-70 cursor-wait" : "hover:bg-slate-50"}`}
          >
            {isExporting ? (
              <>
                <svg
                  className="animate-spin h-4 w-4 text-slate-500"
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
                Compiling...
              </>
            ) : (
              <>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                Generate Site Report
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Left Column: Material Tracking */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-blue-600"
              >
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
              </svg>
              Material Inventory
            </h2>
            <Link
              href="/dashboard/reports"
              className="text-sm text-blue-600 hover:underline font-medium"
            >
              Log Usage
            </Link>
          </div>
          <div className="p-0 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white text-xs uppercase tracking-wider text-slate-500 border-b border-slate-200">
                  <th className="px-5 py-3 font-medium">Material</th>
                  <th className="px-5 py-3 font-medium text-right">Received</th>
                  <th className="px-5 py-3 font-medium text-right">Used</th>
                  <th className="px-5 py-3 font-medium text-right">
                    Current Stock
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {materials.map((mat) => {
                  const stock = mat.received - mat.used;
                  return (
                    <tr key={mat.id} className="hover:bg-slate-50/50">
                      <td className="px-5 py-4 font-medium text-slate-900">
                        {mat.item}
                      </td>
                      <td className="px-5 py-4 text-slate-600 text-right">
                        {mat.received}
                      </td>
                      <td className="px-5 py-4 text-slate-600 text-right">
                        {mat.used}
                      </td>
                      <td className="px-5 py-4 text-right">
                        <span
                          className={`inline-flex font-bold ${mat.alert ? "text-red-600 bg-red-50 px-2 py-1 rounded" : "text-slate-900"}`}
                        >
                          {stock}
                          {mat.alert && (
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              className="inline ml-1"
                            >
                              <circle cx="12" cy="12" r="10"></circle>
                              <line x1="12" y1="8" x2="12" y2="12"></line>
                              <line x1="12" y1="16" x2="12.01" y2="16"></line>
                            </svg>
                          )}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Financial Breakdown */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-100 bg-slate-50/50">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-green-600"
              >
                <line x1="12" y1="1" x2="12" y2="23"></line>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
              Budget vs Actual
            </h2>
          </div>
          <div className="p-5 space-y-6">
            {expenses.map((exp) => {
              const percentage = (exp.actual / exp.budget) * 100;
              const isOver = percentage > 100;

              return (
                <div key={exp.id}>
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-sm font-medium text-slate-700">
                      {exp.category}
                    </span>
                    <div className="text-right">
                      <span
                        className={`text-sm font-bold ${isOver ? "text-red-600" : "text-slate-900"}`}
                      >
                        {formatCurrency(exp.actual)}
                      </span>
                      <span className="text-xs text-slate-400 ml-1">
                        / {formatCurrency(exp.budget)}
                      </span>
                    </div>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden relative">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${isOver ? "bg-red-500" : "bg-green-500"}`}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    ></div>
                    {/* Marker for budget limit if over budget */}
                    {isOver && (
                      <div
                        className="absolute top-0 bottom-0 w-0.5 bg-slate-900 left-full -ml-0.5"
                        style={{ left: "100%" }}
                      ></div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
