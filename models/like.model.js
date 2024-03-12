import mongoose, { Schema } from "mongoose";

const ownerSchmea = new mongoose.Schema({
    ownerId: { type: Schema.Types.ObjectId, ref: "Users" },
    username: { type: String, required: true, index: true, ref: 'Users' }
}, { _id: false })

const likeSchema = new mongoose.Schema({
    mediaId: { type: Schema.Types.ObjectId, ref: "Medias" },
    commentId: { type: Schema.Types.ObjectId, ref: "Comments" },
    likedBy: ownerSchmea
}, { timeStamp: true })


const likeModel = mongoose.model('Likes', likeSchema);

export { likeModel };