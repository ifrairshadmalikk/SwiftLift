import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Driver } from './driver.schema';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';

@Injectable()
export class DriverService {
  constructor(@InjectModel(Driver.name) private driverModel: Model<Driver>) {}

  async create(createDriverDto: CreateDriverDto): Promise<Driver> {
    const driver = new this.driverModel(createDriverDto);
    return driver.save();
  }

  async findAll(): Promise<Driver[]> {
    return this.driverModel.find().exec();
  }

  async findOne(id: string): Promise<Driver> {
    const driver = await this.driverModel.findById(id).exec();
    if (!driver) throw new NotFoundException('Driver not found');
    return driver;
  }

  async update(id: string, updateDriverDto: UpdateDriverDto): Promise<Driver> {
    const driver = await this.driverModel.findByIdAndUpdate(id, updateDriverDto, { new: true }).exec();
    if (!driver) throw new NotFoundException('Driver not found');
    return driver;
  }

async remove(id: string): Promise<Driver> {
  const driver = await this.driverModel.findByIdAndDelete(id).exec();
  if (!driver) {
    throw new NotFoundException('Driver not found');
  }
  return driver;
}
}
