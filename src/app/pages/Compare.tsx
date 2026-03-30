import { useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import {
  AlertCircle,
  CheckCircle,
  Target,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";
import { FilterPanel } from "../components/FilterPanel";
import { InsightCallout } from "../components/InsightCallout";
import { PageContainer } from "../components/PageContainer";
import { SectionCard } from "../components/SectionCard";
import {
  AGE_GROUPS,
  getAreaInsightByCode,
  getAreaInsights,
  getCoverageRecordByCode,
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

const ANTIGEN_CONFIG: Record<
  AgeGroup,
  Array<{ key: keyof ReturnType<typeof getCoverageRecordByCode>["antigens"]; label: string }>
> = {
  "1 Year olds": [
    { key: "dtp", label: "DTP" },
    { key: "polio", label: "Polio" },
    { key: "hib", label: "HIB" },
    { key: "hep", label: "Hep B" },
    { key: "pneumo", label: "Pneumo" },
  ],
  "2 Year olds": [
    { key: "dtp", label: "DTP" },
    { key: "mmr", label: "MMR" },
    { key: "pneumo", label: "Pneumo" },
    { key: "menC", label: "MenC" },
    { key: "varicella", label: "Varicella" },
  ],
  "5 Year olds": [
    { key: "dtp", label: "DTP" },
    { key: "polio", label: "Polio" },
  ],
};

const DEFAULT_HERO_SCALE_MIN = 90;
const HERO_SCALE_MAX = 100;

const AREA_MARKER_STYLES = [
  {
    marker: "bg-blue-600",
    text: "text-blue-700",
    badge: "bg-blue-100 text-blue-700",
  },
  {
    marker: "bg-emerald-600",
    text: "text-emerald-700",
    badge: "bg-emerald-100 text-emerald-700",
  },
  {
    marker: "bg-violet-600",
    text: "text-violet-700",
    badge: "bg-violet-100 text-violet-700",
  },
] as const;

function isStateCode(value: string | null): value is StateCode {
  return stateOptions.some((state) => state.code === value);
}

function roundToOneDecimal(value: number) {
  return Math.round(value * 10) / 10;
}

function getStatusTone(delta: number | null) {
  if (delta === null) {
    return "neutral";
  }

  if (roundToOneDecimal(delta) >= 0) {
    return "positive";
  }

  return "negative";
}

function getBadgeClassName(tone: ReturnType<typeof getStatusTone>) {
  if (tone === "positive") {
    return "inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700";
  }

  if (tone === "negative") {
    return "inline-flex items-center gap-1 rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-700";
  }

  return "inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700";
}

function getTextClassName(tone: ReturnType<typeof getStatusTone>) {
  if (tone === "positive") {
    return "text-base font-semibold text-green-600 md:text-lg";
  }

  if (tone === "negative") {
    return "text-base font-semibold text-red-600 md:text-lg";
  }

  return "text-base font-semibold text-slate-600 md:text-lg";
}

function getMatrixCellClassName(tone: ReturnType<typeof getStatusTone>) {
  if (tone === "positive") {
    return "border-green-200 bg-green-50 text-green-700";
  }

  if (tone === "negative") {
    return "border-red-200 bg-red-50 text-red-700";
  }

  return "border-slate-200 bg-slate-50 text-slate-700";
}

function getMatrixStatusLabel(tone: ReturnType<typeof getStatusTone>) {
  if (tone === "positive") {
    return "Above target";
  }

  if (tone === "negative") {
    return "Below target";
  }

  return "No data";
}

function estimateChildrenNeeded(coveragePct: number | null, childPopulation: number | null) {
  if (coveragePct === null || childPopulation === null || coveragePct >= 95) {
    return 0;
  }

  return Math.ceil(((95 - coveragePct) / 100) * childPopulation);
}

function getScalePosition(value: number, scaleMin: number, scaleRange: number) {
  const clamped = Math.min(HERO_SCALE_MAX, Math.max(scaleMin, value));
  return ((clamped - scaleMin) / scaleRange) * 100;
}

export function Compare() {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialState = isStateCode(searchParams.get("state")) ? searchParams.get("state") : "VIC";
  const initialAgeGroup = AGE_GROUPS.includes(searchParams.get("ageGroup") as AgeGroup)
    ? (searchParams.get("ageGroup") as AgeGroup)
    : "1 Year olds";

  const [selectedState, setSelectedState] = useState<StateCode>(initialState);
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<AgeGroup>(initialAgeGroup);

  const regions = useMemo(() => getRegionsForState(selectedState), [selectedState]);

  const initialArea1 =
    regions.some((region) => region.sa3Code === searchParams.get("area1"))
      ? searchParams.get("area1") ?? regions[0]?.sa3Code ?? ""
      : regions[0]?.sa3Code ?? "";
  const initialArea2 =
    regions.some((region) => region.sa3Code === searchParams.get("area2"))
      ? searchParams.get("area2") ?? regions[1]?.sa3Code ?? regions[0]?.sa3Code ?? ""
      : regions[1]?.sa3Code ?? regions[0]?.sa3Code ?? "";
  const initialArea3 =
    regions.some((region) => region.sa3Code === searchParams.get("area3")) ? searchParams.get("area3") ?? "" : "";

  const [area1, setArea1] = useState(initialArea1);
  const [area2, setArea2] = useState(initialArea2);
  const [area3, setArea3] = useState(initialArea3);

  function updateSearch(nextState: StateCode, nextAgeGroup: AgeGroup, nextArea1: string, nextArea2: string, nextArea3: string) {
    const params = new URLSearchParams();
    params.set("state", nextState);
    params.set("ageGroup", nextAgeGroup);
    params.set("area1", nextArea1);
    params.set("area2", nextArea2);
    if (nextArea3) {
      params.set("area3", nextArea3);
    }
    setSearchParams(params);
  }

  function handleStateChange(nextState: StateCode) {
    setSelectedState(nextState);
    const nextRegions = getRegionsForState(nextState);
    const nextArea1 = nextRegions[0]?.sa3Code ?? "";
    const nextArea2 = nextRegions[1]?.sa3Code ?? nextRegions[0]?.sa3Code ?? "";
    setArea1(nextArea1);
    setArea2(nextArea2);
    setArea3("");
    updateSearch(nextState, selectedAgeGroup, nextArea1, nextArea2, "");
  }

  function handleAgeGroupChange(nextAgeGroup: AgeGroup) {
    setSelectedAgeGroup(nextAgeGroup);
    updateSearch(selectedState, nextAgeGroup, area1, area2, area3);
  }

  function handleAreaChange(which: "area1" | "area2" | "area3", nextValue: string) {
    const nextArea1 = which === "area1" ? nextValue : area1;
    const nextArea2 = which === "area2" ? nextValue : area2;
    const nextArea3 = which === "area3" ? nextValue : area3;

    if (which === "area1") {
      setArea1(nextValue);
    }

    if (which === "area2") {
      setArea2(nextValue);
    }

    if (which === "area3") {
      setArea3(nextValue);
    }

    updateSearch(selectedState, selectedAgeGroup, nextArea1, nextArea2, nextArea3);
  }

  function isRegionDisabled(regionCode: string, currentField: "area1" | "area2" | "area3") {
    if (currentField !== "area1" && area1 === regionCode) {
      return true;
    }

    if (currentField !== "area2" && area2 === regionCode) {
      return true;
    }

    if (currentField !== "area3" && area3 === regionCode) {
      return true;
    }

    return false;
  }

  const stateSummary = getCoverageSummaryForState({
    stateCode: selectedState,
    ageGroup: selectedAgeGroup,
  });

  const stateRanking = useMemo(
    () =>
      getAreaInsights({ stateCode: selectedState, ageGroup: selectedAgeGroup })
        .filter((area) => area.fullyVaccinatedPct !== null)
        .sort((left, right) => (right.fullyVaccinatedPct ?? 0) - (left.fullyVaccinatedPct ?? 0)),
    [selectedAgeGroup, selectedState],
  );

  const selectedAreas = useMemo(
    () =>
      [area1, area2, area3]
        .filter((value, index, allValues) => value && allValues.indexOf(value) === index)
        .map((sa3Code) => {
          const area = getAreaInsightByCode({ sa3Code, ageGroup: selectedAgeGroup });
          const coverageRecord = getCoverageRecordByCode({ sa3Code, ageGroup: selectedAgeGroup });
          const rank = area ? stateRanking.findIndex((region) => region.sa3Code === area.sa3Code) + 1 : null;
          const targetGap = area?.fullyVaccinatedPct !== null && area?.fullyVaccinatedPct !== undefined ? area.fullyVaccinatedPct - 95 : null;

          if (!area || !coverageRecord) {
            return null;
          }

          return {
            ...area,
            rank: rank > 0 ? rank : null,
            targetGap,
            childrenNeededToTarget: estimateChildrenNeeded(area.fullyVaccinatedPct, area.childPopulation),
            antigens: ANTIGEN_CONFIG[selectedAgeGroup]
              .map(({ key, label }) => ({
                key,
                label,
                value: coverageRecord.antigens[key],
              }))
              .filter((item) => item.value !== null),
          };
        })
        .filter((area): area is NonNullable<typeof area> => Boolean(area)),
    [area1, area2, area3, selectedAgeGroup, stateRanking],
  );

  const highestCoverageArea = useMemo(
    () =>
      selectedAreas
        .filter((area) => area.fullyVaccinatedPct !== null)
        .sort((left, right) => (right.fullyVaccinatedPct ?? 0) - (left.fullyVaccinatedPct ?? 0))[0],
    [selectedAreas],
  );

  const lowestCoverageArea = useMemo(
    () =>
      selectedAreas
        .filter((area) => area.fullyVaccinatedPct !== null)
        .sort((left, right) => (left.fullyVaccinatedPct ?? 0) - (right.fullyVaccinatedPct ?? 0))[0],
    [selectedAreas],
  );

  const coverageSpread =
    highestCoverageArea?.fullyVaccinatedPct !== null &&
    highestCoverageArea?.fullyVaccinatedPct !== undefined &&
    lowestCoverageArea?.fullyVaccinatedPct !== null &&
    lowestCoverageArea?.fullyVaccinatedPct !== undefined
      ? highestCoverageArea.fullyVaccinatedPct - lowestCoverageArea.fullyVaccinatedPct
      : null;

  const antigenRows = useMemo(
    () =>
      ANTIGEN_CONFIG[selectedAgeGroup].map(({ key, label }) => ({
        key,
        label,
        values: selectedAreas.map((area) => ({
          sa3Code: area.sa3Code,
          sa3Name: area.sa3Name,
          value: area.antigens.find((item) => item.key === key)?.value ?? null,
        })),
      })),
    [selectedAgeGroup, selectedAreas],
  );

  const heroScaleMin = useMemo(() => {
    const values = selectedAreas
      .map((area) => area.fullyVaccinatedPct)
      .filter((value): value is number => value !== null);

    if (stateSummary.averageFullyVaccinatedPct !== null) {
      values.push(stateSummary.averageFullyVaccinatedPct);
    }

    values.push(95);

    const minimum = Math.min(...values);
    return minimum < DEFAULT_HERO_SCALE_MIN ? Math.max(80, Math.floor(minimum) - 1) : DEFAULT_HERO_SCALE_MIN;
  }, [selectedAreas, stateSummary.averageFullyVaccinatedPct]);

  const heroScaleRange = HERO_SCALE_MAX - heroScaleMin;

  const heroScaleAreas = useMemo(
    () =>
      selectedAreas
        .filter((area) => area.fullyVaccinatedPct !== null)
        .sort((left, right) => (right.fullyVaccinatedPct ?? 0) - (left.fullyVaccinatedPct ?? 0))
        .map((area, index) => ({
          ...area,
          markerStyle: AREA_MARKER_STYLES[index % AREA_MARKER_STYLES.length],
        })),
    [selectedAreas],
  );

  const markerStylesByCode = useMemo(
    () => new Map(heroScaleAreas.map((area) => [area.sa3Code, area.markerStyle])),
    [heroScaleAreas],
  );

  const antigenMatrixMinWidth = `${180 + selectedAreas.length * 220}px`;
  const antigenMatrixGridStyle = {
    gridTemplateColumns: `180px repeat(${selectedAreas.length}, minmax(220px, 1fr))`,
  };
  const comparisonCardsGridClass =
    selectedAreas.length === 1
      ? "mx-auto max-w-2xl"
      : selectedAreas.length === 2
        ? "lg:grid-cols-2"
        : "xl:grid-cols-3";

  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Compare Areas</h1>
        <p className="mt-2 max-w-3xl text-sm text-slate-600">
          Compare vaccination coverage across selected regions and cohorts to see which area is strongest, weakest, and
          furthest from the 95% target.
        </p>
      </div>

      <FilterPanel>
        <h2 className="mb-6 text-2xl font-bold text-slate-900">Select Areas</h2>
        <div className="grid gap-6 lg:grid-cols-5">
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
            <label className="mb-2 block text-sm font-semibold text-slate-700">Area 1</label>
            <select
              value={area1}
              onChange={(event) => handleAreaChange("area1", event.target.value)}
              className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100"
            >
              {regions.map((region) => (
                <option key={region.sa3Code} value={region.sa3Code} disabled={isRegionDisabled(region.sa3Code, "area1")}>
                  {region.sa3Name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">Area 2</label>
            <select
              value={area2}
              onChange={(event) => handleAreaChange("area2", event.target.value)}
              className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100"
            >
              {regions.map((region) => (
                <option key={region.sa3Code} value={region.sa3Code} disabled={isRegionDisabled(region.sa3Code, "area2")}>
                  {region.sa3Name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">Area 3 (Optional)</label>
            <select
              value={area3}
              onChange={(event) => handleAreaChange("area3", event.target.value)}
              className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100"
            >
              <option value="">-- Select --</option>
              {regions.map((region) => (
                <option key={region.sa3Code} value={region.sa3Code} disabled={isRegionDisabled(region.sa3Code, "area3")}>
                  {region.sa3Name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">Age Group</label>
            <select
              value={AGE_GROUP_LABELS[selectedAgeGroup]}
              onChange={(event) => handleAgeGroupChange(AGE_GROUP_VALUES_BY_LABEL[event.target.value])}
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

      <div className="mb-6 flex flex-wrap items-center gap-3 rounded-2xl border border-blue-100 bg-blue-50/70 px-4 py-3 text-sm text-blue-900">
        <span className="rounded-full bg-white px-3 py-1 font-semibold text-blue-700 shadow-sm">Context</span>
        <p className="font-medium">
          Comparing <span className="font-bold">{AGE_GROUP_LABELS[selectedAgeGroup]}</span> coverage across selected{" "}
          {stateOptions.find((state) => state.code === selectedState)?.name ?? "state"} areas.
        </p>
      </div>

      <SectionCard className="mb-8 p-8">
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Coverage Against Target</h2>
            <p className="mt-2 text-sm text-slate-600">
              Each selected area is plotted on a shared coverage scale with the 95% target and state average shown for reference.
            </p>
          </div>
          <span className="inline-flex w-fit rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
            {AGE_GROUP_LABELS[selectedAgeGroup]} age group
          </span>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-slate-950/[0.03] p-8 shadow-sm">
          <div className="mb-8 flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
            <div />
            <div className="flex flex-wrap gap-2">
              {heroScaleAreas.map((area) => (
                <span
                  key={`legend-${area.sa3Code}`}
                  className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold ${area.markerStyle.badge}`}
                >
                  <span className={`h-2.5 w-2.5 rounded-full ${area.markerStyle.marker}`} />
                  {area.sa3Name}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200/80 bg-white/80 p-6">
            <div className="mb-6 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
              <span>{heroScaleMin}%</span>
              <span>{HERO_SCALE_MAX}%</span>
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-[220px] right-0 hidden lg:block">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.18)_1px,transparent_1px)] bg-[length:10%_100%]" />
                  <div
                    className="absolute inset-y-0 border-l-4 border-blue-600"
                    style={{ left: `${getScalePosition(95, heroScaleMin, heroScaleRange)}%` }}
                  >
                  <span className="absolute -translate-x-1/2 -translate-y-7 whitespace-nowrap rounded-full bg-blue-600 px-2 py-1 text-[11px] font-semibold text-white">
                    95% target
                  </span>
                </div>
                {stateSummary.averageFullyVaccinatedPct !== null ? (
                  <div
                    className="absolute inset-y-0 border-l-2 border-dashed border-emerald-500"
                    style={{ left: `${getScalePosition(stateSummary.averageFullyVaccinatedPct, heroScaleMin, heroScaleRange)}%` }}
                  >
                    <span className="absolute -translate-x-1/2 -translate-y-7 whitespace-nowrap rounded-full bg-emerald-500 px-2 py-1 text-[11px] font-semibold text-white">
                      State avg {stateSummary.averageFullyVaccinatedPct.toFixed(1)}%
                    </span>
                  </div>
                ) : null}
              </div>

              <div className="space-y-6">
                {heroScaleAreas.map((area, index) => {
                  const tone = getStatusTone(area.targetGap);
                  return (
                    <div
                      key={area.sa3Code}
                      className={`grid gap-4 rounded-2xl border p-4 lg:grid-cols-[220px_1fr] lg:items-center ${
                        index === 0
                          ? "border-green-200 bg-green-50/60"
                          : area.sa3Code === lowestCoverageArea?.sa3Code
                            ? "border-red-200 bg-red-50/60"
                            : "border-slate-200 bg-slate-50/70"
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-slate-900">{area.sa3Name}</p>
                          {index === 0 ? (
                            <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">
                              Closest to target
                            </span>
                          ) : null}
                          {area.sa3Code === lowestCoverageArea?.sa3Code ? (
                            <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-700">
                              Largest shortfall
                            </span>
                          ) : null}
                        </div>
                        <p className="mt-1 text-sm text-slate-500">
                          {area.childPopulation !== null ? `${area.childPopulation.toLocaleString()} children` : "No population data"}
                        </p>
                      </div>

                      <div className="grid gap-3 lg:grid-cols-[1fr_96px] lg:items-center">
                        <div className="relative h-12">
                          <div className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-slate-200" />
                          <div
                            className={`absolute top-1/2 h-5 -translate-y-1/2 -translate-x-1/2 rounded-full border-4 border-white shadow-lg ${area.markerStyle.marker} w-5`}
                            style={{ left: `${getScalePosition(area.fullyVaccinatedPct ?? heroScaleMin, heroScaleMin, heroScaleRange)}%` }}
                          />
                        </div>
                        <div className="text-right">
                          <p className={`text-xl font-bold ${area.markerStyle.text}`}>{area.fullyVaccinatedPct?.toFixed(1) ?? "No data"}%</p>
                          <p className={`mt-1 text-sm font-semibold ${tone === "positive" ? "text-green-700" : "text-red-700"}`}>
                            {area.targetGap !== null ? `${area.targetGap >= 0 ? "+" : ""}${area.targetGap.toFixed(1)}% vs target` : "No target data"}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
              Highest: {highestCoverageArea?.sa3Name ?? "No data"}
            </span>
            <span className="rounded-full bg-red-50 px-3 py-1 text-sm font-semibold text-red-700">
              Lowest: {lowestCoverageArea?.sa3Name ?? "No data"}
            </span>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
              Spread: {coverageSpread !== null ? `${coverageSpread.toFixed(1)}%` : "No data"}
            </span>
            <span className="rounded-full bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-700">
              {lowestCoverageArea
                ? lowestCoverageArea.childrenNeededToTarget > 0
                  ? `${lowestCoverageArea.sa3Name} needs ${lowestCoverageArea.childrenNeededToTarget.toLocaleString()} more children to reach 95%`
                  : `${lowestCoverageArea.sa3Name} already meets the 95% target`
                : "No target estimate"}
            </span>
          </div>
        </div>
      </SectionCard>

      <div className={`mb-8 grid gap-6 ${comparisonCardsGridClass}`}>
        {selectedAreas.map((area) => {
          const tone = getStatusTone(area.targetGap);
          return (
            <SectionCard key={area.sa3Code} className="rounded-3xl p-5 shadow-lg shadow-slate-200/50">
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{area.sa3Name}</h3>
                  <p className="mt-1 text-sm text-slate-500">{area.stateName}</p>
                </div>
                <span className={getBadgeClassName(tone)}>
                  {tone === "positive" ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                  {area.targetGap !== null ? `${area.targetGap >= 0 ? "+" : ""}${area.targetGap.toFixed(1)}%` : "No data"}
                </span>
              </div>

              <div className="mb-4 rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Coverage</p>
                    <p className={`mt-2 text-[2rem] font-bold leading-none ${tone === "positive" ? "text-green-600" : "text-red-600"}`}>
                      {area.fullyVaccinatedPct?.toFixed(1) ?? "No data"}%
                    </p>
                  </div>
                  {tone === "positive" ? (
                    <CheckCircle className="h-7 w-7 text-green-600" />
                  ) : (
                    <AlertCircle className="h-7 w-7 text-red-600" />
                  )}
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-white p-3.5">
                  <p className="text-sm font-semibold text-slate-500">Gap to 95%</p>
                  <p className={`mt-2 text-xl font-bold ${tone === "positive" ? "text-green-700" : "text-red-700"}`}>
                    {area.targetGap !== null ? `${area.targetGap >= 0 ? "+" : ""}${area.targetGap.toFixed(1)}%` : "No data"}
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-3.5">
                  <p className="text-sm font-semibold text-slate-500">vs State Avg</p>
                  <p
                    className={`mt-2 text-xl font-bold ${
                      getStatusTone(area.gapToStateAveragePct) === "positive" ? "text-green-700" : "text-red-700"
                    }`}
                  >
                    {area.gapToStateAveragePct !== null
                      ? `${area.gapToStateAveragePct >= 0 ? "+" : ""}${area.gapToStateAveragePct.toFixed(1)}%`
                      : "No data"}
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-3.5">
                  <p className="text-sm font-semibold text-slate-500">Child Population</p>
                  <p className="mt-2 text-xl font-bold text-slate-900">
                    {area.childPopulation !== null ? area.childPopulation.toLocaleString() : "No data"}
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-3.5">
                  <p className="text-sm font-semibold text-slate-500">
                    {area.childrenNeededToTarget > 0 ? "Children to Target" : "Target Status"}
                  </p>
                  {area.childrenNeededToTarget > 0 ? (
                    <p className="mt-2 text-xl font-bold text-slate-900">{area.childrenNeededToTarget.toLocaleString()}</p>
                  ) : (
                    <p className="mt-2 text-base font-bold text-green-700">Meets target</p>
                  )}
                </div>
              </div>

              <div className="mt-3 rounded-2xl border border-slate-200 bg-white px-4 py-3.5">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Users className="h-4 w-4" />
                    <span className="text-sm font-semibold">State Rank</span>
                  </div>
                  <span className="text-base font-bold text-slate-900">
                    {area.rank ? `#${area.rank} of ${stateRanking.length}` : "No data"}
                  </span>
                </div>
              </div>
            </SectionCard>
          );
        })}
      </div>

      <SectionCard className="mb-8 p-8">
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Antigen Comparison</h2>
            <p className="mt-2 text-sm text-slate-600">
              Scan the matrix to see whether differences are broad across the schedule or concentrated in a smaller set of vaccine components. The 95% target is the reference for every value shown.
            </p>
          </div>
          <span className="inline-flex w-fit rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
            {AGE_GROUP_LABELS[selectedAgeGroup]} age group
          </span>
        </div>
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
          <div className="overflow-x-auto">
            <div className="min-w-max" style={{ minWidth: antigenMatrixMinWidth }}>
              <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
                <div className="grid items-center gap-4" style={antigenMatrixGridStyle}>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Antigen</p>
                  </div>
                  {selectedAreas.map((area) => {
                    const markerStyle = markerStylesByCode.get(area.sa3Code) ?? AREA_MARKER_STYLES[0];

                    return (
                      <div key={`matrix-header-${area.sa3Code}`} className="flex items-center gap-2">
                        <span className={`h-3 w-3 rounded-full ${markerStyle.marker}`} />
                        <p className="font-semibold text-slate-900">{area.sa3Name}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="divide-y divide-slate-200">
                {antigenRows.map((row) => (
                  <div key={row.key} className="px-6 py-5">
                    <div className="grid items-stretch gap-4" style={antigenMatrixGridStyle}>
                      <div className="flex items-center">
                        <div>
                          <h3 className="text-lg font-bold text-slate-900">{row.label}</h3>
                          <p className="mt-1 text-sm text-slate-500">Across selected areas</p>
                        </div>
                      </div>

                      {selectedAreas.map((area) => {
                        const value = row.values.find((entry) => entry.sa3Code === area.sa3Code)?.value ?? null;
                        const gapToTarget = value !== null ? value - 95 : null;
                        const tone = getStatusTone(gapToTarget);

                        return (
                          <div
                            key={`${row.key}-${area.sa3Code}`}
                            className={`rounded-2xl border px-4 py-4 ${getMatrixCellClassName(tone)}`}
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-current/70">
                                  {getMatrixStatusLabel(tone)}
                                </p>
                                <p className="mt-2 text-2xl font-bold text-current">{value !== null ? `${value.toFixed(1)}%` : "No data"}</p>
                              </div>
                              {tone === "positive" ? (
                                <CheckCircle className="h-5 w-5 shrink-0 text-current" />
                              ) : tone === "negative" ? (
                                <AlertCircle className="h-5 w-5 shrink-0 text-current" />
                              ) : null}
                            </div>
                            <p className="mt-3 text-sm font-semibold text-current">
                              {gapToTarget !== null ? `${gapToTarget >= 0 ? "+" : ""}${gapToTarget.toFixed(1)}% vs target` : "No target comparison"}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </SectionCard>

      <SectionCard className="mb-8 p-8">
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Reference Table</h2>
            <p className="mt-2 text-sm text-slate-600">
              Exact values for quick lookup after you have reviewed the higher-level comparison views above.
            </p>
          </div>
          <span className="inline-flex w-fit rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
            {AGE_GROUP_LABELS[selectedAgeGroup]} age group
          </span>
        </div>
        <div className="overflow-hidden rounded-2xl border border-slate-200">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-slate-50 to-slate-100">
              <tr>
                <th className="border-b border-slate-200 px-6 py-4 text-left text-sm font-semibold text-slate-700">Area</th>
                <th className="border-b border-slate-200 px-6 py-4 text-right text-sm font-semibold text-slate-700">Population</th>
                <th className="border-b border-slate-200 px-6 py-4 text-right text-sm font-semibold text-slate-700">Coverage</th>
                <th className="border-b border-slate-200 px-6 py-4 text-right text-sm font-semibold text-slate-700">vs 95% Target</th>
                <th className="border-b border-slate-200 px-6 py-4 text-right text-sm font-semibold text-slate-700">vs State Avg</th>
                <th className="border-b border-slate-200 px-6 py-4 text-right text-sm font-semibold text-slate-700">State Rank</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {selectedAreas.map((area) => {
                const tone = getStatusTone(area.targetGap);
                return (
                  <tr key={area.sa3Code} className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium text-slate-900">{area.sa3Name}</td>
                    <td className="px-6 py-4 text-right text-slate-700">
                      {area.childPopulation !== null ? area.childPopulation.toLocaleString() : "No data"}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <span className={getTextClassName(tone)}>{area.fullyVaccinatedPct?.toFixed(1) ?? "No data"}%</span>
                        {tone === "positive" ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <AlertCircle className="h-5 w-5 text-red-600" />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {area.targetGap !== null ? (
                        <span className={getBadgeClassName(getStatusTone(area.targetGap))}>
                          {area.targetGap >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                          {`${area.targetGap >= 0 ? "+" : ""}${area.targetGap.toFixed(1)}%`}
                        </span>
                      ) : (
                        "No data"
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {area.gapToStateAveragePct !== null ? (
                        <span className={getBadgeClassName(getStatusTone(area.gapToStateAveragePct))}>
                          {area.gapToStateAveragePct >= 0 ? (
                            <TrendingUp className="h-4 w-4" />
                          ) : (
                            <TrendingDown className="h-4 w-4" />
                          )}
                          {`${area.gapToStateAveragePct >= 0 ? "+" : ""}${area.gapToStateAveragePct.toFixed(1)}%`}
                        </span>
                      ) : (
                        "No data"
                      )}
                    </td>
                    <td className="px-6 py-4 text-right font-semibold text-slate-900">
                      {area.rank ? `#${area.rank} of ${stateRanking.length}` : "No data"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </SectionCard>

      <InsightCallout
        title="Key Takeaway"
        icon={AlertCircle}
        className="rounded-3xl border-l-4 border-blue-500 bg-gradient-to-br from-blue-50 to-purple-50"
        iconClassName="hidden"
      >
        <div className="space-y-2">
          {highestCoverageArea ? (
            <p className="text-slate-700">
              <strong className="text-slate-900">{highestCoverageArea.sa3Name}</strong> is currently strongest in this comparison at{" "}
              <strong>{highestCoverageArea.fullyVaccinatedPct?.toFixed(1)}%</strong>.
            </p>
          ) : null}
          {lowestCoverageArea ? (
            <p className="text-slate-700">
              <strong className="text-slate-900">{lowestCoverageArea.sa3Name}</strong> is furthest from target and would need an estimated{" "}
              <strong>{lowestCoverageArea.childrenNeededToTarget.toLocaleString()}</strong> additional children to reach 95%.
            </p>
          ) : null}
        </div>
      </InsightCallout>
    </PageContainer>
  );
}
