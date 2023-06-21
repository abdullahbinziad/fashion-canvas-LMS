import React from 'react';
import image from '../../assets/error.gif'

const ErrorPage = () => {
    return (
        <div className='bg-white w-screen h-screen'>
        <div className="w-100">
 <h1 className="text-6xl text-center font-semibold pt-20">404! Page Not Found </h1>

 <div className="w-3/4 mx-auto flex justify-center">
   <img src={image} alt="" />
 </div>
</div>
   </div>
    );
};

export default ErrorPage;