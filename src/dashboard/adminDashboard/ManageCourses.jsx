import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon,TrashIcon,EyeIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,

  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import useMyCourses from "../../hooks/useMyCourses";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

 
const TABLE_HEAD = ["Thumbnail","Course","Instructor", "Enrolled ",  "Status"];
 

 
const ManageCourses=()=> {
const navigate = useNavigate();
const [axiosSecure] = useAxiosSecure();



const {data: courses=[] , refetch} = useQuery({
    queryKey:['courses'],
    queryFn: async ()=> {
        const res= await axiosSecure.get('/courses')
        return res.data ;
    }
})
//handle Approve

const handleApproved=(id)=>{

    axiosSecure.put(`/admin/courses/${id}`, {Nowstatus: "approved"} ).then((res)=> 
   
    refetch()
    )


}
//handle Deny
const handleDeny = async (id)=>{

    const { value: text } = await Swal.fire({
        input: 'textarea',
        inputLabel: 'Message',
        inputPlaceholder: 'Type your message here...',
        inputAttributes: {
          'aria-label': 'Type your message here'
        },
        showCancelButton: true
      })
      
      if (text) {
        Swal.fire({ icon: 'success',
        title: 'The Course Denied SuccessFully',}).then(res=>{

            axiosSecure.put(`/admin/courses/${id}`, {Nowstatus: "denied",adminMesage: text} ).then((res)=> 
   
            refetch()
            )

        })
      }



   


}



  return (
    <Card className="h-full w-full">
    
      <CardBody className=" px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th key={head} className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
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
            {courses.map(({ _id,InstructorEmail,InstructorName,Enrolled,Nowstatus,image,courseTitle,totalSeats,courseOutline,coursePrice,courseDuration,adminMesage }, index) => {
              const isLast = index === courses.length - 1;
              const classes = isLast ? "p-4" : "p-4 w-25 border-b border-blue-gray-50";
5
              return (
                <tr key={name}>
                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      <Avatar variant="square" src={image} alt={courseTitle} size="xxl" />
                   
                    </div>
                  </td>
                  <td className={`${classes} w-48 `}>
                    <div className="flex flex-col">
                      
                      <Typography
                        variant="h6"
                        color="blue-gray"
                        className="font-normal    opacity-70"
                      >
                 <p>  {courseTitle} </p>
                 <span> Price:   ${coursePrice} </span>
                      </Typography>
                    </div>
                  </td>
                  <td className={classes}>
                    <div className="flex flex-col">
                      
                      <Typography
                        variant="h6"
                        color="blue-gray"
                        className="font-normal opacity-70 "
                      >
                          <p>  {InstructorName} </p>
                 <span> {InstructorEmail} </span>
                      </Typography>
                    </div>
                  </td>
                  <td className={classes}>
                    <Typography variant="h6" color="blue-gray" className="font-normal ">
                      {Enrolled}
                    </Typography>
                  </td>

                  <td className={classes}>
                    <div className="w-max flex gap-3">
               { Nowstatus=='pending' ? <>  <button onClick={()=>handleApproved(_id)}  className="" >
                      <Chip
                        variant="ghost"
                        size="sm"
                        value={'Approve Now'}
                        color={'gray-blue'}
                      />
                </button>
                  <button onClick={()=>handleDeny(_id)}   className="" >
                      <Chip
                        variant="ghost"
                        size="sm"
                        value={'Deny Now'}
                        color={'amber'}
                      />
                </button> </>:""}

                { Nowstatus=='approved' ? <>  <button disabled   className="" >
                      <Chip
                        variant="ghost"
                        size="sm"
                        value={'Approved'}
                        color={'gray-blue'}
                      />
                </button>
                  </>:""}
                { Nowstatus=='denied' ? <>  <button disabled  className="" >
                      <Chip
                        variant="ghost"
                        size="sm"
                        value={'Denied'}
                        color={'red'}
                      />
                </button>
                  </>:""}
               
               
                  
                     
                    
                    </div>
                  </td>
                  
                  <td className={classes}>
                   
                    <Tooltip content="View Course">
                      <IconButton onClick={()=> nevigate(`/enroll/course/${_id}`)} variant="text" color="blue-gray">
                        <EyeIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                   
                   
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardBody>
     
    </Card>
  );
}

export default ManageCourses;