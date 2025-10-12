import { IsString, IsArray, IsOptional, IsPhoneNumber } from 'class-validator';

export class CreateTransporterDto {
  @IsString()
  companyName: string;

  @IsString()
  contactPerson: string;

  @IsPhoneNumber()
  contactNumber: string;

  @IsOptional()
  @IsArray()
  drivers?: string[];

  @IsOptional()
  @IsArray()
  passengers?: string[];

  @IsOptional()
  @IsArray()
  routes?: any[];

  @IsOptional()
  @IsArray()
  vehicles?: any[];
}
