import './global.css'
import React from 'react';

const Banner = ({title, desc}) => {
    return <div className='banner_sect'>
        <h1>{title}</h1>
        <p>{desc}</p>
    </div>;
}

export default Banner;