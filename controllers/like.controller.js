import { likeModel } from "../models/like.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";



export const toggleMediaLike = asyncHandler(async (req, res) => {

    const mediaId = req.params.mediaId;
    const { owner_id, owner_username } = req.body;

    // checking media id null or not
    if (!mediaId) {
        throw new ApiError(401, 'media Id requird!..');
    }

    // checked user alredy liked or not media
    const isMediaLiked = await likeModel.findOne({
        mediaId, likedBy: {
            ownerId: owner_id,
            username: owner_username
        }
    })

    // user alredy liked this post unlike it
    if (isMediaLiked) {
        const deleteMediaLike = await likeModel.findByIdAndDelete(({ _id: isMediaLiked?._id }));

        if (!deleteMediaLike) {
            throw new ApiError(501, 'Something went wrong when disLike Post!..');
        }

       return res.status(200).json(new ApiResponse(200, { disLikedPost: deleteMediaLike }, 'Post disLikd!..'))
    }

    const likeMedia = await likeModel.create({
        mediaId,
        likedBy: {
            ownerId: owner_id,
            username: owner_username
        }
    })

    if (!likeMedia) {
        throw new ApiError(501, 'Something went wrong when Like Post!..');
    }

    res.status(200).json(new ApiResponse(200, { likedPost: likeMedia }, 'Post Liked!..'))


})

export const toggleCommentLike = asyncHandler(async (req, res) => {

    const commentId = req.params.commentId;
    const { owner_id, owner_username } = req.body;

    // checking media id null or not
    if (!commentId) {
        throw new ApiError(401, 'comment Id requird!..');
    }

    // checked user alredy liked or not media
    const isCommentLiked = await likeModel.findOne({
        commentId, likedBy: {
            ownerId: owner_id,
            username: owner_username
        }
    })

    // user alredy liked this post unlike it
    if (isCommentLiked) {
        const deleteCommentLike = await likeModel.findByIdAndDelete(({ _id: isCommentLiked?._id }));

        if (!deleteCommentLike) {
            throw new ApiError(501, 'Something went wrong when disLike Comment!..');
        }

       return res.status(200).json(new ApiResponse(200, { disLikedComment: deleteCommentLike }, 'Comment disLikd!..'))
    }

    const likeComment = await likeModel.create({
        commentId,
        likedBy: {
            ownerId: owner_id,
            username: owner_username
        }
    })

    if (!likeComment) {
        throw new ApiError(501, 'Something went wrong when Like Comment!..');
    }

    res.status(200).json(new ApiResponse(200, { likedComment: likeComment }, 'Comment Liked!..'))
})