import coverageCsv from "./assets/child_coverage_data_national.csv?raw";
import populationCsv from "./assets/age_group_population_dataset.csv?raw";

export const AGE_GROUPS = ["1 Year olds", "2 Year olds", "5 Year olds"] as const;

export type AgeGroup = (typeof AGE_GROUPS)[number];

export type StateCode = "ACT" | "NSW" | "NT" | "QLD" | "SA" | "TAS" | "VIC" | "WA";

export type StateOption = {
  code: StateCode;
  name: string;
};

export type CoverageRecord = {
  stateCode: StateCode;
  stateName: string;
  sa3Code: string;
  sa3Name: string;
  ageGroup: AgeGroup;
  fullyVaccinatedPct: number | null;
  antigens: {
    dtp: number | null;
    polio: number | null;
    hib: number | null;
    hep: number | null;
    mmr: number | null;
    pneumo: number | null;
    menC: number | null;
    varicella: number | null;
  };
};

export type PopulationRecord = {
  sa3Code: string;
  age1Population: number | null;
  age2Population: number | null;
  age5Population: number | null;
};

export type RegionOption = {
  sa3Code: string;
  sa3Name: string;
  stateCode: StateCode;
  stateName: string;
};

export type AreaInsight = {
  stateCode: StateCode;
  stateName: string;
  sa3Code: string;
  sa3Name: string;
  ageGroup: AgeGroup;
  fullyVaccinatedPct: number | null;
  childPopulation: number | null;
  stateAveragePct: number | null;
  gapToStateAveragePct: number | null;
};

const STATE_NAMES: Record<StateCode, string> = {
  ACT: "Australian Capital Territory",
  NSW: "New South Wales",
  NT: "Northern Territory",
  QLD: "Queensland",
  SA: "South Australia",
  TAS: "Tasmania",
  VIC: "Victoria",
  WA: "Western Australia",
};

function parseCsv(raw: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;

  for (let index = 0; index < raw.length; index += 1) {
    const char = raw[index];
    const nextChar = raw[index + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        field += '"';
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === "," && !inQuotes) {
      row.push(field);
      field = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && nextChar === "\n") {
        index += 1;
      }
      row.push(field);
      field = "";

      if (row.some((value) => value.length > 0)) {
        rows.push(row);
      }
      row = [];
      continue;
    }

    field += char;
  }

  if (field.length > 0 || row.length > 0) {
    row.push(field);
    if (row.some((value) => value.length > 0)) {
      rows.push(row);
    }
  }

  return rows;
}

function toObjects<T extends string>(raw: string): Array<Record<T, string>> {
  const rows = parseCsv(raw);
  const [headerRow, ...dataRows] = rows;

  if (!headerRow) {
    return [];
  }

  const headers = headerRow.map((header) => header.trim()) as T[];

  return dataRows.map((values) => {
    const record = {} as Record<T, string>;

    headers.forEach((header, index) => {
      record[header] = (values[index] ?? "").trim();
    });

    return record;
  });
}

function parsePercent(value: string): number | null {
  if (!value || value === "NP") {
    return null;
  }

  const normalized = value.replace(/^\?+/, "");
  const parsed = Number.parseFloat(normalized);

  return Number.isFinite(parsed) ? parsed : null;
}

