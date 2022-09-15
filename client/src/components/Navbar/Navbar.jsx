import React from 'react';
import './style.css';
// import {useSelector} from 'react-redux';
import {useDispatch } from 'react-redux';
import {FLASH_MESSAGE, IDLE, LOGOUT} from '../../constants/index.js';
import { Link } from 'react-router-dom';
import bookmark from '../Post/icons/bookmark.svg';
import logout from '../common/icons/logout.svg';

const Navbar = () => {
    // const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch({type:FLASH_MESSAGE,payload:{message:'Successfully Logged out',mtype:'success'}});
        dispatch({type:IDLE});
        dispatch({type:LOGOUT});
    }

    return ( 
        <div className="w-full bg-white h-14 z-50 border-b border-gray-300 fixed top-0">
            <div className="w-11/12 md:w-9/12 xl:w-6/12 mx-auto flex">
                <div className="w-full text-3xl sm:text-4xl h-14 pt-2 nav-head"><Link to="/">Insta-clone</Link></div>
                <div className="w-full flex justify-end mt-3">
                    <div className="mr-2 md:mr-4"> <Link to="/savedposts" className=""> <img alt="saved" src={bookmark} className="h-6 w-6" /> </Link></div>
                    <div className="ml-2 md:ml-4"><Link to='/' onClick={handleLogout}> <img alt="logout" src={logout} className="cursor-pointer h-6 w-6" /></Link></div>
                </div>
            </div>

        </div>
     );
}
 
export default Navbar;