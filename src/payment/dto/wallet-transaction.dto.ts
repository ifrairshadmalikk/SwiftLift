import { IsString, IsNotEmpty, IsNumber, Min, IsOptional } from 'class-validator';

export class WalletTransactionDto {
  @IsString()
  @IsNotEmpty()
  walletId: string;

  @IsNumber()
  @Min(0)
  amount: number;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsOptional()
  @IsString()
  description?: string;
}
