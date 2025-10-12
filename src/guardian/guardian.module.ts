import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GuardianController } from './guardian.controller';
import { GuardianService } from './guardian.service';
import { Guardian, GuardianSchema } from './guardian.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Guardian.name, schema: GuardianSchema }])],
  controllers: [GuardianController],
  providers: [GuardianService],
  exports: [GuardianService],
})
export class GuardianModule {}
