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

import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

 
const TABLE_HEAD = ["Users","Action","Instructor", ];
 

 
const AllUsers=()=> {




const navigate = useNavigate();
const [axiosSecure] = useAxiosSecure();



const {data: users=[] , refetch} = useQuery({
    queryKey:['users'],
    queryFn: async ()=> {
        const res= await axiosSecure.get('/admin/all-users')
        return res.data ;
    }
})
//handle Approve

const handleInstructorRole= (id,name)=>{




    axiosSecure.put(`/admin/all-users/${id}`, {Nowrole: 'instructor'} ).then((res)=> {
      Swal.fire(`${name} is Now Instructor`, '', 'success');
      refetch()
    }
  
    )


}

const handleMakeAdmin= (id,name)=>{

  axiosSecure.put(`/admin/all-users/${id}`, {Nowrole: 'admin'} ).then((res)=> {
    Swal.fire(`${name} is Now Admin`, '', 'success');
    refetch()
  }

  )
}


//handle handle 
const handleDelete =(id)=>{

  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      axiosSecure.delete(`/admin/delete-users/${id}`).then((res)=> {
        console.log(res);
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        refetch();
      })   
    }
  })
}



  return ( <>
  <h1 className="text-3xl font-bold px-8 py-4">All users</h1>
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
            {users.map(({ _id,name,email,image,role }, index) => {
              const isLast = index === users.length - 1;
              const classes = isLast ? "p-4" : "p-4 w-25 border-b border-blue-gray-50";
5
              return (
                <tr key={name}>
                  <td className={classes}>
                  <div className="flex items-center gap-4">
        <Avatar src={image} alt={name} />
        <div>
          <Typography variant="h6">{name}</Typography>
          <Typography variant="small" color="gray" className="font-normal">{email}</Typography>
        </div>
      </div> 
                  </td>
               
               
                

                  <td className={classes}>
                    <div className="w-max flex gap-3">
               { role=='user' ? <>  <button onClick={()=>handleInstructorRole(_id,name)}  className="" >
                      <Chip
                        variant="ghost"
                        size="sm"
                        value={'Make Instructor'}
                        color={'gray-blue'}
                      />
                </button>
                  <button onClick={()=>handleMakeAdmin(_id,name)}   className="" >
                      <Chip
                        variant="ghost"
                        size="sm"
                        value={'Make Admin'}
                        color={'green'}
                      />
                </button> </>:""}

                { role=='admin' ? <>  <button disabled   className="" >
                      <Chip
                        variant="outlined"
                        size="sm"
                        value={'Admin'}
                        color={'gray-blue'}
                      />
                </button>
                  </>:""}
                { role=='instructor' ? <>  <button disabled  className="" >
                      <Chip
                        variant="outlined"
                        size="sm"
                        value={'Instructor'}
                        color={'green'}
                      />
                </button>
                  </>:""}
               
               
                  
                     
                    
                    </div>
                  </td>
                  <td className={classes}>
                   
                   <Tooltip content="View Profile">
                     <IconButton variant="text" color="blue-gray">
                       <EyeIcon className="h-4 w-4" />
                     </IconButton>
                   </Tooltip>
                   <Tooltip content="Delet User">
                     <IconButton onClick={()=>handleDelete(_id)} variant="text" color="blue-gray">
                       <TrashIcon className="h-4 w-4" />
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
    </>
  );
}

export default AllUsers;