import React from "react";
// Import Swiper React components





// import required modules

import InstructorCard from "../../components/instructor/InstructorCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Slide } from "react-awesome-reveal";

const TopInstructor=()=> {



  const {refetch, data: instructors=[] } =useQuery({
    queryKey:['instructors'],
    queryFn: async ()=> {
      const res = await axios.get('https://fashion-canvas-institute-server.vercel.app/instructors?role=instructor') 
     return res.data; 
    }
  })


  return (
    <>

    <h1 className="py-20 text-center font-bold text-5xl dark:text-white">Our Instructors</h1>
     
    <Slide>
 <div className="grid md:grid-cols-4 gap-4 	 ">
 {
    instructors.map((content,index)=>   <InstructorCard key={index} content={content}></InstructorCard> )
}
  </div> 
  </Slide>        
    
    </>
  );
}


export default TopInstructor;