import React from 'react';
import FileBase64 from 'react-file-base64';

const PostForm = () => {

    const getFiles = (files) => {
        console.log(files);
      }
    
    return ( 
        <>
            
                <FileBase64 onDone={ getFiles } />
            
        </>
     );
}
 
export default PostForm;