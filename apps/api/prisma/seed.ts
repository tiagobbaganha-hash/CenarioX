import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  const hashedPassword = await bcrypt.hash('Senha123', 10);
  const demoUser = await prisma.user.upsert({
    where: { email: 'demo@cenariox.com' },
    update: {},
    create: {
      email: 'demo@cenariox.com',
      name: 'Demo User',
      password: hashedPassword,
      balance: 10000,
    },
  });

  console.log('✅ Demo user:', demoUser.email);

  const markets = [
    {
      title: 'Bitcoin chegará a $150.000 em 2026?',
      description: 'Mercado de previsão sobre o preço do Bitcoin.',
      slug: 'bitcoin-150k-2026',
      category: 'Crypto',
      imageUrl: '/images/markets/bitcoin-150k.jpg',
      endDate: new Date('2026-12-31'),
      yesPrice: 65,
      noPrice: 35,
      volume: 50000,
    },
    {
      title: 'Brasil será campeão da Copa 2026?',
      description: 'Previsão sobre o Brasil na Copa do Mundo.',
      slug: 'brasil-copa-2026',
      category: 'Sports',
      imageUrl: '/images/markets/brasil-copa.jpg',
      endDate: new Date('2026-07-19'),
      yesPrice: 25,
      noPrice: 75,
      volume: 120000,
    },
  ];

  for (const market of markets) {
    await prisma.market.upsert({
      where: { slug: market.slug },
      update: {},
      create: market,
    });
  }

  console.log('✅ Markets created');
  console.log('🎉 Seed completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
