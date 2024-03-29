import {React,useEffect} from 'react';
import PostForm from './components/PostForm/postForm';
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";
import decode from 'jwt-decode';
import Home from './components/Home';
import Auth from './components/Auth/Auth';
import {useDispatch,useSelector} from 'react-redux';
import {IS_LOGGED_IN,LOGOUT,REMOVE_FLASH_MESSAGE} from './constants/index.js';
import FlashMessage from './components/FlashMessage/flashMessage';
import Comment from './components/Comment/Comment';
import { getPosts, getSavedPosts } from './actions/postActions';
import UserProfile from './components/UserProfile/UserProfile';
import SavedPostList from './components/PostList/SavedPostList';

const App = () => {
    
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const status = useSelector(state => state.poststatus);
   
    useEffect(() => {
        
        if(localStorage.getItem('profile'))
        {
            
            dispatch({type: IS_LOGGED_IN});
            const token = JSON.parse(localStorage.getItem('profile')).token;

            if(token)
            {
                const decoded = decode(token);
                if(decoded.exp*1000 < new Date().getTime())
                {
                    dispatch({type: LOGOUT});
                }
            }
            dispatch(getPosts());
            dispatch(getSavedPosts());
        }
        else
        {
            dispatch({type:LOGOUT});
        }
        
        
    },[localStorage.getItem('profile')]);
    useEffect(()=> {
        if(status==='IDLE' && user.isLoggedIn)
        {
            dispatch(getPosts());
        }
    },[status])
    
    
    window.setTimeout(() => {
        dispatch({type: REMOVE_FLASH_MESSAGE});
    },2000)
    const handleLogout = () => {
        dispatch({type:LOGOUT});
    }

    console.log("Userr" ,user);
    console.log("App ma");
    return ( 
        <>
        <FlashMessage />
        <Router>
            
            <Switch>
            <Route exact path="/" > {(user.isLoggedIn)?<Home />:<Auth />} </Route> 
            <Route exact path="/createPost" component = {PostForm} />
            <Route exact path='/auth' component = {Auth} />
            <Route exact path='/savedposts' children={<SavedPostList /> } />
            <Route exact path='/:postid/comments' children={<Comment />} />
            <Route exact path='/:selecteduserid' children={<UserProfile />} />
            
            </Switch>
        </Router>
        
        </>
    );
}
 
export default App;