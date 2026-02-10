import { Injectable, NotFoundException, BadRequestException, Inject, forwardRef } from '@nestjs/common';
import { CreateMarketDto, UpdateMarketDto, ResolveMarketDto } from './dto';
import { Market } from './types';
import { PositionsService } from '../positions/positions.service';


@Injectable()
export class MarketsService {
  private markets: Market[] = [];
  private priceHistory: Map<string, any[]> = new Map();
  private idCounter = 1;

  constructor(
    @Inject(forwardRef(() => PositionsService))
    private positionsService: PositionsService,
  ) {}

  async create(createMarketDto: CreateMarketDto): Promise<Market> {
    const market: Market = {
      id: String(this.idCounter++),
      ...createMarketDto,
      status: 'active',
      yes_price: 0.5,
      no_price: 0.5,
      total_volume: 0,
      liquidity: 0,
      total_trades: 0,
      created_at: new Date().toISOString(),
      resolved: false,
    };
    this.markets.push(market);
    
    // Initialize price history
    this.priceHistory.set(market.id, [{
      timestamp: market.created_at,
      yes_price: market.yes_price,
      no_price: market.no_price,
      volume: 0,
    }]);
    
    return market;
  }

  async seedMarkets(): Promise<Market[]> {
    const brazilianMarkets = [
      {
        title: "Bitcoin vai superar R$ 500.000 em 2026?",
        description: "Bitcoin alcançará preço superior a R$ 500.000 em algum momento durante 2026",
        category: "crypto",
        closes_at: new Date('2026-12-31').toISOString(),
      },
      {
        title: "Lula será reeleito em 2026?",
        description: "Luiz Inácio Lula da Silva vencerá as eleições presidenciais de 2026",
        category: "politics",
        closes_at: new Date('2026-10-30').toISOString(),
      },
      {
        title: "Brasil vai sediar a Copa do Mundo de 2030?",
        description: "Brasil será escolhido como um dos países-sede da Copa do Mundo FIFA 2030",
        category: "sports",
        closes_at: new Date('2024-12-31').toISOString(),
      },
      {
        title: "Selic cairá abaixo de 10% em 2026?",
        description: "Taxa Selic brasileira ficará abaixo de 10% ao ano em algum momento de 2026",
        category: "economy",
        closes_at: new Date('2026-12-31').toISOString(),
      },
      {
        title: "Nubank terá mais de 150 milhões de clientes em 2026?",
        description: "Nubank alcançará marca de 150 milhões de clientes até final de 2026",
        category: "technology",
        closes_at: new Date('2026-12-31').toISOString(),
      },
      {
        title: "Anitta vencerá Grammy em 2027?",
        description: "Anitta ganhará pelo menos um Grammy Award na cerimônia de 2027",
        category: "entertainment",
        closes_at: new Date('2027-02-28').toISOString(),
      },
      {
        title: "Dólar ficará abaixo de R$ 5,00 em 2026?",
        description: "Taxa de câmbio USD/BRL cairá abaixo de R$ 5,00 durante 2026",
        category: "economy",
        closes_at: new Date('2026-12-31').toISOString(),
      },
      {
        title: "Flamengo será campeão brasileiro em 2026?",
        description: "Flamengo vencerá o Campeonato Brasileiro Série A de 2026",
        category: "sports",
        closes_at: new Date('2026-12-08').toISOString(),
      },
      {
        title: "PIX ultrapassará 200 milhões de usuários em 2026?",
        description: "Sistema PIX terá mais de 200 milhões de usuários cadastrados até fim de 2026",
        category: "technology",
        closes_at: new Date('2026-12-31').toISOString(),
      },
      {
        title: "Inflação brasileira ficará abaixo de 4% em 2026?",
        description: "IPCA acumulado de 2026 ficará abaixo da meta de 4% ao ano",
        category: "economy",
        closes_at: new Date('2027-01-15').toISOString(),
      },
    ];

    const seededMarkets = brazilianMarkets.map((market, index) => {
      const yesPrice = 0.45 + Math.random() * 0.15;
      const m: Market = {
        id: String(this.idCounter++),
        ...market,
        status: 'active',
        yes_price: yesPrice,
        no_price: 1 - yesPrice,
        total_volume: Math.floor(Math.random() * 500000) + 100000,
        liquidity: Math.floor(Math.random() * 200000) + 50000,
        total_trades: Math.floor(Math.random() * 500) + 50,
        created_at: new Date().toISOString(),
        resolved: false,
      };
      
      // Initialize price history with some mock data
      const history: any[] = [];
      const now = Date.now();
      const dayInMs = 24 * 60 * 60 * 1000;
      
      for (let i = 30; i >= 0; i--) {
        const timestamp = new Date(now - i * dayInMs).toISOString();
        const variance = (Math.random() - 0.5) * 0.1;
        const yes = Math.max(0.1, Math.min(0.9, yesPrice + variance));
        history.push({
          timestamp,
          yes_price: yes,
          no_price: 1 - yes,
          volume: m.total_volume * (i / 30),
        });
      }
      
      this.priceHistory.set(m.id, history);
      return m;
    });

    this.markets.push(...seededMarkets);
    return seededMarkets;
  }

