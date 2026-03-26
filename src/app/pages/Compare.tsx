import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import { GitCompare, TrendingUp, TrendingDown, AlertCircle, CheckCircle } from "lucide-react";

const comparisonData = [
  { area: 'Melbourne CBD', coverage: 95.2, population: 12450 },
  { area: 'Port Melbourne', coverage: 93.8, population: 8320 },
  { area: 'Southbank', coverage: 92.5, population: 5670 },
];

export function Compare() {
  return (
    <div className="max-w-7xl mx-auto px-8 py-8">
      {/* Title */}
      <div className="bg-white border-2 border-gray-800 p-8 mb-8">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">Compare Areas</h1>
        <p className="text-center text-gray-600">Select 2-3 areas to compare vaccination coverage rates</p>
      </div>

      {/* Area Selectors */}
      <div className="bg-white border-2 border-gray-800 p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Select Areas</h2>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">Area 1</label>
            <select className="w-full px-4 py-3 bg-white border-2 border-gray-800 text-gray-900">
              <option>Melbourne CBD</option>
              <option>Port Melbourne</option>
              <option>Southbank</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">Area 2</label>
            <select className="w-full px-4 py-3 bg-white border-2 border-gray-800 text-gray-900">
              <option>Port Melbourne</option>
              <option>Melbourne CBD</option>
              <option>Southbank</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">Area 3 (Optional)</label>
            <select className="w-full px-4 py-3 bg-white border-2 border-gray-800 text-gray-900">
              <option>-- Select --</option>
              <option>Southbank</option>
              <option>Docklands</option>
            </select>
          </div>
        </div>
      </div>

      {/* Comparison Chart */}
      <div className="bg-white border-2 border-gray-800 p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Coverage Comparison</h2>
        <div className="border-2 border-dashed border-gray-400 bg-gray-50 aspect-[2/1] flex items-center justify-center">
          <div className="text-center">
            <div className="w-20 h-20 border-2 border-gray-400 bg-gray-200 mx-auto mb-4" />
            <span className="text-sm font-bold text-gray-500">Comparison Chart Visualization</span>
            <p className="text-xs text-gray-400 mt-2">Side-by-side comparison of coverage rates</p>
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="bg-white border-2 border-gray-800 p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Summary Table</h2>
        <div className="border-2 border-gray-800">
          <table className="w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-4 text-left font-bold text-gray-900 border-b-2 border-gray-800">Area</th>
                <th className="px-6 py-4 text-left font-bold text-gray-900 border-b-2 border-gray-800">Coverage %</th>
                <th className="px-6 py-4 text-left font-bold text-gray-900 border-b-2 border-gray-800">Child Population</th>
                <th className="px-6 py-4 text-left font-bold text-gray-900 border-b-2 border-gray-800">vs State Avg</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-400">
                <td className="px-6 py-4 text-gray-700">Melbourne CBD</td>
                <td className="px-6 py-4 font-bold">95.2%</td>
                <td className="px-6 py-4 text-gray-700">12,450</td>
                <td className="px-6 py-4 font-bold">+0.7%</td>
              </tr>
              <tr className="border-b border-gray-400">
                <td className="px-6 py-4 text-gray-700">Port Melbourne</td>
                <td className="px-6 py-4 font-bold">93.8%</td>
                <td className="px-6 py-4 text-gray-700">8,320</td>
                <td className="px-6 py-4 font-bold">-0.7%</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-gray-700">Southbank</td>
                <td className="px-6 py-4 font-bold">92.5%</td>
                <td className="px-6 py-4 text-gray-700">5,670</td>
                <td className="px-6 py-4 font-bold">-2.0%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Interpretation Box */}
      <div className="bg-gray-50 border-2 border-gray-800 p-6">
        <h3 className="font-bold text-gray-900 mb-4">What This Means</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-gray-800 mt-2 flex-shrink-0" />
            <p className="text-gray-700">
              <strong className="text-gray-900">Melbourne CBD</strong> has the highest coverage rate at 95.2%, exceeding the state average
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-gray-800 mt-2 flex-shrink-0" />
            <p className="text-gray-700">
              <strong className="text-gray-900">Port Melbourne</strong> is slightly below the state average at 93.8%
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-gray-800 mt-2 flex-shrink-0" />
            <p className="text-gray-700">
              <strong className="text-gray-900">Southbank</strong> has the lowest coverage at 92.5%, 2% below the state average
            </p>
          </div>
          <p className="text-gray-600 mt-4 pt-4 border-t-2 border-gray-400">
            All three areas are approaching the 95% herd immunity threshold recommended for childhood vaccines.
          </p>
        </div>
      </div>
    </div>
  );
}