import { Map as MapIcon, MapPin, TrendingUp, Target, AlertCircle, CheckCircle, TrendingDown } from "lucide-react";

export function Map() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Title */}
      <div className="mb-8 rounded-3xl bg-gradient-to-r from-purple-600 to-pink-600 p-10 text-white shadow-xl">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
            <MapIcon className="h-8 w-8 text-white" />
          </div>
          <h1 className="mb-2 text-3xl font-bold">Coverage Map</h1>
          <p className="text-purple-50">View childhood vaccination coverage by region</p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="mb-8 rounded-3xl bg-white p-8 shadow-lg ring-1 ring-slate-200">
        <div className="mb-6 grid gap-6 md:grid-cols-3">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">State</label>
            <select className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-slate-900 focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-100">
              <option>Victoria</option>
              <option>New South Wales</option>
              <option>Queensland</option>
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">Region Type</label>
            <select className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-slate-900 focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-100">
              <option>Local Government Area</option>
              <option>Statistical Area</option>
              <option>Health District</option>
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">Age Group</label>
            <select className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-slate-900 focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-100">
              <option>12 months</option>
              <option>24 months</option>
              <option>5 years</option>
            </select>
          </div>
        </div>
        <div className="text-center">
          <button className="rounded-xl bg-purple-600 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-purple-700 hover:shadow-lg">
            Update Map
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="mb-8 grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border-l-4 border-purple-500 bg-white p-6 shadow-lg ring-1 ring-slate-200">
          <div className="mb-3 flex items-center justify-between">
            <div className="text-sm font-semibold text-slate-600">Selected Area</div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
              <MapPin className="h-5 w-5 text-purple-600" />
            </div>
          </div>
          <div className="mb-1 text-2xl font-bold text-slate-900">Melbourne CBD</div>
          <div className="text-sm text-slate-500">Local Government Area</div>
        </div>
        <div className="rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 p-6 text-white shadow-xl">
          <div className="mb-3 flex items-center justify-between">
            <div className="text-sm font-semibold text-blue-100">Coverage %</div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20">
              <Target className="h-5 w-5" />
            </div>
          </div>
          <div className="text-4xl font-bold mb-1">93.2%</div>
          <div className="text-sm text-blue-100">Current selection</div>
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

      {/* Map Section */}
      <div className="mb-8 rounded-3xl bg-white p-8 shadow-lg ring-1 ring-slate-200">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <h2 className="flex items-center gap-3 text-2xl font-bold text-slate-900">
            <MapIcon className="h-7 w-7 text-purple-600" />
            Regional Coverage Map
          </h2>
          {/* Legend */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded border-2 border-red-600 bg-red-400"></div>
              <span className="text-sm font-semibold text-slate-700">Low (&lt;90%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded border-2 border-amber-600 bg-amber-400"></div>
              <span className="text-sm font-semibold text-slate-700">Medium (90-94%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded border-2 border-green-600 bg-green-400"></div>
              <span className="text-sm font-semibold text-slate-700">High (95%+)</span>
            </div>
          </div>
        </div>
        
        {/* Map Placeholder */}
        <div className="flex aspect-[16/9] items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-gradient-to-br from-slate-50 to-slate-100">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-3xl bg-purple-100">
              <MapIcon className="h-10 w-10 text-purple-600" />
            </div>
            <span className="text-sm font-semibold text-slate-600">Interactive map placeholder</span>
            <p className="mt-2 text-xs text-slate-500">Regions will be shaded by real coverage levels</p>
            <p className="text-xs text-slate-500">Click a region to reveal details and comparisons</p>
          </div>
        </div>
      </div>

      {/* Area Details Panel */}
      <div className="mb-8 rounded-3xl bg-white p-8 shadow-lg ring-1 ring-slate-200">
        <h2 className="mb-6 text-2xl font-bold text-slate-900">Area Details</h2>
        <div className="overflow-hidden rounded-2xl border border-slate-200">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-slate-50 to-slate-100">
              <tr>
                <th className="border-b-2 border-slate-200 px-6 py-4 text-left font-semibold text-slate-700">Region Name</th>
                <th className="border-b-2 border-slate-200 px-6 py-4 text-left font-semibold text-slate-700">Coverage</th>
                <th className="border-b-2 border-slate-200 px-6 py-4 text-left font-semibold text-slate-700">Child Population</th>
                <th className="border-b-2 border-slate-200 px-6 py-4 text-left font-semibold text-slate-700">vs State Average</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="transition-colors hover:bg-slate-50">
                <td className="flex items-center gap-2 px-6 py-4 font-medium text-slate-900">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Melbourne CBD
                </td>
                <td className="px-6 py-4 text-lg font-bold text-green-600">95.2%</td>
                <td className="px-6 py-4 text-slate-700">12,450</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                    <TrendingUp className="h-4 w-4" />
                    +0.7%
                  </span>
                </td>
              </tr>
              <tr className="transition-colors hover:bg-slate-50">
                <td className="flex items-center gap-2 px-6 py-4 font-medium text-slate-900">
                  <AlertCircle className="h-5 w-5 text-amber-600" />
                  Port Melbourne
                </td>
                <td className="px-6 py-4 text-lg font-bold text-amber-600">93.8%</td>
                <td className="px-6 py-4 text-slate-700">8,320</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-700">
                    <TrendingDown className="h-4 w-4" />
                    -0.7%
                  </span>
                </td>
              </tr>
              <tr className="transition-colors hover:bg-slate-50">
                <td className="flex items-center gap-2 px-6 py-4 font-medium text-slate-900">
                  <AlertCircle className="h-5 w-5 text-amber-600" />
                  Southbank
                </td>
                <td className="px-6 py-4 text-lg font-bold text-amber-600">92.5%</td>
                <td className="px-6 py-4 text-slate-700">5,670</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-700">
                    <TrendingDown className="h-4 w-4" />
                    -2.0%
                  </span>
                </td>
              </tr>
              <tr className="transition-colors hover:bg-slate-50">
                <td className="flex items-center gap-2 px-6 py-4 font-medium text-slate-900">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                  Docklands
                </td>
                <td className="px-6 py-4 text-lg font-bold text-red-600">91.3%</td>
                <td className="px-6 py-4 text-slate-700">4,180</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-700">
                    <TrendingDown className="h-4 w-4" />
                    -3.2%
                  </span>
                </td>
              </tr>
              <tr className="transition-colors hover:bg-slate-50">
                <td className="flex items-center gap-2 px-6 py-4 font-medium text-slate-900">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                  Carlton
                </td>
                <td className="px-6 py-4 text-lg font-bold text-red-600">90.7%</td>
                <td className="px-6 py-4 text-slate-700">3,920</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-700">
                    <TrendingDown className="h-4 w-4" />
                    -3.8%
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Insight Box */}
      <div className="rounded-3xl border-l-4 border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50 p-8 shadow-md">
        <div className="flex gap-3">
          <AlertCircle className="mt-0.5 h-6 w-6 flex-shrink-0 text-purple-600" />
          <div>
            <h3 className="mb-2 text-xl font-bold text-slate-900">Plain-Language Summary</h3>
            <p className="leading-relaxed text-slate-700">
          The map shows vaccination coverage across <strong>5 regions in Melbourne</strong>. Coverage rates range from 
          <strong> 90.7% to 95.2%</strong>. Melbourne CBD has the highest coverage at 95.2%, exceeding the state 
          average. Carlton has the lowest coverage at 90.7%, which is 3.8% below the state average. Most areas are 
          approaching the recommended 95% herd immunity threshold.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
