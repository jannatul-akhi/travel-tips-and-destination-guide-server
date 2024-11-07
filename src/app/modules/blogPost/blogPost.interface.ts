import { Types } from 'mongoose';

export type TBlogPost = {
  userId: Types.ObjectId;
  content: string;
  imageUrl?: string;
  likeIds: Types.ObjectId[];
  commentIds: Types.ObjectId[];
};
