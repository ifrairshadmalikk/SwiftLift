import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Transaction extends Document {
  @Prop({ required: true })
  walletId: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true, enum: ['credit', 'debit'] })
  type: 'credit' | 'debit';

  @Prop({ enum: ['subscription', 'payout', 'refund', 'manual'], default: 'manual' })
  category: string;

  @Prop({ default: 'Pending' })
  status: string;

  @Prop()
  description?: string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
