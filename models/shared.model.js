import mongoose, { Schema } from "mongoose";


const ownerSchmea = new mongoose.Schema({
    ownerId: { type: Schema.Types.ObjectId, ref: "Users" },
    username: { type: String, required: true, index: true, ref: 'Users' }
}, { _id: false })


const shareSchame = new mongoose.Schema({
    mediaId: { type: Schema.Types.ObjectId, ref: 'Medias' },
    sharedBy: ownerSchmea,
    sharedTo: ownerSchmea
})

const shareModel = mongoose.model('Shares', shareSchame);

export { shareModel };