import { Express, Router, Request, Response } from 'express';
import {
  fetchAllCountries,
  getCountryByCode,
  getCountriesByRegion,
  searchCountries
} from '../services/countryService';

const router: Router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const countries = await fetchAllCountries();
    res.json(countries);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch countries' });
  }
});

router.get('/region/:region', async (req: Request, res: Response) => {
  try {
    const countries = await getCountriesByRegion(req.params.region);
    res.json(countries);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch countries by region' });
  }
});

router.get('/search', async (req: Request, res: Response) => {
  try {
    const countries = await searchCountries(req.query);
    res.json(countries);
  } catch (err) {
    res.status(500).json({ error: 'Search failed' });
  }
});

// Define this LAST (most generic route)
router.get('/:code', async (req: Request<{ code: string }>, res: Response) => {
  try {
    const country = await getCountryByCode(req.params.code);
    if (!country) return res.status(404).json({ error: 'Country not found' });
    res.json(country);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch country' });
  }
});

export default router;
