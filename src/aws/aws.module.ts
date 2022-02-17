import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import awsConfig from 'src/config/aws.config';
import { AwsService } from './aws.service';
import { LambdaService } from './lambda.service';

@Module({
  imports: [ConfigModule.forFeature(awsConfig)],
  providers: [AwsService, LambdaService],
  exports: [LambdaService],
})
export class AwsModule {}
