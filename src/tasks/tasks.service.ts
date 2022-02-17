import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { WeatherService } from 'src/weather/weather.service';

@Injectable()
export class TasksService {
  constructor(private readonly weatherService: WeatherService) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async pollWeather(): Promise<void> {
    await this.weatherService.fetchWeather();
  }
}
