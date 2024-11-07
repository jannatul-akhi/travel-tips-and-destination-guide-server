import { z } from 'zod';

const createBlogPostValidationSchema = z.object({
  body: z.object({
    content: z.string().min(2, 'Post content miust be required'),
    imageUrl: z.string().min(2, 'Post image miust be required'),
  }),
});

export const BlogPostValidations = { createBlogPostValidationSchema };
