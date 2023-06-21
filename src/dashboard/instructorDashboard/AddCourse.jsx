import { Input, Textarea } from "@material-tailwind/react";
import axios from "axios";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import UseAuth from "../../hooks/UseAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useInstructor from "../../hooks/useInstructor";

const AddCourse = () => {
  const {user} = UseAuth()
  const [ axiosSecure] = useAxiosSecure();
  const [isInstructor] = useInstructor()
const nevigate = useNavigate();

if(!isInstructor){
    nevigate('/')
}
  // get data

  const { register, handleSubmit, reset } = useForm();

  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const onSubmit = async (data) => {
    console.log(data);

//upload image to img bb
if(previewUrl){
    const formData = new FormData();
    formData.append("image", data.image[0]);
  
    const response = await axios.post(
      "https://api.imgbb.com/1/upload",
      formData,
      {
        headers: {
          "content-type": "multipart/form-data",
        },
        params: {
          key: `${import.meta.env.VITE_IMGBB}`, // Replace with your ImgBB API key
        },
      }
    );
    const imageUrl = response.data.data.url;
    data.image = imageUrl  ;
    console.log(data.image, imageUrl);
  }
  data.InstructorEmail= user.email;
  data.InstructorName= user.displayName;
  data.InstructorImage= user.photoURL;
  data.Enrolled= 0;
  data.Nowstatus= "pending";

//   InstructorEmail,InstructorName,Enrolled,Nowstatus,image,courseTitle,totalSeats,courseOutline,coursePrice,courseDuration

 
//post data to server now


  axiosSecure.post('/instructor/courses', data)
  .then((res) => res.data)
  .then((data) => {
   console.log(data);
   if (data.insertedId) {
    Swal.fire('Course Added Successfully', '', 'success');
    reset()
    setPreviewUrl(null)
  }
  })
  .catch((error) => {
    console.error(error);
   
    // Handle any errors that occur during the request
  });


    }
    




   
  

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);

    const imageUrl = URL.createObjectURL(file);
    setPreviewUrl(imageUrl);
    console.log("Clicked");
  };

  return (
    <div>
      <div className="  ">
        <h1 className="text-left mb-3 text-2xl font-semibold">
          {" "}
          This is course add page
        </h1>
        <div className="p-10 flex  gap-8 mx-auto shadow-sm bg-white rounded-lg">
          <div className="flex flex-col items-center ">
            <div className="form-control w-full   ">
              <div className="avatar">
                <div className="w-60 min-h-[240px]  rounded-xl">
                  {previewUrl ? (
                    <img
                      className=" object-contain w-64 h-64 "
                      src={previewUrl}
                      alt="Preview"
                    />
                  ) : (
                    <img
                      className="object-contain "
                      src="https://flxtable.com/wp-content/plugins/pl-platform/engine/ui/images/image-preview.png"
                      alt="Preview"
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="form-control w-60 pb-4 ">
              <div class="flex w-full  items-center justify-center bg-grey-lighter">
                <div className="overflow-hidden bg-fcBtn relative w-64 mt-4 mb-4">
                  <button className="bg-blue hover:bg-blue-light text-white font-bold py-2 px-4 w-full inline-flex items-center">
                    <svg
                      fill="#FFF"
                      height={18}
                      viewBox="0 0 24 24"
                      width={18}
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M0 0h24v24H0z" fill="none" />
                      <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z" />
                    </svg>
                    <span className="ml-2">Select Course Image</span>
                    <input
                      className="cursor-pointer absolute block py-2 px-4 w-full opacity-0 pin-r pin-t"
                      type="file"
                      name="documents[]"
                      accept="image/*"
                      onChangeCapture={handleImageChange}
                      required
                      {...register("image")}
                    />
                  </button>
                </div>
              </div>

              <input className="hidden" />
            </div>
          </div>
          <div className="w-full">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-3 my-3"
              action=""
            >
              <div className="grid grid-cols-2 gap-x-4 gap-y-10">
                <div className="form-control w-full ">
                  <Input
                    variant="static"
                    label="Title"
                    placeholder="Course Title"
                    {...register("courseTitle")}
                    type="text"
                    className="input py-5 w-full bg-doctor-login-input"
                  />
                </div>

                <div className="form-control w-full ">
                  <Input
                    variant="static"
                    label="Seats"
                    placeholder="Total Seats"
                    {...register("totalSeats")}
                    type="number"
                    className="input py-5 w-full bg-doctor-login-input"
                  />
                </div>

                <div className="form-control w-full col-span-2 ">
                  <Textarea
                    variant="static"
                    label="Course Outline"
                    placeholder="Describe the Course Outline"
                    {...register("courseOutline")}
                    type="text"
                    className="input py-5 w-full bg-doctor-login-input"
                  />
                </div>

                <div className="form-control w-full ">
                  <Input
                    variant="static"
                    label="Price"
                    placeholder="Course Price"
                    {...register("coursePrice")}
                    type="number"
                    className="input py-5 w-full bg-doctor-login-input"
                  />
                </div>

                <div className="form-control w-full ">
                  <Input
                    variant="static"
                    label="Duration"
                    placeholder="Course Duration"
                    {...register("courseDuration")}
                    type="text"
                    className="input py-5 w-full bg-doctor-login-input"
                  />
                </div>

                <div className="form-control col-span-2 flex justify-end w-full pb-4 ">
                  <button
                    type="submit"
                    className=" bg-fcPrimary rounded-md py-3 text-white font-bold text-lg  input  w-full "
                  >
                    Add This Course
                  </button>{" "}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
