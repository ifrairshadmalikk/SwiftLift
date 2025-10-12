import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
<<<<<<< HEAD
import { ConfigModule } from '@nestjs/config';
import { PassengerModule } from './passenger/passenger.module';
import { DriverModule } from './driver/driver.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/user.module';
import { GuardianModule } from './guardian/guardian.module';
import { TransporterModule } from './transporter/transporter.module'; // 👈 Added TransporterModule

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI!),
    PassengerModule,
    DriverModule,
    GuardianModule,
    TransporterModule, 
    UserModule,
    AuthModule,
=======

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/swiftlift_dev'), // local DB
>>>>>>> ebaec0106408cc835bc0f55d690ab4b7c38b0f6e
  ],
})
export class AppModule {}
