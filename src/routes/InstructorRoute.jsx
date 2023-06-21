import { Navigate, useLocation } from "react-router";
import spin from '../assets/spin.gif';

import UseAuth from "../hooks/UseAuth";
import useInstructor from "../hooks/useInstructor";


const InstructorRoute = ({ children }) => {
    const { user, loading } = UseAuth();
   const [isInstructor, isInstructorLoading] = useInstructor()
    const location = useLocation();

    if(loading || isInstructorLoading){
        return <img className="w-40 mx-auto mt-80" src={spin} alt="loader" />;
    }

    if (user && isInstructor) {
        return children;
    }
    return <Navigate to="/login" state={{from: location}} replace></Navigate>
};

export default InstructorRoute;