import React from "react";
import logo from './../../assets/logo.png';
import NavList from "./NavList";
import {
  IconButton,
  MobileNav,
  Navbar,
  Typography,
} from "@material-tailwind/react";
import ProfileMenu from "./ProfileMenu";
import { Bars2Icon } from "@heroicons/react/24/outline";

const MyNavItem = () => {
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    );
  }, []);

  return (
    <div id="order-nav " className="relative z-10  ">
      <Navbar className="rounded-none static  mx-auto max-w-screen-xl p-2   lg:pl-6">
        <div className="relative mx-auto flex items-center text-blue-gray-900">
        <img className="w-24" src={logo} alt="Logo" />
          <div className="absolute top-2/4 left-2/4 hidden -translate-x-2/4 -translate-y-2/4 lg:block">
            <NavList />
          </div>
          <IconButton
            size="sm"
            color="blue-gray"
            variant="text"
            onClick={toggleIsNavOpen}
            className="ml-auto mr-2 lg:hidden"
          >
            <Bars2Icon className="h-6 w-6" />
          </IconButton>
          <IconButton
            size="sm"
            color="blue-gray"
            variant="text"
            onClick={toggleIsNavOpen}
            className="ml-auto mr-2 lg:hidden"
          >
          <ShoppingBagIcon></ShoppingBagIcon>
          </IconButton>
          <ProfileMenu />
        </div>
        <MobileNav open={isNavOpen} className="overflow-scroll">
          <NavList />
        </MobileNav>
        
      </Navbar>
    </div>
  );
};

export default MyNavItem;
