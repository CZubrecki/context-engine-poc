import { Body, Controller, Post } from '@nestjs/common';
import { SubscriptionDocument } from '../schemas/subscription.schema';
import { CreateSubscriptionDTO } from './dtos/subscription.dto';
import { CreateWeatherSubscriptionDTO } from './dtos/weather-subscription.dto';
import { SubscriptionsService } from './subscriptions.service';

@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionService: SubscriptionsService) {}

  @Post('subscribe')
  private async subscribe(
    @Body() createSubscriptionDTO: CreateSubscriptionDTO,
  ): Promise<SubscriptionDocument> {
    return this.subscriptionService.subscribe(createSubscriptionDTO);
  }

  @Post('subscribe/weather')
  private async subscribeToWeatherEvent(
    @Body() createWeatherSubscriptionDTO: CreateWeatherSubscriptionDTO,
  ): Promise<any> {
    return this.subscriptionService.subscribeToWeatherEvent(
      createWeatherSubscriptionDTO,
    );
  }
}
