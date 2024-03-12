import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";



const ownerSchmea = new mongoose.Schema({
    ownerId: {type: Schema.Types.ObjectId, ref: "Users"},
    username: {type: String, required: true, index: true, ref: 'Users'}
}, { _id : false })


const sidecar_to_childrenSchema = new mongoose.Schema({
    __typename: {type: String},
    shortcode: {type: String, unique: true, index: true},
    media_imgUrl: {type: String},
    owner: ownerSchmea
})


const mediaSchema = new mongoose.Schema({
    __typename: {type: String, default: 'GraphImage'},
    shortcode: {type: String, unique: true, required: true, index: true},
    caption: { type: String, length: 100, index: true },
    location: { type: String, length: 100, index: true },
    is_multipleImages: { type: Boolean },
    sidecar_to_children: [sidecar_to_childrenSchema],
    media_imgUrl: {type: String},
    hashTags: [{ type: String }],
    is_video: {type: Boolean},
    media_videoUrl: {type: String},
    views: {type: Number},
    owner: ownerSchmea
}, {
    timestamps: true
})

mediaSchema.plugin(mongooseAggregatePaginate);

export const mediaModel = mongoose.model('Medias', mediaSchema);