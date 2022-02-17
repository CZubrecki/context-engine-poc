import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AwsModule } from 'src/aws/aws.module';
import configuration from '../config/configuration';
import {
  WeatherSubscription,
  WeatherSubscriptionSchema,
} from '../schemas/weather-subscriptions.schema';
import { WeatherSubscriptionDAO } from './weather-subscriptions.dao';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';

@Module({
  imports: [
    AwsModule,
    ConfigModule.forFeature(configuration),
    HttpModule,
    MongooseModule.forFeature([
      { name: WeatherSubscription.name, schema: WeatherSubscriptionSchema },
    ]),
  ],
  providers: [WeatherSubscriptionDAO, WeatherService],
  controllers: [WeatherController],
  exports: [WeatherService],
})
export class WeatherModule {}
