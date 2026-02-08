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
import { PositionsService } from './positions.service';
import { CreatePositionDto, UpdatePositionDto, ClosePositionDto } from './dto';

@Controller('positions')
export class PositionsController {
  constructor(private readonly positionsService: PositionsService) {}

  @Post()
  create(@Body() createPositionDto: CreatePositionDto) {
    return this.positionsService.create(createPositionDto);
  }

  @Get()
  findAll(@Query('marketId') marketId?: string, @Query('userId') userId?: string) {
    return this.positionsService.findAll(marketId, userId);
  }

  @Get('leaderboard')
  getLeaderboard() {
    return this.positionsService.getLeaderboard();
  }

  @Get('portfolio/:userId')
  getPortfolio(@Param('userId') userId: string) {
    return this.positionsService.getPortfolio(userId);
  }

  @Get('market/:marketId')
  getMarketPositions(@Param('marketId') marketId: string) {
    return this.positionsService.findAll(marketId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.positionsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePositionDto: UpdatePositionDto) {
    return this.positionsService.update(id, updatePositionDto);
  }

  @Post(':id/close')
  close(@Param('id') id: string, @Body() closeDto: ClosePositionDto) {
    return this.positionsService.close(id, closeDto.exitPrice);
  }
}
