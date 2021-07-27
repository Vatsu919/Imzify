import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    image: String,
    caption: String,
    creator: String,
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    likes: {
        type: [String],
        default:[]
    },
    createdAt : {
        type: Date,
        default: new Date()
    }
});

const postModel = mongoose.model("PostModel",postSchema);

export default postModel;