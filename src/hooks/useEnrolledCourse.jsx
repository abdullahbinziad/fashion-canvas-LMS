
import UseAuth from './UseAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useEnrolledCourse = () => {


    const {user,loading} = UseAuth();
    const [axiosSecure] = useAxiosSecure();

    const {data:enrolledCourse =[], refetch } = useQuery({
        queryKey: ['enrolledCourse', user?.email],
        enabled: !loading,
        queryFn: async ()=>{
            const res = await axiosSecure(`/enrolled-courses?email=${user.email}`)
            console.log("res from axios", res);
            return res.data ; 
        }
    })

    return [enrolledCourse,refetch]
};

export default useEnrolledCourse;