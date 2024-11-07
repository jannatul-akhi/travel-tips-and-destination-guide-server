import express from 'express';
import { BlogPostControllers } from './blogPost.controller';
// import authMiddleware from '../../middlewares/auth';
// import { USER_ROLE } from '../user/user.constant';
import zodValidationMiddleware from '../../middlewares/zodValidationMiddleware';
import { BlogPostValidations } from './blogPost.validation';

const router = express.Router();

router.post(
  '/',
  //authMiddleware(USER_ROLE.admin, USER_ROLE.user),
  zodValidationMiddleware(BlogPostValidations.createBlogPostValidationSchema),
  BlogPostControllers.createBlogPost,
);

router.get(
  '/',
  //authMiddleware(USER_ROLE.admin, USER_ROLE.user),
  BlogPostControllers.getAllBlogs,
);

export const BlogPostRoutes = router;
