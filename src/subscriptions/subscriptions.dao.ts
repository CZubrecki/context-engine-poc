import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Subscription,
  SubscriptionDocument,
} from '../schemas/subscription.schema';
import { CreateSubscriptionDTO } from './dtos/subscription.dto';

@Injectable()
export class SubscriptionsDAO {
  constructor(
    @InjectModel(Subscription.name)
    private subscriptionModel: Model<SubscriptionDocument>,
  ) {}

  public async createSubscription(
    createSubscriptionDTO: CreateSubscriptionDTO,
  ): Promise<SubscriptionDocument> {
    const subscription: SubscriptionDocument = new this.subscriptionModel(
      createSubscriptionDTO,
    );
    return subscription.save();
  }
}
