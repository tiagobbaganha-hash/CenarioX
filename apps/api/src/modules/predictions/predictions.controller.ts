import { Controller, Get } from '@nestjs/common';

@Controller('predictions')
export class PredictionsController {
  @Get()
  findAll() {
    return [];
  }
}
