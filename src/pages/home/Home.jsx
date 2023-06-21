import React from 'react';
import Slider from '../../components/slider/Slider';
import TopCourse from './TopCourse';
import TopInstructor from './TopInstructor';
import Contact from '../../components/contact/Contact';
import Blogs from './Blogs';
import Switcher from '../../components/switcherDark/Switcher';

const Home = () => {
    return (
        <div className='w-full  dark:bg-blue-gray-900'>
            <Slider></Slider>
            <h1 className='md:text-5xl text-2xl font-bold md:py-20 py-8  text-center  dark:text-white'>Top Populer Course </h1>
          <div className='w-5/6 mx-auto'>
          <TopCourse></TopCourse>
          
          <TopInstructor></TopInstructor>
          <div className=' hidden md:inline-block '>
          <Contact></Contact>
          </div>
          <Blogs></Blogs>
          </div>

        </div>
    );
};

export default Home;