import axios from 'axios';
import cache from '../utils/cache';
import { Country } from '../types/Country';

const BASE_URL = 'https://restcountries.com/v3.1/all';

export const fetchAllCountries = async (): Promise<Country[]> => {
  const cached = cache.get<Country[]>('all');
  if (cached) return cached;

  const res = await axios.get<Country[]>(BASE_URL);
  cache.set('all', res.data);
  return res.data;
};

export const getCountryByCode = async (code: string): Promise<Country | undefined> => {
  const countries = await fetchAllCountries();
  return countries.find(c => c.cca2.toLowerCase() === code.toLowerCase());
};

export const getCountriesByRegion = async (region: string): Promise<Country[]> => {
  const countries = await fetchAllCountries();
  return countries.filter(c => c.region.toLowerCase() === region.toLowerCase());
};

export const searchCountries = async (query: any): Promise<Country[]> => {
  const countries = await fetchAllCountries();
  return countries.filter(c => {
    return (!query.name || c.name.common.toLowerCase().includes(query.name.toLowerCase())) &&
           (!query.capital || (c.capital?.[0]?.toLowerCase() || '').includes(query.capital.toLowerCase())) &&
           (!query.region || c.region.toLowerCase() === query.region.toLowerCase()) &&
           (!query.timezone || c.timezones.some(tz => tz === query.timezone));
  });
};
