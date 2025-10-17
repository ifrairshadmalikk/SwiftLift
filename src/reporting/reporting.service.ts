import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction } from '../payment/schemas/transaction.schema';
import { Booking } from '../booking/booking.schema';
import { Driver } from '../driver/driver.schema';

@Injectable()
export class ReportingService {
  constructor(
    @InjectModel(Transaction.name) private transactionModel: Model<Transaction>,
    @InjectModel(Booking.name) private bookingModel: Model<Booking>,
    @InjectModel(Driver.name) private driverModel: Model<Driver>,
  ) {}

  async getDailySummary() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const totalRides = await this.bookingModel.countDocuments({ createdAt: { $gte: today } });
    const totalRevenue = await this.transactionModel.aggregate([
      { $match: { type: 'credit', createdAt: { $gte: today } } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);
    const activeDrivers = await this.driverModel.countDocuments({ status: 'active' });

    return {
      date: today,
      totalRides,
      totalRevenue: totalRevenue[0]?.total || 0,
      activeDrivers,
    };
  }
}
