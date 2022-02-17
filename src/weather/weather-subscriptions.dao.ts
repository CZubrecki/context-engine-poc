import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  WeatherSubscription,
  WeatherSubscriptionDocument,
} from '../schemas/weather-subscriptions.schema';
import { CreateWeatherSubscriptionDTO } from '../subscriptions/dtos/weather-subscription.dto';

@Injectable()
export class WeatherSubscriptionDAO {
  constructor(
    @InjectModel(WeatherSubscription.name)
    private weatherSubscriptionModel: Model<WeatherSubscriptionDocument>,
  ) {}

  public async createSubscription(
    createWeatherSubscription: CreateWeatherSubscriptionDTO,
  ): Promise<WeatherSubscriptionDocument> {
    const subscription: WeatherSubscriptionDocument =
      new this.weatherSubscriptionModel(createWeatherSubscription);
    return subscription.save();
  }

  public async fetchWeatherSubscriptions(): Promise<
    WeatherSubscriptionDocument[]
  > {
    return this.weatherSubscriptionModel.find();
  }

  public async updateLastSent(_id: string): Promise<void> {
    const now: Date = new Date();
    await this.weatherSubscriptionModel.updateOne({ _id }, { lastSent: now });
  }
}
