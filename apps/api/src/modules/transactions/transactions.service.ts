import { Injectable } from '@nestjs/common';

@Injectable()
export class TransactionsService {
  private transactions = [
    { id: '1', user_id: '1', type: 'deposit', amount: 1000, status: 'completed', created_at: new Date() },
    { id: '2', user_id: '2', type: 'withdrawal', amount: 500, status: 'pending', created_at: new Date() },
  ];

  async findAll() {
    return this.transactions;
  }

  async findOne(id: string) {
    return this.transactions.find(t => t.id === id);
  }
}
