import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AwsModule } from './aws/aws.module';
import awsConfig from './config/aws.config';
import configuration from './config/configuration';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { TasksModule } from './tasks/tasks.module';
import { WeatherModule } from './weather/weather.module';

@Module({
  imports: [
    AwsModule,
    ConfigModule.forRoot({
      load: [configuration, awsConfig],
    }),
    MongooseModule.forRoot('mongodb://localhost/context-engine'),
    ScheduleModule.forRoot(),
    TasksModule,
    WeatherModule,
    SubscriptionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
