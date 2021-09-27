import {React,useEffect,useState} from 'react';
import { useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { createPost } from '../../actions/postActions';
import './style.css';


const PostForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
    const [formData,setformData] = useState({
      image: null,
      caption: '',
      createdAt: Date()
    });
    /*const getFiles = (files) => {
        console.log(files);
        setformData({...formData,image: files.base64 });
        
    }*/

    const handleChange = (e) => {
      setformData({...formData,[e.target.name]: e.target.value});
    }

    const handleFileChange = (e) => {
     
      setformData({...formData,image: e.target.files[0]});
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      
      setformData({...formData,createdAt: new Date()});
      const form = new FormData();
      form.append('image',formData.image);
      form.append('createdAt',formData.createdAt);
      form.append('caption',formData.caption);
      console.log(form);
      console.log(history);
      dispatch(createPost(form,history));
      
    }
    
    
    return ( 
        <>
        
        <div className="container bg-white w-8/12 xl:w-5/12 mx-auto rounded border border-opacity-50 mt-16 p-4 border-black">
        <div className="text-center text-3xl font-medium text-gray-800 mb-3">Create Post</div>
        <form action="/action_page.php" className="text-gray-700 text-base font-medium" onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="">
            <label  for="image">Image:</label>
          
          </div>

          <div class="mt-1 flex justify-center mb-2 px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div class="space-y-1 text-center">
                  <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <div class="text-sm text-gray-600">
                    {(formData.image)?(<p className='text-green-600 hover:text-green-600 font-normal'>Image uploaded</p>):''}
                    <label for="file-upload" class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                      
                      <span>{(formData.image==null)?'Upload a file:':'Select some other image' }</span>
                     
                      <input type="file" className="form-control-file" label="Image" onChange={handleFileChange} id="file-upload" name="image" class="sr-only" />
                    </label>
                    
                  </div>
                  {(formData.image)?'':(
                    <p class="text-xs text-gray-500">
                    PNG, JPG, GIF 
                    </p>
                  )}
                  
                </div>
          </div>
            


          
          <div className="my-1">
            <label for="caption">Caption:</label>
            <input className="flex-1 block w-full rounded sm:text-sm py-1 border border-gray-300" onChange={handleChange} type="text" id="caption" name="caption" />
          </div>
            

          <div className="flex justify-center">
            <input className="py-1 px-2 rounded-sm bg-blue-500 text-white" type="submit" value="Submit" />
          </div> 
         
        </form>


        </div>
        </>
     );
}
 
export default PostForm;