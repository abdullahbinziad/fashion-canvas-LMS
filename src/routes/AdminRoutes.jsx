import { Navigate, useLocation } from "react-router";
import spin from '../assets/spin.gif';

import UseAuth from "../hooks/UseAuth";

import useAdmin from "../hooks/useAdmin";


const AdminRoutes = ({ children }) => {
    const { user, loading } = UseAuth();
   const [isAdmin,isAdminLoading] = useAdmin()
    const location = useLocation();

    if(loading || isAdminLoading){
        return <img className="w-40 mx-auto mt-80" src={spin} alt="loader" />;
    }

    if (user && isAdmin) {
        return children;
    }
    return <Navigate to="/login" state={{from: location}} replace></Navigate>
};

export default AdminRoutes;