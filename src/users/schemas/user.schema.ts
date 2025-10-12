import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true, lowercase: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  password: string;

  @Prop({ enum: ['passenger', 'driver', 'guardian', 'transporter', 'admin'], default: 'passenger' })
  role: string;

  @Prop()
  profileImage?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
