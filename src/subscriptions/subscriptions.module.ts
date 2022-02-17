import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Subscription,
  SubscriptionSchema,
} from '../schemas/subscription.schema';
import { WeatherModule } from '../weather/weather.module';
import { SubscriptionsController } from './subscriptions.controller';
import { SubscriptionsDAO } from './subscriptions.dao';
import { SubscriptionsService } from './subscriptions.service';

@Module({
  controllers: [SubscriptionsController],
  exports: [SubscriptionsService],
  imports: [
    MongooseModule.forFeature([
      { name: Subscription.name, schema: SubscriptionSchema },
    ]),
    WeatherModule,
  ],
  providers: [SubscriptionsDAO, SubscriptionsService],
})
export class SubscriptionsModule {}
