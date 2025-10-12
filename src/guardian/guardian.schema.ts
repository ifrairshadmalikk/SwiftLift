import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Guardian extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop()
  relationship: string; // e.g. "Father", "Mother", "Uncle"

  @Prop({ type: String, ref: 'Passenger' })
  passengerId: string; // linked passenger

  @Prop({ default: true })
  isActive: boolean;
}

export const GuardianSchema = SchemaFactory.createForClass(Guardian);
