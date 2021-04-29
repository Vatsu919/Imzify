import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    image: String,
    caption: String,
    creator: String,
    createdAt : {
        type: Date,
        default: new Date()
    }
});

const postModel = mongoose.model("PostModel",postSchema);

export default postModel;