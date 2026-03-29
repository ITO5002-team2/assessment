import { BookOpen, Shield, Users, Microscope, ExternalLink } from "lucide-react";
import { PageContainer } from "../components/PageContainer";
import { PageHero } from "../components/PageHero";
import { SectionCard } from "../components/SectionCard";

export function Learn() {
  return (
    <PageContainer>
      <PageHero
        title="Trusted Information"
        description="Learn about childhood vaccination, why coverage matters, and where to find trusted official guidance."
        icon={BookOpen}
        className="bg-gradient-to-r from-green-600 to-emerald-600"
      />

      {/* How To Read Coverage Data */}
      <SectionCard className="mb-8 p-8">
        <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold text-slate-900">
          <Shield className="h-7 w-7 text-blue-600" />
          How To Read Coverage Data
        </h2>

        <div className="space-y-4">
          <div className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-blue-600">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="mb-2 text-lg font-bold text-slate-900">Coverage Shows Recommended Uptake</h3>
                <p className="text-slate-700">Vaccination coverage reflects the percentage of children in an area who are recorded as having received the recommended immunisations for their age.</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-green-200 bg-gradient-to-br from-green-50 to-green-100 p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-green-600">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="mb-2 text-lg font-bold text-slate-900">Population Size Adds Important Context</h3>
                <p className="text-slate-700">A percentage should be read together with the number of children it represents. A small difference in coverage can reflect very different numbers of children depending on the population size of the area.</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100 p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-purple-600">
                <Microscope className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="mb-2 text-lg font-bold text-slate-900">Benchmarks Help Interpretation</h3>
                <p className="text-slate-700">The 95% benchmark and the state average help place an area in context. Together they show whether coverage is meeting a commonly used target and how it compares with the wider state pattern.</p>
              </div>
            </div>
          </div>
        </div>
      </SectionCard>

      {/* Resources */}
      <SectionCard className="mb-8 p-8">
        <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold text-slate-900">
          <ExternalLink className="h-7 w-7 text-green-600" />
          Official Resources
        </h2>

        <div className="space-y-4">
          <a
            href="https://immunisationhandbook.health.gov.au/"
            target="_blank"
            rel="noreferrer"
            className="group block rounded-2xl border-2 border-slate-200 bg-slate-50 p-6 transition-all hover:border-blue-400 hover:bg-slate-100"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="mb-1 text-lg font-bold text-slate-900 transition-colors group-hover:text-blue-600">Australian Immunisation Handbook</h3>
                <p className="text-sm text-slate-600">National clinical guidance on vaccines, schedules, and immunisation practice.</p>
              </div>
              <ExternalLink className="h-5 w-5 flex-shrink-0 text-slate-400 transition-colors group-hover:text-blue-600" />
            </div>
          </a>

          <a
            href="https://www.betterhealth.vic.gov.au/health/HealthyLiving/immunisation-childhood"
            target="_blank"
            rel="noreferrer"
            className="group block rounded-2xl border-2 border-slate-200 bg-slate-50 p-6 transition-all hover:border-green-400 hover:bg-slate-100"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="mb-1 text-lg font-bold text-slate-900 transition-colors group-hover:text-green-600">Better Health Channel Victoria</h3>
                <p className="text-sm text-slate-600">Victorian childhood immunisation guidance written for the public, including schedule and side-effect information.</p>
              </div>
              <ExternalLink className="h-5 w-5 flex-shrink-0 text-slate-400 transition-colors group-hover:text-green-600" />
            </div>
          </a>

          <a
            href="https://www.who.int/news-room/questions-and-answers/item/vaccines-and-immunization-vaccine-safety"
            target="_blank"
            rel="noreferrer"
            className="group block rounded-2xl border-2 border-slate-200 bg-slate-50 p-6 transition-all hover:border-purple-400 hover:bg-slate-100"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="mb-1 text-lg font-bold text-slate-900 transition-colors group-hover:text-purple-600">WHO Vaccine Safety Q&amp;A</h3>
                <p className="text-sm text-slate-600">Global public health information explaining how vaccine safety is tested, monitored, and reviewed over time.</p>
              </div>
              <ExternalLink className="h-5 w-5 flex-shrink-0 text-slate-400 transition-colors group-hover:text-purple-600" />
            </div>
          </a>
        </div>
      </SectionCard>

    </PageContainer>
  );
}
