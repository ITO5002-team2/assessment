import { Link } from "react-router";

export function Home() {
  return (
    <div className="max-w-7xl mx-auto px-8 py-12">
      {/* Hero Section */}
      <div className="bg-white border-2 border-gray-800 p-12 mb-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-16 h-16 border-2 border-gray-800 bg-gray-200 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Understand childhood vaccination coverage in your area
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            This dashboard uses official public data to help parents, carers, and community health stakeholders 
            understand vaccination coverage rates for young children across Victoria and Australia.
          </p>
        </div>
      </div>

      {/* Area Selection */}
      <div className="bg-white border-2 border-gray-800 p-10 mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Select Your Area</h2>
        <div className="max-w-2xl mx-auto grid grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">State</label>
            <select className="w-full px-4 py-3 bg-white border-2 border-gray-800 text-gray-900">
              <option>Victoria</option>
              <option>New South Wales</option>
              <option>Queensland</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">Region</label>
            <select className="w-full px-4 py-3 bg-white border-2 border-gray-800 text-gray-900">
              <option>Melbourne CBD</option>
              <option>Greater Melbourne</option>
              <option>Regional Victoria</option>
            </select>
          </div>
        </div>
        <div className="text-center">
          <Link 
            to="/dashboard" 
            className="inline-block bg-gray-800 text-white px-8 py-4 font-bold border-2 border-gray-800"
          >
            View Dashboard →
          </Link>
        </div>
      </div>

      {/* Data Sources */}
      <div className="bg-white border-2 border-gray-800 p-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Trusted Data Sources</h2>
        <div className="grid grid-cols-3 gap-6">
          <div className="border-2 border-gray-800 bg-gray-50 p-6 text-center">
            <div className="w-16 h-16 border-2 border-gray-800 bg-gray-200 mx-auto mb-4" />
            <h3 className="font-bold text-gray-900 mb-2">AIR</h3>
            <p className="text-sm text-gray-600">Australian Immunisation Register</p>
          </div>
          <div className="border-2 border-gray-800 bg-gray-50 p-6 text-center">
            <div className="w-16 h-16 border-2 border-gray-800 bg-gray-200 mx-auto mb-4" />
            <h3 className="font-bold text-gray-900 mb-2">ABS</h3>
            <p className="text-sm text-gray-600">Australian Bureau of Statistics</p>
          </div>
          <div className="border-2 border-gray-800 bg-gray-50 p-6 text-center">
            <div className="w-16 h-16 border-2 border-gray-800 bg-gray-200 mx-auto mb-4" />
            <h3 className="font-bold text-gray-900 mb-2">Vic Health</h3>
            <p className="text-sm text-gray-600">Victorian Health Information</p>
          </div>
        </div>
      </div>
    </div>
  );
}