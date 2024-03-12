import mongoose, { Schema } from "mongoose";


const ownerSchmea = new mongoose.Schema({
    ownerId: {type: Schema.Types.ObjectId, ref: "Users"},
    username: {type: String, required: true, index: true, ref: 'Users'}
}, { _id : false })

const commentSchema = new mongoose.Schema({
    content: {type: String, required: true},
    mediaId: {type: Schema.Types.ObjectId, ref: "Medias"},
    owner: ownerSchmea

}, {timestamps: true});


const commentModel = mongoose.model('Comments', commentSchema);

export {commentModel};