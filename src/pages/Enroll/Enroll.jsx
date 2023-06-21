

import React, { useState } from 'react';
import { Link, useLoaderData, useLocation, useNavigate } from 'react-router-dom';
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
import useInstructor from '../../hooks/useInstructor';
import useAdmin from '../../hooks/useAdmin';
import useCart from '../../hooks/useCart';
import Swal from 'sweetalert2';
import UseAuth from '../../hooks/UseAuth';
import useEnrolledCourse from '../../hooks/useEnrolledCourse';

const Enroll = () => {
  const{user} = UseAuth();
  const [ isInstructor ] = useInstructor()
  const [ isAdmin ] = useAdmin()
  const [cart, refetch] = useCart();
  const [enrolledCourse] = useEnrolledCourse()

  //condition to ,,is this product is already in card ??

  

  const navigate = useNavigate();
  const location = useLocation();
    const loaderData = useLoaderData();
  
    const {_id,image,courseTitle,totalSeats,courseOutline,coursePrice,courseDuration,InstructorEmail,InstructorName,InstructorImage,Enrolled} = loaderData;
//the handle add to cart 
const findtheData= cart.find(n=> n.courseId==_id) ;
const enrolled= enrolledCourse.find(n=> n._id==_id) ;


const handleAddToCart = (content) => {
  console.log(content);
  if(user && user.email){
      const cartItem = {courseId: _id, courseTitle: courseTitle , coursePrice:parseInt(coursePrice),image:image, email: user?.email ,InstructorName:InstructorName }
      fetch('https://fashion-canvas-institute-server.vercel.app/carts', {
          method: 'POST',
          headers: {
              'content-type': 'application/json'
          },
          body: JSON.stringify(cartItem)
      })
      .then(res => res.json())
      .then(data => {
          if(data.insertedId){
              refetch(); // refetch cart to update the number of items in the cart
              Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: 'Course added on the cart.',
                  showConfirmButton: false,
                  timer: 1500
                })
          }
      })
  }
  else{
      Swal.fire({
          title: 'Please login to Take Course',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Login now!'
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/login', {state: {from: location}})
          }
        })
  }
}






 


  
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
      <h1 className='text-2xl font-bold'>Course Outline: {courseOutline}</h1>
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
        <Typography
          variant="small"
          color="white"
          className="font-normal uppercase"
        >
         Price
        </Typography>
        <Typography
          variant="h1"
          color="white"
          className="mt-6 flex justify-center gap-1 text-7xl font-normal"
        >
          <span className="mt-2 text-4xl">$</span>{coursePrice}{" "}
          
         
        </Typography>
        <Typography className="text-white my-4" variant="h6">Available Seats: {totalSeats-Enrolled}</Typography>
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
        <Button  disabled={ isInstructor || isAdmin || totalSeats-Enrolled===0}
          size="lg"
          color="white"
          className="text-blue-500 hover:scale-[1.02] focus:scale-[1.02] active:scale-100"
          ripple={false}
          fullWidth={true}
        > <Link to={`/payments/course/${_id}`}>  Enroll Now</Link>
         
        </Button>
      { findtheData?.courseId !== _id && <Button onClick={()=>handleAddToCart()}  disabled={ isInstructor || isAdmin }
          size="lg"
          color="white"
          className="text-blue-500 hover:scale-[1.02] focus:scale-[1.02] active:scale-100"
          ripple={false}
          fullWidth={true}
        > 
         Add to Cart
        </Button>}
      </CardFooter>
    </Card>


   
    
     </div>
    </div>
    );
};

export default Enroll;