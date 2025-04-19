export interface Country {
    cca2: string;
    name: { common: string };
    region: string;
    flags: { png: string };
    population: number;
    currencies?: Record<string, { name: string; symbol: string }>;
    timezones: string[];
    capital?: string[];
    languages?: Record<string, string>;
  }
  