import { Module } from '@nestjs/common';
import { PredictionsController } from './predictions.controller';

@Module({
  controllers: [PredictionsController],
})
export class PredictionsModule {}
