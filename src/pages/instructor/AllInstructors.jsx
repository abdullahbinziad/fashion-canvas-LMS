import React from "react";
// Import Swiper React components

// import required modules

import InstructorCard from "../../components/instructor/InstructorCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const AllInstructors=()=> {



  const {refetch, data: instructors=[] } =useQuery({
    queryKey:['instructors'],
    queryFn: async ()=> {
      const res = await axios.get('https://fashion-canvas-institute-server.vercel.app/instructors?role=instructor') 
     return res.data; 
    }
  })


  return (
    <div className="w-5/6 mx-auto py-20">

    <h1 className="py-20 text-center font-bold text-5xl dark:text-white">Our All Instructors</h1>
     
        
 <div className="grid md:grid-cols-4 gap-4 	 ">
 {
    instructors.map((content,index)=>   <InstructorCard key={index} content={content}></InstructorCard> )
}
  </div>     
    
    </div>
  );
}


export default AllInstructors;