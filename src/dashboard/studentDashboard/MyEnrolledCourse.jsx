import { useQuery } from '@tanstack/react-query';
import React from 'react';

import useEnrolledCourse from '../../hooks/useEnrolledCourse';
import { Avatar, Card, CardHeader, Chip, Tooltip, Typography } from '@material-tailwind/react';

import { Link } from 'react-router-dom';

const MyEnrolledCourse = () => {
   const [enrolledCourse,refetch] = useEnrolledCourse()

    return (
        <div>
           <h1 className='text-2xl font-bold my-8'> My Enrolled Course</h1>
          <div className='grid grid-cols-3 gap-3'>
            { enrolledCourse.map(({_id,image,courseTitle,courseOutline,coursePrice,courseDuration,InstructorEmail,InstructorName,InstructorImage,Enrolled},index)=>  <Link to={`/enrolled/course/${_id}`}> <Card className=" relative h-full overflow-hidden">
        
        <CardHeader
          className="m-0 rounded-none"
        >
           
          <img
          className={`${index == 0 ?'w-full':'w-full '}`}
            src={image}
            alt={courseTitle}
          />
        </CardHeader>
        <div className="p-4">
         <h1 className="text-xl font-semibold">{courseTitle} </h1>
           
          
       
        </div>
        <div className="flex px-5 py-2 items-center justify-between align-middle">
     
          <div className="flex items-center gap-2">
         
            <Tooltip content="Candice Wu">
              <Avatar
                size={index ==0 ? "lg": "sm"}
                variant="circular"
                alt={InstructorName}
                src={InstructorImage}
                className="border-2 border-white hover:z-10"
              />
            </Tooltip><Typography className="font-normal">{InstructorName}</Typography>
          </div>
         <div className="flex gap-1 items-center">
          <Typography className="font-semibold px-2">${coursePrice}</Typography>
         </div>
        </div>
      </Card>
      </Link> )
                 
            }
          </div>
        </div>
    );
};

export default MyEnrolledCourse;