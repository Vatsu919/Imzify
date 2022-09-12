import React,{useState} from 'react';
import './style.css';
import overlayHeart from './icons/overlayHeart.svg'
import commentImage from './icons/speech-bubble.svg';
import send from './icons/send.svg';
import bookmark from './icons/bookmark.svg';
import smile from './icons/smile.svg';
import {useSelector} from 'react-redux';
import Moment from 'react-moment';
import Like from '../common/like';
import threeDot from './icons/threedot.svg';
import {useDispatch} from 'react-redux';
import { commentPost, likePost,getPost, getSelectedUserPosts, removePost } from '../../actions/postActions.js';
import { Link } from 'react-router-dom';
import { CANCEL_FETCH, CLEAR_SELECTEDUSER_POSTS, DESELECT_USER } from '../../constants';






const BASE_URL = 'http://localhost:5000/images';

const Post = ({post}) => {

    
    const user = useSelector(state => state.user); 
    const dispatch = useDispatch();

    const [popup, setPopup] = useState(false);
    const [comment,setComment]=useState({text:""});
    const [like,setLike] = useState(post.likes.find(like => like===String(user.authData.result._id)));
    const [likeCount,setLikeCount] = useState(post.likes.length);
    const [visible,setVisible] = useState(false);

    console.log(comment.text);
    
    const handleLikeToggle = (postid) => {
        if(!like)
        {
            setLikeCount((prevLikeCount) => prevLikeCount+1);
        }
        if(like)
        {
            setLikeCount((prevLikeCount) => prevLikeCount-1);
        }
        setLike((prevLike) => !prevLike);
        dispatch(likePost(postid));

        setVisible(true);
        window.setTimeout(() => {
            setVisible(false);
        },1000)
    }

    const handleComment = (postid,comment) => {
        dispatch(commentPost(postid,comment));
        setComment({text:""});
    }

    const handleDoubleClick = (postid) => {
        if(!like)
        {
            setLike((prevLike) => !prevLike);
            dispatch(likePost(postid));
        }

        setVisible(true);
        window.setTimeout(() => {
            setVisible(false);
        },1000)
        
    }
    console.log("post:  ",post.user._id);
    console.log("Userrr: ",user.authData.result._id);
    return ( 
       
            <div className="rounded-sm bg-white border border-gray-300 box-border mt-4 min-h-96 md:w-98">
                
                <div className="px-3 pt-2 pb-2 w-full border-b border-gray-300 flex">
                <Link className='flex' onClick={()=> {dispatch({type:CLEAR_SELECTEDUSER_POSTS});dispatch({type:DESELECT_USER});dispatch(getSelectedUserPosts(post.user._id,post.user))}} to={"/"+post.user._id+"/"}>
                    <img className="w-12 h-12 rounded-full border border-gray-300 border-opacity-50 shadow-sm object-cover" src={post.user.profilepic}  />
                    <div className="text-base my-auto mx-3 font-medium">{post.creator}</div>
                </Link>
                {(user?.authData.result._id===post.user._id) &&   
                <div className='ml-auto mt-3'><img className='h-6 w-6 cursor-pointer' onClick={() => setPopup(!popup)} src={threeDot} />
                {popup && 
                    <div className='absolute bg-white flex-col border border-gray-200 border-opacity-50 shadow-sm p-2 z-50 w-auto'>
                    <div className='border-bottom border-gray-200 border-opacity-50 shadow-sm cursor-pointer' onClick={()=> dispatch(removePost(post._id))}>Delete</div>
                    </div>}
                </div>}
                </div>
                
                
                {/* <div className={(visible)?"bg-blue-200 fixed top-1/2 left-1/2 opacity-75 visible transform scale-105 transition delay-75":"bg-blue-300 fixed opacity-75 invisible"}><div className="h-20 w-20 "><img src={overlayHeart} className="" /></div></div>  */}
                

                <img className="box-border w-full max-h-100 object-cover" src={`${BASE_URL}/${post.image}`} onDoubleClick={() => handleDoubleClick(post._id)}  />
                <div className="mt-3 ml-3 pb-2 flex gap-4">
                   
                    <Like liked={like} onLikeToggle={() => handleLikeToggle(post._id)} />
                    <div><Link to={"/"+post._id+"/comments"}><img className="h-6 w-6" src={commentImage} /></Link></div>
                    <div><img className="h-6 w-6" src={send} /></div>
                    <div className="ml-auto mr-3"><img className="h-6 w-6" src={bookmark} /></div>
                </div>
                <div className="ml-3 mb-2 font-medium text-sm">{likeCount} likes</div>
                <div className="ml-3 flex">
                    <div className="font-medium">{post.creator}</div>
                    <div className="ml-2">{post.caption} </div>
                </div>
                <div className='text-xs text-gray-500 my-2 mx-3'>
                    <Moment fromNow>{post.createdAt}</Moment>
                </div>
                <div className="border-t border-gray-300 border-opacity-50">
                    <div className="mx-3 py-3 flex gap-2">
                        <div ><img className="h-8 w-8" src={smile} /></div>
                        <input type='text' name="text" onChange={(e)=>{ setComment({text: e.target.value})}} value={comment.text} className="text-gray-500 text-sm h-8 w-full border border-gray-300" placeholder="Add a comment..." />
                        
                        <button onClick={()=> handleComment(post._id,comment)} className="ml-auto text-blue-500 hover:text-blue-600 font-medium h-8">Post</button>
                    </div>
                
                    
                </div>
            </div>
    
     );
}
 
export default Post;