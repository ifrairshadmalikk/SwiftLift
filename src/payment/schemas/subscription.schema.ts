import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Subscription extends Document {
  @Prop({ required: true })
  passengerId: string;

  @Prop({ required: true })
  planName: string; // e.g. "Monthly Route A"

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop({ default: 'active' })
  status: 'active' | 'expired' | 'cancelled';
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);
