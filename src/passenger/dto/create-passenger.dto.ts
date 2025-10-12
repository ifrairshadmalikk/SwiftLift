import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class CreatePassengerDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;
}
