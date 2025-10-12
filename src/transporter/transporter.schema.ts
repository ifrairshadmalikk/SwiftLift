import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Transporter extends Document {
  @Prop({ required: true })
  companyName: string;

  @Prop({ required: true })
  contactPerson: string;

  @Prop({ required: true })
  contactNumber: string;

  @Prop({ type: [Types.ObjectId], ref: 'Driver', default: [] })
  drivers: Types.ObjectId[];

  @Prop({ type: [Types.ObjectId], ref: 'Passenger', default: [] })
  passengers: Types.ObjectId[];

  @Prop({
    type: [
      {
        routeName: String,
        startLocation: String,
        endLocation: String,
        distanceKm: Number,
        estimatedTime: String,
      },
    ],
    default: [],
  })
  routes: {
    routeName: string;
    startLocation: string;
    endLocation: string;
    distanceKm: number;
    estimatedTime: string;
  }[];

  @Prop({
    type: [
      {
        model: String,
        plate: String,
        capacity: Number,
      },
    ],
    default: [],
  })
  vehicles: {
    model: string;
    plate: string;
    capacity: number;
  }[];
}

export const TransporterSchema = SchemaFactory.createForClass(Transporter);
