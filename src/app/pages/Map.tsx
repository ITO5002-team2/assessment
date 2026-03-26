import { Map as MapIcon, MapPin, TrendingUp, Target, AlertCircle, CheckCircle, TrendingDown } from "lucide-react";

export function Map() {
  return (
    <div className="max-w-7xl mx-auto px-8 py-8">
      {/* Title */}
      <div className="bg-white border-2 border-gray-800 p-8 mb-8">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">Coverage Map</h1>
        <p className="text-center text-gray-600">View childhood vaccination coverage by region</p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border-2 border-gray-800 p-6 mb-8">
        <div className="grid grid-cols-3 gap-6 mb-4">
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">State</label>
            <select className="w-full px-4 py-3 bg-white border-2 border-gray-800 text-gray-900">
              <option>Victoria</option>
              <option>New South Wales</option>
              <option>Queensland</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">Region Type</label>
            <select className="w-full px-4 py-3 bg-white border-2 border-gray-800 text-gray-900">
              <option>Local Government Area</option>
              <option>Statistical Area</option>
              <option>Health District</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">Age Group</label>
            <select className="w-full px-4 py-3 bg-white border-2 border-gray-800 text-gray-900">
              <option>12 months</option>
              <option>24 months</option>
              <option>5 years</option>
            </select>
          </div>
        </div>
        <div className="text-center">
          <button className="bg-gray-800 text-white px-8 py-3 font-bold border-2 border-gray-800">
            Update Map
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white border-2 border-gray-800 p-6">
          <div className="text-sm font-bold text-gray-600 mb-2">Selected Area</div>
          <div className="text-2xl font-bold mb-1">Melbourne CBD</div>
          <div className="text-sm text-gray-600">Local Government Area</div>
        </div>
        <div className="bg-white border-2 border-gray-800 p-6">
          <div className="text-sm font-bold text-gray-600 mb-2">Coverage %</div>
          <div className="text-4xl font-bold mb-1">93.2%</div>
          <div className="text-sm text-gray-600">Current selection</div>
        </div>
        <div className="bg-white border-2 border-gray-800 p-6">
          <div className="text-sm font-bold text-gray-600 mb-2">State Average</div>
          <div className="text-4xl font-bold mb-1">94.5%</div>
          <div className="text-sm text-gray-600">Victoria</div>
        </div>
      </div>

      {/* Map Section */}
      <div className="bg-white border-2 border-gray-800 p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Regional Coverage Map</h2>
          {/* Legend */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gray-200 border-2 border-gray-800"></div>
              <span className="text-sm font-bold text-gray-700">Low (&lt;90%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gray-400 border-2 border-gray-800"></div>
              <span className="text-sm font-bold text-gray-700">Medium (90-94%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gray-600 border-2 border-gray-800"></div>
              <span className="text-sm font-bold text-gray-700">High (95%+)</span>
            </div>
          </div>
        </div>
        
        {/* Map Placeholder */}
        <div className="border-2 border-dashed border-gray-400 bg-gray-50 aspect-[16/9] flex items-center justify-center">
          <div className="text-center">
            <div className="w-24 h-24 border-2 border-gray-400 bg-gray-200 mx-auto mb-4"></div>
            <span className="text-sm font-bold text-gray-500">Interactive Map Visualization</span>
            <p className="text-xs text-gray-400 mt-2">Regions shaded by coverage level</p>
            <p className="text-xs text-gray-400">Click region to view details</p>
          </div>
        </div>
      </div>

      {/* Area Details Panel */}
      <div className="bg-white border-2 border-gray-800 p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Area Details</h2>
        <div className="border-2 border-gray-800">
          <table className="w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-4 text-left font-bold text-gray-900 border-b-2 border-gray-800">Region Name</th>
                <th className="px-6 py-4 text-left font-bold text-gray-900 border-b-2 border-gray-800">Coverage</th>
                <th className="px-6 py-4 text-left font-bold text-gray-900 border-b-2 border-gray-800">Child Population</th>
                <th className="px-6 py-4 text-left font-bold text-gray-900 border-b-2 border-gray-800">vs State Average</th>
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
              <tr className="border-b border-gray-400">
                <td className="px-6 py-4 text-gray-700">Southbank</td>
                <td className="px-6 py-4 font-bold">92.5%</td>
                <td className="px-6 py-4 text-gray-700">5,670</td>
                <td className="px-6 py-4 font-bold">-2.0%</td>
              </tr>
              <tr className="border-b border-gray-400">
                <td className="px-6 py-4 text-gray-700">Docklands</td>
                <td className="px-6 py-4 font-bold">91.3%</td>
                <td className="px-6 py-4 text-gray-700">4,180</td>
                <td className="px-6 py-4 font-bold">-3.2%</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-gray-700">Carlton</td>
                <td className="px-6 py-4 font-bold">90.7%</td>
                <td className="px-6 py-4 text-gray-700">3,920</td>
                <td className="px-6 py-4 font-bold">-3.8%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Insight Box */}
      <div className="bg-gray-50 border-2 border-gray-800 p-6">
        <h3 className="font-bold text-gray-900 mb-2">Plain-Language Summary</h3>
        <p className="text-gray-700 leading-relaxed">
          The map shows vaccination coverage across <strong>5 regions in Melbourne</strong>. Coverage rates range from 
          <strong> 90.7% to 95.2%</strong>. Melbourne CBD has the highest coverage at 95.2%, exceeding the state 
          average. Carlton has the lowest coverage at 90.7%, which is 3.8% below the state average. Most areas are 
          approaching the recommended 95% herd immunity threshold.
        </p>
      </div>
    </div>
  );
}