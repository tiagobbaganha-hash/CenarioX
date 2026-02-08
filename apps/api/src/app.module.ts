import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthController } from './health.controller';
import { MarketsModule } from './modules/markets/markets.module';
import { OrdersModule } from './modules/orders/orders.module';
import { PositionsModule } from './modules/positions/positions.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MarketsModule,
    OrdersModule,
    PositionsModule,
  ],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
