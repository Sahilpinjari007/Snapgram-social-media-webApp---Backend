import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { userModel } from '../models/user.model.js';
import jwt from 'jsonwebtoken'



const genrateAccessAndRefreshToken = async (userId) => {

    const user = await userModel.findById(userId);

    const refreshToken = user.genrateRefreshToken();
    const accessToken = user.genrateAccessToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { refreshToken, accessToken };

}


export const register = asyncHandler(async (req, res) => {

    const { email, fullname, username, password } = req.body;

    // checking data validation
    if (email.trim() === '' || fullname.trim() === '' || username.trim() === '' || password.trim() === '') {
        throw new ApiError(400, 'All fileds requrid!..')
    }

    // checking user already exists or not
    const existedUser = await userModel.findOne({
        $or: [{ username }, { email }]
    });

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists!")
    }

    const user = await userModel.create({
        email,
        username: username.toLowerCase(),
        fullname,
        password: password,
    })

    // removing password and refreshToken field from response
    const createdUser = await userModel.findById(user._id).select('-password -refreshToken');

    if (!createdUser) {
        throw new ApiError(500, 'Something wen wrong when registering the user!..')
    }

    res.status(200).json(new ApiResponse(200, { user: createdUser }, 'user registerd Successfuly!..'))

})

export const login = asyncHandler(async (req, res) => {

    const { username, email, password } = req.body;

    // data validation is empty?
    if (username.trim() === '' || email.trim() === '' || password.trim() === '') {
        throw new ApiError(400, 'All fileds are requird!..')
    }

    // check user is exists or not with this username and email
    const existedUser = await userModel.findOne({
        $or: [{ username }, { email }]
    })

    if (!existedUser) {
        throw new ApiError(409, 'user is not Avialble with this username or email!..');
    }

    //password check
    const isPasswordValid = await existedUser.isPasswordCorrect(password)

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials")
    }

    const { refreshToken, accessToken } = await genrateAccessAndRefreshToken(existedUser._id);

    const createdUser = await userModel.findById(existedUser._id).select("-password -refreshToken");

    const option = {
        httpOnly: true,
        secure: true
    }

    res
        .status(200)
        .cookie('refreshToken', refreshToken, option)
        .cookie('accessToken', accessToken, option)
        .json(
            new ApiResponse(200, { user: createdUser }, 'user login Successfully!..')
        )
})

export const logout = asyncHandler(async (req, res) => {

    await userModel.findByIdAndUpdate(req.user._id,
        {
            $unset: {
                refreshToken: 1 // it is remove refreshToken filed from document
            }
        },
        {
            new: true
        }
    )

    const option = {
        httpOnly: true,
        secure: true
    }

    res
        .status(200)
        .clearCookie('refreshToken', option)
        .clearCookie('accessToken', option)
        .json(new ApiResponse(200, 'user loged out!..'))
})

export const changePassword = asyncHandler(async (req, res) => {

    const {oldPassword, newPassword} = req.body;

    if(oldPassword.trim() === '' || newPassword.trim() === ''){
        throw new ApiError(400, 'All fileds are requird!..')
    }

    if(oldPassword === newPassword){
        throw new ApiError(401, 'old password same with new password!..');
    }

    const user = await userModel.findById(req?.user._id);

    const validPassword = user.isPasswordCorrect(oldPassword);

    if(!validPassword){
        throw new ApiError(401, 'Invalid old password!..');
    }

    user.password = newPassword;
    await user.save({validateBeforeSave: false});

    res
    .status(200)
    .json(new ApiResponse(200, {}, 'Password Changed Successfuly!..'))
})

export const forgetPassword = asyncHandler(async (req, res) => {
    res.send('forgate password!');
})




export const refreshAccessToken = asyncHandler(async (req, res) => {

    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorized Request");
    }

    try {
        // decode incomminToken
        const decodeToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);

        const user = await userModel.findById(decodeToken._id);

        if (!user) {
            throw new ApiError(401, 'Invalid refresh token!..')
        }

        if (user.refreshToken !== incomingRefreshToken) {
            throw new ApiError(401, 'Refresh Token is used or Expird!..')
        }

        const { refreshToken, accessToken } = await genrateAccessAndRefreshToken(user._id);

        const option = {
            httpOnly: true,
            secure: true
        }

        res.
            status(200)
            .cookie('refreshToken', refreshToken, option)
            .cookie('accessToken', accessToken, option)
            .json(
                new ApiResponse(
                    200, { refreshToken, accessToken }, "Access token refreshed!"
                )
            )
    }
    catch (error) {
        throw new ApiError(500, error.email || 'Invalid refresh Token!..')
    }
})