import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Booking extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Passenger', required: true })
  passenger: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Driver', required: true })
  driver: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'RouteScheduling', required: true })
  route: Types.ObjectId;

  @Prop({ enum: ['Pending', 'Ongoing', 'Completed', 'Cancelled'], default: 'Pending' })
  status: string;

  @Prop({ required: true })
  fare: number;

  @Prop()
  pickupTime: Date;

  @Prop()
  dropTime: Date;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
