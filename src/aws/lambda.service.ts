import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { Lambda } from 'aws-sdk';

@Injectable()
export class LambdaService {
  private lambda: Lambda;

  public publishToSNS(message: string): void {
    const params = {
      Message: message,
      TopicArn: 'arn:aws:sns:ca-central-1:030801416495:Weather',
    };
    const publishTextPromise = new AWS.SNS({ apiVersion: '2010-03-31' })
      .publish(params)
      .promise();
    publishTextPromise
      .then(function (data) {
        console.log(
          `Message ${params.Message} sent to the topic ${params.TopicArn}`,
        );
        console.log('MessageID is ' + data.MessageId);
      })
      .catch(function (err) {
        console.error(err, err.stack);
      });
  }
}
