import { Configuration } from '../models/configuration.model';

export const PORT = 'port';

export default (): Configuration => ({
  port: parseInt(process.env.PORT, 10) || 8080,
  openWeatherApiKey: process.env.OPEN_WEATHER_API_KEY,
});
