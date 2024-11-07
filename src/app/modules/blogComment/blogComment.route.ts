import express from 'express';
import { BlogCommentControllers } from './blogComment.controller';

const router = express.Router();

router.post('/', BlogCommentControllers.createBlogComment);

router.get('/:postId', BlogCommentControllers.getCommentsByPostId);

export const BlogCommentRoutes = router;
