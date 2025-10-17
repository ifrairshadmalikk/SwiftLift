import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Wallet extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true, enum: ['passenger', 'driver'] })
  role: 'passenger' | 'driver';

  @Prop({ default: 0 })
  balance: number;
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);
