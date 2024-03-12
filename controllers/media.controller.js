import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { mediaModel } from "../models/media.model.js";
import { UniqueString } from 'unique-string-generator';
import { uploadOnCloudinary } from "../utils/cloudinary.js";


export const createMedia = asyncHandler(async (req, res) => {

    const { caption, location, hashTags, owner_id, owner_username } = req.body;


    if (!req.files) {
        throw new ApiError(400, 'media file are requird!..');
    }

    if (req.files?.GraphImage) {

        const postUrl = await uploadOnCloudinary(req.files?.GraphImage[0]?.path) || 'unable to upload!..';

        const media = await mediaModel.create({
            shortcode: UniqueString().substring(0, 10),
            caption,
            location,
            is_multipleImages: false,
            media_imgUrl: postUrl,
            hashTags: hashTags.split(' '),
            is_video: false,
            owner: {
                ownerId: owner_id,
                username: owner_username
            }
        })

        const createdMedia = await mediaModel.findById(media._id);

        if (!createdMedia) {
            throw new ApiError(500, 'Something went wrong when creating Post!..')
        }

        res.
            status(200)
            .json(new ApiResponse(200, { post: createdMedia }, 'Post created SuccessFully!..'))

    }


    if (req.files?.GraphVideo) {

        const media = await mediaModel.create({
            __typename: "GraphVideo",
            shortcode: UniqueString().substring(0, 10),
            caption,
            location,
            hashTags: hashTags.split(' '),
            is_video: true,
            media_videoUrl: req.files?.GraphVideo[0]?.path,
            views: 0,
            owner: {
                ownerId: owner_id,
                username: owner_username
            }
        })

        const createdMedia = await mediaModel.findById(media._id);

        if (!createdMedia) {
            throw new ApiError(500, 'Something went wrong when creating Post!..')
        }

        res.
            status(200)
            .json(new ApiResponse(200, { post: createdMedia }, 'Post created SuccessFully!..'))

    }


    if (req.files?.GraphSlider) {
        const media = await mediaModel.create({
            __typename: 'GraphSlider',
            shortcode: UniqueString().substring(0, 10),
            caption,
            location,
            is_multipleImages: true,
            sidecar_to_children: req.files?.GraphSlider?.map((file) => {
                return {
                    __typename: 'GraphImage',
                    shortcode: UniqueString().substring(0, 10),
                    media_imgUrl: file?.path,
                    owner: {
                        _id: owner_id,
                        username: owner_username
                    }
                }
            }),
            hashTags: hashTags.split(' '),
            is_video: false,
            owner: {
                ownerId: owner_id,
                username: owner_username
            }
        })

        const createdMedia = await mediaModel.findById(media._id);

        if (!createdMedia) {
            throw new ApiError(500, 'Something went wrong when creating Post!..')
        }

        res.
            status(200)
            .json(new ApiResponse(200, { post: createdMedia }, 'Post created SuccessFully!..'))
    }
})

export const updateMedia = asyncHandler(async (req, res) => {

    const { caption, hashTags } = req.body;
    const _id = req.params?._id;

    if (!_id) {
        throw new ApiError(401, 'Someting went wrong when Updating post!..');
    }

    const updatedPost = await mediaModel.findByIdAndUpdate({ _id }, {
        caption,
        hashTags: hashTags.split(' ')
    })

    if (!updatedPost) {
        throw new ApiError(401, 'Someting went wrong when Updating post!..');
    }

    res.status(200)
        .json(new ApiResponse(200, { post: updatedPost }, 'Post Updated Successfully!'))
})

export const deleteMedia = asyncHandler(async (req, res) => {

    const _id = req.params?._id;

    if (!_id) {
        throw new ApiError(401, 'Something went wrong when Deleting Post!..')
    }

    const deletedPost = await mediaModel.findByIdAndDelete(_id);

    if (!deletedPost) {
        throw new ApiError(401, 'Something went wrong when Deleting Post!..')
    }

    res.status(200).json(new ApiResponse(200, { post: deletedPost }, 'Post Deleted Successfully!..'))
})

export const featchMediaById = asyncHandler(async (req, res) => {

    const _id = req.params._id;

    if (!_id) {
        throw new ApiError(401, 'Post is Not Avilable!..');
    }

    const post = await mediaModel.findById({ _id });

    if (!post) {
        throw new ApiError(401, 'Post is Not Avilable!..');
    }

    res.status(200).json(new ApiResponse(200, { post }, 'Post featched Successfully!..'))

})

export const featchMediaByShortcode = asyncHandler(async (req, res) => {

    const shortcode = req.params.shortcode;

    if (!shortcode) {
        throw new ApiError(401, 'Post is Not Avilable!..');
    }

    const post = await mediaModel.findOne(
        {
            $or: [
                {'sidecar_to_children.shortcode': shortcode},
                {'shortcode': shortcode}
            ]
        }
    )

    if (!post) {
        throw new ApiError(401, 'Post is Not Avilable!..');
    }

    res.status(200).json(new ApiResponse(200, { post }, 'Post featched Successfully!..'))

})

