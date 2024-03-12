import { v2 as cloudinary } from "cloudinary";
import fs from "fs"

cloudinary.config({
    cloud_name: 'ds4oab76k',
    api_key: '833634127544837',
    api_secret: 'lSyJP7rbHggUte1vpl9quz-pTIs'
});

console.log('cloude name: ', process.env.CLOUDINARY_CLOUD_NAME);
console.log('apikey: ', process.env.CLOUDINARY_API_KEY);
console.log('apisecret: ', process.env.CLOUDINARY_API_SECRET);


export const uploadOnCloudinary = async (localFilePath) => {

    try {
        // checkout loaclfilepath is empty
        if (!localFilePath) return null

        // upload file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath);

        // return cloudinary uploaded file url
        return response;
    }
    catch (error) {
        console.log('file uploading: ', error);
        return null;
    }
}

