import { useMemo, useState } from "react";
import { Link } from "react-router";
import { Shield, Database, BarChart2, ArrowRight, ExternalLink, MapPinned, GitCompare, BookOpen, LayoutDashboard } from "lucide-react";
import { PageContainer } from "../components/PageContainer";
import { PageHero } from "../components/PageHero";
import { SectionCard } from "../components/SectionCard";
import { getRegionsForState, stateOptions, type StateCode } from "../data/vaccinationData";

export function Home() {
  const [dashboardState, setDashboardState] = useState<StateCode>("VIC");
  const dashboardRegions = useMemo(() => getRegionsForState(dashboardState), [dashboardState]);
  const [dashboardRegion, setDashboardRegion] = useState(() => dashboardRegions[0]?.sa3Code ?? "");

  const [compareState, setCompareState] = useState<StateCode>("VIC");
  const compareRegions = useMemo(() => getRegionsForState(compareState), [compareState]);
  const [compareAreaOne, setCompareAreaOne] = useState(() => compareRegions[0]?.sa3Code ?? "");
  const [compareAreaTwo, setCompareAreaTwo] = useState(() => compareRegions[1]?.sa3Code ?? compareRegions[0]?.sa3Code ?? "");

  function handleDashboardStateChange(nextState: StateCode) {
    setDashboardState(nextState);
    const nextRegions = getRegionsForState(nextState);
    setDashboardRegion(nextRegions[0]?.sa3Code ?? "");
  }

  function handleCompareStateChange(nextState: StateCode) {
    setCompareState(nextState);
    const nextRegions = getRegionsForState(nextState);
    setCompareAreaOne(nextRegions[0]?.sa3Code ?? "");
    setCompareAreaTwo(nextRegions[1]?.sa3Code ?? nextRegions[0]?.sa3Code ?? "");
  }

  const dataSources = [
    {
      title: "Childhood Immunisation Coverage",
      source: "Australian Government",
      description:
        "Official childhood immunisation coverage data used for region-level coverage and benchmark comparisons.",
      href: "https://www.health.gov.au/topics/immunisation/immunisation-data/childhood-immunisation-coverage",
      icon: Database,
      iconClassName: "bg-blue-600",
    },
    {
      title: "Regional Population by Age and Sex",
      source: "Australian Bureau of Statistics",
      description:
        "Official ABS population data used to give child cohort context for the selected age group and region.",
      href: "https://www.abs.gov.au/statistics/people/population/regional-population-age-and-sex/latest-release",
      icon: BarChart2,
      iconClassName: "bg-green-600",
    },
    {
      title: "SA3 Allocation and Reference Files",
      source: "Australian Bureau of Statistics",
      description:
        "ABS geographic reference material that supports SA3 naming, joins, and regional structure across the dashboard.",
      href: "https://www.abs.gov.au/statistics/standards/australian-statistical-geography-standard-asgs-edition-3/jul2021-jun2026/access-and-downloads/allocation-files",
      icon: MapPinned,
      iconClassName: "bg-slate-700",
    },
  ] as const;

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

      {/* Workflow Selection */}
      <SectionCard className="mb-8 p-10">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900">Choose Your View</h2>
          <p className="mt-2 text-slate-600">
            Start with the workflow that best matches what you need to do next, from detailed review to area comparison or learning support.
          </p>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <SectionCard className="border-blue-200 bg-gradient-to-br from-blue-50 via-white to-white p-8 shadow-md">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600">
              <LayoutDashboard className="h-7 w-7 text-white" />
            </div>
            <div className="mb-6">
              <h3 className="text-xl font-bold text-slate-900">Open Dashboard</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Review one selected region in detail with coverage, vaccine-level context, and a plain-language summary.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">State</label>
                <select
                  value={dashboardState}
                  onChange={(event) => handleDashboardStateChange(event.target.value as StateCode)}
                  className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-slate-900 transition-all focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100"
                >
                  {stateOptions.map((state) => (
                    <option key={state.code} value={state.code}>
                      {state.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Region</label>
                <select
                  value={dashboardRegion}
                  onChange={(event) => setDashboardRegion(event.target.value)}
                  className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-slate-900 transition-all focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100"
                >
                  {dashboardRegions.map((region) => (
                    <option key={region.sa3Code} value={region.sa3Code}>
                      {region.sa3Name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mt-6">
              <Link
                to={`/dashboard?state=${dashboardState}&region=${dashboardRegion}`}
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg transition-all hover:bg-blue-700 hover:shadow-xl"
              >
                Go to Dashboard
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </SectionCard>

          <SectionCard className="border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-white p-8 shadow-md">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-600">
              <GitCompare className="h-7 w-7 text-white" />
            </div>
            <div className="mb-6">
              <h3 className="text-xl font-bold text-slate-900">Compare Areas</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Start a side-by-side comparison using the current state and two regions you want to review together.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">State</label>
                <select
                  value={compareState}
                  onChange={(event) => handleCompareStateChange(event.target.value as StateCode)}
                  className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-slate-900 transition-all focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-100"
                >
                  {stateOptions.map((state) => (
                    <option key={state.code} value={state.code}>
                      {state.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Area 1</label>
                <select
                  value={compareAreaOne}
                  onChange={(event) => setCompareAreaOne(event.target.value)}
                  className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-slate-900 transition-all focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-100"
                >
                  {compareRegions.map((region) => (
                    <option key={region.sa3Code} value={region.sa3Code}>
                      {region.sa3Name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Area 2</label>
                <select
                  value={compareAreaTwo}
                  onChange={(event) => setCompareAreaTwo(event.target.value)}
                  className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-slate-900 transition-all focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-100"
                >
                  {compareRegions.map((region) => (
                    <option key={region.sa3Code} value={region.sa3Code}>
                      {region.sa3Name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mt-6">
              <Link
                to={`/compare?state=${compareState}&area1=${compareAreaOne}&area2=${compareAreaTwo}`}
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white shadow-lg transition-all hover:bg-emerald-700 hover:shadow-xl"
              >
                Compare Regions
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </SectionCard>

          <Link
            to="/map"
            className="group rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg"
          >
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-700">
              <MapPinned className="h-7 w-7 text-white" />
            </div>
            <div className="mb-6">
              <h3 className="text-xl font-bold text-slate-900">Maps</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Explore the map view to inspect spatial patterns and move between regions visually.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700">
              Open Maps
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </div>
          </Link>

          <Link
            to="/learn"
            className="group rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg"
          >
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500">
              <BookOpen className="h-7 w-7 text-white" />
            </div>
            <div className="mb-6">
              <h3 className="text-xl font-bold text-slate-900">Learn More</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Use the learning section for trusted background information and support for interpreting vaccination coverage.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700">
              Open Learn
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </div>
          </Link>
        </div>
      </SectionCard>

      {/* Data Sources */}
      <SectionCard className="p-10">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900">Trusted Data Sources</h2>
          <p className="mt-2 text-slate-600">
            The current dashboard experience is based on confirmed official source pages for vaccination coverage, population context, and SA3 geography structure.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {dataSources.map(({ title, source, description, href, icon: Icon, iconClassName }) => (
            <a
              key={title}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="group rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg"
            >
              <div className={`mb-4 flex h-16 w-16 items-center justify-center rounded-full ${iconClassName}`}>
                <Icon className="h-8 w-8 text-white" />
              </div>
              <div className="mb-3 flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">{source}</p>
                  <h3 className="mt-2 text-lg font-bold text-slate-900">{title}</h3>
                </div>
                <ExternalLink className="mt-1 h-5 w-5 flex-shrink-0 text-slate-400 transition-colors group-hover:text-slate-700" />
              </div>
              <p className="text-sm leading-6 text-slate-600">{description}</p>
            </a>
          ))}
        </div>
      </SectionCard>
    </PageContainer>
  );
}
