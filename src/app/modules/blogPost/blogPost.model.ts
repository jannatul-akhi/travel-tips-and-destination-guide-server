import { model, Schema } from 'mongoose';
import { TBlogPost } from './blogPost.interface';

const blogPostSchema = new Schema<TBlogPost>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    content: { type: String, required: true },
    imageUrl: { type: String },
    likeIds: [{ type: Schema.Types.ObjectId, ref: 'BlogLike' }],
    commentIds: [{ type: Schema.Types.ObjectId, ref: 'BlogComment' }],
  },
  {
    timestamps: true,
  },
);

export const BlogPost = model<TBlogPost>('BlogPost', blogPostSchema);
