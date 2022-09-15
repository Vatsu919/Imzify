import React from 'react'
import { useSelector } from 'react-redux'
import Post from '../Post/post';
import Navbar from '../Navbar/Navbar';

function SavedPostList() {
    const savedposts = useSelector(state=> state.savedposts);
    console.log("saveddd posts:   ",savedposts);
    return (
        <>
            <Navbar />
                <div className="flex flex-col w-full md:w-9/12 xl:w-6/12 mx-auto z-0">
                    

                    <div className="font-semibold mt-20 text-3xl text-gray-700 text-opacity-75 text-center py-2 border-b-2 border-gray-400 rounded-sm">Saved Posts</div>
                    <div className="mx-auto mt-10"> 
                    <div className="mt-4">
                    {(savedposts.length>0)?savedposts.map(post => <Post post={post} key={post._id} />):<p className='font-medium'>No Posts to show</p>}
                    </div>
            
                    </div>
                </div>
        </>
    )
}

export default SavedPostList