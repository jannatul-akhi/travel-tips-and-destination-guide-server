import express from 'express';
import { BlogLikeControllers } from './blogLike.controller';

const router = express.Router();

router.post('/', BlogLikeControllers.createBlogLike);

export const BlogLikeRoutes = router;
