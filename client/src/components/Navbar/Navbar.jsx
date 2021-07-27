import React from 'react';
import './style.css';
import {useSelector} from 'react-redux';
import {useDispatch } from 'react-redux';
import {FLASH_MESSAGE, LOGOUT} from '../../constants/index.js';

const Navbar = () => {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch({type:FLASH_MESSAGE,payload:{message:'Successfully Logged out',mtype:'success'}});
        dispatch({type:LOGOUT});
    }

    return ( 
        <div className="w-full bg-white h-14 z-50 border-b border-gray-300 fixed top-0">
            <div className="w-11/12 md:w-9/12 xl:w-6/12 mx-auto flex">
                <div className="text-4xl h-14 pt-2 nav-head">Insta-clone</div>
                
                <div className="ml-auto my-auto"> <button className="ml-4 py-1 px-2 bg-yellow-500 text-white rounded" onClick={handleLogout}> Logout </button></div>
            </div>

        </div>
     );
}
 
export default Navbar;