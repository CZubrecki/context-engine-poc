import { Clouds } from './clouds.model';
import { Coordinates } from './coordinates.model';
import { Main } from './main.model';
import { Sys } from './sys.model';
import { Weather } from './weather.model';
import { Wind } from './wind.model';

export interface CurrentWeather {
  coord: Coordinates;
  weather: Weather[];
  // Internal OpenWeather Parameter
  base: string;
  main: Main;
  visibility: string;
  wind: Wind;
  clouds: Clouds;
  // Time of data calculation, unix, UTC
  dt: number;
  sys: Sys;
  // Shift in seconds from UTC
  timezone: number;
  // City ID
  id: number;
  // City name
  name: string;
  // Internal OpenWeather Parameter
  cod: number;
}
