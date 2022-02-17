import { registerAs } from '@nestjs/config';
import { AWSConfiguration } from 'src/models/aws-configuration.model';

export const AWS_KEY = 'aws';
export const REGION = 'region';
export const AWS_ACCESS_KEY_ID = 'accessKeyId';
export const AWS_SECRET_ACCESS_KEY = 'secretAccessKey';

export default registerAs(
  AWS_KEY,
  (): AWSConfiguration => ({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  }),
);
