import React, { useContext } from "react";
import {Link} from 'react-router-dom'
import "./header.css";
import {
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Tooltip,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  Cog6ToothIcon,
  PlusIcon,
  LifebuoyIcon,
  PowerIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import { UserContext } from "../../authprovider/AuthProvider";


const ProfileMenu = () => {
  const { handleSignOut, user } = useContext(UserContext);

  const profileMenuItems = [
    {
      label: "My Profile",
      icon: ShoppingBagIcon,
      path: ''
    },
    {
      label: "Edit Profile",
      icon: Cog6ToothIcon,
      path:''
    },

    {
      label: "Add Toys",
      icon: PlusIcon,
      path:'/addNewToys'
    },
  ];

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Tooltip content={user.displayName
} placement="left">
            <Avatar
              variant="circular"
              size="sm"
              alt="candice wu"
              className="border border-blue-500 p-0.5"
              src={user.photoURL}
            />
          </Tooltip>
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon,path }, key) => {
          return (
        <>
        <Link to={path}>
        <MenuItem
              key={label}
              onClick={closeMenu}
              className="flex items-center gap-2 rounded "
            >
              {React.createElement(icon, {
                className: "h-4 w-4",
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color="inherit"
              >
                {label}
              </Typography>
            </MenuItem>
        </Link>
        </>
          );
        })}
        <MenuItem
          key="SignOut"
          onClick={handleSignOut}
          className='flex items-center gap-2 rounded 
                 
                   "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10'
        >
          {React.createElement(PowerIcon, {
            className: "h-4 w-4 text-red-500",
            strokeWidth: 2,
          })}
          <Typography
            as="span"
            variant="small"
            className="font-normal"
            color="red"
          >
            SignOut
          </Typography>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default ProfileMenu;
