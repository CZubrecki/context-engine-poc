import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WeatherSubscriptionDocument = WeatherSubscription & Document;

@Schema({ _id: true, timestamps: true, versionKey: false })
export class WeatherSubscription {
  @Prop({ type: String })
  message: string;

  @Prop({ type: String })
  metric: string;

  @Prop({ type: String })
  condition: string;

  @Prop({ type: String })
  city: string;

  @Prop({ type: Number, default: 86400 })
  interval: number;

  @Prop({ type: Date })
  lastSent: Date;

  @Prop({ type: Date })
  createdAt: Date;

  @Prop({ type: Date })
  updatedAt: Date;
}

export const WeatherSubscriptionSchema =
  SchemaFactory.createForClass(WeatherSubscription);
