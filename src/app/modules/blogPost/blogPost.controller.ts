import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BlogPostServices } from './blogPost.service';

const createBlogPost = catchAsync(async (req, res) => {
  const payLoad = req.body;
  //const user = req.user;
  const post = await BlogPostServices.createBlogPostIntoDB({
    payLoad,
    //userInfo: user,
  });

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Post created successfully',
    data: post,
  });
});

const getAllBlogs = catchAsync(async (req, res) => {
  const result = await BlogPostServices.getAllBlogsFromDB();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'All blog retrieved successfully',
    data: result,
  });
});

export const BlogPostControllers = {
  createBlogPost,
  getAllBlogs,
};
