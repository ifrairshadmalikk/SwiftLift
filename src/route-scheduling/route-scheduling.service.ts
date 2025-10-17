import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RouteScheduling } from './route-scheduling.schema';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';

@Injectable()
export class RouteSchedulingService {
  constructor(
    @InjectModel(RouteScheduling.name)
    private routeModel: Model<RouteScheduling>,
  ) {}

  async create(dto: CreateRouteDto): Promise<RouteScheduling> {
    const route = new this.routeModel(dto);
    return route.save();
  }

  async findAll(): Promise<RouteScheduling[]> {
    return this.routeModel
      .find()
      .populate('transporter driver passengers')
      .exec();
  }

  async findOne(id: string): Promise<RouteScheduling> {
    const route = await this.routeModel
      .findById(id)
      .populate('transporter driver passengers')
      .exec();
    if (!route) throw new NotFoundException('Route not found');
    return route;
  }

  async update(id: string, dto: UpdateRouteDto): Promise<RouteScheduling> {
    const updated = await this.routeModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
    if (!updated) throw new NotFoundException('Route not found');
    return updated;
  }

  async remove(id: string): Promise<RouteScheduling> {
    const deleted = await this.routeModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException('Route not found');
    return deleted;
  }
}
