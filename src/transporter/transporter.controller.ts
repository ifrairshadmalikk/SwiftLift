import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { TransporterService } from './transporter.service';
import { CreateTransporterDto } from './dto/create-transporter.dto';
import { UpdateTransporterDto } from './dto/update-transporter.dto';

@ApiTags('Transporters')
@Controller('transporters')
export class TransporterController {
  constructor(private readonly transporterService: TransporterService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new transporter' })
  create(@Body() dto: CreateTransporterDto) {
    return this.transporterService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all transporters' })
  findAll() {
    return this.transporterService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific transporter by ID' })
  findOne(@Param('id') id: string) {
    return this.transporterService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update transporter info' })
  update(@Param('id') id: string, @Body() dto: UpdateTransporterDto) {
    return this.transporterService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete transporter' })
  remove(@Param('id') id: string) {
    return this.transporterService.remove(id);
  }
}
