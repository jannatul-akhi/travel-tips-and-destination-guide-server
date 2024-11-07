import { model, Schema } from 'mongoose';
import { TBlogLike } from './blogLike.interface';

const blogLikeSchema = new Schema<TBlogLike>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    postId: { type: Schema.Types.ObjectId, ref: 'BlogPost', required: true },
    status: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

export const BlogLike = model<TBlogLike>('BlogLike', blogLikeSchema);
