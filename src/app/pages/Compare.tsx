import { GitCompare, TrendingUp, TrendingDown, AlertCircle, CheckCircle } from "lucide-react";
import { FilterPanel } from "../components/FilterPanel";
import { InsightCallout } from "../components/InsightCallout";
import { PageContainer } from "../components/PageContainer";
import { PageHero } from "../components/PageHero";
import { SectionCard } from "../components/SectionCard";

export function Compare() {
  return (
    <PageContainer>
      <PageHero
        title="Compare Areas"
        description="Select 2-3 areas to compare vaccination coverage rates"
        icon={GitCompare}
        className="bg-gradient-to-r from-blue-600 to-purple-600"
      />

      {/* Area Selectors */}
      <FilterPanel>
        <h2 className="mb-6 text-2xl font-bold text-slate-900">Select Areas</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">Area 1</label>
            <select className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100">
              <option>Melbourne CBD</option>
              <option>Port Melbourne</option>
              <option>Southbank</option>
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">Area 2</label>
            <select className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100">
              <option>Port Melbourne</option>
              <option>Melbourne CBD</option>
              <option>Southbank</option>
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">Area 3 (Optional)</label>
            <select className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100">
              <option>-- Select --</option>
              <option>Southbank</option>
              <option>Docklands</option>
            </select>
          </div>
        </div>
      </FilterPanel>

      {/* Comparison Chart */}
      <SectionCard className="mb-8 p-8">
        <h2 className="mb-4 text-2xl font-bold text-slate-900">Coverage Comparison</h2>
        <div className="flex aspect-[2/1] items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-gradient-to-br from-slate-50 to-slate-100">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-100">
              <GitCompare className="h-10 w-10 text-blue-600" />
            </div>
            <span className="text-sm font-semibold text-slate-600">Comparison visualization placeholder</span>
            <p className="mt-2 text-xs text-slate-500">Prepared for live area-to-area coverage comparisons</p>
          </div>
        </div>
      </SectionCard>

      {/* Comparison Table */}
      <SectionCard className="mb-8 p-8">
        <h2 className="mb-6 text-2xl font-bold text-slate-900">Summary Table</h2>
        <div className="overflow-hidden rounded-2xl border border-slate-200">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-slate-50 to-slate-100">
              <tr>
                <th className="border-b-2 border-slate-200 px-6 py-4 text-left font-semibold text-slate-700">Area</th>
                <th className="border-b-2 border-slate-200 px-6 py-4 text-left font-semibold text-slate-700">Coverage %</th>
                <th className="border-b-2 border-slate-200 px-6 py-4 text-left font-semibold text-slate-700">Child Population</th>
                <th className="border-b-2 border-slate-200 px-6 py-4 text-left font-semibold text-slate-700">vs State Avg</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="transition-colors hover:bg-slate-50">
                <td className="px-6 py-4 font-medium text-slate-900">Melbourne CBD</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-green-600">95.2%</span>
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-700">12,450</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                    <TrendingUp className="h-4 w-4" />
                    +0.7%
                  </span>
                </td>
              </tr>
              <tr className="transition-colors hover:bg-slate-50">
                <td className="px-6 py-4 font-medium text-slate-900">Port Melbourne</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-amber-600">93.8%</span>
                    <AlertCircle className="h-5 w-5 text-amber-600" />
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-700">8,320</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-700">
                    <TrendingDown className="h-4 w-4" />
                    -0.7%
                  </span>
                </td>
              </tr>
              <tr className="transition-colors hover:bg-slate-50">
                <td className="px-6 py-4 font-medium text-slate-900">Southbank</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-red-600">92.5%</span>
                    <AlertCircle className="h-5 w-5 text-red-600" />
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-700">5,670</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-700">
                    <TrendingDown className="h-4 w-4" />
                    -2.0%
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </SectionCard>

      {/* Interpretation Box */}
      <InsightCallout
        title="What This Means"
        icon={AlertCircle}
        className="rounded-3xl border-l-4 border-blue-500 bg-gradient-to-br from-blue-50 to-purple-50"
        iconClassName="hidden"
      >
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-green-600" />
            <p className="text-slate-700">
              <strong className="text-green-700">Melbourne CBD</strong> has the highest coverage rate at 95.2%, exceeding the state average
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-amber-600" />
            <p className="text-slate-700">
              <strong className="text-amber-700">Port Melbourne</strong> is slightly below the state average at 93.8%
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-red-600" />
            <p className="text-slate-700">
              <strong className="text-red-700">Southbank</strong> has the lowest coverage at 92.5%, 2% below the state average
            </p>
          </div>
          <p className="mt-4 border-t-2 border-blue-200 pt-4 text-slate-600">
            All three areas are approaching the 95% herd immunity threshold recommended for childhood vaccines.
          </p>
        </div>
      </InsightCallout>
    </PageContainer>
  );
}
