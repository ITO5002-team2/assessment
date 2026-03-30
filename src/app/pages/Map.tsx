import { useEffect, useMemo, useRef, useState } from "react";
import { AlertCircle, Map as MapIcon } from "lucide-react";
import {
  AGE_GROUPS,
  type AgeGroup,
  type AreaInsight,
  getAreaInsights,
  getCoverageSummaryForState,
  stateOptions,
  type StateCode,
} from "../data/vaccinationData";
import { FilterPanel } from "../components/FilterPanel";
import { InsightCallout } from "../components/InsightCallout";
import { PageContainer } from "../components/PageContainer";
import { SectionCard } from "../components/SectionCard";

const AGE_GROUP_LABELS: Record<AgeGroup, string> = {
  "1 Year olds": "12 months",
  "2 Year olds": "24 months",
  "5 Year olds": "5 years",
};

type BoundaryGeometry = {
  type: "Polygon" | "MultiPolygon";
  coordinates: number[][][] | number[][][][];
};

type BoundaryFeature = {
  type: "Feature";
  properties: {
    sa3Code: string;
    sa3Name: string;
    stateCode: string;
    stateName: string;
    areaSqKm: number;
  };
  geometry: BoundaryGeometry;
};

type BoundaryFeatureCollection = {
  type: "FeatureCollection";
  features: BoundaryFeature[];
};

function getCoverageColor(coverage: number | null): string {
  if (coverage === null) {
    return "#e2e8f0";
  }

  if (coverage >= 95) {
    return "#22c55e";
  }

  if (coverage >= 90) {
    return "#f59e0b";
  }

  return "#ef4444";
}

function getCoverageBadgeClasses(coverage: number | null): string {
  if (coverage === null) {
    return "text-slate-500";
  }

  return coverage >= 95 ? "text-green-600" : "text-red-600";
}

function getStatusTone(delta: number | null) {
  if (delta === null) {
    return "neutral";
  }

  return delta >= 0 ? "positive" : "negative";
}

function getBadgeClassName(tone: ReturnType<typeof getStatusTone>) {
  if (tone === "positive") {
    return "inline-flex items-center rounded-full bg-green-100 px-2.5 py-1 text-sm font-semibold text-green-700";
  }

  if (tone === "negative") {
    return "inline-flex items-center rounded-full bg-red-100 px-2.5 py-1 text-sm font-semibold text-red-700";
  }

  return "inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-sm font-semibold text-slate-700";
}

function getMetricCardClassName(tone: ReturnType<typeof getStatusTone>) {
  if (tone === "positive") {
    return "rounded-2xl border border-green-200 bg-green-50 p-5";
  }

  if (tone === "negative") {
    return "rounded-2xl border border-red-200 bg-red-50 p-5";
  }

  return "rounded-2xl border border-slate-200 bg-white p-5";
}

function getMetricValueClassName(tone: ReturnType<typeof getStatusTone>) {
  if (tone === "positive") {
    return "mt-2 text-3xl font-bold text-green-700";
  }

  if (tone === "negative") {
    return "mt-2 text-3xl font-bold text-red-700";
  }

  return "mt-2 text-3xl font-bold text-slate-900";
}

function formatPercent(value: number | null): string {
  return value === null ? "No data" : `${value.toFixed(1)}%`;
}

function formatSignedPercent(value: number | null): string {
  if (value === null) {
    return "No data";
  }

  return `${value >= 0 ? "+" : ""}${value.toFixed(1)}%`;
}

function estimateChildrenNeeded(coveragePct: number | null, childPopulation: number | null) {
  if (coveragePct === null || childPopulation === null || coveragePct >= 95) {
    return 0;
  }

  return Math.ceil(((95 - coveragePct) / 100) * childPopulation);
}

function flattenGeometryCoordinates(geometry: BoundaryGeometry): number[][] {
  if (geometry.type === "Polygon") {
    return geometry.coordinates.flat();
  }

  return geometry.coordinates.flat(2);
}

