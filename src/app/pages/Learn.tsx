import { Link } from "react-router";

export function Learn() {
  return (
    <div className="max-w-5xl mx-auto px-8 py-8">
      {/* Title */}
      <div className="bg-white border-2 border-gray-800 p-8 mb-8">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">
          Trusted Information
        </h1>
        <p className="text-center text-gray-600">
          Learn about childhood vaccination and view trusted resources
        </p>
      </div>

      {/* Notice Box */}
      <div className="bg-gray-50 border-2 border-gray-800 p-6 mb-8">
        <h2 className="font-bold text-gray-900 mb-2">Important Notice</h2>
        <p className="text-gray-700">
          This dashboard provides information only and is not medical advice.
        </p>
      </div>

      {/* Why Vaccination Matters */}
      <div className="bg-white border-2 border-gray-800 p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Why Childhood Vaccination Matters
        </h2>

        <div className="space-y-4">
          <div className="bg-gray-50 border-2 border-gray-800 p-5">
            <h3 className="font-bold text-gray-900 mb-2">Protects Individual Children</h3>
            <p className="text-gray-600">Short explanation placeholder text.</p>
          </div>

          <div className="bg-gray-50 border-2 border-gray-800 p-5">
            <h3 className="font-bold text-gray-900 mb-2">Supports Community Health</h3>
            <p className="text-gray-600">Short explanation placeholder text.</p>
          </div>

          <div className="bg-gray-50 border-2 border-gray-800 p-5">
            <h3 className="font-bold text-gray-900 mb-2">Based on Scientific Evidence</h3>
            <p className="text-gray-600">Short explanation placeholder text.</p>
          </div>
        </div>
      </div>

      {/* Resources */}
      <div className="bg-white border-2 border-gray-800 p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Official Resources
        </h2>

        <div className="space-y-4">
          <div className="bg-gray-50 border-2 border-gray-800 p-5">
            <h3 className="font-bold text-gray-900 mb-1">Australian Immunisation Handbook</h3>
            <p className="text-sm text-gray-600">Resource link placeholder</p>
          </div>

          <div className="bg-gray-50 border-2 border-gray-800 p-5">
            <h3 className="font-bold text-gray-900 mb-1">Victorian Department of Health</h3>
            <p className="text-sm text-gray-600">Resource link placeholder</p>
          </div>

          <div className="bg-gray-50 border-2 border-gray-800 p-5">
            <h3 className="font-bold text-gray-900 mb-1">WHO Vaccination Information</h3>
            <p className="text-sm text-gray-600">Resource link placeholder</p>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-white border-2 border-gray-800 p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          FAQ
        </h2>

        <div className="space-y-4">
          <div className="bg-gray-50 border-2 border-gray-800 p-5">
            <h3 className="font-bold text-gray-900 mb-2">What does vaccination coverage mean?</h3>
            <p className="text-gray-600">Answer placeholder text.</p>
          </div>

          <div className="bg-gray-50 border-2 border-gray-800 p-5">
            <h3 className="font-bold text-gray-900 mb-2">Where does the data come from?</h3>
            <p className="text-gray-600">Answer placeholder text.</p>
          </div>

          <div className="bg-gray-50 border-2 border-gray-800 p-5">
            <h3 className="font-bold text-gray-900 mb-2">How can I check my child's vaccination status?</h3>
            <p className="text-gray-600">Answer placeholder text.</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <Link
          to="/dashboard"
          className="inline-block bg-gray-800 text-white px-8 py-4 font-bold border-2 border-gray-800"
        >
          View Coverage Dashboard →
        </Link>
      </div>
    </div>
  );
}