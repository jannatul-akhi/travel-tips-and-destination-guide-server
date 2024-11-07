//import { JwtPayload } from 'jsonwebtoken';
import { TBlogPost } from './blogPost.interface';
import { BlogPost } from './blogPost.model';
// import AppError from '../../errors/AppError';
// import httpStatus from 'http-status';

const createBlogPostIntoDB = async ({
  payLoad,
  //userInfo,
}: {
  payLoad: TBlogPost;
  //userInfo: JwtPayload;
}) => {
  // const { user } = userInfo;
  // if (!user) {
  //   throw new AppError(httpStatus.NOT_FOUND, 'You are not a user!!!');
  // }

  // const userId = user._id ? user._id.toString() : null;
  // payLoad.userId = userId;

  const result = await BlogPost.create(payLoad);

  return result;
};

const getAllBlogsFromDB = async () => {
  const result = await BlogPost.find()
    .populate('userId')
    .sort({ createdAt: -1 });

  return result;
};

export const BlogPostServices = {
  createBlogPostIntoDB,
  getAllBlogsFromDB,
};
