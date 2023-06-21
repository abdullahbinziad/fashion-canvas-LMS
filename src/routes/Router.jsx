import React from "react";
import { createBrowserRouter } from "react-router-dom";
import UserLayout from "../layouts/userLayout";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import SignUp from "../pages/signup/SignUp";
import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "../dashboard/Dashboard";
import Blogs from "../pages/home/Blogs";
import AddCourse from "../dashboard/instructorDashboard/AddCourse";
import MyCreatedCourse from "../dashboard/instructorDashboard/MyCreatedCourse";
import UpdateCourse from "../dashboard/instructorDashboard/UpdateCourse";
import ManageCourses from "../dashboard/adminDashboard/ManageCourses";
import AllUsers from "../dashboard/adminDashboard/AllUsers";
import AdminRoutes from "./AdminRoutes";
import InstructorRoute from "./InstructorRoute";
import PrivateRoute from "./PrivateRoute";
import Enroll from "../pages/Enroll/Enroll";
import Payments from "../components/payments/Payments";
import MyPaymentsHistory from "../dashboard/studentDashboard/MyPaymentsHistory";
import MyEnrolledCourse from "../dashboard/studentDashboard/MyEnrolledCourse";
import MySelectedCourse from "../dashboard/studentDashboard/MySelectedCourse";
import CourseDetails from "../pages/courseDetails/CourseDetails";
import ErrorPage from "../components/error/ErrorPage";
import AllInstructors from "../pages/instructor/AllInstructors";
import AllCourse from "../pages/course/AllCourse";
import StatiscticsDashboard from "../dashboard/adminDashboard/StatiscticsDashboard";
// import ErrorPage from "../components/error/ErrorPage";



export const router = createBrowserRouter([
{
path:'/',
element:<UserLayout></UserLayout>,
errorElement: <ErrorPage></ErrorPage>,
children:[
  {
    path:'/',
    element:<Home></Home>
  },
  {
    path:'/login',
    element: <Login></Login>
  },
  {
    path:'/signup',
    element:<SignUp></SignUp>
  },
  {
    path:'/payments/course/:id',
    element:<PrivateRoute><Payments></Payments></PrivateRoute>,
    loader: ({params})=> fetch(`https://fashion-canvas-institute-server.vercel.app/courses/${params.id}`)
  },
  {
    path:'/enroll/course/:id',
    element:<PrivateRoute><Enroll></Enroll></PrivateRoute>,
    loader: ({params})=> fetch(`https://fashion-canvas-institute-server.vercel.app/courses/${params.id}`)
    
  },
  {
    path:'/enrolled/course/:id',
    element:<PrivateRoute><CourseDetails></CourseDetails></PrivateRoute>,
    loader: ({params})=> fetch(`https://fashion-canvas-institute-server.vercel.app/courses/${params.id}`)
    
  },
  {
    path:'/instructor',
    element:<AllInstructors></AllInstructors>
  },
  {
    path:'/classes',
    element:<AllCourse></AllCourse>
  }
  
]
}
,{
  path:'/dashboard',
  element:<PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
  children:[
    {
      path:'/dashboard',
      element:<StatiscticsDashboard></StatiscticsDashboard>
     
    },
    {
      path:'/dashboard/add-course',
      element:<InstructorRoute><AddCourse></AddCourse></InstructorRoute>
     
    },
    {
      path:'/dashboard/my-course',
      element:<InstructorRoute><MyCreatedCourse></MyCreatedCourse></InstructorRoute>
     
    },
    {
      path:'/dashboard/edit-course/:id',
      element:<InstructorRoute><UpdateCourse></UpdateCourse></InstructorRoute>,
      loader: ({params})=> fetch(`https://fashion-canvas-institute-server.vercel.app/instructor/courses/${params.id}`)

    },
    {
      path:'/dashboard/manage-courses',
      element:<AdminRoutes><ManageCourses></ManageCourses></AdminRoutes>
    },
    {
      path:'/dashboard/all-users',
      element: <AdminRoutes><AllUsers></AllUsers></AdminRoutes>
    },
    {
      path:'/dashboard/my-payments-history',
      element: <PrivateRoute><MyPaymentsHistory></MyPaymentsHistory></PrivateRoute>
    },
    {
      path:'/dashboard/my-enrolled-courses',
      element: <PrivateRoute><MyEnrolledCourse></MyEnrolledCourse></PrivateRoute>
    },
    {
      path:'/dashboard/my-selected-courses',
      element: <PrivateRoute><MySelectedCourse></MySelectedCourse></PrivateRoute>
    },
  ]
}
 
]);
