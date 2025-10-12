import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { PassengerService } from './passenger.service';
import { CreatePassengerDto } from './dto/create-passenger.dto';
import { UpdatePassengerDto } from './dto/update-passenger.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Passengers')
@Controller('passengers')
export class PassengerController {
  constructor(private readonly passengerService: PassengerService) {}

  // 1️⃣ Create Passenger
  @Post()
  @ApiOperation({ summary: 'Create a new passenger' })
  create(@Body() createPassengerDto: CreatePassengerDto) {
    return this.passengerService.create(createPassengerDto);
  }

  // 2️⃣ Get All Passengers
  @Get()
  @ApiOperation({ summary: 'Get all passengers' })
  findAll() {
    return this.passengerService.findAll();
  }

  // 3️⃣ Get Passenger by ID
  @Get(':id')
  @ApiOperation({ summary: 'Get passenger by ID' })
  findOne(@Param('id') id: string) {
    return this.passengerService.findOne(id);
  }

  // 4️⃣ Update Passenger by ID
  @Put(':id')
  @ApiOperation({ summary: 'Update passenger by ID' })
  update(@Param('id') id: string, @Body() updatePassengerDto: UpdatePassengerDto) {
    return this.passengerService.update(id, updatePassengerDto);
  }

  // 5️⃣ Delete Passenger by ID
  @Delete(':id')
  @ApiOperation({ summary: 'Delete passenger by ID' })
  remove(@Param('id') id: string) {
    return this.passengerService.remove(id);
  }
}
