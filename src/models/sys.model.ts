export interface Sys {
  // Internal OpenWeather Parameter
  type: number;
  // Internal OpenWeather Parameter
  id: number;
  // Internal OpenWeather Parameter
  message: number;
  // Country code (GB, JP etc.)
  country: string;
  // Sunrise time, unix, UTC
  sunrise: number;
  // Sunset time, unix, UTC
  sunset: number;
}
