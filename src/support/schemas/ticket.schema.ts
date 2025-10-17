import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Ticket extends Document {
  @Prop({ required: true }) userId: string;
  @Prop({ required: true, enum: ['passenger', 'driver', 'guardian'] }) role: string;
  @Prop({ required: true }) subject: string;
  @Prop({ required: true }) message: string;
  @Prop({ default: 'open', enum: ['open', 'in-progress', 'resolved'] }) status: string;
  @Prop() assignedTo?: string;
  @Prop() resolution?: string;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);
