import React,{useState} from 'react';
import {Redirect, useHistory} from 'react-router-dom';
import eye from './icons/eye.svg';
import invisible from './icons/invisible.svg';
import {useDispatch,useSelector} from 'react-redux';
import {signin,signup} from '../../actions/authActions.js';
import FileBase64 from 'react-file-base64'; 
import resizebase64 from 'resize-base64';


const Auth = () => {

    const [isSignup,setIsSignup] = useState(false);
    const [isVisible,setIsVisible] = useState(false);
    const [isFocus,setIsFocus] =useState(false);
    const [formData,setFormData] = useState({
        username: '',
        password: '',
        fullname: '',
        profilepic: ''
    });
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    const handleSwap = (e) => {
        e.preventDefault();
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setIsVisible(false);
    }

    const handlePassword = (e) => {
        e.preventDefault();
        
        setIsVisible((prevIsVisible) => !prevIsVisible);
        
    }

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        
        if(isSignup)
        {
            dispatch(signup(formData,history));
        }
        else
        {
            dispatch(signin(formData,history));
        }
        
        
    }

    const handleFocus = () => {
        setIsFocus(true);
    }
    const handleBlur = () => {
        setIsFocus(false);
    }

    const getFiles = (files) => {
        console.log(files);
        
        resizeImage(files.base64,150,150).then(result => {setFormData({...formData,profilepic: result });}); 
        
        
        
    }

    function resizeImage(base64Str, maxWidth , maxHeight ) {
        return new Promise((resolve) => {
          let img = new Image()
          img.src = base64Str
          img.onload = () => {
            let canvas = document.createElement('canvas')
            const MAX_WIDTH = maxWidth
            const MAX_HEIGHT = maxHeight
            let width = img.width
            let height = img.height
      
            if (width > height) {
              if (width > MAX_WIDTH) {
                height *= MAX_WIDTH / width
                width = MAX_WIDTH
              }
            } else {
              if (height > MAX_HEIGHT) {
                width *= MAX_HEIGHT / height
                height = MAX_HEIGHT
              }
            }
            canvas.width = width
            canvas.height = height
            let ctx = canvas.getContext('2d')
            ctx.drawImage(img, 0, 0, width, height)
            resolve(canvas.toDataURL())
          }
        })
    }
    console.log(isFocus);
    return (
        <>
       
        <div className="h-auto max-w-md mx-auto mt-32 rounded-sm border border-gray-300 border-opacity-50 " style={{'backgroundColor':'rgba(var(--d87,255,255,255),1)'}}>
        <div className="mt-3 text-4xl text-center h-14 pt-2 nav-head">Insta-clone</div>
        <form onSubmit={handleSubmit}>
            {(isSignup)?<div className="mt-3 text-center text-3xl font-medium text-gray-800 mb-3 nav-head">Sign up</div>:<div className="mt-3 text-center text-3xl font-medium text-gray-800 mb-3 nav-head">Sign in</div> }
            
           
            {(isSignup) && (
                <>
                <div class="mt-2 flex justify-center mb-4 px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md w-72 mx-auto">
                    <div class="space-y-1 text-center">
                        <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <div class="flex text-sm text-gray-600">
                            <label for="file-upload" class="relative bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                            <span>Upload a profile pic: </span>
                            
                            <FileBase64 onDone = {getFiles} className="text-sm" />
                            </label>
                            
                        </div>
                        <p class="text-xs text-gray-500">
                            PNG, JPG, GIF 
                        </p>
                    </div>
                </div>

                <div className="w-full text-center my-2">
                    <input className="bg-gray-50 border border-gray-400 border-opacity-50 py-1.5 px-4 rounded-sm text-sm placeholder-gray-400::placeholder" value={formData.fullname} placeholder="Full Name" onChange={handleChange} type='text' name='fullname' />
                </div>
                </>


            )}
            
            
            <div className="w-full text-center my-2">
                <input className="bg-gray-50 border border-gray-400 border-opacity-50 py-1.5 px-4 rounded-sm text-sm placeholder-gray-400::placeholder" value={formData.username} placeholder="Username" onChange={handleChange} type='text' name='username' />
            </div>
                
            <div className="w-full text-center mb-4">
                <div className="relative">
                    <input onFocus={handleFocus} onBlur={handleBlur} className="bg-gray-50 border border-gray-400 border-opacity-50 py-1.5 px-4 rounded-sm text-sm placeholder-gray-400::placeholder" value={formData.password} placeholder="Password" onChange={handleChange} type={(isVisible)?'text':'password'} name='password' />
                    <img src={invisible} onClick={handlePassword} className={ `h-6 w-6 ${(isVisible && isFocus)?'opacity-1':'opacity-0'}` } style={{'position':'absolute','top':'15%','left':'68%','transition':'opacity 0.25s'}} />
                    <img src={eye} onClick={handlePassword} className={ `h-6 w-6 ${(isVisible || !isFocus)?'opacity-0':'opacity-1'}` } style={{'position':'absolute','top':'15%','left':'68%','transition':'opacity 0.25s'}} />
                </div>
                

            </div>

            <div className="text-center mb-6">
                <input className="px-24 py-1 bg-blue-500 text-white font-medium" type="submit" value={(isSignup)?('sign up'):('sign in')} />
            </div>
            
            
            
            
        </form>
        </div> 

        <div className="h-auto max-w-md mx-auto mt-4 rounded-sm bg-white border border-gray-300 border-opacity-50 text-center py-4">
            {(isSignup)?'Already have an account? ':'Not yet registered? '}
            <button className="text-blue-600" onClick={handleSwap}>{(isSignup)?'Sign in':'Sign up'}</button>
        </div>

        
        </>
     );
}
 
export default Auth;