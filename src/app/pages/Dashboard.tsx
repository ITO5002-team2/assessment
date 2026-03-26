import { Link } from "react-router";
import { Target, Users, TrendingUp, BarChart3, TableProperties, AlertCircle, GitCompare, BookOpen } from "lucide-react";
import { FilterPanel } from "../components/FilterPanel";
import { InsightCallout } from "../components/InsightCallout";
import { PageContainer } from "../components/PageContainer";
import { SectionCard } from "../components/SectionCard";

export function Dashboard() {
  return (
    <PageContainer>
      {/* Filter Bar */}
      <FilterPanel className="mb-6 p-6">
        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">State</label>
            <select className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100">
              <option>Victoria</option>
              <option>New South Wales</option>
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">Region</label>
            <select className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100">
              <option>Melbourne CBD</option>
              <option>Greater Melbourne</option>
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">Age Group</label>
            <select className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100">
              <option>12 months</option>
              <option>24 months</option>
              <option>5 years</option>
            </select>
          </div>
        </div>
      </FilterPanel>

      {/* Summary Cards */}
      <div className="mb-6 grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 p-6 text-white shadow-xl">
          <div className="mb-3 flex items-center justify-between">
            <div className="text-sm font-semibold text-blue-100">Coverage Rate</div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20">
              <Target className="h-5 w-5" />
            </div>
          </div>
          <div className="text-4xl font-bold mb-1">93.2%</div>
          <div className="text-sm text-blue-100">Current area</div>
        </div>
        <div className="rounded-2xl border-l-4 border-green-500 bg-white p-6 shadow-lg ring-1 ring-slate-200">
          <div className="mb-3 flex items-center justify-between">
            <div className="text-sm font-semibold text-slate-600">Child Population</div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
              <Users className="h-5 w-5 text-green-600" />
            </div>
          </div>
          <div className="mb-1 text-4xl font-bold text-slate-900">45,230</div>
          <div className="text-sm text-slate-500">In selected region</div>
        </div>
        <div className="rounded-2xl border-l-4 border-amber-500 bg-white p-6 shadow-lg ring-1 ring-slate-200">
          <div className="mb-3 flex items-center justify-between">
            <div className="text-sm font-semibold text-slate-600">State Average</div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100">
              <TrendingUp className="h-5 w-5 text-amber-600" />
            </div>
          </div>
          <div className="mb-1 text-4xl font-bold text-slate-900">94.5%</div>
          <div className="text-sm text-slate-500">Victoria</div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        {/* Chart Area */}
        <SectionCard className="rounded-2xl p-6">
          <h2 className="mb-4 flex items-center gap-3 text-xl font-bold text-slate-900">
            <BarChart3 className="h-6 w-6 text-blue-600" />
            Coverage by Area
          </h2>
          <div className="flex aspect-video items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-gradient-to-br from-slate-50 to-slate-100">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100">
                <BarChart3 className="h-8 w-8 text-blue-600" />
              </div>
              <span className="text-sm font-semibold text-slate-600">Visualization placeholder</span>
              <p className="mt-1 text-xs text-slate-500">Designed for a live regional coverage chart</p>
            </div>
          </div>
        </SectionCard>

        {/* Map/List Area */}
        <SectionCard className="rounded-2xl p-6">
          <h2 className="mb-4 flex items-center gap-3 text-xl font-bold text-slate-900">
            <TableProperties className="h-6 w-6 text-emerald-600" />
            Regional Breakdown
          </h2>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <span className="font-semibold text-slate-900">Area Name</span>
                <span className="font-semibold text-slate-900">Coverage</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-white px-3 py-2 shadow-sm">
                <span className="text-slate-700">Melbourne CBD</span>
                <span className="font-bold text-green-600">95.2%</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-white px-3 py-2 shadow-sm">
                <span className="text-slate-700">Port Melbourne</span>
                <span className="font-bold text-amber-600">93.8%</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-white px-3 py-2 shadow-sm">
                <span className="text-slate-700">Southbank</span>
                <span className="font-bold text-amber-600">92.5%</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-white px-3 py-2 shadow-sm">
                <span className="text-slate-700">Docklands</span>
                <span className="font-bold text-red-600">91.3%</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-white px-3 py-2 shadow-sm">
                <span className="text-slate-700">Carlton</span>
                <span className="font-bold text-red-600">90.7%</span>
              </div>
            </div>
          </div>
        </SectionCard>
      </div>

      {/* Insight Box */}
      <InsightCallout
        title="Plain-Language Summary"
        icon={AlertCircle}
        className="mb-6 rounded-2xl border-l-4 border-blue-500 bg-blue-50 p-6"
        iconClassName="text-blue-600"
      >
        <p>
          This area has a vaccination coverage rate of 93.2%, which is <strong>below the state average</strong> of 94.5%.
          To reach herd immunity thresholds, coverage rates of 95% or higher are recommended for most childhood vaccines.
        </p>
      </InsightCallout>

      {/* Action Buttons */}
      <div className="flex flex-wrap justify-center gap-4">
        <Link 
          to="/compare" 
          className="inline-flex items-center gap-2 rounded-xl border-2 border-slate-300 bg-white px-6 py-3 font-semibold text-slate-800 shadow-sm transition-all hover:border-slate-400 hover:bg-slate-50"
        >
          <GitCompare className="h-5 w-5" />
          Compare Areas
        </Link>
        <Link 
          to="/learn" 
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-md transition-all hover:bg-blue-700"
        >
          <BookOpen className="h-5 w-5" />
          Learn More
        </Link>
      </div>
    </PageContainer>
  );
}
