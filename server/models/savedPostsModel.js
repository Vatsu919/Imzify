import mongoose from 'mongoose';

const savedPostsSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    savedposts: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'PostModel',
        default: []
    }

});

const SavedPostsModel = mongoose.model('savedPosts',savedPostsSchema);

export default SavedPostsModel;