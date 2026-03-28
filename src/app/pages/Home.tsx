import { Link } from "react-router";
import { Shield, Database, BarChart2, ArrowRight } from "lucide-react";
import { PageContainer } from "../components/PageContainer";
import { PageHero } from "../components/PageHero";
import { SectionCard } from "../components/SectionCard";

export function Home() {
  return (
    <PageContainer className="py-10">
      <PageHero
        title="Assess childhood vaccination coverage and risk patterns with confidence"
        description="This dashboard is designed first for clinicians, GPs, nurses, and community health workers who need a fast, trustworthy view of childhood vaccination coverage by area. It also supports conversations with parents and guardians through clear, plain-language framing."
        icon={Shield}
        className="bg-gradient-to-br from-blue-600 via-blue-700 to-slate-900 p-12 shadow-2xl"
        contentClassName="mx-auto max-w-3xl"
        iconBadgeClassName="mb-6 h-20 w-20 bg-white/15"
      />

      {/* Area Selection */}
      <SectionCard className="mb-8 p-10">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900">Select Your Area</h2>
          <p className="mt-2 text-slate-600">
            Choose a location to review local coverage patterns, compare regions, and prepare for clinician-patient conversations with clearer context.
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
      </SectionCard>

      {/* Data Sources */}
      <SectionCard className="p-10">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900">Trusted Data Sources</h2>
          <p className="mt-2 text-slate-600">
            The dashboard is grounded in official vaccination and population datasets to support credible, evidence-based interpretation.
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
            <h3 className="mb-2 text-lg font-bold text-slate-900">Public Health Guidance</h3>
            <p className="text-sm text-slate-600">State and national health sources that support interpretation and follow-up learning.</p>
          </div>
        </div>
      </SectionCard>
    </PageContainer>
  );
}
