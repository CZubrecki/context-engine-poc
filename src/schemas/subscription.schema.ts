import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { SERVICES, TYPES } from '../utils/constants';

export type SubscriptionDocument = Subscription & Document;

@Schema({ _id: true, timestamps: true, versionKey: false })
export class Subscription {
  @Prop({ type: String, required: true, enum: SERVICES })
  service: string;

  @Prop({ type: String, required: true, enum: TYPES })
  type: string;

  @Prop({ type: Date })
  createdAt: Date;

  @Prop({ type: Date })
  updatedAt: Date;
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);