function getFeatureBounds(feature: BoundaryFeature): {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
} {
  const coordinates = flattenGeometryCoordinates(feature.geometry);
  let minX = Number.POSITIVE_INFINITY;
  let minY = Number.POSITIVE_INFINITY;
  let maxX = Number.NEGATIVE_INFINITY;
  let maxY = Number.NEGATIVE_INFINITY;

  coordinates.forEach(([x, y]) => {
    if (x < minX) minX = x;
    if (y < minY) minY = y;
    if (x > maxX) maxX = x;
    if (y > maxY) maxY = y;
  });

  return { minX, minY, maxX, maxY };
}

function getCollectionBounds(features: BoundaryFeature[]) {
  return features.reduce(
    (bounds, feature) => {
      const featureBounds = getFeatureBounds(feature);

      return {
        minX: Math.min(bounds.minX, featureBounds.minX),
        minY: Math.min(bounds.minY, featureBounds.minY),
        maxX: Math.max(bounds.maxX, featureBounds.maxX),
        maxY: Math.max(bounds.maxY, featureBounds.maxY),
      };
    },
    {
      minX: Number.POSITIVE_INFINITY,
      minY: Number.POSITIVE_INFINITY,
      maxX: Number.NEGATIVE_INFINITY,
      maxY: Number.NEGATIVE_INFINITY,
    },
  );
}

function createProjector(features: BoundaryFeature[], width: number, height: number, padding: number) {
  const bounds = getCollectionBounds(features);
  const geometryWidth = bounds.maxX - bounds.minX || 1;
  const geometryHeight = bounds.maxY - bounds.minY || 1;
  const scale = Math.min((width - padding * 2) / geometryWidth, (height - padding * 2) / geometryHeight);
  const offsetX = (width - geometryWidth * scale) / 2;
  const offsetY = (height - geometryHeight * scale) / 2;

  return ([x, y]: number[]) => {
    const projectedX = offsetX + (x - bounds.minX) * scale;
    const projectedY = height - (offsetY + (y - bounds.minY) * scale);
    return [projectedX, projectedY];
  };
}

