import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import Loading from '../Loading/loading';
import Navbar from '../Navbar/Navbar';
import SingleComment from './SingleComment';

const Comment = () => {
    const BASE_URL = 'http://localhost:5000/images';
    let {postid} = useParams();
    const posts = useSelector(state=>state.posts);
    console.log(postid);
    const post=posts.find(post => post._id===postid);
    console.log("Post is:",post);
    
    return ( 
        <>
            <Navbar />
            <div className="bg-white mt-20 w-11/12 md:w-9/12 xl:w-6/12 mx-auto flex">
                <div className="w-8/12">
                    <img className="h-100 box-border object-cover" src={`${BASE_URL}/${post.image}`} />
                </div>

                <div className="overflow-y-auto h-100">
                    <div className="flex gap-2 py-3 mx-3 border-b border-gray-300 border-opacity-80">
                        <div className="">
                            <img className="h-14 w-14 rounded-full border border-gray-100 shadow-sm" src={post.user.profilepic} />

                        </div>
                        <div className="">
                            <div className="text-base font-semibold inline mr-1">{post.user.username}</div>
                            <div className="text-base inline">{post.caption}</div>

                        </div>
                    </div>
                    {(posts.length===0)?<Loading />:post.comments.map(comment => <SingleComment comment={comment} />)}
                </div>
            </div>
        </>
     );
}
 
export default Comment;