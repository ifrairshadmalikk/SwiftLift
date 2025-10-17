import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking } from './booking.schema';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Injectable()
export class BookingService {
  constructor(@InjectModel(Booking.name) private bookingModel: Model<Booking>) {}

  async create(dto: CreateBookingDto): Promise<Booking> {
    const booking = new this.bookingModel(dto);
    return booking.save();
  }

  async findAll(): Promise<Booking[]> {
    return this.bookingModel.find().populate('passenger driver route').exec();
  }

  async findOne(id: string): Promise<Booking> {
    const booking = await this.bookingModel.findById(id).populate('passenger driver route').exec();
    if (!booking) throw new NotFoundException('Booking not found');
    return booking;
  }

  async update(id: string, dto: UpdateBookingDto): Promise<Booking> {
    const updated = await this.bookingModel.findByIdAndUpdate(id, dto, { new: true }).exec();
    if (!updated) throw new NotFoundException('Booking not found');
    return updated;
  }

  async remove(id: string): Promise<Booking> {
    const deleted = await this.bookingModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException('Booking not found');
    return deleted;
  }
}
