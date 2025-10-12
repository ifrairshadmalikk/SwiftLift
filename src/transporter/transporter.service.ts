import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transporter } from './transporter.schema';
import { CreateTransporterDto } from './dto/create-transporter.dto';
import { UpdateTransporterDto } from './dto/update-transporter.dto';

@Injectable()
export class TransporterService {
  constructor(
    @InjectModel(Transporter.name)
    private transporterModel: Model<Transporter>,
  ) {}

  async create(createTransporterDto: CreateTransporterDto): Promise<Transporter> {
    const transporter = new this.transporterModel(createTransporterDto);
    return transporter.save();
  }

  async findAll(): Promise<Transporter[]> {
    return this.transporterModel.find().populate('drivers passengers').exec();
  }

  async findOne(id: string): Promise<Transporter> {
    const transporter = await this.transporterModel
      .findById(id)
      .populate('drivers passengers')
      .exec();
    if (!transporter) throw new NotFoundException('Transporter not found');
    return transporter;
  }

  async update(id: string, dto: UpdateTransporterDto): Promise<Transporter> {
    const updated = await this.transporterModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
    if (!updated) throw new NotFoundException('Transporter not found');
    return updated;
  }

  async remove(id: string): Promise<Transporter> {
    const deleted = await this.transporterModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException('Transporter not found');
    return deleted;
  }
}
