import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Passenger, PassengerDocument } from './passenger.schema';
import { CreatePassengerDto } from './dto/create-passenger.dto';
import { UpdatePassengerDto } from './dto/update-passenger.dto';

@Injectable()
export class PassengerService {
  constructor(@InjectModel(Passenger.name) private passengerModel: Model<PassengerDocument>) {}

  async create(createPassengerDto: CreatePassengerDto): Promise<Passenger> {
    const passenger = new this.passengerModel(createPassengerDto);
    return passenger.save();
  }

  async findAll(): Promise<Passenger[]> {
    return this.passengerModel.find().exec();
  }

  async findOne(id: string): Promise<Passenger> {
    const passenger = await this.passengerModel.findById(id).exec();
    if (!passenger) throw new NotFoundException(`Passenger #${id} not found`);
    return passenger;
  }

  async update(id: string, updatePassengerDto: UpdatePassengerDto): Promise<Passenger> {
    const passenger = await this.passengerModel.findByIdAndUpdate(id, updatePassengerDto, { new: true }).exec();
    if (!passenger) throw new NotFoundException(`Passenger #${id} not found`);
    return passenger;
  }

  async remove(id: string): Promise<Passenger> {
    const passenger = await this.passengerModel.findByIdAndDelete(id).exec();
    if (!passenger) throw new NotFoundException(`Passenger #${id} not found`);
    return passenger;
  }
}
