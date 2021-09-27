import React from 'react';
import { useSelector } from 'react-redux';
import Loading from '../Loading/loading';
import Navbar from '../Navbar/Navbar';
import Post from '../Post/post';

const UserProfile = () => {
    const selectedUser = useSelector(state => state.selecteduser );
    const selectedUserPosts = useSelector(state => state.selecteduserposts);
    console.log("selectedUser: ",selectedUser);
    return ( 
        <>
        {(selectedUser==null)?<Loading />:(
            <>
                <Navbar />
                <div className="mt-20 flex flex-col w-full md:w-9/12 xl:w-6/12 mx-auto z-0">
                    <div className="flex">
                    <img className="w-24 h-24 mt-4 rounded-full border border-gray-300 border-opacity-50 shadow-sm object-cover my-auto ml-6 ring ring-white" src={selectedUser.profilepic} />
                    <div className="flex flex-col justify-center mt-6 ml-3">
                        <div className="text-2xl font-medium">
                            {selectedUser.username}
                        </div>
                        <div className="text-xl text-gray-500 text-opacity-75">
                            {selectedUser.fullname}
                        </div>
                    </div>
                    </div>

                    <div className="font-semibold mt-10 text-3xl text-gray-700 text-opacity-75 text-center py-2 border-b-2 border-gray-400 rounded-sm">Posts</div>
                    <div className="mx-auto mt-10"> 
                    <div className="mt-4">
                    {(selectedUserPosts.length>0)?selectedUserPosts.map(post => <Post post={post} key={post._id} />):<p className='font-medium'>No Posts to show</p>}
                    </div>
            
                    </div>
                </div>
            </>
        )}
            
        </> 
    );
}
 
export default UserProfile;