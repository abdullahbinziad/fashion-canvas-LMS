import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import AllCourseCard from '../../components/course/AllCourseCard';

const AllCourse = () => {

const {data: course=[], refetch} = useQuery({
 queryKey:['course'],
 queryFn: async ()=> {
    const res= await axios.get(' https://fashion-canvas-institute-server.vercel.app/courses');
    return res.data
 }
})

console.log(course);


    return (
        <div className='py-20 w-5/6 mx-auto mt-6'>
            <h1 className='text-center  text-5xl font-bold py-10'>All Courses</h1>
        <div className='grid md:grid-cols-4 gap-3'>
            {
course.map((n,index)=> <div className={` p-1 h-full `}> <AllCourseCard content ={n} index={index}></AllCourseCard></div>)
            }
        </div>
        </div>
    );
};

export default AllCourse;