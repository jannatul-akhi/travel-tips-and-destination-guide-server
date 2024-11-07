/* eslint-disable @typescript-eslint/no-explicit-any */
import { BlogPost } from '../blogPost/blogPost.model';
import { BlogComment } from './blogComment.model';

const createCommentInDB = async (
  userId: string,
  postId: string,
  content: string,
) => {
  const session = await BlogPost.startSession();

  try {
    session.startTransaction();

    // Create a new comment
    const newComment = await BlogComment.create([{ userId, postId, content }], {
      session,
    });
    const newCommentId = newComment[0]._id;

    // Update the blog post's commentIds with the new comment's ID
    await BlogPost.updateOne(
      { _id: postId },
      { $push: { commentIds: newCommentId } },
      { session },
    );

    await session.commitTransaction();
    return { success: true, comment: newComment };
  } catch (error: any) {
    await session.abortTransaction();
    throw new Error('Transaction failed: ' + error.message);
  } finally {
    session.endSession();
  }
};

const getCommentsByPostId = async (postId: string) => {
  const result = await BlogComment.find({ postId })
    .populate('userId')
    .sort({ createdAt: -1 });

  console.log('from comments service: ', result);

  return result;
};

export const BlogCommentServices = {
  createCommentInDB,
  getCommentsByPostId,
};
