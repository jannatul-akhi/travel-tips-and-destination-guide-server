import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BlogCommentServices } from './blogComment.service';

const createBlogComment = catchAsync(async (req, res) => {
  const { userId, postId, content } = req.body;

  const result = await BlogCommentServices.createCommentInDB(
    userId,
    postId,
    content,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Comment added successfully',
    data: result.comment,
  });
});

const getCommentsByPostId = catchAsync(async (req, res) => {
  const { postId } = req.params;
  console.log('from comments controller for id: ', postId);

  // Call service function to get comments by postId
  const comments = await BlogCommentServices.getCommentsByPostId(postId);
  console.log('from comments controller: ', comments);

  // Send the response with the retrieved comments
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Comments retrieved successfully',
    data: comments,
  });
});

export const BlogCommentControllers = {
  createBlogComment,
  getCommentsByPostId,
};
