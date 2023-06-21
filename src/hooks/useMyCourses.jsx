
import UseAuth from './UseAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useMyCourses = () => {


    const {user,loading} = UseAuth();
    const [axiosSecure] = useAxiosSecure();

    const {data:courses =[], refetch } = useQuery({
        queryKey: ['courses', user?.email],
        enabled: !loading,
        queryFn: async ()=>{
            const res = await axiosSecure(`/instructor/courses?email=${user.email}`)
            console.log("res from axios", res);
            return res.data ; 
        }
    })

    return [courses,refetch]
};

export default useMyCourses;