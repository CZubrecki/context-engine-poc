import { Module } from '@nestjs/common';
import { WeatherModule } from 'src/weather/weather.module';
import { TasksService } from './tasks.service';

@Module({
  imports: [WeatherModule],
  providers: [TasksService],
  exports: [TasksService],
})
export class TasksModule {}
