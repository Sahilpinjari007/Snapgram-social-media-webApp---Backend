import mongoose, { Schema, mongo } from "mongoose";



const ownerSchmea = new mongoose.Schema({
    ownerId: { type: Schema.Types.ObjectId, ref: "Users" },
    username: { type: String, required: true, index: true, ref: 'Users' }
}, { _id: false })

const notificationSchema = new mongoose.Schema({
    likedMediaId: {type: Schema.Types.ObjectId, ref: "Likes"},
    commentedMediaId: {type: Schema.Types.ObjectId, ref: "Comments"},
    sharedMediaId : {type: Schema.Types.ObjectId, ref: "SavedMedia"},
    savedMediaId: {type: Schema.Types.ObjectId, ref: "SavedMedia"},
    likedCommentId: {type: Schema.Types.ObjectId, ref: "Likes"},
    followedUserId: {type: Schema.Types.ObjectId, ref: "Followers"},
    content: {type: String, required: true},
    notifyTo: ownerSchmea,
    notifyBy: ownerSchmea
}, {timestamps: true})

const notificationModel = mongoose.model('Notifications', notificationSchema);

export {notificationModel}