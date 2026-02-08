import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto, UpdateCommentDto } from './dto';
import { Comment } from './types';

@Injectable()
export class CommentsService {
  private comments: Comment[] = [];
  private idCounter = 1;

  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    const comment: Comment = {
      id: String(this.idCounter++),
      ...createCommentDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.comments.push(comment);
    return comment;
  }

  async findAll(marketId?: string): Promise<Comment[]> {
    if (marketId) {
      return this.comments.filter(c => c.marketId === marketId);
    }
    return this.comments;
  }

  async findOne(id: string): Promise<Comment> {
    const comment = this.comments.find(c => c.id === id);
    if (!comment) {
      throw new NotFoundException('Comment ' + id + ' not found');
    }
    return comment;
  }

  async update(id: string, updateCommentDto: UpdateCommentDto): Promise<Comment> {
    const comment = await this.findOne(id);
    Object.assign(comment, updateCommentDto);
    comment.updatedAt = new Date();
    return comment;
  }

  async remove(id: string): Promise<void> {
    const index = this.comments.findIndex(c => c.id === id);
    if (index === -1) {
      throw new NotFoundException('Comment ' + id + ' not found');
    }
    this.comments.splice(index, 1);
  }

  async getStats() {
    return {
      total: this.comments.length,
      byMarket: this.comments.reduce((acc, c) => {
        acc[c.marketId] = (acc[c.marketId] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
    };
  }
}
