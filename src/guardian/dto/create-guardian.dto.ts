import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateGuardianDto {
  @ApiProperty({ example: 'Ahmad Khan' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'ahmad.khan@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '+923001234567' })
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty({ example: 'Father' })
  @IsOptional()
  @IsString()
  relationship?: string;

  @ApiProperty({ example: '652b9ad8125fc61f7b90a321', description: 'Passenger ID (Mongo ObjectId)' })
  @IsOptional()
  passengerId?: string;
}
