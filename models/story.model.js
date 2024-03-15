import mongoose from "mongoose";



const ownerSchmea = new mongoose.Schema({
    ownerId: { type: Schema.Types.ObjectId, ref: "Users" },
    username: { type: String, required: true, index: true, ref: 'Users' }
}, { _id: false })

const StoryViewerSchmea = new mongoose.Schema({
    viewerId: { type: Schema.Types.ObjectId, ref: "Users" },
    viewerUsername: { type: String, required: true, index: true, ref: 'Users' }
}, { _id: false })


const storySchema = new mongoose.Schema({
    storyUrl: {type: String, required: true},
    storyViews: {type: Number, default: 0},
    storyViewers: [StoryViewerSchmea],
    owner: ownerSchmea

}, {timestamps: true})

const storyModel = mongoose.model('Storys', storySchema);

export { storyModel }