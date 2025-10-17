import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { RouteSchedulingService } from './route-scheduling.service';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';

@ApiTags('Route Scheduling')
@Controller('/routes')
export class RouteSchedulingController {
  constructor(private readonly routeService: RouteSchedulingService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new route schedule' })
  create(@Body() dto: CreateRouteDto) {
    return this.routeService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all route schedules' })
  findAll() {
    return this.routeService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get route schedule by ID' })
  findOne(@Param('id') id: string) {
    return this.routeService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update route schedule' })
  update(@Param('id') id: string, @Body() dto: UpdateRouteDto) {
    return this.routeService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete route schedule' })
  remove(@Param('id') id: string) {
    return this.routeService.remove(id);
  }
}
