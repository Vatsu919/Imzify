import Mongoose  from 'mongoose';
import PostModel from '../models/postModel.js';
import User from '../models/userModel.js';
import Comment from '../models/commentModel.js';


export const getPosts = async (req,res) => {
    try {
        console.log("posts mangi che");
        var mySort = {createdAt:-1};
        const postList = await PostModel.find().populate('user').populate('comments').sort(mySort);
        console.log(postList);
        

        res.status(200).json(postList);
        
       

    } catch (error) {
        res.status(404).json({message:error.message});
    }
}

export const createPost = async (req,res) => {
    const post = req.body;
    
  
    post.image=req.file.filename;
    console.log(req.userId);
    try {
        const user = await User.findById(req.userId);
        post.user=user;
        post.creator = user.username;
        
    } catch (error) {
        console.log(error);
    }
    console.log(post);
    const newPost = new PostModel(post);

    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({message: error.message});
        
    }
}

export const likePost = async (req,res) => {
    const {id} = req.params;
    
    if(!req.userId) return res.json({message:"Unauthenticated"});

    if(!Mongoose.Types.ObjectId.isValid(id))return res.status(404).send(`No post with given id was found!!`);

    
    const post = await PostModel.findById(id);
    console.log("like wadi post :",post);
    const index = post.likes.findIndex(id => id===String(req.userId));

    if(index === -1)
    {
        post.likes.push(req.userId);
    }
    else
    {
        post.likes = post.likes.filter(id => id!==String(req.userId));
    }

    const updatedPost = await PostModel.findByIdAndUpdate(id,post,{new:true}).populate('user').populate('comments');
   // updatedPost.populate('user').populate('comments');
    console.log("Updated one",updatedPost);

    res.json(updatedPost);
}

export const commentPost = async (req,res) => {
    const {id} =req.params;
    const {text}=req.body;
    if(!req.userId) return res.json({message:"Unauthenticated"});
    
    if(!Mongoose.Types.ObjectId.isValid(id))return res.status(404).send(`No post with given id was found!!`);
    const post=await PostModel.findById(id);
    console.log("text is: ",text);
    const comment = new Comment({text,user:req.userId});
    console.log(comment);
    try{
        await comment.save();
    }
    catch(error){
        console.log(error);
    }
    post.comments.push(comment);
    const updatedPost=await PostModel.findByIdAndUpdate(id,post,{new:true}).populate('user').populate('comments');
    
    //updatedPost.populate('user').populate('comments');
    console.log("updatedPost",updatedPost);
    res.json(updatedPost);

}