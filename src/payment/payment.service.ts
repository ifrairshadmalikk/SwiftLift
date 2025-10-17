import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Wallet } from './schemas/wallet.schema';
import { Transaction } from './schemas/transaction.schema';
import { Subscription } from './schemas/subscription.schema';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Wallet.name) private walletModel: Model<Wallet>,
    @InjectModel(Transaction.name) private transactionModel: Model<Transaction>,
    @InjectModel(Subscription.name) private subscriptionModel: Model<Subscription>,
  ) {}

  // 🧾 Create Wallet for new user
  async createWallet(userId: string, role: 'passenger' | 'driver') {
    return this.walletModel.create({ userId, role, balance: 0 });
  }

  // 💰 Credit balance (add money)
  async creditWallet(walletId: string, amount: number, category: string, description?: string) {
    const wallet = await this.walletModel.findById(walletId);
    if (!wallet) throw new NotFoundException('Wallet not found');

    wallet.balance += amount;
    await wallet.save();

    return this.transactionModel.create({
      walletId,
      amount,
      type: 'credit',
      category,
      status: 'Completed',
      description,
    });
  }

  // 💸 Debit balance (deduct money)
  async debitWallet(walletId: string, amount: number, category: string, description?: string) {
    const wallet = await this.walletModel.findById(walletId);
    if (!wallet) throw new NotFoundException('Wallet not found');
    if (wallet.balance < amount) throw new BadRequestException('Insufficient balance');

    wallet.balance -= amount;
    await wallet.save();

    return this.transactionModel.create({
      walletId,
      amount,
      type: 'debit',
      category,
      status: 'Completed',
      description,
    });
  }

  // 🧾 Passenger Monthly Subscription
  async createSubscription(passengerId: string, planName: string, amount: number) {
    const start = new Date();
    const end = new Date();
    end.setMonth(end.getMonth() + 1);

    return this.subscriptionModel.create({
      passengerId,
      planName,
      amount,
      startDate: start,
      endDate: end,
      status: 'active',
    });
  }

  // 💵 Driver Monthly Payout
  async generateDriverPayout(driverId: string, amount: number) {
    const wallet = await this.walletModel.findOne({ userId: driverId, role: 'driver' });
    if (!wallet) throw new NotFoundException('Driver wallet not found');

    return this.creditWallet((wallet._id as any).toString(), amount, 'payout', 'Monthly salary');

  }
}
