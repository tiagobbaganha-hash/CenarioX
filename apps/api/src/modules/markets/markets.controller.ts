import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { MarketsService } from './markets.service';
import { CreateMarketDto, UpdateMarketDto, ResolveMarketDto } from './dto';

@Controller('markets')
export class MarketsController {
  constructor(private readonly marketsService: MarketsService) {}

  @Post()
  create(@Body() createMarketDto: CreateMarketDto) {
    return this.marketsService.create(createMarketDto);
  }

  @Post('seed')
  seed() {
    return this.marketsService.seedMarkets();
  }

  @Get()
  findAll(
    @Query('category') category?: string,
    @Query('status') status?: string,
    @Query('search') search?: string,
  ) {
    return this.marketsService.findAll(category, status, search);
  }

  @Get('stats')
  getStats() {
    return this.marketsService.getStats();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.marketsService.findOne(id);
  }

  @Get(':id/history')
  priceHistory(@Param('id') id: string) {
    return this.marketsService.getPriceHistory(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMarketDto: UpdateMarketDto) {
    return this.marketsService.update(id, updateMarketDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.marketsService.remove(id);
  }

  @Post(':id/resolve')
  resolve(@Param('id') id: string, @Body() resolveDto: ResolveMarketDto) {
    return this.marketsService.resolve(id, resolveDto);
  }
}
