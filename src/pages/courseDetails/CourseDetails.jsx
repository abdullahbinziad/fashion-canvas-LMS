

import React from 'react';
import { Link, useLoaderData} from 'react-router-dom';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Avatar,
    Button,
  } from "@material-tailwind/react";
  import { CheckIcon } from "@heroicons/react/24/outline";


const CourseDetails = () => {


  //condition to ,,is this product is already in card ??

  
    const loaderData = useLoaderData();
  
    const {_id,image,courseTitle,totalSeats,courseOutline,coursePrice,courseDuration,InstructorEmail,InstructorName,InstructorImage,Enrolled} = loaderData;
//the handle add to cart 




  
    return (
        <div className="flex gap-10 my-40 w-3/4 mx-auto">
     <div className='w-3/4 mx-auto'>
<div>
    <img src={image} alt="" />
</div>
<div className='space-y-4 my-10'>
    <h1 className='text-2xl font-bold'>Course Title: {courseTitle}</h1>
    <h1 className='text-2xl font-bold'>Instructor:</h1>
   
    <div className="flex items-center gap-4">
        <Avatar src={InstructorImage} alt={InstructorName} variant="rounded" />
        <div>
            
          <Typography variant="h6">{InstructorName}</Typography>
          
          <Typography variant="small" color="gray" className="font-normal">{InstructorEmail}</Typography>
        </div>
      </div>
   
</div>
     </div>
     <div className=' w-96'>

     <Card color="blue" variant="gradient" className="w-full max-w-[20rem] p-8">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 mb-8 rounded-none border-b border-white/10 pb-8 text-center"
      >
     
      </CardHeader>
      <CardBody className="p-0">
        <ul className="flex flex-col gap-4">
          <li className="flex items-center gap-4">
            <span className="rounded-full border border-white/20 bg-white/20 p-1">
              <CheckIcon strokeWidth={2} className="h-3 w-3" />
            </span>
            <Typography className="font-normal">5 team members</Typography>
          </li>
          <li className="flex items-center gap-4">
            <span className="rounded-full border border-white/20 bg-white/20 p-1">
              <CheckIcon strokeWidth={2} className="h-3 w-3" />
            </span>
            <Typography className="font-normal">200+ components</Typography>
          </li>
          <li className="flex items-center gap-4">
            <span className="rounded-full border border-white/20 bg-white/20 p-1">
              <CheckIcon strokeWidth={2} className="h-3 w-3" />
            </span>
            <Typography className="font-normal">40+ built-in pages</Typography>
          </li>
          <li className="flex items-center gap-4">
            <span className="rounded-full border border-white/20 bg-white/20 p-1">
              <CheckIcon strokeWidth={2} className="h-3 w-3" />
            </span>
            <Typography className="font-normal">1 year free updates</Typography>
          </li>
          <li className="flex items-center gap-4">
            <span className="rounded-full border border-white/20 bg-white/20 p-1">
              <CheckIcon strokeWidth={2} className="h-3 w-3" />
            </span>
            <Typography className="font-normal">Life time technical support</Typography>
          </li>
        </ul>
      </CardBody>
      <CardFooter className="mt-12 p-0 space-y-3">
        <Button  
          size="lg"
          color="white"
          className="text-blue-500 hover:scale-[1.02] focus:scale-[1.02] active:scale-100"
          ripple={false}
          fullWidth={true}
        > <Link >  Satrt Learning</Link>
         
        </Button>
   
      </CardFooter>
    </Card>


   
    
     </div>
    </div>
    );
};

export default CourseDetails;