import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GuardianService } from './guardian.service';
import { CreateGuardianDto } from './dto/create-guardian.dto';
import { UpdateGuardianDto } from './dto/update-guardian.dto';

@ApiTags('Guardians')
@Controller('guardians')
export class GuardianController {
  constructor(private readonly guardianService: GuardianService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new Guardian' })
  @ApiResponse({ status: 201, description: 'Guardian created successfully' })
  create(@Body() dto: CreateGuardianDto) {
    return this.guardianService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all Guardians' })
  findAll() {
    return this.guardianService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Guardian by ID' })
  findOne(@Param('id') id: string) {
    return this.guardianService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update Guardian by ID' })
  update(@Param('id') id: string, @Body() dto: UpdateGuardianDto) {
    return this.guardianService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Guardian by ID' })
  remove(@Param('id') id: string) {
    return this.guardianService.remove(id);
  }
}
