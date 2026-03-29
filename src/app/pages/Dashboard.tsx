import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { Target, Users, TrendingUp, BarChart3, TableProperties, AlertCircle, GitCompare, BookOpen } from "lucide-react";
import { FilterPanel } from "../components/FilterPanel";
import { InsightCallout } from "../components/InsightCallout";
import { PageContainer } from "../components/PageContainer";
import { SectionCard } from "../components/SectionCard";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import {
  AGE_GROUPS,
  getAreaInsightByCode,
  getAreaInsights,
  getCoverageSummaryForState,
  getRegionsForState,
  stateOptions,
  type AgeGroup,
  type StateCode,
} from "../data/vaccinationData";

const AGE_GROUP_LABELS: Record<AgeGroup, string> = {
  "1 Year olds": "12 months",
  "2 Year olds": "24 months",
  "5 Year olds": "5 years",
};

const AGE_GROUP_VALUES_BY_LABEL = Object.fromEntries(
  Object.entries(AGE_GROUP_LABELS).map(([value, label]) => [label, value]),
) as Record<string, AgeGroup>;

function isStateCode(value: string | null): value is StateCode {
  return stateOptions.some((state) => state.code === value);
}

export function Dashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialState = isStateCode(searchParams.get("state")) ? searchParams.get("state") : "VIC";
  const [selectedState, setSelectedState] = useState<StateCode>(initialState);
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<AgeGroup>("1 Year olds");

  const regions = useMemo(() => getRegionsForState(selectedState), [selectedState]);
  const fallbackRegion = regions[0]?.sa3Code ?? "";
  const initialRegion =
    regions.some((region) => region.sa3Code === searchParams.get("region")) ? searchParams.get("region") ?? "" : fallbackRegion;
  const [selectedRegion, setSelectedRegion] = useState(initialRegion);

  const selectedArea = getAreaInsightByCode({
    sa3Code: selectedRegion,
    ageGroup: selectedAgeGroup,
  });

  const summary = getCoverageSummaryForState({
    stateCode: selectedState,
    ageGroup: selectedAgeGroup,
  });

  const regionalBreakdown = getAreaInsights({
    stateCode: selectedState,
    ageGroup: selectedAgeGroup,
  })
    .filter((insight) => insight.fullyVaccinatedPct !== null)
    .sort((left, right) => (right.fullyVaccinatedPct ?? 0) - (left.fullyVaccinatedPct ?? 0));

  const selectedRegionRank = selectedArea
    ? regionalBreakdown.findIndex((region) => region.sa3Code === selectedArea.sa3Code) + 1
    : null;

  const regionalBreakdownRows = useMemo(() => {
    const topNine = regionalBreakdown.slice(0, 9);

    if (topNine.some((region) => region.sa3Code === selectedRegion)) {
      return topNine.map((region, index) => ({
        ...region,
        rank: index + 1,
      }));
    }

    const selectedRegionRow = regionalBreakdown.find((region) => region.sa3Code === selectedRegion);

    const rankedTopNine = topNine.map((region, index) => ({
      ...region,
      rank: index + 1,
    }));

    if (!selectedRegionRow) {
      return rankedTopNine;
    }

    const selectedRegionRank = regionalBreakdown.findIndex((region) => region.sa3Code === selectedRegionRow.sa3Code) + 1;

    return [
      ...rankedTopNine,
      {
        ...selectedRegionRow,
        rank: selectedRegionRank,
      },
    ];
  }, [regionalBreakdown, selectedRegion]);

  function updateSearch(nextState: StateCode, nextRegion: string) {
    setSearchParams({
      state: nextState,
      region: nextRegion,
    });
  }

  function handleStateChange(nextState: StateCode) {
    setSelectedState(nextState);
    const nextRegions = getRegionsForState(nextState);
    const nextRegion = nextRegions[0]?.sa3Code ?? "";
    setSelectedRegion(nextRegion);
    updateSearch(nextState, nextRegion);
  }

  function handleRegionChange(nextRegion: string) {
    setSelectedRegion(nextRegion);
    updateSearch(selectedState, nextRegion);
  }

  return (
    <PageContainer>
      {/* Filter Bar */}
      <FilterPanel className="mb-6 p-6">
        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">State</label>
            <select
              value={selectedState}
              onChange={(event) => handleStateChange(event.target.value as StateCode)}
              className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100"
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
              value={selectedRegion}
              onChange={(event) => handleRegionChange(event.target.value)}
              className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100"
            >
              {regions.map((region) => (
                <option key={region.sa3Code} value={region.sa3Code}>
                  {region.sa3Name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">Age Group</label>
            <select
              value={AGE_GROUP_LABELS[selectedAgeGroup]}
              onChange={(event) => setSelectedAgeGroup(AGE_GROUP_VALUES_BY_LABEL[event.target.value])}
              className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100"
            >
              {AGE_GROUPS.map((ageGroup) => (
                <option key={ageGroup} value={AGE_GROUP_LABELS[ageGroup]}>
                  {AGE_GROUP_LABELS[ageGroup]}
                </option>
              ))}
            </select>
          </div>
        </div>
      </FilterPanel>

      {/* Summary Cards */}
      <div className="mb-6 grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 p-6 text-white shadow-xl">
          <div className="mb-3 flex items-center justify-between">
            <div className="text-sm font-semibold text-blue-100">Coverage Rate</div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20">
              <Target className="h-5 w-5" />
            </div>
          </div>
          <div className="mb-1 text-4xl font-bold">
            {selectedArea?.fullyVaccinatedPct !== null && selectedArea?.fullyVaccinatedPct !== undefined
              ? `${selectedArea.fullyVaccinatedPct.toFixed(1)}%`
              : "No data"}
          </div>
          <div className="text-sm text-blue-100">{selectedArea?.sa3Name ?? "Current area"}</div>
        </div>
        <div className="rounded-2xl border-l-4 border-green-500 bg-white p-6 shadow-lg ring-1 ring-slate-200">
          <div className="mb-3 flex items-center justify-between">
            <div className="text-sm font-semibold text-slate-600">Child Population</div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
              <Users className="h-5 w-5 text-green-600" />
            </div>
          </div>
          <div className="mb-1 text-4xl font-bold text-slate-900">
            {selectedArea?.childPopulation !== null && selectedArea?.childPopulation !== undefined
              ? selectedArea.childPopulation.toLocaleString()
              : "No data"}
          </div>
          <div className="text-sm text-slate-500">
            {selectedArea?.sa3Name ? `In ${selectedArea.sa3Name}` : "In selected region"}
          </div>
        </div>
        <div className="rounded-2xl border-l-4 border-amber-500 bg-white p-6 shadow-lg ring-1 ring-slate-200">
          <div className="mb-3 flex items-center justify-between">
            <div className="text-sm font-semibold text-slate-600">State Average</div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100">
              <TrendingUp className="h-5 w-5 text-amber-600" />
            </div>
          </div>
          <div className="mb-1 text-4xl font-bold text-slate-900">
            {summary.averageFullyVaccinatedPct !== null ? `${summary.averageFullyVaccinatedPct.toFixed(1)}%` : "No data"}
          </div>
          <div className="text-sm text-slate-500">
            {stateOptions.find((state) => state.code === selectedState)?.name ?? selectedState}
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="mb-6 grid gap-6 lg:grid-cols-[0.9fr_1.5fr]">
        {/* Attention Panel */}
        <SectionCard className="min-w-0 rounded-2xl p-6">
          <h2 className="mb-4 flex items-center gap-3 text-xl font-bold text-slate-900">
            <BarChart3 className="h-6 w-6 text-blue-600" />
            What Needs Attention
          </h2>
          <p className="mb-4 text-sm text-slate-600">
            A quick interpretation of the selected region against the state benchmark and the 95% target for{" "}
            {AGE_GROUP_LABELS[selectedAgeGroup].toLowerCase()} children.
          </p>
          {selectedArea ? (
            <div className="space-y-4">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="mb-2 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-500">Selected Region</p>
                    <h3 className="text-2xl font-bold text-slate-900">{selectedArea.sa3Name}</h3>
                  </div>
                  <span
                    className={
                      selectedArea.fullyVaccinatedPct !== null && selectedArea.fullyVaccinatedPct >= 95
                        ? "inline-flex rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700"
                        : "inline-flex rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-700"
                    }
                  >
                    {selectedArea.fullyVaccinatedPct !== null && selectedArea.fullyVaccinatedPct >= 95
                      ? "At or above target"
                      : "Below target"}
                  </span>
                </div>
                <p className="text-sm text-slate-600">
                  {selectedArea.fullyVaccinatedPct !== null && selectedArea.fullyVaccinatedPct >= 95
                    ? "Coverage is meeting the 95% benchmark. Focus can shift to maintaining uptake and monitoring change."
                    : "Coverage is below the 95% benchmark, so this area may warrant closer review and follow-up."}
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <p className="text-sm font-semibold text-slate-500">State Rank</p>
                  <p className="mt-2 text-3xl font-bold text-slate-900">
                    {selectedRegionRank ? `#${selectedRegionRank}` : "No data"}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">Out of {regionalBreakdown.length} regions with available data</p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <p className="text-sm font-semibold text-slate-500">Child Cohort</p>
                  <p className="mt-2 text-3xl font-bold text-slate-900">
                    {selectedArea.childPopulation !== null ? selectedArea.childPopulation.toLocaleString() : "No data"}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    Children in the selected {AGE_GROUP_LABELS[selectedAgeGroup].toLowerCase()} cohort
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <p className="text-sm font-semibold text-slate-500">vs State Average</p>
                  <p
                    className={
                      selectedArea.gapToStateAveragePct !== null && selectedArea.gapToStateAveragePct >= 0
                        ? "mt-2 text-3xl font-bold text-green-700"
                        : "mt-2 text-3xl font-bold text-amber-700"
                    }
                  >
                    {selectedArea.gapToStateAveragePct !== null
                      ? `${selectedArea.gapToStateAveragePct >= 0 ? "+" : ""}${selectedArea.gapToStateAveragePct.toFixed(1)}%`
                      : "No data"}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    Compared with the {selectedArea.stateName} average for this age group
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <p className="text-sm font-semibold text-slate-500">vs 95% Target</p>
                  <p
                    className={
                      selectedArea.fullyVaccinatedPct !== null && selectedArea.fullyVaccinatedPct >= 95
                        ? "mt-2 text-3xl font-bold text-green-700"
                        : "mt-2 text-3xl font-bold text-red-700"
                    }
                  >
                    {selectedArea.fullyVaccinatedPct !== null
                      ? `${selectedArea.fullyVaccinatedPct - 95 >= 0 ? "+" : ""}${(selectedArea.fullyVaccinatedPct - 95).toFixed(1)}%`
                      : "No data"}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    Distance from the 95% benchmark used for childhood vaccine coverage
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex h-[320px] items-center justify-center rounded-2xl border border-slate-200 bg-slate-50">
              <p className="max-w-sm text-center text-sm text-slate-600">
                Coverage data is not currently available for the selected region and age-group combination.
              </p>
            </div>
          )}
        </SectionCard>

        {/* Map/List Area */}
        <SectionCard className="min-w-0 rounded-2xl p-6">
          <h2 className="mb-4 flex items-center gap-3 text-xl font-bold text-slate-900">
            <TableProperties className="h-6 w-6 text-emerald-600" />
            Regional Breakdown
          </h2>
          <p className="mb-4 text-sm text-slate-600">
            Exact values for the selected region and the closest state peers by gap to the state average.
          </p>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16 px-3">Rank</TableHead>
                  <TableHead className="px-3">Region</TableHead>
                  <TableHead className="px-3 text-right">Coverage</TableHead>
                  <TableHead className="px-3 text-right">Population</TableHead>
                  <TableHead className="px-3 text-right">vs State Avg</TableHead>
                  <TableHead className="px-3 text-right">vs 95% Target</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {regionalBreakdownRows.map((region) => (
                  <TableRow
                    key={region.sa3Code}
                    className={region.sa3Code === selectedRegion ? "bg-blue-50/80 hover:bg-blue-50/80" : undefined}
                  >
                    <TableCell className="px-3 font-semibold text-slate-600">#{region.rank}</TableCell>
                    <TableCell className="px-3 font-medium text-slate-900">
                      {region.sa3Name}
                      {region.sa3Code === selectedRegion ? (
                        <span className="ml-2 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700">
                          Selected
                        </span>
                      ) : null}
                    </TableCell>
                    <TableCell className="px-3 text-right font-semibold text-slate-900">
                      {region.fullyVaccinatedPct?.toFixed(1)}%
                    </TableCell>
                    <TableCell className="px-3 text-right text-slate-700">
                      {region.childPopulation !== null ? region.childPopulation.toLocaleString() : "No data"}
                    </TableCell>
                    <TableCell className="px-3 text-right">
                      <span
                        className={
                          region.gapToStateAveragePct !== null && region.gapToStateAveragePct >= 0
                            ? "font-semibold text-green-700"
                            : "font-semibold text-amber-700"
                        }
                      >
                        {region.gapToStateAveragePct !== null
                          ? `${region.gapToStateAveragePct >= 0 ? "+" : ""}${region.gapToStateAveragePct.toFixed(1)}%`
                          : "No data"}
                      </span>
                    </TableCell>
                    <TableCell className="px-3 text-right">
                      {region.fullyVaccinatedPct !== null ? (
                        <span
                          className={
                            region.fullyVaccinatedPct >= 95
                              ? "inline-flex rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700"
                              : "inline-flex rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-700"
                          }
                        >
                          {region.fullyVaccinatedPct - 95 >= 0 ? "+" : ""}
                          {(region.fullyVaccinatedPct - 95).toFixed(1)}%
                        </span>
                      ) : (
                        "No data"
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </SectionCard>
      </div>

      {/* Insight Box */}
      <InsightCallout
        title="Plain-Language Summary"
        icon={AlertCircle}
        className="mb-6 rounded-2xl border-l-4 border-blue-500 bg-blue-50 p-6"
        iconClassName="text-blue-600"
      >
        <p>
          {selectedArea?.fullyVaccinatedPct !== null && selectedArea?.fullyVaccinatedPct !== undefined
            ? (
              <>
                <strong>{selectedArea.sa3Name}</strong> has a vaccination coverage rate of{" "}
                <strong>{selectedArea.fullyVaccinatedPct.toFixed(1)}%</strong>, which is{" "}
                <strong>
                  {selectedArea.gapToStateAveragePct !== null && selectedArea.gapToStateAveragePct >= 0 ? "at or above" : "below"} the
                  state average
                </strong>{" "}
                of {selectedArea.stateAveragePct?.toFixed(1)}% for {AGE_GROUP_LABELS[selectedAgeGroup].toLowerCase()} children.
              </>
            )
            : (
              <>
                Coverage is not currently available for <strong>{selectedArea?.sa3Name ?? "the selected area"}</strong>. You can keep the
                same state selected and choose another region to continue your review.
              </>
            )}{" "}
          To reach herd immunity thresholds, coverage rates of 95% or higher are recommended for most childhood vaccines.
        </p>
      </InsightCallout>

      {/* Action Buttons */}
      <div className="flex flex-wrap justify-center gap-4">
        <Link 
          to="/compare" 
          className="inline-flex items-center gap-2 rounded-xl border-2 border-slate-300 bg-white px-6 py-3 font-semibold text-slate-800 shadow-sm transition-all hover:border-slate-400 hover:bg-slate-50"
        >
          <GitCompare className="h-5 w-5" />
          Compare Areas
        </Link>
        <Link 
          to="/learn" 
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-md transition-all hover:bg-blue-700"
        >
          <BookOpen className="h-5 w-5" />
          Learn More
        </Link>
      </div>
    </PageContainer>
  );
}
