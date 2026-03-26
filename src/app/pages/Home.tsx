import { Link } from "react-router";
import { Shield, Database, BarChart2, ArrowRight } from "lucide-react";

export function Home() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Hero Section */}
      <div className="mb-8 rounded-3xl bg-gradient-to-br from-blue-600 via-blue-700 to-slate-900 p-12 text-white shadow-2xl">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white/15 backdrop-blur">
            <Shield className="h-10 w-10 text-white" />
          </div>
          <h1 className="mb-4 text-4xl font-bold">
            Understand childhood vaccination coverage in your area
          </h1>
          <p className="text-lg leading-relaxed text-blue-50">
            This dashboard uses official public data to help parents, carers, and community health stakeholders 
            understand vaccination coverage rates for young children across Victoria and Australia.
          </p>
        </div>
      </div>

      {/* Area Selection */}
      <div className="mb-8 rounded-3xl bg-white p-10 shadow-lg ring-1 ring-slate-200">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900">Select Your Area</h2>
          <p className="mt-2 text-slate-600">
            Choose a location to explore coverage patterns, comparisons, and supporting context.
          </p>
        </div>
        <div className="mx-auto mb-8 grid max-w-2xl gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">State</label>
            <select className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-slate-900 transition-all focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100">
              <option>Victoria</option>
              <option>New South Wales</option>
              <option>Queensland</option>
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">Region</label>
            <select className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-slate-900 transition-all focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100">
              <option>Melbourne CBD</option>
              <option>Greater Melbourne</option>
              <option>Regional Victoria</option>
            </select>
          </div>
        </div>
        <div className="text-center">
          <Link 
            to="/dashboard" 
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white shadow-lg transition-all hover:bg-blue-700 hover:shadow-xl"
          >
            View Dashboard
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>

      {/* Data Sources */}
      <div className="rounded-3xl bg-white p-10 shadow-lg ring-1 ring-slate-200">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900">Trusted Data Sources</h2>
          <p className="mt-2 text-slate-600">
            The dashboard is designed around official public health and population datasets.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-8 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600">
              <Database className="h-8 w-8 text-white" />
            </div>
            <h3 className="mb-2 text-lg font-bold text-slate-900">AIR</h3>
            <p className="text-sm text-slate-600">Australian Immunisation Register</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-8 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-600">
              <BarChart2 className="h-8 w-8 text-white" />
            </div>
            <h3 className="mb-2 text-lg font-bold text-slate-900">ABS</h3>
            <p className="text-sm text-slate-600">Australian Bureau of Statistics</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-8 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-600">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h3 className="mb-2 text-lg font-bold text-slate-900">Vic Health</h3>
            <p className="text-sm text-slate-600">Victorian Health Information</p>
          </div>
        </div>
      </div>
    </div>
  );
}
