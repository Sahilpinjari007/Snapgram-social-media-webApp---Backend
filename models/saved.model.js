import mongoose, { Schema } from "mongoose";


const ownerSchmea = new mongoose.Schema({
    ownerId: {type: Schema.Types.ObjectId, ref: "Users"},
    username: {type: String, required: true, index: true, ref: 'Users'}
}, { _id : false })


const savedSchema = new mongoose.Schema({
    mediaId: { type: Schema.Types.ObjectId, ref: 'Medias' },
    owner: ownerSchmea
})

const savedModel = mongoose.model('SavedMedia', savedSchema);

export { savedModel };