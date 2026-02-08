import { Controller, Get, Param, Query } from '@nestjs/common';
import { PriceHistoryService } from './price-history.service';

@Controller('price-history')
export class PriceHistoryController {
  constructor(private readonly priceHistoryService: PriceHistoryService) {}

  @Get(':marketId')
  getHistory(
    @Param('marketId') marketId: string,
    @Query('limit') limit?: string,
  ) {
    const limitNum = limit ? parseInt(limit, 10) : undefined;
    return this.priceHistoryService.getHistory(marketId, limitNum);
  }
}
