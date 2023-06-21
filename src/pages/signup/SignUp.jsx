import { Button, IconButton } from "@material-tailwind/react";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";

import { BsGoogle } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../authprovider/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";


const SignUp = () => {


const [isPass,setIsPass] = useState(false) ;


  const {
    handleSignUpWithEmailPass,
    updateUsersProfile,
    handleSignWithGoogle,
  } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const nevigate = useNavigate();
  const [error, setError] = useState("");

  const onSubmit = async (data) => {
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

    console.log(data);
    handleSignUpWithEmailPass(data.email, data.password)
      .then((user) => {
        console.log(user);
        updateUsersProfile(data.name, imageUrl).then((res) => {
          console.log(res);

          axios
            .post("https://fashion-canvas-institute-server.vercel.app/users", {
              name: data.name,
              email: data.email,
              image: imageUrl,
              role: "user",
            })
            .then((response) => {
              Swal.fire({
                icon: "success",
                title: "User Registeration Successful",
                text: "",
              });
              nevigate("/");
            })
            .catch((error) => {
              console.log(error);
            });
        });
        console.log(data);
        reset();
      })
      .catch((error) => {
        setError("This email is Already Regireded,Please try Another Email");
      });
  };

  return (
    <div className="z-0 relative">
      // error components
      <div className=" bg-center relative ">
        <div className="absolute p-20 bg-gradient-to-b from-yellow-500 to-pink-400 opacity-75 inset-0 z-0" />
        <div className="min-h-screen sm:flex sm:flex-row mx-0 justify-center">
          <div className="flex justify-center self-center my-20  z-10">
            <div className="p-12 bg-white mx-auto  rounded-2xl w-100 ">
              <div className="mb-4">
                <h3 className="font-semibold text-2xl text-gray-800">
                  Register{" "}
                </h3>
                <p className="text-gray-500">Please Register an Account.</p>
              </div>
              <div className="space-y-5">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 tracking-wide">
                      Name
                    </label>
                    <input
                      {...register("name", { required: true })}
                      className=" w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                      type=""
                      placeholder="Enter Your Name"
                    />
                     {errors.name && <span className='text-error'>This field is required</span>}
                  </div>
                  <div className="space-y-2">
                    <label className="mb-5 text-sm font-medium text-gray-700 tracking-wide">
                      Email
                    </label>
                    <input
                      {...register("email")}
                      className="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                      type=""
                      placeholder="Enter your Email"
                    />
                  </div>
                  <div className="space-y-2 relative ">
                    <label className="mb-5  text-sm font-medium text-gray-700 tracking-wide">
                      Password
                    </label>
      <button onClick={()=>setIsPass(!isPass)} className="absolute top-9 right-4">
      {
        isPass ?  <EyeIcon className="w-5"/> :  <EyeSlashIcon className="w-5"/>
       }
      </button>
                   
                    <input
                      {...register("password", {
                        required: true,
                        minLength: 6,
                        maxLength: 16,
                        pattern:
                          /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#@.$%&? "])[a-zA-Z0-9!#@.$%&?]{6,16}$/,
                      })}
                      className="w-full   content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                      type={ isPass?'password':'text'}
                      placeholder="Enter your password"
                    />
                   
                   

                    <div className=" w-96">
                      {errors.password?.type === "minLength" && (
                        <span className="text-error">
                          Password length minimum 6 characters required
                        </span>
                      )}
                      {errors.password?.type === "maxLength" && (
                        <span className="text-error">
                          Password length will be maximum 16 characters
                        </span>
                      )}
                      {errors.password?.type === "pattern" && (
                        <span className="text-error">
                          Must have an uppercase, a lowercase, a digit and a
                          special character{" "}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="mb-5 text-sm font-medium text-gray-700 tracking-wide">
                      Image
                    </label>
                    <input
                      {...register("image")}
                      className="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                      type="file"
                    />
                  </div>

                  <div className="flex items-center justify-between"></div>
                  <div>
                    <button
                      type="submit"
                      className="w-full my-4 flex justify-center bg-fcBtn  hover:bg-green-500 text-white p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
                    >
                      Sign Up
                    </button>
                    <p className="text-red-400">{error}</p>
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
                                nevigate("/");
                              } else {
                                Swal.fire({
                                  icon: "success",
                                  title: "User Registration Completed",
                                  text: "",
                                });
                                nevigate("/");
                              }
                            })
                            .catch((error) => {
                              console.log(error);
                            });

                          if (data) {
                            nevigate("/");
                          }
                          reset();
                        })
                        .catch();
                    }}
                    className="bg-fcPrimary rounded-full"
                  >
                    {" "}
                    <BsGoogle></BsGoogle>
                  </Button>
                </div>
              </div>

              <div className="pt-5 text-center text-gray-400 text-xs">
                <div className="text-sm">
                  <a href="#" className="text-green-400 hover:text-green-500">
                    Already Have any Account ? <Link to="/login">Login</Link>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
