import { userModel } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken';

export const verifyJWT = asyncHandler(async (req, res, next) =>{

    const incomingAccessToken = req.cookies.accessToken || req.header('Authorization')?.replace('Bearer ', '');

    try{

        if(!incomingAccessToken){
            throw new ApiError(401, "Unauthorized request!..");
        }

        // decode token 
        const decodedToken = jwt.verify(incomingAccessToken, process.env.ACCESS_TOKEN_SECRET);

        // get user
        const user = await userModel.findById(decodedToken?._id).select("-password -refreshToken");

        if(!user){
            throw new ApiError(401, 'Invalid access token!');
        }

        req.user = user;
        next();
    }
    catch(error){
        throw new ApiError(401, error?.message || 'Invalid access Token!..')
    }
})