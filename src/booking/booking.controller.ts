import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@ApiTags('Bookings')
@Controller('v1/bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new booking' })
  create(@Body() dto: CreateBookingDto) {
    return this.bookingService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all bookings' })
  findAll() {
    return this.bookingService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get booking by ID' })
  findOne(@Param('id') id: string) {
    return this.bookingService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update booking info' })
  update(@Param('id') id: string, @Body() dto: UpdateBookingDto) {
    return this.bookingService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete booking' })
  remove(@Param('id') id: string) {
    return this.bookingService.remove(id);
  }
}
