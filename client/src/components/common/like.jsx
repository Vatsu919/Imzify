import React from 'react';
import eheart from './icons/eheart.svg';
import heart from './icons/heart.svg';

const Like = ({liked,onLikeToggle}) => {
    var src = (liked) ? (heart) : (eheart);
    return ( 
        <div><img className={(liked)?"h-6 w-6 cursor-pointer transform scale-110 transition delay-100":"h-6 w-6 cursor-pointer transition delay-100"} src={src} onClick={onLikeToggle} /></div>
     );
}
 
export default Like;