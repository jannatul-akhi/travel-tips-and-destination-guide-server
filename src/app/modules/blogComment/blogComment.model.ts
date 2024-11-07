import { model, Schema } from 'mongoose';
import { TBlogComment } from './blogComment.interface';

const blogCommentSchema = new Schema<TBlogComment>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    postId: { type: Schema.Types.ObjectId, ref: 'BlogPost', required: true },
    content: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export const BlogComment = model<TBlogComment>(
  'BlogComment',
  blogCommentSchema,
);