function parsePopulation(value: string): number | null {
  if (!value) {
    return null;
  }

  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function isAgeGroup(value: string): value is AgeGroup {
  return AGE_GROUPS.includes(value as AgeGroup);
}

type CoverageCsvRow = Record<
  | "State"
  | "SA3_Code"
  | "SA3_Name"
  | "Age Group"
  | "% DTP"
  | "% Polio"
  | "% HIB"
  | "% HEP"
  | "% MMR"
  | "% Pneumo"
  | "% MenC"
  | "% Varicella"
  | "% Fully",
  string
>;

type PopulationCsvRow = Record<
  | "SA3_CODE_2021"
  | "Age_yr_1_M"
  | "Age_yr_1_F"
  | "Age_yr_1_P"
  | "Age_yr_2_M"
  | "Age_yr_2_F"
  | "Age_yr_2_P"
  | "Age_yr_5_M"
  | "Age_yr_5_F"
  | "Age_yr_5_P",
  string
>;

const coverageRows = toObjects<keyof CoverageCsvRow>(coverageCsv);
const populationRows = toObjects<keyof PopulationCsvRow>(populationCsv);

export const coverageRecords: CoverageRecord[] = coverageRows
  .filter((row) => row.SA3_Code && row.SA3_Code !== "NM" && row.SA3_Name !== "Not mapped")
  .filter((row): row is CoverageCsvRow & { State: StateCode } => row.State in STATE_NAMES)
  .filter((row): row is CoverageCsvRow & { State: StateCode; "Age Group": AgeGroup } => isAgeGroup(row["Age Group"]))
  .map((row) => ({
    stateCode: row.State,
    stateName: STATE_NAMES[row.State],
    sa3Code: row.SA3_Code,
    sa3Name: row.SA3_Name,
    ageGroup: row["Age Group"],
    fullyVaccinatedPct: parsePercent(row["% Fully"]),
    antigens: {
      dtp: parsePercent(row["% DTP"]),
      polio: parsePercent(row["% Polio"]),
      hib: parsePercent(row["% HIB"]),
      hep: parsePercent(row["% HEP"]),
      mmr: parsePercent(row["% MMR"]),
      pneumo: parsePercent(row["% Pneumo"]),
      menC: parsePercent(row["% MenC"]),
      varicella: parsePercent(row["% Varicella"]),
    },
  }));

export const populationRecords: PopulationRecord[] = Array.from(
  populationRows.reduce<Map<string, PopulationRecord>>((recordsByCode, row) => {
    const hasPopulationData = [
      row.Age_yr_1_P,
      row.Age_yr_2_P,
      row.Age_yr_5_P,
    ].some((value) => value.trim().length > 0);

    if (!row.SA3_CODE_2021 || !hasPopulationData) {
      return recordsByCode;
    }

    recordsByCode.set(row.SA3_CODE_2021, {
      sa3Code: row.SA3_CODE_2021,
      age1Population: parsePopulation(row.Age_yr_1_P),
      age2Population: parsePopulation(row.Age_yr_2_P),
      age5Population: parsePopulation(row.Age_yr_5_P),
    });

    return recordsByCode;
  }, new Map()).values(),
);

const populationBySa3Code = new Map(populationRecords.map((record) => [record.sa3Code, record]));

function getPopulationForAgeGroup(population: PopulationRecord | undefined, ageGroup: AgeGroup): number | null {
  if (!population) {
    return null;
  }

  switch (ageGroup) {
    case "1 Year olds":
      return population.age1Population;
    case "2 Year olds":
      return population.age2Population;
    case "5 Year olds":
      return population.age5Population;
  }
}

function average(values: number[]): number | null {
  if (values.length === 0) {
    return null;
  }

  const total = values.reduce((sum, value) => sum + value, 0);
  return total / values.length;
}

const stateAverages = new Map<string, number | null>();

for (const stateCode of Object.keys(STATE_NAMES) as StateCode[]) {
  for (const ageGroup of AGE_GROUPS) {
    const values = coverageRecords
      .filter((record) => record.stateCode === stateCode && record.ageGroup === ageGroup)
      .map((record) => record.fullyVaccinatedPct)
      .filter((value): value is number => value !== null);

    stateAverages.set(`${stateCode}:${ageGroup}`, average(values));
  }
}

export const stateOptions: StateOption[] = (Object.keys(STATE_NAMES) as StateCode[]).map((code) => ({
  code,
  name: STATE_NAMES[code],
}));

export const regionOptions: RegionOption[] = Array.from(
  coverageRecords.reduce<Map<string, RegionOption>>((regions, record) => {
    if (!regions.has(record.sa3Code)) {
      regions.set(record.sa3Code, {
        sa3Code: record.sa3Code,
        sa3Name: record.sa3Name,
        stateCode: record.stateCode,
        stateName: record.stateName,
      });
    }

    return regions;
  }, new Map()).values(),
).sort((left, right) => {
  if (left.stateName === right.stateName) {
    return left.sa3Name.localeCompare(right.sa3Name);
  }

  return left.stateName.localeCompare(right.stateName);
});

export const areaInsights: AreaInsight[] = coverageRecords.map((record) => {
  const childPopulation = getPopulationForAgeGroup(populationBySa3Code.get(record.sa3Code), record.ageGroup);
  const stateAveragePct = stateAverages.get(`${record.stateCode}:${record.ageGroup}`) ?? null;

  return {
    stateCode: record.stateCode,
    stateName: record.stateName,
    sa3Code: record.sa3Code,
    sa3Name: record.sa3Name,
    ageGroup: record.ageGroup,
    fullyVaccinatedPct: record.fullyVaccinatedPct,
    childPopulation,
    stateAveragePct,
    gapToStateAveragePct:
      record.fullyVaccinatedPct !== null && stateAveragePct !== null
        ? record.fullyVaccinatedPct - stateAveragePct
        : null,
  };
});

export function getRegionsForState(stateCode: StateCode): RegionOption[] {
  return regionOptions.filter((region) => region.stateCode === stateCode);
}

export function getAreaInsights(filters?: {
  stateCode?: StateCode;
  ageGroup?: AgeGroup;
}): AreaInsight[] {
  return areaInsights.filter((insight) => {
    if (filters?.stateCode && insight.stateCode !== filters.stateCode) {
      return false;
    }

    if (filters?.ageGroup && insight.ageGroup !== filters.ageGroup) {
      return false;
    }

    return true;
  });
}

export function getAreaInsightByCode(params: {
  sa3Code: string;
  ageGroup: AgeGroup;
}): AreaInsight | undefined {
  return areaInsights.find(
    (insight) => insight.sa3Code === params.sa3Code && insight.ageGroup === params.ageGroup,
  );
}

export function getCoverageRecordByCode(params: {
  sa3Code: string;
  ageGroup: AgeGroup;
}): CoverageRecord | undefined {
  return coverageRecords.find(
    (record) => record.sa3Code === params.sa3Code && record.ageGroup === params.ageGroup,
  );
}

export function getCoverageSummaryForState(params: {
  stateCode: StateCode;
  ageGroup: AgeGroup;
}): {
  averageFullyVaccinatedPct: number | null;
  areasWithData: number;
  areasWithoutData: number;
} {
  const insights = getAreaInsights(params);

  return {
    averageFullyVaccinatedPct: stateAverages.get(`${params.stateCode}:${params.ageGroup}`) ?? null,
    areasWithData: insights.filter((insight) => insight.fullyVaccinatedPct !== null).length,
    areasWithoutData: insights.filter((insight) => insight.fullyVaccinatedPct === null).length,
  };
}
