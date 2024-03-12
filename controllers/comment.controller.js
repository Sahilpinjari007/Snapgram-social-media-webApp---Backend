import { commentModel } from "../models/comment.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";




export const postComment = asyncHandler(async (req, res) => {

    const { content, owner_id, owner_username } = req.body;
    const mediaId = req.params.mediaId;

    if (!mediaId || !content || !owner_id || !owner_username) {
        throw new ApiError(401, 'All fileds are required!..')
    }

    if (content.trim() === '' || owner_id.trim() === '' || owner_username.trim() === '') {
        throw new ApiError(401, 'All fileds are required!..')
    }


    const comment = await commentModel.create({
        content,
        mediaId,
        owner: {
            ownerId: owner_id,
            username: owner_username
        }
    })


    if (!comment) {
        throw new ApiError(500, 'Something went wrong when posting comment!..')
    }


    res.status(200).json(new ApiResponse(200, { comment }, 'Comment Posted!..'))
})

export const updateComment = asyncHandler(async (req, res) => {

    const { content } = req.body;
    const commentId = req.params.commentId;

    if (!content || content.trim() === '') {
        throw new ApiError(401, 'All fileds are required!..')
    }


    const updatedComment = await commentModel.findByIdAndUpdate({ _id: commentId }, {
        content
    })

    if (!updatedComment) {
        throw new ApiError(500, 'Something went wrong when Updating Comment!..');
    }

    res.status(200).json(new ApiResponse(200, { comment: updatedComment }, 'Comment Updated Successfully!..'))
})

export const deleteComment = asyncHandler(async (req, res) => {

    const commentId = req.params.commentId;

    if (!commentId) {
        throw new ApiError(401, 'Comment Id requird!..');
    }

    const deletedComment = await commentModel.findByIdAndDelete({ _id: commentId });

    if (!deletedComment) {
        throw new ApiError(501, 'Something went wrong when deleting comment!..');
    }

    res.status(200).json(new ApiResponse(200, { comment: deletedComment }, 'Comment are deleted!..'));
})

export const featchComment = asyncHandler(async (req, res) => {

    const commentId = req.params.commentId;

    if (!commentId) {
        throw new ApiError(401, 'Comment Id requird!..');
    }

    const comment = await commentModel.findById({ _id: commentId });

    if (!comment) {
        throw new ApiError(501, 'Comment are not Avilable!..');
    }

    res.status(200).json(new ApiResponse(200, { comment }, 'Comment are Featched!..'))
})

export const featchPostComments = asyncHandler(async (req, res) => {

    const { pageNumber, pageSize } = req.body;

    if (!pageNumber && !pageSize) {
        throw new ApiError(400, 'please pass PageNumber and PageSize also!..')
    }

    const skipPages = (pageNumber - 1) * pageSize;

    const postComments = await commentModel.find()
        .skip(skipPages)
        .limit(pageSize);

    const hasMore = await commentModel.countDocuments() > (pageNumber * pageSize);


    res.status(200).json(new ApiResponse(200, { postComments, hasMore }, 'Post comments feathed!..'))

})