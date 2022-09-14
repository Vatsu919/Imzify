import Mongoose  from 'mongoose';
import PostModel from '../models/postModel.js';
import User from '../models/userModel.js';
import Comment from '../models/commentModel.js';
import SavedPostsModel from '../models/savedPostsModel.js';


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

export const getSavedPosts = async (req,res) => {
    const id = req.userId;
    const userInstance = Mongoose.Types.ObjectId(id);
    
    // console.log(id);
    try{
        const result = await SavedPostsModel.findOne({user:userInstance}).populate({path:'savedposts',populate:{path:'user',model: 'User'}});
        
        // console.log("resulttt ",result);
        if(result)
        {
            res.status(200).json(result.savedposts);
        }
        else
        {
            res.status(200).json([]);
        }
    }catch(err)
    {
        console.log(err);
    }
}

export const toggleSavedPosts = async (req,res) => {
    const id = req.userId;
    const post = req.body;
    const userInstance = Mongoose.Types.ObjectId(id);
    const postInstance = Mongoose.Types.ObjectId(post._id)
    try{

        var result = await SavedPostsModel.findOne({user: userInstance}).populate('savedposts');
        
        if(result)
        {
            console.log(result.savedposts);
            
            const index = result.savedposts.findIndex(spost => String(spost._id)===String(post._id));
            console.log("index : ",index);
            if(index!==-1)
            {
                result.savedposts = result.savedposts.filter(spost => String(spost._id)!==String(post._id));
            }
            else
            {
                result.savedposts.push(post);
            }
        }
        else
        {
            result = await SavedPostsModel.create({user: userInstance});
            result.savedposts.push(post);
        }
        const final = await SavedPostsModel.findByIdAndUpdate(result._id,result,{new:true});
       // console.log(final)
        res.status(200).json({message: "Successfully toggled save post",result: final});
        
    }catch(err)
    {
        console.log(err);
    }

}