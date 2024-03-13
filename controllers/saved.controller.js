import { savedModel } from "../models/saved.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


export const saveMedia = asyncHandler(async (req, res) => {

    const { owner_id, owner_username } = req.body;
    const mediaId = req.params.mediaId;

    if (mediaId.trim() === '' || owner_id.trim() === '' || owner_username.trim() === '') {
        throw new ApiError(401, 'All fileds are requrid!..');
    }

    // check user laredy saved this post
    const isMediaSaved = await savedModel.findOne({
        mediaId,
        owner: {
            ownerId: owner_id,
            username: owner_username
        }
    });

    // post is alredy saved unsave it
    if (isMediaSaved) {
        const deleteSavedMedia = await savedModel.findByIdAndDelete({ _id: isMediaSaved._id });

        if (!deleteSavedMedia) {
            throw new ApiError(501, 'Something went wrong when unSave Post!..');
        }

        return res.status(200).json(new ApiResponse(200, { unSavedPost: deleteSavedMedia }, 'Post unSaved Succesfully!..'))
    }

    // save post
    const save = await savedModel.create({
        mediaId,
        owner: {
            ownerId: owner_id,
            username: owner_username
        }
    });

    if (!save) {
        throw new ApiError(501, 'Something went wrong when Save Post!..');
    }

    res.status(200).json(new ApiResponse(200, { savedPost: save }, 'Post Saved Succesfully!..'))
})