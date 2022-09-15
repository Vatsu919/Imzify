

import * as api from '../api';
import {FETCH_ALL,CREATE_POST, FLASH_MESSAGE, LIKE_POST, LOGOUT, COMMENT_POST, FETCH_ONE, SUCCEEDED, UPDATED, FETCH_SELECTEDUSER_POSTS, DESELECT_USER, SELECT_USER, CLEAR_SELECTEDUSER_POSTS, REMOVE_SELECTEDUSER_POST, REMOVE_POST, GET_SAVED_POSTS, REMOVE_FROM_SAVED_POSTS, ADD_TO_SAVED_POSTS} from '../constants/index.js';

export const getPosts =  () => async (dispatch) => {
    try {
        const {data} = await api.getPosts();
        
        dispatch({type:SUCCEEDED});
        dispatch({type: FETCH_ALL,payload:data});
    } catch (error) {
        console.log(error);
    }
    
    
}

export const removePost = (id) => async (dispatch) => {
    try{
        console.log("inside removePost: ",id);
        const result = await api.removePost(id);
        console.log("svfdvdfvdfvdf");
        dispatch({type:REMOVE_SELECTEDUSER_POST,payload:id});
        dispatch({type:REMOVE_POST,payload:id});
    }catch(error) {
        console.log(error);
    }
}

export const getSelectedUserPosts = (userid,user) => async (dispatch) => {
    try {
        
        const {data} = await api.getSelectedUserPosts(userid);
        console.log("In getSelectedUserPosts ,Selecteduser is: ",user);
        dispatch({type:SELECT_USER,payload:user});
        
        dispatch({type: FETCH_SELECTEDUSER_POSTS,payload:data});
    } catch (error) {
        console.log(error);
    }
}
export const getPost = (id) => async (dispatch) => {
    try {
        const {data} = await api.getPost(id);
        console.log("In getPost: ",data)
        dispatch({type: FETCH_ONE,payload:data});
    } catch (error) {
        console.log(error);
    }
}

export const createPost = (post,history) => async (dispatch) => {
    try {
        const {data} = await api.createPost(post);
        console.log(history);
        
        dispatch({type:UPDATED});
        dispatch({type: CREATE_POST,payload:data});
        
        history.push('/');
        
        
    } catch (error) {
        console.log(error);
        dispatch({type:FLASH_MESSAGE,payload: {message:'Token expired.Please login again',mtype:'error'}});
        dispatch({type:LOGOUT});
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        const {data} = await api.likePost(id);
        dispatch({type: LIKE_POST,payload:data});
    } catch (error) {
        console.log(error.toJSON());

        dispatch({type:FLASH_MESSAGE,payload: {message:'Token expired.Please login again',mtype:'error'}});
        dispatch({type:LOGOUT});
    }
}

export const commentPost = (id,comment) => async (dispatch) => {
    try{
        const {data} = await api.commentPost(id,comment);
        dispatch({type: COMMENT_POST,payload:data});
    }
    catch(error){
        console.log(error.toJSON());
    }
}

export const getSavedPosts = () => async (dispatch) => {
    try{
        
        const {data} = await api.getSavedPosts();
        console.log("saved Posts: ",data);
        data.reverse();
        dispatch({type: GET_SAVED_POSTS,payload: data});
    }
    catch(err)
    {
        console.log(err);
    }
}

export const toggleSavedPosts = (post,isPresent) => async (dispatch) => {
    try{

        const {data} = await api.toggleSavedPosts(post);

        if(isPresent)
        {
            dispatch({type:REMOVE_FROM_SAVED_POSTS,payload: post});
        }
        else
        {
            dispatch({type:ADD_TO_SAVED_POSTS,payload: post});
        }
    }catch(err)
    {
        console.log(err);
    }
}