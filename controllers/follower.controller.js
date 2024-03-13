import { followerModle } from "../models/follower.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";



export const followUser = asyncHandler(async (req, res)=>{

    const {followerId, followingId} = req.body;
    
    if(followerId.trim() === '' || followingId.trim() === ''){
        throw new ApiError(401, 'All fileds are required!..');
    }

    if(followerId === followingId){
        throw new ApiError(402, "You can't follow this user!..");
    }

    // check user alredy follwed this user
    const alredyFollwed = await followerModle.findOne({
        followerId, followerId
    })

    // user already followed this user unfollow it
    if(alredyFollwed){
        const deleteFollower = await followerModle.findOneAndDelete({_id: alredyFollwed._id});

        if(!deleteFollower){
            throw new ApiError(501, 'Something went wrong when unfollow user!..');
        }

        return res.status(200).json(new ApiResponse(200, {removedFollwer: deleteFollower}, 'User unfollow succesfully!..'));
    }

    // follow user
    const follow = await followerModle.create({
        followerId, followingId
    })

    if(!follow){
        throw new ApiError(501, 'Something went wrong when follow user!..');
    }

     res.status(200).json(new ApiResponse(200, {followedUser: follow}, 'User followed succesfully!..'));

})