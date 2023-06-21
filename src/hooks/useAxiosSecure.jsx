import axios from 'axios';
import React, { useContext, useEffect } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../authprovider/AuthProvider';


const axiosSecure = axios.create({
    baseURL: 'https://fashion-canvas-institute-server.vercel.app'
})

const useAxiosSecure = () => {

    const nevigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

const {handleSignOut} = useContext(UserContext);



useEffect(()=>{
    axiosSecure.interceptors.request.use((config)=>{
        const token = localStorage.getItem('access-token');
        if(token){
            config.headers.Authorization = ` Bearer ${token}`;
        }
        return config;
    });

    axiosSecure.interceptors.response.use(
        (response)=> response, 
        async( error)=>{
if(error.response && (error.response.status === 401 || error.response.status === 403)){
    await handleSignOut();
  
    nevigate(from, { replace: true });
}

return Promise.reject(error);
        }
    )
},[handleSignOut,nevigate]);



    return [axiosSecure];
};

export default useAxiosSecure;