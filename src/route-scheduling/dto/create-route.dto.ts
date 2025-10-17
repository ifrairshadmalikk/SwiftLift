import { IsString, IsNumber, IsDateString, IsMongoId, IsOptional, IsArray } from 'class-validator';

export class CreateRouteDto {
  @IsString()
  routeName: string;

  @IsString()
  startLocation: string;

  @IsString()
  endLocation: string;

  @IsNumber()
  distanceKm: number;

  @IsOptional()
  @IsString()
  estimatedTime?: string;

  @IsDateString()
  scheduledTime: string;

  @IsString()
  @IsOptional()
  status?: string;

  @IsMongoId()
  transporter: string;

  @IsMongoId()
  driver: string;

  @IsOptional()
  @IsArray()
  passengers?: string[];
}
