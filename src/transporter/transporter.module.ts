import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransporterController } from './transporter.controller';
import { TransporterService } from './transporter.service';
import { Transporter, TransporterSchema } from './transporter.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Transporter.name, schema: TransporterSchema }]),
  ],
  controllers: [TransporterController],
  providers: [TransporterService],
})
export class TransporterModule {}
