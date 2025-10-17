import { Module } from '@nestjs/common';
import { LiveTrackingGateway } from './live-tracking.gateway';
import { LiveTrackingService } from './live-tracking.service';

@Module({
  providers: [LiveTrackingGateway, LiveTrackingService],
})
export class LiveTrackingModule {}
