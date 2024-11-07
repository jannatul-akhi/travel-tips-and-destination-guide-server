import { Types } from 'mongoose';

export type TBlogComment = {
  userId: Types.ObjectId;
  postId: Types.ObjectId;
  content: string;
};
