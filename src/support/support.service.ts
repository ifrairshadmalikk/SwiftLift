import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ticket } from './schemas/ticket.schema';

@Injectable()
export class SupportService {
  constructor(@InjectModel(Ticket.name) private ticketModel: Model<Ticket>) {}

  async createTicket(userId: string, role: string, subject: string, message: string) {
    return this.ticketModel.create({ userId, role, subject, message });
  }

  async getUserTickets(userId: string) {
    return this.ticketModel.find({ userId });
  }

  async getAllTickets() {
    return this.ticketModel.find().sort({ createdAt: -1 });
  }

  async updateStatus(ticketId: string, status: string, resolution?: string) {
    const ticket = await this.ticketModel.findById(ticketId);
    if (!ticket) throw new NotFoundException('Ticket not found');

    ticket.status = status;
    if (resolution) ticket.resolution = resolution;
    await ticket.save();

    return ticket;
  }
}
