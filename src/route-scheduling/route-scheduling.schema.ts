import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class RouteScheduling extends Document {
  @Prop({ required: true })
  routeName: string;

  @Prop({ required: true })
  startLocation: string;

  @Prop({ required: true })
  endLocation: string;

  @Prop({ required: true })
  distanceKm: number;

  @Prop()
  estimatedTime: string;

  @Prop({ required: true })
  scheduledTime: Date;

  @Prop({ enum: ['Scheduled', 'In Progress', 'Completed', 'Cancelled'], default: 'Scheduled' })
  status: string;

  @Prop({ type: Types.ObjectId, ref: 'Transporter', required: true })
  transporter: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Driver', required: true })
  driver: Types.ObjectId;

  @Prop({ type: [Types.ObjectId], ref: 'Passenger', default: [] })
  passengers: Types.ObjectId[];
}

export const RouteSchedulingSchema = SchemaFactory.createForClass(RouteScheduling);
