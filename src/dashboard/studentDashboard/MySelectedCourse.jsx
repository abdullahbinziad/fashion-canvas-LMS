import React from 'react';
import useCart from '../../hooks/useCart';
import { Button, Card, Typography } from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';
 
const TABLE_HEAD = ["Course", "Instructor", "Price", ""];
 
const TABLE_ROWS = [
  {
    name: "John Michael",
    job: "Manager",
    date: "23/04/18",
  },
  {
    name: "Alexa Liras",
    job: "Developer",
    date: "23/04/18",
  },
  {
    name: "Laurent Perrier",
    job: "Executive",
    date: "19/09/17",
  },
  {
    name: "Michael Levi",
    job: "Developer",
    date: "24/12/08",
  },
  {
    name: "Richard Gran",
    job: "Manager",
    date: "04/10/21",
  },
];
 

const MySelectedCourse = () => {

    const nevigate = useNavigate()
    const [ cart, refetch] = useCart() ; 
    console.log(cart);
    const total = cart.reduce((sum, item) => sum + item.coursePrice, 0);
    const price = parseFloat(total.toFixed(2))

    console.log(price);
    return (
        <div>
            <h1 className='text-2xl font-bold py-6'>My Selected Course in Cart : {cart.length}</h1>
            <Card className=" h-full w-full">
           <div className='flex p-3 items-center gap-4 justify-end'>
       
          
           </div>
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {cart.map(({ courseTitle, InstructorName, coursePrice, courseId}, index) => {
            const isLast = index === TABLE_ROWS.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
 
            return (
               
              <tr key={index}>
                <td className={classes}>
                    
                  <Typography variant="h6" color="blue-gray" className="font-normal">
                    {courseTitle}
                  </Typography>
                </td>
                <td className={`${classes} bg-blue-gray-50/50`}>
                  <Typography variant="h6" color="blue-gray" className="font-normal">
                    {InstructorName}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography variant="h6" color="blue-gray" className="font-normal">
                    {coursePrice}
                  </Typography>
                </td>
                <td className={`${classes} bg-blue-gray-50/50`}>
                <Button onClick={()=>nevigate(`/payments/course/${courseId}`) } size='sm' color="red">Pay Now</Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
        </div>
    );
};

export default MySelectedCourse;