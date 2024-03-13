import { shareModel } from "../models/shared.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const shareMedia = asyncHandler(async (req, res)=>{

    const {sharedBy_id, sharedBy_username, sharedTo_id, sharedTo_username} = req.body;
    const mediaId = req.params.mediaId;

    if(sharedBy_id?.trim() === '' || sharedBy_username?.trim() === '' || sharedTo_id?.trim() === '' || sharedTo_username?.trim() == '' || mediaId?.trim() === ''){
        throw new ApiError(401, 'All fileds are requird!..');
    }

    const share = await shareModel.create({
        mediaId,
        sharedBy: {
            ownerId: sharedBy_id,
            username: sharedBy_username
        },
        sharedTo: {
            ownerId: sharedTo_id,
            username: sharedTo_username
        }
    });

    if(!share){
        throw new ApiError(501, 'Something went wrong when sharing Post!..');
    }

    res.status(200).json(new ApiResponse(200, {sharedPost: share}, 'Post Shared!..'))
})