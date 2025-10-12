import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { PassengerModule } from './passenger/passenger.module';
import { DriverModule } from './driver/driver.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/user.module';
import { GuardianModule } from './guardian/guardian.module';
import { TransporterModule } from './transporter/transporter.module';

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
  ],
})
export class AppModule {}