function ringToPath(ring: number[][], project: (point: number[]) => number[]): string {
  return ring
    .map((point, index) => {
      const [x, y] = project(point);
      return `${index === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ");
}

function geometryToPath(geometry: BoundaryGeometry, project: (point: number[]) => number[]): string {
  if (geometry.type === "Polygon") {
    return geometry.coordinates.map((ring) => `${ringToPath(ring, project)} Z`).join(" ");
  }

  return geometry.coordinates
    .map((polygon) => polygon.map((ring) => `${ringToPath(ring, project)} Z`).join(" "))
    .join(" ");
}

export function CoverageMap() {
  const MAP_WIDTH = 960;
  const MAP_HEIGHT = 620;
  const MIN_ZOOM = 1;
  const MAX_ZOOM = 8;
  const [selectedState, setSelectedState] = useState<StateCode>("VIC");
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<AgeGroup>("1 Year olds");
  const [boundaries, setBoundaries] = useState<BoundaryFeature[]>([]);
  const [selectedSa3Code, setSelectedSa3Code] = useState<string | null>(null);
  const [loadingBoundaries, setLoadingBoundaries] = useState(false);
  const [boundaryError, setBoundaryError] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const dragStateRef = useRef<{ x: number; y: number; panX: number; panY: number } | null>(null);
  const draggedRef = useRef(false);
  const svgRef = useRef<SVGSVGElement | null>(null);

  function resetMapView() {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  }

  function clampPan(nextX: number, nextY: number, scale: number) {
    const minX = MAP_WIDTH - MAP_WIDTH * scale;
    const minY = MAP_HEIGHT - MAP_HEIGHT * scale;

    return {
      x: Math.min(0, Math.max(minX, nextX)),
      y: Math.min(0, Math.max(minY, nextY)),
    };
  }

  function setZoom(nextZoom: number) {
    const clampedZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, nextZoom));
    setZoomLevel(clampedZoom);
    setPanOffset((currentPan) => clampPan(currentPan.x, currentPan.y, clampedZoom));
  }

  useEffect(() => {
    let cancelled = false;

    async function loadBoundaries() {
      setLoadingBoundaries(true);
      setBoundaryError(null);

      try {
        const response = await fetch(`/map-boundaries/${selectedState}.geojson`);
        if (!response.ok) {
          throw new Error(`Unable to load ${selectedState} map boundaries`);
        }

        const collection = (await response.json()) as BoundaryFeatureCollection;

        if (!cancelled) {
          setBoundaries(collection.features);
        }
      } catch (error) {
        if (!cancelled) {
          setBoundaries([]);
          setBoundaryError(error instanceof Error ? error.message : "Unable to load map boundaries");
        }
      } finally {
        if (!cancelled) {
          setLoadingBoundaries(false);
        }
      }
    }

    void loadBoundaries();

    return () => {
      cancelled = true;
    };
  }, [selectedState]);

  useEffect(() => {
    resetMapView();
  }, [selectedState, selectedAgeGroup]);

  const stateInsights = useMemo(
    () => getAreaInsights({ stateCode: selectedState, ageGroup: selectedAgeGroup }),
    [selectedState, selectedAgeGroup],
  );

  const insightsByCode = useMemo(
    () => new Map(stateInsights.map((insight) => [insight.sa3Code, insight])),
    [stateInsights],
  );

  useEffect(() => {
    const nextSelected = stateInsights.find((insight) => insight.fullyVaccinatedPct !== null) ?? stateInsights[0];
    setSelectedSa3Code(nextSelected?.sa3Code ?? null);
  }, [selectedState, selectedAgeGroup, stateInsights]);

  const selectedInsight = useMemo(() => {
    if (!selectedSa3Code) {
      return undefined;
    }

    return insightsByCode.get(selectedSa3Code);
  }, [insightsByCode, selectedSa3Code]);

  const selectedBoundary = useMemo(
    () => boundaries.find((feature) => feature.properties.sa3Code === selectedSa3Code),
    [boundaries, selectedSa3Code],
  );

  const mapFeatures = useMemo(
    () => boundaries.filter((feature) => insightsByCode.has(feature.properties.sa3Code)),
    [boundaries, insightsByCode],
  );

  const projectedPaths = useMemo(() => {
    if (mapFeatures.length === 0) {
      return [];
    }

    const project = createProjector(mapFeatures, MAP_WIDTH, MAP_HEIGHT, 36);

    return mapFeatures.map((feature) => ({
      feature,
      path: geometryToPath(feature.geometry, project),
      insight: insightsByCode.get(feature.properties.sa3Code),
      selected: feature.properties.sa3Code === selectedSa3Code,
    }));
  }, [insightsByCode, mapFeatures, selectedSa3Code]);

  const stateSummary = useMemo(
    () => getCoverageSummaryForState({ stateCode: selectedState, ageGroup: selectedAgeGroup }),
    [selectedAgeGroup, selectedState],
  );

  const selectedStateName = stateOptions.find((state) => state.code === selectedState)?.name ?? selectedState;

  const rankedAreas = useMemo(() => {
    return [...stateInsights]
      .filter((insight): insight is AreaInsight & { fullyVaccinatedPct: number } => insight.fullyVaccinatedPct !== null)
      .sort((left, right) => right.fullyVaccinatedPct - left.fullyVaccinatedPct);
  }, [stateInsights]);

  const selectedRank = useMemo(() => {
    if (!selectedInsight || selectedInsight.fullyVaccinatedPct === null) {
      return null;
    }

    const index = rankedAreas.findIndex((insight) => insight.sa3Code === selectedInsight.sa3Code);
    return index === -1 ? null : index + 1;
  }, [rankedAreas, selectedInsight]);

  const lowestArea = useMemo(() => {
    return [...rankedAreas].reverse()[0];
  }, [rankedAreas]);

  const childrenToTarget = useMemo(
    () => estimateChildrenNeeded(selectedInsight?.fullyVaccinatedPct ?? null, selectedInsight?.childPopulation ?? null),
    [selectedInsight],
  );

  const gapToAverageTone = getStatusTone(selectedInsight?.gapToStateAveragePct ?? null);
  const targetTone = getStatusTone(
    selectedInsight?.fullyVaccinatedPct !== null && selectedInsight?.fullyVaccinatedPct !== undefined
      ? selectedInsight.fullyVaccinatedPct - 95
      : null,
  );
  const canResetMap = zoomLevel > MIN_ZOOM || panOffset.x !== 0 || panOffset.y !== 0;

  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Coverage Map</h1>
        <p className="mt-2 max-w-3xl text-sm text-slate-600">
          Explore area-level vaccination coverage across the selected state with clear state-average context.
        </p>
      </div>

      <FilterPanel>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">State</label>
            <select
              value={selectedState}
              onChange={(event) => setSelectedState(event.target.value as StateCode)}
              className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-slate-900 focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-100"
            >
              {stateOptions.map((state) => (
                <option key={state.code} value={state.code}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">Age Group</label>
            <select
              value={selectedAgeGroup}
              onChange={(event) => setSelectedAgeGroup(event.target.value as AgeGroup)}
              className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-slate-900 focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-100"
            >
              {AGE_GROUPS.map((ageGroup) => (
                <option key={ageGroup} value={ageGroup}>
                  {AGE_GROUP_LABELS[ageGroup]}
                </option>
              ))}
            </select>
          </div>
        </div>
      </FilterPanel>

      <SectionCard className="mb-8 p-8">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="flex items-center gap-3 text-2xl font-bold text-slate-900">
                <MapIcon className="h-7 w-7 text-purple-600" />
                Regional Coverage Map
              </h2>
              <span className="inline-flex rounded-full bg-purple-50 px-3 py-1 text-sm font-semibold text-purple-700">
                {selectedStateName} · {AGE_GROUP_LABELS[selectedAgeGroup]} age group
              </span>
            </div>
            <p className="mt-2 text-sm text-slate-600">
              Click an SA3 region to view its coverage, child population, and position against the state average.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 rounded border border-red-600 bg-red-500" />
              <span className="text-sm font-semibold text-slate-700">Below 90%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 rounded border border-amber-600 bg-amber-400" />
              <span className="text-sm font-semibold text-slate-700">90% to 94.9%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 rounded border border-green-600 bg-green-500" />
              <span className="text-sm font-semibold text-slate-700">95% and above</span>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white">
          <div className="relative">
            <div className="absolute right-4 top-4 z-10 flex items-center gap-2 rounded-full border border-slate-200 bg-white/95 px-2 py-2 shadow-sm backdrop-blur">
              <button
                type="button"
                onClick={() => setZoom(zoomLevel - 0.5)}
                disabled={zoomLevel <= MIN_ZOOM}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-lg font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Zoom out"
              >
                -
              </button>
              <span className="min-w-[3.5rem] text-center text-sm font-semibold text-slate-700">{zoomLevel.toFixed(1)}x</span>
              <button
                type="button"
                onClick={() => setZoom(zoomLevel + 0.5)}
                disabled={zoomLevel >= MAX_ZOOM}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-lg font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Zoom in"
              >
                +
              </button>
              <button
                type="button"
                onClick={resetMapView}
                disabled={!canResetMap}
                className="rounded-full border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Reset
              </button>
            </div>
            {loadingBoundaries ? (
              <div className="flex aspect-[16/9] items-center justify-center text-slate-500">Loading map boundaries…</div>
            ) : boundaryError ? (
              <div className="flex aspect-[16/9] items-center justify-center px-6 text-center text-red-600">{boundaryError}</div>
            ) : (
              <>
                <svg
                  ref={svgRef}
                  viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
                  className={`aspect-[16/9] w-full bg-white ${zoomLevel > 1 ? "cursor-grab" : "cursor-default"} active:cursor-grabbing`}
                  shapeRendering="geometricPrecision"
                  onWheel={(event) => {
                    if (!event.shiftKey) {
                      return;
                    }

                    event.preventDefault();

                    if (!svgRef.current) {
                      return;
                    }

                    const rect = svgRef.current.getBoundingClientRect();
                    const pointerX = ((event.clientX - rect.left) / rect.width) * MAP_WIDTH;
                    const pointerY = ((event.clientY - rect.top) / rect.height) * MAP_HEIGHT;
                    const wheelDelta = Math.abs(event.deltaY) > Math.abs(event.deltaX) ? event.deltaY : event.deltaX;
                    const zoomDelta = wheelDelta < 0 ? 0.4 : -0.4;
                    const nextZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, zoomLevel + zoomDelta));

                    if (nextZoom === zoomLevel) {
                      return;
                    }

                    const worldX = (pointerX - panOffset.x) / zoomLevel;
                    const worldY = (pointerY - panOffset.y) / zoomLevel;
                    const nextPanX = pointerX - worldX * nextZoom;
                    const nextPanY = pointerY - worldY * nextZoom;

                    setZoomLevel(nextZoom);
                    setPanOffset(clampPan(nextPanX, nextPanY, nextZoom));
                  }}
                  onMouseDown={(event) => {
                    if (zoomLevel <= 1) {
                      return;
                    }

                    draggedRef.current = false;
                    dragStateRef.current = {
                      x: event.clientX,
                      y: event.clientY,
                      panX: panOffset.x,
                      panY: panOffset.y,
                    };
                  }}
                  onMouseMove={(event) => {
                    if (!dragStateRef.current) {
                      return;
                    }

                    const deltaX = event.clientX - dragStateRef.current.x;
                    const deltaY = event.clientY - dragStateRef.current.y;

                    if (Math.abs(deltaX) > 3 || Math.abs(deltaY) > 3) {
                      draggedRef.current = true;
                    }

                    setPanOffset(clampPan(dragStateRef.current.panX + deltaX, dragStateRef.current.panY + deltaY, zoomLevel));
                  }}
                  onMouseUp={() => {
                    window.setTimeout(() => {
                      draggedRef.current = false;
                    }, 0);
                    dragStateRef.current = null;
                  }}
                  onMouseLeave={() => {
                    dragStateRef.current = null;
                  }}
                >
                  <g transform={`translate(${panOffset.x} ${panOffset.y})`}>
                    <g transform={`scale(${zoomLevel})`}>
                    {projectedPaths.map(({ feature, path, insight, selected }) => (
                      <path
                        key={feature.properties.sa3Code}
                        d={path}
                        fill={getCoverageColor(insight?.fullyVaccinatedPct ?? null)}
                        stroke={selected ? "#111827" : "#ffffff"}
                        strokeWidth={selected ? 3.5 : 0.8}
                        vectorEffect="non-scaling-stroke"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        opacity={selected ? 1 : 0.82}
                        style={{
                          filter: selected && zoomLevel <= 1.5 ? "drop-shadow(0 0 5px rgba(15, 23, 42, 0.18))" : undefined,
                        }}
                        className="cursor-pointer transition-opacity hover:opacity-80"
                        onClick={() => {
                          if (draggedRef.current) {
                            return;
                          }

                          setSelectedSa3Code(feature.properties.sa3Code);
                        }}
                      >
                        <title>
                          {feature.properties.sa3Name}
                          {insight?.fullyVaccinatedPct !== null ? `: ${insight?.fullyVaccinatedPct.toFixed(1)}%` : ": No data"}
                        </title>
                      </path>
                    ))}
                    </g>
                  </g>
                </svg>
              </>
            )}
          </div>
        </div>
        <p className="mt-4 text-sm text-slate-500">
          Hold Shift and use the mouse wheel, or use the zoom controls for dense metro areas. Drag to pan and press reset to return to the full state view.
        </p>
      </SectionCard>

      <SectionCard className="mb-8 p-8">
        <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Selected Area Context</h2>
            <p className="mt-2 text-sm text-slate-600">
              Quick interpretation of the selected SA3 area against the state average and 95% target.
            </p>
            <div className="mt-3">
              <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-800">
                {selectedInsight?.sa3Name ?? "No area selected"}
              </span>
            </div>
          </div>
          <div className="text-sm text-slate-500">
            Areas with data: {stateSummary.areasWithData} of {stateSummary.areasWithData + stateSummary.areasWithoutData}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <div className={getMetricCardClassName("neutral")}>
            <div className="text-sm font-semibold text-slate-500">Child Population</div>
            <div className="mt-2 text-3xl font-bold text-slate-900">
              {selectedInsight?.childPopulation?.toLocaleString() ?? "No data"}
            </div>
          </div>
          <div className={getMetricCardClassName(gapToAverageTone)}>
            <div className="text-sm font-semibold text-slate-500">vs State Average</div>
            <div className={getMetricValueClassName(gapToAverageTone)}>
              {formatSignedPercent(selectedInsight?.gapToStateAveragePct ?? null)}
            </div>
          </div>
          <div className={getMetricCardClassName("neutral")}>
            <div className="text-sm font-semibold text-slate-500">State Rank</div>
            <div className="mt-2 text-3xl font-bold text-slate-900">{selectedRank ? `#${selectedRank}` : "No data"}</div>
          </div>
          <div className={getMetricCardClassName(targetTone)}>
            <div className="text-sm font-semibold text-slate-500">
              {childrenToTarget > 0 ? "Children to Target" : "95% Target"}
            </div>
            <div className={getMetricValueClassName(targetTone)}>
              {selectedInsight?.fullyVaccinatedPct == null ? "No data" : childrenToTarget > 0 ? childrenToTarget.toLocaleString() : "Meets target"}
            </div>
          </div>
        </div>
      </SectionCard>

      <InsightCallout
        title="Plain-Language Summary"
        icon={AlertCircle}
        className="mb-6 rounded-2xl border-l-4 border-blue-500 bg-blue-50 p-6"
        iconClassName="text-blue-600"
      >
        {!selectedInsight || selectedInsight.fullyVaccinatedPct === null ? (
          <p>
            Viewing <span className="font-semibold text-slate-900">{selectedStateName}</span> for{" "}
            <span className="font-semibold text-slate-900">{AGE_GROUP_LABELS[selectedAgeGroup]}</span>. Select a shaded SA3 area
            to view coverage, target gap, and state-average context.
          </p>
        ) : (
          <p>
            <strong>{selectedInsight.sa3Name}</strong> has a vaccination coverage rate of{" "}
            <strong>{selectedInsight.fullyVaccinatedPct.toFixed(1)}%</strong>, which is{" "}
            <strong>
              {selectedInsight.gapToStateAveragePct !== null && selectedInsight.gapToStateAveragePct >= 0 ? "at or above" : "below"} the
              state average
            </strong>{" "}
            of {selectedInsight.stateAveragePct?.toFixed(1)}% for {AGE_GROUP_LABELS[selectedAgeGroup].toLowerCase()} children.{" "}
            {selectedInsight.fullyVaccinatedPct >= 95 ? (
              <>This area is meeting the 95% target.</>
            ) : (
              <>
                It is <strong>{Math.abs(selectedInsight.fullyVaccinatedPct - 95).toFixed(1)}%</strong> below the 95% target and would
                need about <strong>{childrenToTarget.toLocaleString()}</strong> more children vaccinated to reach it.
              </>
            )}{" "}
            {lowestArea ? (
              <>
                The lowest mapped area in this state is <strong>{lowestArea.sa3Name}</strong> at{" "}
                <strong>{lowestArea.fullyVaccinatedPct.toFixed(1)}%</strong>.
              </>
            ) : null}
          </p>
        )}
      </InsightCallout>
    </PageContainer>
  );
}
