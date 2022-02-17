import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { LambdaService } from 'src/aws/lambda.service';
import { CurrentWeather } from 'src/models/current-weather.model';
import { WeatherSubscriptionDocument } from '../schemas/weather-subscriptions.schema';
import { CreateWeatherSubscriptionDTO } from '../subscriptions/dtos/weather-subscription.dto';
import { WeatherSubscriptionDAO } from './weather-subscriptions.dao';

const OPEN_WEATHER_MAP_BASE_URL = 'https://api.openweathermap.org/data/2.5';
const Thunderstorm = 'Thunderstorm';
const Drizzle = 'Drizzle';
const Rain = 'Rain';
const Snow = 'Snow';
const Atmosphere = 'Atmosphere';
const Clear = 'Clear';
const Clouds = 'Clouds';
export const WEATHER_TYPES: string[] = [
  Thunderstorm,
  Drizzle,
  Rain,
  Snow,
  Atmosphere,
  Clear,
  Clouds,
];

@Injectable()
export class WeatherService {
  private weatherAPIKey: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly lambdaService: LambdaService,
    private readonly weatherSubscriptionDAO: WeatherSubscriptionDAO,
  ) {
    this.weatherAPIKey = this.configService.get<string>('openWeatherApiKey');
  }

  public async createWeatherSubscription(
    createWeatherSubscription: CreateWeatherSubscriptionDTO,
  ): Promise<WeatherSubscriptionDocument> {
    return this.weatherSubscriptionDAO.createSubscription(
      createWeatherSubscription,
    );
  }

  public async fetchWeather(): Promise<void> {
    const subscriptions: WeatherSubscriptionDocument[] =
      await this.weatherSubscriptionDAO.fetchWeatherSubscriptions();
    const cityRequests: Set<any> = new Set<any>();

    for (const subscription of subscriptions) {
      const city: string = subscription.city;
      console.log(`Polling the weather for ${city}`);
      const currentCityWeatherURL: string =
        this.generateCurrentWeatherByCityURL(city);
      cityRequests.add(axios.get<CurrentWeather>(currentCityWeatherURL));
    }

    const weatherData: any[] = await Promise.all(cityRequests);
    const weatherMap: Map<string, CurrentWeather> = new Map();

    for (const cityWeatherData of weatherData) {
      const city: string = cityWeatherData.data.name;
      if (!weatherMap.has(city)) {
        weatherMap.set(city, cityWeatherData.data);
      }
    }

    for (const subscription of subscriptions) {
      const currentWeather: CurrentWeather = weatherMap.get(subscription.city);
      if (currentWeather) {
        this.processWeatherData(subscription, currentWeather);
      }
    }
  }

  private generateCurrentWeatherByCityURL(city: string): string {
    return `${OPEN_WEATHER_MAP_BASE_URL}/weather?q=${city}&appid=${this.weatherAPIKey}&units=imperial`;
  }

  private async processWeatherData(
    weatherSubscription: WeatherSubscriptionDocument,
    currentWeather: CurrentWeather,
  ): Promise<void> {
    const { feels_like } = currentWeather.main;
    const { condition, _id, interval, lastSent, message } = weatherSubscription;

    if (eval(condition) && this.evaluateLastSent(interval, lastSent)) {
      this.lambdaService.publishToSNS(message);
      await this.weatherSubscriptionDAO.updateLastSent(_id);
    }
  }

  private evaluateLastSent(interval: number, lastSent: Date): boolean {
    if (!lastSent) return true;

    const now: Date = new Date();
    const seconds: number = now.getTime() / 1000;
    const lastSentSeconds: number = lastSent.getTime() / 1000;
    const timeAfterLastSent: number = lastSentSeconds + interval;
    return seconds > timeAfterLastSent;
  }
}
