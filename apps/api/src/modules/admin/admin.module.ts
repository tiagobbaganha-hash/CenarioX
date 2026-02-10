import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { MarketsModule } from '../markets/markets.module';
import { OrdersModule } from '../orders/orders.module';
import { PositionsModule } from '../positions/positions.module';

@Module({
  imports: [MarketsModule, OrdersModule, PositionsModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
