import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RouteSchedulingController } from './route-scheduling.controller';
import { RouteSchedulingService } from './route-scheduling.service';
import { RouteScheduling, RouteSchedulingSchema } from './route-scheduling.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: RouteScheduling.name, schema: RouteSchedulingSchema }]),
  ],
  controllers: [RouteSchedulingController],
  providers: [RouteSchedulingService],
})
export class RouteSchedulingModule {}
