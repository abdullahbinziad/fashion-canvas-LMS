import { BsGoogle } from "react-icons/bs";


import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { UserContext } from "../../authprovider/AuthProvider";
import Swal from "sweetalert2";
import axios from "axios";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const Login = () => {
  const [isPass,setIsPass] = useState(false) ;
  const { register, handleSubmit, reset } = useForm();
  const nevigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  

  const { handleSignWithGoogle, handleSignInWithEmailPass } =
    useContext(UserContext);


  const onsubmit = (data) => {
    handleSignInWithEmailPass(data.email, data.password)
      .then((data) => {
        console.log(data);
        if (data) {
          nevigate(from, { replace: true });
        }
        reset();
      })
      .catch();
  };





  return (
    <div className="z-0 relative">
     <div
  className="bg-no-repeat bg-cover bg-center relative py-16"
  style={{
    backgroundImage:
      "url(https://e0.pxfuel.com/wallpapers/231/344/desktop-wallpaper-fashion-fashion-design-background-fashion-clothes.jpg)"
  }}
>
  <div className="absolute bg-gradient-to-b from-yellow-500 to-pink-400 opacity-75 inset-0 z-0" />
  <div className="min-h-screen sm:flex sm:flex-row mx-0 justify-center">
    <div className="flex-col flex  self-center p-10 sm:max-w-5xl xl:max-w-2xl  z-10">
      <div className="self-start hidden lg:flex flex-col  text-white">
        <img src="" className="mb-3" />
        <h1 className="mb-3 font-bold text-5xl">Hi ? Welcome Back Aji </h1>
        <p className="pr-3">
          Lorem ipsum is placeholder text commonly used in the graphic, print,
          and publishing industries for previewing layouts and visual mockups
        </p>
       <span className='mt-10 text-center text-xl'>If You Have not account Please Register First </span>
       <span className='text-center font-bold underline text-xl'>   <Link to="/signup">Click To Register</Link> </span>
    
      </div>
    </div>
    <div className="flex justify-center self-center  z-10">
      <div className="p-12 bg-white mx-auto  rounded-2xl w-100 ">
        <div className="mb-4">
          <h3 className="font-semibold text-2xl text-gray-800">Sign In </h3>
          <p className="text-gray-500">Please sign in to your account.</p>
        </div>
        <div className="space-y-5">
       <form onSubmit={handleSubmit(onsubmit)}>
          
          <div className="space-y-2">
            <label className="mb-5 text-sm font-medium text-gray-700 tracking-wide">
              Email
            </label>
            <input
              required
            {...register("email")}
              className="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
              type=""
              placeholder="Enter your Email"
            />
          </div>
          <div className="space-y-2 relative">
            <label className="mb-5 text-sm font-medium text-gray-700 tracking-wide">
              Password
            </label>
            <button onClick={()=>setIsPass(!isPass)} className="absolute top-9 right-4">
      {
        isPass ?  <EyeIcon className="w-5"/> :  <EyeSlashIcon className="w-5"/>
       }
      </button>
            <input
              required
            {...register("password")}
              className="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
              type={ isPass?'password':'text'}
            
              placeholder="Enter your password"
            />
          </div>



          <div className="flex items-center my-4 justify-between">
            <div className="flex items-center">
              <input
            
                id="remember_me"
                name="remember_me"
                type="checkbox"
                className="h-4 w-4 bg-blue-500 focus:ring-blue-400 border-gray-300 rounded"
              />
              <label
                htmlFor="remember_me"
                className="ml-2 block text-sm text-gray-800"
              >
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <a href="#" className="text-green-400 hover:text-green-500">
                Forgot your password?
              </a>
            </div>
          </div>
         

          <div className="flex items-center justify-between">
          </div>
          <div>
            <button
              type="submit"
              className="w-full my-4 flex justify-center bg-fcBtn  hover:bg-green-500 text-white p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
            >
              Sign In
            </button>
          </div>
          </form> 
          <div className="flex gap-1 justify-center items-center">
         
            <span>Sign in With</span>
         
     <Button 
     
     onClick={() => {
      handleSignWithGoogle()
        .then((data) => {
          console.log(data.user.displayName);

          axios
            .post("https://fashion-canvas-institute-server.vercel.app/users", {
              name: data.user.displayName,
              email: data.user.email,
              image: data.user.photoURL,
              role: "user",
            })
            .then((response) => {
              console.log(response);

              if (
                response.data.message === "user already exists"
              ) {
                nevigate(from, { replace: true });
              } else {
                Swal.fire({
                  icon: "success",
                  title: "User Registration Completed",
                  text: "",
                });
                nevigate(from, { replace: true });
              }
            })
            .catch((error) => {
              console.log(error);
            });

          if (data) {
            nevigate(from, { replace: true });
          }
          reset();
        })
        .catch();
    }}
    className="bg-fcPrimary rounded-full"
  >
       <BsGoogle ></BsGoogle></Button>
     
          </div>
        </div>
       
      
      </div>
    
    </div>
  </div>
</div>

    </div>
  );
};

export default Login;