import { IsMongoId, IsNumber, IsOptional, IsString, IsDateString } from 'class-validator';

export class CreateBookingDto {
  @IsMongoId()
  passenger: string;

  @IsMongoId()
  driver: string;

  @IsMongoId()
  route: string;

  @IsNumber()
  fare: number;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsDateString()
  pickupTime?: string;

  @IsOptional()
  @IsDateString()
  dropTime?: string;
}
