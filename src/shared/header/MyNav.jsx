import React, { useContext, useState } from "react";
import "./header.css";
import {
  Navbar,
  MobileNav,
  Typography,

  IconButton,
  Button,
  Switch,

} from "@material-tailwind/react";
import {
  
  Bars2Icon,ShoppingBagIcon
 
} from "@heroicons/react/24/outline";
import NavList from "./NavList";
import ProfileMenu from "./ProfileMenu";

import { Link } from "react-router-dom";
import logo from './../../assets/logo.png';
import { UserContext } from "../../authprovider/AuthProvider";
import Switcher from "../../components/switcherDark/Switcher";

const MyNav=()=> {

  const [dark,setDark] = useState(false) ;
//handle dark 
const handleDark =()=> {
  setDark(!dark) ;
}

console.log(dark);

const {user}= useContext(UserContext)


  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    );
  }, []);

  return (
    <div id="order-nav " className=" fixed z-10 w-full shadow-sm z bg-white dark:bg-blue-gray-900   top-0">
      <div className="rounded-none   mx-auto md:w-5/6   lg:pl-6">
        <div className="relative mx-auto flex justify-between items-center text-blue-gray-900 dark:text-white">
          <Typography
            as="a"
            href="#"
            className="mr-4 ml-2 cursor-pointer py-1.5 font-medium"
          >
         <Link to='/'>   <img className="w-24" src={logo} alt="zooPlay" /></Link>
          </Typography>
          
          <div className="absolute top-2/4 left-2/4 hidden -translate-x-2/4 -translate-y-2/4 lg:block">
            <NavList />
          </div>
        
        <div>
       
        </div>
        <div className="flex  space-x-4 gap-4 items-center">
        
        <IconButton
            size="sm"
            color="blue-gray"
            variant="text"
            onClick={toggleIsNavOpen}
            className="ml-auto mr-2 lg:hidden"
          >
            <Bars2Icon className="h-6 w-6" />
          </IconButton>
        {
        user? <ProfileMenu></ProfileMenu>
         :   <div className="flex gap-1">
         <Link to='/login'><Button size="sm" variant="outlined" className="">Login</Button></Link>
         <Link to='/signup'><Button size="sm" className="ml-1 bg-fcBtn ">SignUp</Button></Link>
         </div>
      }
      <div className="flex justify-center">
      <Switcher/>
      </div>

        
{/* <Switch onChange={()=>handleDark()} id="auto-update" label="Dark Mode" />; */}



       
     
        </div>
         
        </div>
        <MobileNav open={isNavOpen} className="overflow-scroll">
          <NavList />
        </MobileNav>
      </div>
    </div>
  );
}

export default MyNav;
