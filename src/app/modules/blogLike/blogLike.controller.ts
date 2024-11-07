import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BlogLikeServices } from './blogLike.service';

const createBlogLike = catchAsync(async (req, res) => {
  const { userId, postId } = req.body;
  const post = await BlogLikeServices.createLikeIntoDB(userId, postId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Like created successfully',
    data: post,
  });
});

export const BlogLikeControllers = {
  createBlogLike,
};
