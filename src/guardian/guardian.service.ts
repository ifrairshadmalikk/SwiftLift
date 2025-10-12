import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Guardian } from './guardian.schema';
import { CreateGuardianDto } from './dto/create-guardian.dto';
import { UpdateGuardianDto } from './dto/update-guardian.dto';

@Injectable()
export class GuardianService {
  constructor(
    @InjectModel(Guardian.name)
    private guardianModel: Model<Guardian>,
  ) {}

  async create(createGuardianDto: CreateGuardianDto): Promise<Guardian> {
    const guardian = new this.guardianModel(createGuardianDto);
    return guardian.save();
  }

  async findAll(): Promise<Guardian[]> {
    return this.guardianModel.find().populate('passengerId').exec();
  }

  async findOne(id: string): Promise<Guardian> {
    const guardian = await this.guardianModel.findById(id).populate('passengerId').exec();
    if (!guardian) throw new NotFoundException(`Guardian with ID ${id} not found`);
    return guardian;
  }

  async update(id: string, updateGuardianDto: UpdateGuardianDto): Promise<Guardian> {
    const updated = await this.guardianModel.findByIdAndUpdate(id, updateGuardianDto, { new: true }).exec();
    if (!updated) throw new NotFoundException(`Guardian with ID ${id} not found`);
    return updated;
  }

  async remove(id: string): Promise<{ deleted: boolean }> {
    const res = await this.guardianModel.findByIdAndDelete(id).exec();
    if (!res) throw new NotFoundException(`Guardian with ID ${id} not found`);
    return { deleted: true };
  }
}
