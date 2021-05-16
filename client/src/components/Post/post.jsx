import React,{useState} from 'react';
import './style.css';
import overlayHeart from './icons/overlayHeart.svg'
import comment from './icons/speech-bubble.svg';
import send from './icons/send.svg';
import bookmark from './icons/bookmark.svg';
import smile from './icons/smile.svg';
import {useSelector} from 'react-redux';
import Moment from 'react-moment';
import Like from '../common/like';
import {useDispatch} from 'react-redux';
import { likePost } from '../../actions/postActions.js';




const BASE_URL = 'http://localhost:5000/images';

const Post = ({post}) => {

    const user = useSelector(state => state.user); 
    const dispatch = useDispatch();
    console.log(user);
    const [like,setLike] = useState(post.likes.find(like => like===String(user.authData.result._id)));
    const [visible,setVisible] = useState(false);

    const handleLikeToggle = (postid) => {
        setLike((prevLike) => !prevLike);
        dispatch(likePost(postid));
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

    console.log(post.likes.filter(like => like===String(user.authData.result._id)));
    return ( 
       
            <div className="relative rounded-sm mx-auto bg-white border border-gray-300 box-border mt-4 w-full">
                <div className="px-3 pt-2 pb-2 w-full border-b border-gray-300 flex">
                    <img className="w-12 h-12 rounded-full border border-gray-300 border-opacity-50 shadow-sm object-cover" src={user.authData.result.profilepic}  />
                    <div className="text-base my-auto mx-3 font-medium">{post.creator}</div>
                </div>
              
                
                <div className={(visible)?"absolute top-80 left-64 opacity-75 visible transform scale-110 transition delay-75":"absolute opacity-75 top-80 left-64 invisible"}><img src={overlayHeart} className="h-20 w-20" /></div>
                

                <img className="box-border post-image w-full object-cover" src={`${BASE_URL}/${post.image}`} onDoubleClick={() => handleDoubleClick(post._id)}  />
                <div className="mt-3 ml-3 pb-2 flex gap-4">
                   
                    <Like liked={like} onLikeToggle={() => handleLikeToggle(post._id)} />
                    <div><img className="h-6 w-6" src={comment} /></div>
                    <div><img className="h-6 w-6" src={send} /></div>
                    <div className="ml-auto mr-3"><img className="h-6 w-6" src={bookmark} /></div>
                </div>
                <div className="ml-3 mb-2 font-medium text-sm">{post.likes.length} likes</div>
                <div className="ml-3 flex">
                    <div className="font-medium">{post.creator}</div>
                    <div className="ml-2">{post.caption} </div>
                </div>
                <div className='text-xs text-gray-500 my-2 mx-3'>
                    <Moment fromNow>{post.createdAt}</Moment>
                </div>
                <div className="border-t border-gray-300 border-opacity-50">
                    <div className="mx-3 py-3 flex gap-4">
                        <div ><img className="h-6 w-6" src={smile} /></div>
                        <div className="text-gray-500 text-sm">Add a comment...</div>
                        <div className="ml-auto text-blue-400 font-medium">Post</div>
                    </div>
                
                    
                </div>
            </div>
    
     );
}
 
export default Post;