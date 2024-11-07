import { Types } from 'mongoose';

export type TBlogLike = {
  userId: Types.ObjectId;
  postId: Types.ObjectId;
  status: boolean;
};