  async findAll(
    category?: string,
    status?: string,
    search?: string,
  ): Promise<Market[]> {
    let filtered = this.markets;

    if (category) {
      filtered = filtered.filter((m) => m.category === category);
    }

    if (status) {
      filtered = filtered.filter((m) => m.status === status);
    }

    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(
        (m) =>
          m.title.toLowerCase().includes(searchLower) ||
          m.description.toLowerCase().includes(searchLower),
      );
    }

    return filtered;
  }

  async findOne(id: string): Promise<Market> {
    const market = this.markets.find((m) => m.id === id);
    if (!market) {
      throw new NotFoundException('Market ' + id + ' not found');
    }
    return market;
  }

  async update(id: string, updateMarketDto: UpdateMarketDto): Promise<Market> {
    const market = await this.findOne(id);
    const oldYesPrice = market.yes_price;
    const oldNoPrice = market.no_price;
    
    Object.assign(market, updateMarketDto);
    
    // Track price change
    if (updateMarketDto.yes_price !== undefined || updateMarketDto.no_price !== undefined) {
      this.addPriceSnapshot(id, market.yes_price, market.no_price, market.total_volume);
    }
    
    return market;
  }

  async remove(id: string): Promise<void> {
    const index = this.markets.findIndex((m) => m.id === id);
    if (index === -1) {
      throw new NotFoundException('Market ' + id + ' not found');
    }
    this.markets.splice(index, 1);
    this.priceHistory.delete(id);
  }

  async resolve(id: string, resolveDto: ResolveMarketDto): Promise<Market> {
    const market = await this.findOne(id);

    if (market.resolved) {
      throw new BadRequestException('Market already resolved');
    }

    if (market.status !== 'closed') {
      market.status = 'closed';
    }

    market.resolved = true;
    market.resolution = resolveDto.resolution;
    market.resolved_at = new Date().toISOString();

    await this.distributePayouts(market);

    return market;
  }

  private async distributePayouts(market: Market): Promise<void> {
    if (!market.resolution || market.resolution === 'invalid') {
      const positions = await this.positionsService.findAll(market.id);
      
      for (const position of positions) {
        if (position.shares > 0) {
          const refundAmount = position.shares * position.avgPrice;
          await this.positionsService.update(position.id, {
            realizedPnl: position.realizedPnl + refundAmount - (position.shares * position.avgPrice),
            shares: 0,
          });
        }
      }
      return;
    }

    const positions = await this.positionsService.findAll(market.id);
    
    for (const position of positions) {
      if (position.shares > 0) {
        const isWinner = position.side === market.resolution;
        
        if (isWinner) {
          const payout = position.shares * 1.0;
          const costBasis = position.shares * position.avgPrice;
          const profit = payout - costBasis;
          
          await this.positionsService.update(position.id, {
            realizedPnl: position.realizedPnl + profit,
            shares: 0,
          });
        } else {
          const loss = position.shares * position.avgPrice;
          
          await this.positionsService.update(position.id, {
            realizedPnl: position.realizedPnl - loss,
            shares: 0,
          });
        }
      }
    }
  }

  async getPriceHistory(id: string): Promise<any[]> {
    await this.findOne(id); // Validate market exists
    return this.priceHistory.get(id) || [];
  }

  addPriceSnapshot(marketId: string, yesPrice: number, noPrice: number, volume: number): void {
    const history = this.priceHistory.get(marketId) || [];
    history.push({
      timestamp: new Date().toISOString(),
      yes_price: yesPrice,
      no_price: noPrice,
      volume,
    });
    this.priceHistory.set(marketId, history);
  }

  async getStats() {
    const active = this.markets.filter((m) => m.status === 'active').length;
    const closed = this.markets.filter((m) => m.status === 'closed').length;
    const resolved = this.markets.filter((m) => m.resolved).length;

    const totalVolume = this.markets.reduce((sum, m) => sum + m.total_volume, 0);
    const totalTrades = this.markets.reduce((sum, m) => sum + m.total_trades, 0);

    return {
      total: this.markets.length,
      active,
      closed,
      resolved,
      totalVolume,
      totalTrades,
    };
  }
}
