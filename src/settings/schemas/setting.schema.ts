import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Setting extends Document {
  @Prop({ required: true, unique: true })
  key: string;

  // Explicit type for Mongoose
  @Prop({ required: true, type: Object }) // if value can be anything: object, string, number
  value: any;

  @Prop()
  description?: string;
}

export const SettingSchema = SchemaFactory.createForClass(Setting);
