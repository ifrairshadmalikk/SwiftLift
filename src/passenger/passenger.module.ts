import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassengerService } from './passenger.service';
import { PassengerController } from './passenger.controller';
import { Passenger, PassengerSchema } from './passenger.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Passenger.name, schema: PassengerSchema }]),
  ],
  controllers: [PassengerController],
  providers: [PassengerService],
})
export class PassengerModule {}
