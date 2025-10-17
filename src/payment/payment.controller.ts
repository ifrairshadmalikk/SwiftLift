import { Controller, Post, Body } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { WalletTransactionDto } from './dto/wallet-transaction.dto';

@ApiTags('Payments')
@Controller('/payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('subscribe')
  @ApiOperation({ summary: 'Passenger monthly subscription' })
  async subscribe(@Body() dto: CreateSubscriptionDto) {
    return this.paymentService.createSubscription(dto.passengerId, dto.planName, dto.amount);
  }

  @Post('payout')
  @ApiOperation({ summary: 'Driver monthly payout' })
  async payout(@Body() dto: { driverId: string; amount: number }) {
    return this.paymentService.generateDriverPayout(dto.driverId, dto.amount);
  }

  @Post('wallet/credit')
  @ApiOperation({ summary: 'Credit user wallet' })
  async credit(@Body() dto: WalletTransactionDto) {
    return this.paymentService.creditWallet(dto.walletId, dto.amount, dto.category, dto.description);
  }

  @Post('wallet/debit')
  @ApiOperation({ summary: 'Debit user wallet' })
  async debit(@Body() dto: WalletTransactionDto) {
    return this.paymentService.debitWallet(dto.walletId, dto.amount, dto.category, dto.description);
  }
}
