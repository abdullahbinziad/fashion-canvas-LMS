import React from 'react';
import logo from './../../assets/logo.png'
import {  format } from 'date-fns'
import { Link } from 'react-router-dom';

const Header = () => {

  return (
    <div>
     <div className=' bg-white flex justify-between w-full h-16 fixed z-10'>
     <Link to="/">
<img className='w-20 mx-10 my-3' src={logo} alt="" /> </Link>
<h3 className='text-gray-600 my-4 mx-10 text-xl font-semibold'>Today : {format(new Date(), 'yyyy-MM-dd')}</h3>
     </div>
    </div>
  );
};

export default Header;