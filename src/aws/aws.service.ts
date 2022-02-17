import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import * as AWS from 'aws-sdk';
import awsConfig from '../config/aws.config';

@Injectable()
export class AwsService {
  constructor(
    @Inject(awsConfig.KEY)
    private config: ConfigType<typeof awsConfig>,
  ) {
    const accessKeyId: string = this.config.accessKeyId;
    const secretAccessKey: string = this.config.secretAccessKey;
    const region: string = this.config.region;

    const credentials: AWS.Credentials = new AWS.Credentials({
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey,
    });

    AWS.config.update({ region, credentials });
  }
}
