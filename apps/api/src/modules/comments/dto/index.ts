export class CreateCommentDto {
  marketId: string;
  userId: string;
  userName: string;
  content: string;
}

export class UpdateCommentDto {
  content?: string;
}
