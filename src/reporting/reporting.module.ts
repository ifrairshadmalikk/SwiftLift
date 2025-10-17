import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReportingService } from './reporting.service';
import { Transaction, TransactionSchema } from '../payment/schemas/transaction.schema';
import { Booking, BookingSchema } from '../booking/booking.schema';
import { Driver, DriverSchema } from '../driver/driver.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Transaction.name, schema: TransactionSchema },
      { name: Booking.name, schema: BookingSchema },
      { name: Driver.name, schema: DriverSchema },
    ]),
  ],
  providers: [ReportingService],
  exports: [ReportingService],
})
export class ReportingModule {}
