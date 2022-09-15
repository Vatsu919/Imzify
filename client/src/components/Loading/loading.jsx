import React from 'react';
import instagram from './icons/instagram.svg';

const Loading = () => {
    return ( 
        <h1>
            <div className="h-16 w-16 mx-auto mt-96">
                <img alt="logo" src={instagram} />
            </div>
        </h1>
     );
}
 
export default Loading;