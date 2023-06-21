import React from 'react';
import { Bounce, Zoom } from 'react-awesome-reveal';

const BlogsCard = () => {
   
   
    return (
<Bounce delay={500}>
      <div className="flex flex-col dark:bg-fcDark rounded-md  justify-center ">
        <div className="relative  flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 w-full md:max-w-3xl mx-auto border border-white dark:border-fcDark bg-white dark:bg-fcDark ">
          <div className="w-full md:w-1/3   dark:bg-fcDark bg-white grid place-items-center">
            <img src="https://images.pexels.com/photos/4381392/pexels-photo-4381392.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="tailwind logo" className="rounded-xl" />
          </div>
          <div className="w-full md:w-2/3 bg-white  dark:bg-fcDark flex flex-col space-y-2 p-3">
          
            <h3 className="font-black text-gray-800 dark:text-blue-gray-100  text-xl">The Majestic and Wonderful Bahamas</h3>
            <p className=" text-gray-500 text-base">The best kept secret of The Bahamas is the country’s sheer
              size and diversity. With 16 major islands, The Bahamas is an unmatched destination</p>
            <p className="text-xl font-black text-gray-800 dark:text-blue-gray-100">
              $110
              <span className="font-normal text-gray-600 text-base">/night</span>
            </p>
          </div>
        </div>
      </div>
      </Bounce>
    
    );
};

export default BlogsCard;