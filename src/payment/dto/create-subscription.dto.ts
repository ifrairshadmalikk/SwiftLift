import { IsString, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateSubscriptionDto {
  @IsString()
  @IsNotEmpty()
  passengerId: string;

  @IsString()
  @IsNotEmpty()
  planName: string;

  @IsNumber()
  @Min(0)
  amount: number;
}
