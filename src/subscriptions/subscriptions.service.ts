import { Injectable } from '@nestjs/common';
import { SubscriptionDocument } from '../schemas/subscription.schema';
import { WeatherSubscriptionDocument } from '../schemas/weather-subscriptions.schema';
import { WeatherService } from '../weather/weather.service';
import { CreateSubscriptionDTO } from './dtos/subscription.dto';
import { CreateWeatherSubscriptionDTO } from './dtos/weather-subscription.dto';
import { SubscriptionsDAO } from './subscriptions.dao';

@Injectable()
export class SubscriptionsService {
  constructor(
    private readonly subscriptionDAO: SubscriptionsDAO,
    private readonly weatherService: WeatherService,
  ) {}

  public async subscribe(
    createSubscriptionDTO: CreateSubscriptionDTO,
  ): Promise<SubscriptionDocument> {
    return this.subscriptionDAO.createSubscription(createSubscriptionDTO);
  }

  public async subscribeToWeatherEvent(
    createWeatherSubscriptionDTO: CreateWeatherSubscriptionDTO,
  ): Promise<WeatherSubscriptionDocument> {
    return this.weatherService.createWeatherSubscription(
      createWeatherSubscriptionDTO,
    );
  }
}
