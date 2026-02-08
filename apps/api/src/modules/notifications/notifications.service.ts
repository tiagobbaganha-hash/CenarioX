import { Injectable, NotFoundException } from '@nestjs/common';
import { Notification } from './types';

@Injectable()
export class NotificationsService {
  private notifications: Notification[] = [];
  private idCounter = 1;

  create(
    userId: string,
    type: Notification['type'],
    title: string,
    message: string,
    link?: string,
    data?: any,
  ): Notification {
    const notification: Notification = {
      id: String(this.idCounter++),
      user_id: userId,
      type,
      title,
      message,
      link,
      read: false,
      created_at: new Date().toISOString(),
      data,
    };

    this.notifications.unshift(notification);
    return notification;
  }

  async findAll(userId: string, unreadOnly: boolean = false): Promise<Notification[]> {
    let filtered = this.notifications.filter((n) => n.user_id === userId);

    if (unreadOnly) {
      filtered = filtered.filter((n) => !n.read);
    }

    return filtered.sort((a, b) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  }

  async getUnreadCount(userId: string): Promise<{ count: number }> {
    const count = this.notifications.filter(
      (n) => n.user_id === userId && !n.read
    ).length;
    return { count };
  }

  async markAsRead(id: string): Promise<Notification> {
    const notification = this.notifications.find((n) => n.id === id);
    if (!notification) {
      throw new NotFoundException('Notification ' + id + ' not found');
    }
    notification.read = true;
    return notification;
  }

  async markAllAsRead(userId: string): Promise<{ count: number }> {
    const userNotifications = this.notifications.filter(
      (n) => n.user_id === userId && !n.read
    );
    userNotifications.forEach((n) => (n.read = true));
    return { count: userNotifications.length };
  }

  async remove(id: string): Promise<void> {
    const index = this.notifications.findIndex((n) => n.id === id);
    if (index === -1) {
      throw new NotFoundException('Notification ' + id + ' not found');
    }
    this.notifications.splice(index, 1);
  }

  async removeAll(userId: string): Promise<{ count: number }> {
    const beforeCount = this.notifications.length;
    this.notifications = this.notifications.filter((n) => n.user_id !== userId);
    return { count: beforeCount - this.notifications.length };
  }

  notifyMarketResolved(marketId: string, marketTitle: string, resolution: string) {
    const userIds = ['user1', 'user2'];
    
    userIds.forEach((userId) => {
      this.create(
        userId,
        'market_resolved',
        'Mercado Resolvido',
        'O mercado "' + marketTitle + '" foi resolvido como ' + resolution.toUpperCase(),
        '/markets/' + marketId,
        { marketId, resolution }
      );
    });
  }

  notifyOrderFilled(userId: string, marketTitle: string, side: string, amount: number) {
    this.create(
      userId,
      'order_filled',
      'Ordem Executada',
      'Sua ordem de ' + side.toUpperCase() + ' de R$' + amount.toFixed(2) + ' em "' + marketTitle + '" foi executada',
      undefined,
      { side, amount }
    );
  }

  notifyMarketClosingSoon(marketId: string, marketTitle: string, hoursLeft: number) {
    const userIds = ['user1', 'user2'];
    
    userIds.forEach((userId) => {
      this.create(
        userId,
        'market_closing',
        'Mercado Fechando',
        'O mercado "' + marketTitle + '" fecha em ' + hoursLeft + 'h',
        '/markets/' + marketId,
        { marketId, hoursLeft }
      );
    });
  }
}
