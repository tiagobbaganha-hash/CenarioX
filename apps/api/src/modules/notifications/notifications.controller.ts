import { Controller, Get, Patch, Delete, Param, Query } from '@nestjs/common';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  findAll(
    @Query('user_id') userId: string,
    @Query('unread_only') unreadOnly?: string,
  ) {
    return this.notificationsService.findAll(userId, unreadOnly === 'true');
  }

  @Get('unread-count')
  getUnreadCount(@Query('user_id') userId: string) {
    return this.notificationsService.getUnreadCount(userId);
  }

  @Patch(':id/read')
  markAsRead(@Param('id') id: string) {
    return this.notificationsService.markAsRead(id);
  }

  @Patch('read-all')
  markAllAsRead(@Query('user_id') userId: string) {
    return this.notificationsService.markAllAsRead(userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notificationsService.remove(id);
  }

  @Delete()
  removeAll(@Query('user_id') userId: string) {
    return this.notificationsService.removeAll(userId);
  }
}
