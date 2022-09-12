import mongoose from 'mongoose';

import bcrypt from 'bcrypt';

const userSchema = mongoose.Schema({
    profilepic: String,
    fullname: String,
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type:String,
        required: true,
    },
    savedPosts: {
        type: [mongoose.Schema.Types.ObjectId],
        reference: 'PostModel',
        default: []
    }

})

const User = mongoose.model('User',userSchema);


 
export default User;