import React from 'react';

const SingleComment = ({comment}) => {
    return (  
        <div className="flex gap-2 py-3 mx-3">
            <div className="">
                <img className="h-14 w-14 rounded-full border border-gray-100 shadow-sm" src={comment.user.profilepic} />

            </div>
            <div className="">
                <div className="text-base font-semibold inline mr-1">{comment.user.username}</div>
                <div className="text-base inline">{comment.text}</div>

            </div>
        </div>
    );
}
 
export default SingleComment;