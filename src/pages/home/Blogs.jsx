import React from 'react';
import BlogsCard from '../../components/blogs/BlogsCard';

const Blogs = () => {

const data =[
    {},
    {},
    {},
    {},
    {},
    {},
    {}
]

    return (
        <div className='py-20'>
            <h1 className='text-5xl text-center font-bold my-10 dark:text-white'>Blogs Section</h1>
            <div className='grid md:grid-cols-2 gap-5'>
            {
    data.slice(0,4).map(n=> <BlogsCard></BlogsCard>)
}
   
            </div>
     </div>
    );
};

export default Blogs;