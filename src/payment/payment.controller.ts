import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('subscribe')
  async subscribe(@Body() body: { passengerId: string; planName: string; amount: number }) {
    return this.paymentService.createSubscription(body.passengerId, body.planName, body.amount);
  }

  @Post('payout')
  async payout(@Body() body: { driverId: string; amount: number }) {
    return this.paymentService.generateDriverPayout(body.driverId, body.amount);
  }

  @Post('wallet/credit')
  async credit(@Body() body: { walletId: string; amount: number; category: string; description?: string }) {
    return this.paymentService.creditWallet(body.walletId, body.amount, body.category, body.description);
  }

  @Post('wallet/debit')
  async debit(@Body() body: { walletId: string; amount: number; category: string; description?: string }) {
    return this.paymentService.debitWallet(body.walletId, body.amount, body.category, body.description);
  }
}
