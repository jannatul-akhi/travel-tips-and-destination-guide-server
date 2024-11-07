/* eslint-disable @typescript-eslint/no-explicit-any */
import { BlogPost } from '../blogPost/blogPost.model';
import { BlogLike } from './blogLike.model';

const createLikeIntoDB = async (userId: string, postId: string) => {
  const session = await BlogPost.startSession();

  try {
    session.startTransaction();

    const existingLike = await BlogLike.findOne({ userId, postId }).session(
      session,
    );

    if (existingLike) {
      // Remove the like and update the blog post's likeIds
      await existingLike.deleteOne({ session });
      await BlogPost.updateOne(
        { _id: postId },
        { $pull: { likeIds: existingLike._id } },
        { session },
      );

      await session.commitTransaction();
      return { liked: false, status: false };
    } else {
      // Create a new like and update the blog post's likeIds
      const newLike = await BlogLike.create(
        [{ userId, postId, status: true }],
        { session },
      );
      const newLikeId = newLike[0]._id;
      await BlogPost.updateOne(
        { _id: postId },
        { $push: { likeIds: newLikeId } },
        { session },
      );

      await session.commitTransaction();
      return { liked: true, like: newLike };
    }
  } catch (error: any) {
    await session.abortTransaction();
    throw new Error('Transaction failed: ' + error.message);
  } finally {
    session.endSession();
  }
};

export const BlogLikeServices = {
  createLikeIntoDB,
};
