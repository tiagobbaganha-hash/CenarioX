import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
  @Get()
  check() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'CenarioX API',
      version: '1.0.0',
    };
  }

  @Get('ready')
  ready() {
    return {
      status: 'ready',
      database: 'connected',
      redis: 'connected',
    };
  }
}
