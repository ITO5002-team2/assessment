import { Link } from "react-router";
import { BookOpen, Shield, Users, Microscope, ExternalLink, HelpCircle, AlertTriangle, BarChart3 } from "lucide-react";

export function Learn() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      {/* Title */}
      <div className="mb-8 rounded-3xl bg-gradient-to-r from-green-600 to-emerald-600 p-10 text-white shadow-xl">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
            <BookOpen className="h-8 w-8 text-white" />
          </div>
          <h1 className="mb-2 text-3xl font-bold">
            Trusted Information
          </h1>
          <p className="text-green-50">
            Learn about childhood vaccination and view trusted resources
          </p>
        </div>
      </div>

      {/* Notice Box */}
      <div className="mb-8 rounded-2xl border-l-4 border-amber-500 bg-amber-50 p-6 shadow-md">
        <div className="flex items-start gap-3">
          <AlertTriangle className="mt-1 h-6 w-6 flex-shrink-0 text-amber-600" />
          <div>
            <h2 className="mb-2 font-bold text-slate-900">Important Notice</h2>
            <p className="text-slate-700">
              This dashboard provides information only and is not medical advice. Please consult with your healthcare provider for personalized guidance.
            </p>
          </div>
        </div>
      </div>

      {/* Why Vaccination Matters */}
      <div className="mb-8 rounded-3xl bg-white p-8 shadow-lg ring-1 ring-slate-200">
        <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold text-slate-900">
          <Shield className="h-7 w-7 text-blue-600" />
          Why Childhood Vaccination Matters
        </h2>

        <div className="space-y-4">
          <div className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-blue-600">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="mb-2 text-lg font-bold text-slate-900">Protects Individual Children</h3>
                <p className="text-slate-700">Vaccines help protect children from serious diseases such as measles, whooping cough, and polio, reducing the risk of severe illness, complications, and hospitalization.</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-green-200 bg-gradient-to-br from-green-50 to-green-100 p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-green-600">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="mb-2 text-lg font-bold text-slate-900">Supports Community Health</h3>
                <p className="text-slate-700">Strong coverage helps build herd immunity, which offers indirect protection to people who cannot be vaccinated or who are at greater clinical risk.</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100 p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-purple-600">
                <Microscope className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="mb-2 text-lg font-bold text-slate-900">Based on Scientific Evidence</h3>
                <p className="text-slate-700">Vaccines are evaluated through rigorous research, regulatory review, and ongoing monitoring to support safety and effectiveness over time.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Resources */}
      <div className="mb-8 rounded-3xl bg-white p-8 shadow-lg ring-1 ring-slate-200">
        <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold text-slate-900">
          <ExternalLink className="h-7 w-7 text-green-600" />
          Official Resources
        </h2>

        <div className="space-y-4">
          <a href="#" className="group block rounded-2xl border-2 border-slate-200 bg-slate-50 p-6 transition-all hover:border-blue-400 hover:bg-slate-100">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="mb-1 text-lg font-bold text-slate-900 transition-colors group-hover:text-blue-600">Australian Immunisation Handbook</h3>
                <p className="text-sm text-slate-600">National clinical guidance on vaccines, schedules, and immunisation practice.</p>
              </div>
              <ExternalLink className="h-5 w-5 flex-shrink-0 text-slate-400 transition-colors group-hover:text-blue-600" />
            </div>
          </a>

          <a href="#" className="group block rounded-2xl border-2 border-slate-200 bg-slate-50 p-6 transition-all hover:border-green-400 hover:bg-slate-100">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="mb-1 text-lg font-bold text-slate-900 transition-colors group-hover:text-green-600">Victorian Department of Health</h3>
                <p className="text-sm text-slate-600">Local vaccination guidance, community health information, and service directories.</p>
              </div>
              <ExternalLink className="h-5 w-5 flex-shrink-0 text-slate-400 transition-colors group-hover:text-green-600" />
            </div>
          </a>

          <a href="#" className="group block rounded-2xl border-2 border-slate-200 bg-slate-50 p-6 transition-all hover:border-purple-400 hover:bg-slate-100">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="mb-1 text-lg font-bold text-slate-900 transition-colors group-hover:text-purple-600">WHO Vaccination Information</h3>
                <p className="text-sm text-slate-600">Global public health guidance and vaccine safety information from the World Health Organization.</p>
              </div>
              <ExternalLink className="h-5 w-5 flex-shrink-0 text-slate-400 transition-colors group-hover:text-purple-600" />
            </div>
          </a>
        </div>
      </div>

      {/* FAQ */}
      <div className="mb-8 rounded-3xl bg-white p-8 shadow-lg ring-1 ring-slate-200">
        <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold text-slate-900">
          <HelpCircle className="h-7 w-7 text-blue-600" />
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          <div className="rounded-2xl border border-blue-200 bg-blue-50 p-6">
            <h3 className="mb-3 flex items-center gap-2 font-bold text-slate-900">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-sm text-white">Q</span>
              What does vaccination coverage mean?
            </h3>
            <p className="pl-8 text-slate-700">Vaccination coverage refers to the percentage of children in a particular area who have received the recommended immunisations for their age.</p>
          </div>

          <div className="rounded-2xl border border-green-200 bg-green-50 p-6">
            <h3 className="mb-3 flex items-center gap-2 font-bold text-slate-900">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-600 text-sm text-white">Q</span>
              Where does the data come from?
            </h3>
            <p className="pl-8 text-slate-700">The dashboard is intended to draw from official public datasets such as the Australian Immunisation Register and relevant health and population sources.</p>
          </div>

          <div className="rounded-2xl border border-purple-200 bg-purple-50 p-6">
            <h3 className="mb-3 flex items-center gap-2 font-bold text-slate-900">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-600 text-sm text-white">Q</span>
              How can I check my child's vaccination status?
            </h3>
            <p className="pl-8 text-slate-700">You can usually confirm immunisation history through Medicare-linked services, the Australian Immunisation Register, or your healthcare provider.</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white shadow-lg transition-all hover:bg-blue-700 hover:shadow-xl"
        >
          <BarChart3 className="h-5 w-5" />
          View Coverage Dashboard
        </Link>
      </div>
    </div>
  );
}
