import { commentModel } from "../models/comment.model.js";
import { mediaModel } from "../models/media.model.js";
import { notificationModel } from "../models/notification.model.js";
import { userModel } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";



export const mediaLiked = asyncHandler(async (req, res) => {

    const mediaId = req.params.mediaId;
    const { notifyById } = req.body;


    if (mediaId.trim() === '' || notifyById.trim() === '') {
        throw new ApiError(401, 'All fileds are requrid!..');
    }

    const media = await mediaModel.findById({ _id: mediaId });
    const notifyBy = await userModel.findById({ _id: notifyById });

    // checking user alredy notify for this post like
    const alredyNotify = await notificationModel.findOne({
        likedMediaId: mediaId,
        notifyTo: media?.owner,
        notifyBy: {
            ownerId: notifyBy?._id,
            username: notifyBy?.username
        }
    });

    // delete notification it is alredy notify
    if (alredyNotify) {
        const deleteNotification = await notificationModel.findByIdAndDelete({ _id: alredyNotify._id });

        if (!deleteNotification) {
            throw new ApiError(501, 'Something went wrong when deleting Post Liked Notification!..');
        }


        return res.status(200).json(new ApiResponse(200, { deletedNotification: deleteNotification }, 'Post Liked Notification is Deleted!..'));
    }

    // create notification is not exists
    const notification = await notificationModel.create({
        likedMediaId: mediaId,
        content: media?.is_video ? `${notifyBy?.username} liked your reel` : `${notifyBy?.username} liked your post`,
        notifyTo: media?.owner,
        notifyBy: {
            ownerId: notifyBy?._id,
            username: notifyBy?.username
        }
    })

    if (!notification) {
        throw new ApiError(501, 'Something went wrong when creating Post Liked Notification!..');
    }

    res.status(200).json(new ApiResponse(200, { notification }, 'Notification of Post liked Created!..'))
})

export const mediaCommented = asyncHandler(async (req, res) => {

    const mediaId = req.params.mediaId;
    const { notifyById } = req.body;


    if (mediaId.trim() === '' || notifyById.trim() === '') {
        throw new ApiError(401, 'All fileds are requrid!..');
    }

    const media = await mediaModel.findById({ _id: mediaId });
    const notifyBy = await userModel.findById({ _id: notifyById });

    // checking user alredy notify for this post commented
    const alredyNotify = await notificationModel.findOne({
        commentedMediaId: mediaId,
        notifyTo: media?.owner,
        notifyBy: {
            ownerId: notifyBy?._id,
            username: notifyBy?.username
        }
    });

    // delete notification it is alredy notify
    if (alredyNotify) {
        const deleteNotification = await notificationModel.findByIdAndDelete({ _id: alredyNotify._id });

        if (!deleteNotification) {
            throw new ApiError(501, 'Something went wrong when deleting Post Commented Notification!..');
        }

        return res.status(200).json(new ApiResponse(200, { deletedNotification: deleteNotification }, 'Post Commented Notification is Deleted!..'));
    }

    // create notification is not exists
    const notification = await notificationModel.create({
        commentedMediaId: mediaId,
        content: media?.is_video ? `${notifyBy?.username} commented on your reel` : `${notifyBy?.username} commented on your post`,
        notifyTo: media?.owner,
        notifyBy: {
            ownerId: notifyBy?._id,
            username: notifyBy?.username
        }
    })

    if (!notification) {
        throw new ApiError(501, 'Something went wrong when creating Post Commented Notification!..');
    }

    res.status(200).json(new ApiResponse(200, { notification }, 'Notification of Post Commented Created!..'))
})

export const mediaShared = asyncHandler(async (req, res) => {

    const mediaId = req.params.mediaId;
    const { notifyById } = req.body;


    if (mediaId.trim() === '' || notifyById.trim() === '') {
        throw new ApiError(401, 'All fileds are requrid!..');
    }

    const media = await mediaModel.findById({ _id: mediaId });
    const notifyBy = await userModel.findById({ _id: notifyById });

    // create notification is not exists
    const notification = await notificationModel.create({
        sharedMediaId: mediaId,
        content: media?.is_video ? `${notifyBy?.username} Shared your reel` : `${notifyBy?.username} Shared your post`,
        notifyTo: media?.owner,
        notifyBy: {
            ownerId: notifyBy?._id,
            username: notifyBy?.username
        }
    })

    if (!notification) {
        throw new ApiError(501, 'Something went wrong when creating Post Shared Notification!..');
    }

    res.status(200).json(new ApiResponse(200, { notification }, 'Notification of Post Shared Created!..'))
})

