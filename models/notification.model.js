import mongoose from "mongoose";


const notificationSchema = new mongoose.Schema({
    commentId: {},
    commentLikdeId: {},
    mediaId: {},
    mediaLikedId: {},
    savedId: {},
    sharedId: {},
    followId: {},
    notifyTo: {},
    notifyBy: {}
})