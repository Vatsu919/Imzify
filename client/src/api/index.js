import axios from 'axios';

const API = axios.create({baseURL: 'http://localhost:5000'});

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile'))
    {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
        

    }

    return req;
})

const config = {
    headers: {
        'content-type': 'multipart/form-data'
    }
}

export const getPosts = () => API.get("/posts");

export const createPost = (post) => API.post("/posts",post,config);
export const likePost = (id) => API.patch(`/posts/${id}/likepost`);
export const commentPost = (id,comment) => API.post(`/posts/${id}/comment`,comment);

export const signin = (formData) => API.post("/auth/signin",formData);
export const signup = (formData) => API.post('/auth/signup',formData);