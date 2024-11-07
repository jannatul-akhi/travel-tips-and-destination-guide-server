import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { BlogPostRoutes } from '../modules/blogPost/blogPost.route';
import { BlogLikeRoutes } from '../modules/blogLike/blogLike.route';
import { BlogCommentRoutes } from '../modules/blogComment/blogComment.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/blog',
    route: BlogPostRoutes,
  },
  {
    path: '/like',
    route: BlogLikeRoutes,
  },
  {
    path: '/comment',
    route: BlogCommentRoutes,
  },
];

// router.use('/users', UserRoutes);
// router.use('/students', StudentRoute);

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
