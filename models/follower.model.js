import mongoose, { Schema } from "mongoose";


const followerSchema = new mongoose.Schema({
    followerId: {type: Schema.Types.ObjectId, ref: "Users"},
    followingId: {type: Schema.Types.ObjectId, ref: "Users"}
});

const followerModle = mongoose.model('followers', followerSchema);

export {followerModle};