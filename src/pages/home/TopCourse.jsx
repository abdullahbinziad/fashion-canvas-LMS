import React from 'react';
import CourseCard from '../../components/course/CourseCard';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const TopCourse = () => {

const {data: course=[], refetch} = useQuery({
 queryKey:['course'],
 queryFn: async ()=> {
    const res= await axios.get(' https://fashion-canvas-institute-server.vercel.app/courses');
    return res.data
 }
})

console.log(course);
const filterdData = course.filter(n=> n.Nowstatus =='approved')

    return (
        <div className='grid md:grid-cols-4 gap-3'>
            {
filterdData.slice(0,5).map((n,index)=> <div className={` p-1 h-full ${index==0 ? 'md:col-span-2 md:row-span-2 ':''}`}> <CourseCard content ={n} index={index}></CourseCard></div>)
            }
        </div>
    );
};

export default TopCourse;