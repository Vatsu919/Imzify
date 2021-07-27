import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import Loading from '../Loading/loading';
import Navbar from '../Navbar/Navbar';

const Comment = () => {
    let {postid} = useParams();
    const posts = useSelector(state=>state.posts);
    console.log(postid);
    const post=posts.find(post => post._id===postid);
    console.log("Post is:",post);
    
    return ( 
        <>
            <Navbar />
            {(posts.length===0)?<Loading />:post.comments.map(comment => <p className="pt-40">{comment.text}</p>)}
        </>
     );
}
 
export default Comment;