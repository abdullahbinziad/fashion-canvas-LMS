import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Avatar,
    Tooltip,
    Chip,
  } from "@material-tailwind/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useCart from "../../hooks/useCart";
import UseAuth from "../../hooks/UseAuth";
import { Fade, Zoom } from "react-awesome-reveal";

   
const CourseCard=({index,content})=> {

  const { _id,image,courseTitle,courseOutline,coursePrice,courseDuration,InstructorEmail,InstructorName,InstructorImage,Enrolled } = content;
const{user} = UseAuth();
  const [, refetch] = useCart();
  const navigate = useNavigate();
  const location = useLocation();

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
     <Link to={`/enroll/course/${_id}`}>    <Zoom delay={500} > <Card className="dark:bg-fcDark dark:text-white relative h-full overflow-hidden">
     
        <CardHeader
          className="m-0 rounded-none "
        >
             <Chip className="absolute bottom-0 right-0 text-white rounded-sm" color="red" variant="" value={`${Enrolled} Enrolled` } />
          <img
          className={`${index == 0 ?'w-full':'w-full '}`}
            src={image}
            alt={courseTitle}
          />
        </CardHeader>
        <div className="p-4 hidden md:inline-block">
         <h1 className="text-xl font-semibold">{courseTitle} </h1>
           
          
        { index==0 && <Typography variant="lead" color="gray" className="mt-3 font-normal">
           {courseOutline.slice(0,120)}
          </Typography>
    }
        </div>
        <div className="flex px-5 py-2 items-center justify-between align-middle">
     
          <div className="flex items-center gap-2">
         
            <Tooltip content="Instructor">
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
          <ShoppingBagIcon onClick={()=>handleAddToCart(content)} className="w-12  hover:bg-fcBtn hover:text-white p-3 rounded-md  "></ShoppingBagIcon>
          <Typography className="font-semibold px-2">${coursePrice}</Typography>
         </div>
        </div>
      </Card>
      </Zoom>
      </Link>
    );
  }

  export default CourseCard;