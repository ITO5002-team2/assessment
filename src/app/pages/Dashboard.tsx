import { Link } from "react-router";

export function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto px-8 py-8">
      {/* Filter Bar */}
      <div className="bg-white border-2 border-gray-800 p-6 mb-8">
        <div className="grid grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">State</label>
            <select className="w-full px-4 py-3 bg-white border-2 border-gray-800 text-gray-900">
              <option>Victoria</option>
              <option>New South Wales</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">Region</label>
            <select className="w-full px-4 py-3 bg-white border-2 border-gray-800 text-gray-900">
              <option>Melbourne CBD</option>
              <option>Greater Melbourne</option>
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
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white border-2 border-gray-800 p-6">
          <div className="text-sm font-bold text-gray-600 mb-2">Coverage Rate</div>
          <div className="text-4xl font-bold mb-1">93.2%</div>
          <div className="text-sm text-gray-600">Current area</div>
        </div>
        <div className="bg-white border-2 border-gray-800 p-6">
          <div className="text-sm font-bold text-gray-600 mb-2">Child Population</div>
          <div className="text-4xl font-bold mb-1">45,230</div>
          <div className="text-sm text-gray-600">In selected region</div>
        </div>
        <div className="bg-white border-2 border-gray-800 p-6">
          <div className="text-sm font-bold text-gray-600 mb-2">State Average</div>
          <div className="text-4xl font-bold mb-1">94.5%</div>
          <div className="text-sm text-gray-600">Victoria</div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-2 gap-8 mb-8">
        {/* Chart Area */}
        <div className="bg-white border-2 border-gray-800 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Coverage by Area</h2>
          <div className="border-2 border-dashed border-gray-400 bg-gray-50 aspect-video flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 border-2 border-gray-400 bg-gray-200 mx-auto mb-3" />
              <span className="text-sm font-bold text-gray-500">Bar Chart Visualization</span>
              <p className="text-xs text-gray-400 mt-1">Coverage % by region</p>
            </div>
          </div>
        </div>

        {/* Map/List Area */}
        <div className="bg-white border-2 border-gray-800 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Regional Breakdown</h2>
          <div className="bg-gray-50 border-2 border-gray-800 p-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center pb-3 border-b-2 border-gray-800">
                <span className="font-bold text-gray-900">Area Name</span>
                <span className="font-bold text-gray-900">Coverage</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-700">Melbourne CBD</span>
                <span className="font-bold">95.2%</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-700">Port Melbourne</span>
                <span className="font-bold">93.8%</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-700">Southbank</span>
                <span className="font-bold">92.5%</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-700">Docklands</span>
                <span className="font-bold">91.3%</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-700">Carlton</span>
                <span className="font-bold">90.7%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Insight Box */}
      <div className="bg-gray-50 border-2 border-gray-800 p-6 mb-8">
        <h3 className="font-bold text-gray-900 mb-2">Plain-Language Summary</h3>
        <p className="text-gray-700 leading-relaxed">
          This area has a vaccination coverage rate of 93.2%, which is <strong>below the state average</strong> of 94.5%. 
          To reach herd immunity thresholds, coverage rates of 95% or higher are recommended for most childhood vaccines.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-center">
        <Link 
          to="/compare" 
          className="px-6 py-3 bg-white border-2 border-gray-800 text-gray-900 font-bold"
        >
          Compare Areas
        </Link>
        <Link 
          to="/learn" 
          className="px-6 py-3 bg-white border-2 border-gray-800 text-gray-900 font-bold"
        >
          Learn More
        </Link>
      </div>
    </div>
  );
}