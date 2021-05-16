import React,{useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import { getPosts } from '../actions/postActions.js';
import Loading from './Loading/loading.jsx';
import Navbar from './Navbar/Navbar';
import PostList from './PostList/PostList';


const Home = () => {

    
    const dispatch = useDispatch();
    const posts = useSelector(state => state.posts);

    useEffect(() => {
        dispatch(getPosts());
    },dispatch)
    
    return ( 
        <div>
        {(posts.length===0)?(<Loading />):(
            <>
            
            <Navbar />
            <PostList />
            </>
            
        )}
       
        
        </div>
     );
}
 
export default Home;