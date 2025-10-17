import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SupportService } from './support.service';
import { Ticket, TicketSchema } from './schemas/ticket.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Ticket.name, schema: TicketSchema }])],
  providers: [SupportService],
  exports: [SupportService],
})
export class SupportModule {}