export const mediaSaved = asyncHandler(async (req, res) => {

    const mediaId = req.params.mediaId;
    const { notifyById } = req.body;


    if (mediaId.trim() === '' || notifyById.trim() === '') {
        throw new ApiError(401, 'All fileds are requrid!..');
    }

    const media = await mediaModel.findById({ _id: mediaId });
    const notifyBy = await userModel.findById({ _id: notifyById });

    // checking user alredy notify for this post saved
    const alredyNotify = await notificationModel.findOne({
        savedMediaId: mediaId,
        notifyTo: media?.owner,
        notifyBy: {
            ownerId: notifyBy?._id,
            username: notifyBy?.username
        }
    });

    // delete notification it is alredy notify
    if (alredyNotify) {
        const deleteNotification = await notificationModel.findByIdAndDelete({ _id: alredyNotify._id });

        if (!deleteNotification) {
            throw new ApiError(501, 'Something went wrong when deleting Post Saved Notification!..');
        }

        return res.status(200).json(new ApiResponse(200, { deletedNotification: deleteNotification }, 'Post Saved Notification is Deleted!..'));
    }

    // create notification is not exists
    const notification = await notificationModel.create({
        savedMediaId: mediaId,
        content: media?.is_video ? `${notifyBy?.username} Saved your reel` : `${notifyBy?.username} Saved your post`,
        notifyTo: media?.owner,
        notifyBy: {
            ownerId: notifyBy?._id,
            username: notifyBy?.username
        }
    })

    if (!notification) {
        throw new ApiError(501, 'Something went wrong when creating Post Saved Notification!..');
    }

    res.status(200).json(new ApiResponse(200, { notification }, 'Notification of Post Saved Created!..'))
})

export const commetnLiked = asyncHandler(async (req, res) => {

    const commentId = req.params.commentId;
    const { notifyById } = req.body;


    if (commentId.trim() === '' || notifyById.trim() === '') {
        throw new ApiError(401, 'All fileds are requrid!..');
    }

    const comment = await commentModel.findById({ _id: commentId });
    const notifyBy = await userModel.findById({ _id: notifyById });

    // checking user alredy liked comment
    const alredyNotify = await notificationModel.findOne({
        likedCommentId: commentId,
        notifyTo: comment?.owner,
        notifyBy: {
            ownerId: notifyBy?._id,
            username: notifyBy?.username
        }
    });

    // delete notification it is alredy notify
    if (alredyNotify) {
        const deleteNotification = await notificationModel.findByIdAndDelete({ _id: alredyNotify._id });

        if (!deleteNotification) {
            throw new ApiError(501, 'Something went wrong when deleting Comment Liked Notification!..');
        }

        return res.status(200).json(new ApiResponse(200, { deletedNotification: deleteNotification }, 'Comment Liked Notification is Deleted!..'));
    }

    // create notification is not exists
    const notification = await notificationModel.create({
        likedCommentId: commentId,
        content: `${notifyBy?.username} Liked your comment`,
        notifyTo: comment?.owner,
        notifyBy: {
            ownerId: notifyBy?._id,
            username: notifyBy?.username
        }
    })

    if (!notification) {
        throw new ApiError(501, 'Something went wrong when creating Comment Liked Notification!..');
    }

    res.status(200).json(new ApiResponse(200, { notification }, 'Notification of Comment Liked Created!..'))
})

export const userFollwed = asyncHandler(async (req, res) => {

    const notifyToId = req.params.notifyToId;
    const { notifyById } = req.body;

    if (notifyToId.trim() === '' || notifyById.trim() === '') {
        throw new ApiError(401, 'All fileds are requrid!..');
    }

    const notifyTo = await userModel.findById({ _id: notifyToId });
    const notifyBy = await userModel.findById({ _id: notifyById });


    // checking user alredy followed
    const alredyNotify = await notificationModel.findOne({
        followedUserId: notifyToId,
        notifyTo: notifyTo?.owner,
        notifyBy: {
            ownerId: notifyBy?._id,
            username: notifyBy?.username
        }
    });

    // delete notification it is alredy notify
    if (alredyNotify) {
        const deleteNotification = await notificationModel.findByIdAndDelete({ _id: alredyNotify._id });

        if (!deleteNotification) {
            throw new ApiError(501, 'Something went wrong when deleting User Followed Notification!..');
        }

        return res.status(200).json(new ApiResponse(200, { deletedNotification: deleteNotification }, 'User Followed Notification is Deleted!..'));
    }

    // create notification is not exists
    const notification = await notificationModel.create({
        followedUserId: notifyToId,
        content: `${notifyBy?.username} Started Following you `,
        notifyTo: notifyTo?.owner,
        notifyBy: {
            ownerId: notifyBy?._id,
            username: notifyBy?.username
        }
    })

    if (!notification) {
        throw new ApiError(501, 'Something went wrong when creating User Followed Notification!..');
    }

    res.status(200).json(new ApiResponse(200, { notification }, 'Notification of User Followed Created!..'))
})