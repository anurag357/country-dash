import express from 'express';
import cors from 'cors';
import countriesRoutes from './routes/countries';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/countries', countriesRoutes);

export default app;
