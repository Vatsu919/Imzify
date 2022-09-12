import Mongoose  from 'mongoose';
import PostModel from '../models/postModel.js';
import User from '../models/userModel.js';
import Comment from '../models/commentModel.js';


export const getPosts = async (req,res) => {
    try {
        //console.log("posts mangi che");
        var mySort = {createdAt:-1};
        const postList = await PostModel.find().populate('user').sort(mySort);
        //console.log(postList);
        

        res.status(200).json(postList);
        
       

    } catch (error) {
        res.status(404).json({message:error.message});
    }
}

export const getUserPosts = async (req,res) => {
    try {
        const {userid} = req.params; 
        var mySort = {createdAt:-1};
        const postList = await PostModel.find({user: userid}).populate('user').sort(mySort);

        res.status(200).json(postList);
    }
    catch(error)
    {
        res.status(404).json({message:error.message});
    }
}
export const getPost = async (req,res) => {
    const {id}=req.params;
    console.log("In getPost: ",id);
    try {
        const Post = await PostModel.findById(id).populate('user').populate({path:'comments',populate: {path:'user'}});
        console.log(Post);
        res.status(200).json(Post);
    } catch (error) {
        res.status(404).json({message:error.message});
    }
}

export const removePost = async (req,res) => {
    const {id} = req.params;

    try{
        const result = await PostModel.findByIdAndDelete(id);
        res.status(200).json({message:"successfully deleted"});

    }catch (error) {
        console.log(error);
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
    const updatedPost=await PostModel.findByIdAndUpdate(id,post,{new:true}).populate('user').populate({path:'comments',populate:{path:'user'}});
    
    //updatedPost.populate('user').populate('comments');
    console.log("updatedPost",updatedPost);
    res.json(updatedPost);

}

export const toggleSavedPosts = async (req,res) => {
    const id = req.userId;
    const post = req.body;

    try{
        const user = await User.findById(id).populate('savedPosts');

        const index = user.savedPosts.find(spost => spost._id===post._id);

        if(index==-1)
        {
            user.savedPosts.push(post);
        }
        else
        {
            user.savedPosts = user.savedPosts.filter(spost => spost._id!==post._id);
        }
        const nuser = await User.findByIdAndUpdate(id,user,{new: true}).populate('savedPosts');
        res.status(200).json(nuser);
    }catch(err)
    {
        console.log(err);
    }

}