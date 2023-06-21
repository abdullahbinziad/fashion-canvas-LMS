import React from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Avatar,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  HomeIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { Link, NavLink } from "react-router-dom";
import useInstructor from "../hooks/useInstructor";
import useAdmin from "../hooks/useAdmin";
import UseAuth from "../hooks/UseAuth";
import useCart from "../hooks/useCart";
import useEnrolledCourse from "../hooks/useEnrolledCourse";

export default function Dashboard() {
  const [open, setOpen] = React.useState(0);
  const { handleSignOut, user } = UseAuth();
  const [isInstructor] = useInstructor();
  const [isAdmin] = useAdmin();
  const [cart] = useCart()
  const [enrolled] = useEnrolledCourse()

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };



  return (
    <Card className=" fixed mt-14 h-[calc(100vh)] w-full max-w-[20rem] p-4 ">
      <div className="mb-2 p-4">
        <div className="flex items-center gap-4">
          <Avatar
            src={user.photoURL}
            alt="avatar"
            size="xl"
            variant="rounded"
          />
          <div>
            <Typography variant="h6">{user.displayName}</Typography>
            <Typography variant="xl" color="gray" className="font-normal">
              {" "}
              {isAdmin ? "Admin" : isInstructor ? "Instructor" : "Student"}{" "}
            </Typography>
          </div>
        </div>
        <Typography variant="h5" color="blue-gray">
          {/* {isAdmin ? "Admin Dashboard" : isInstructor ? 'Instructor Dashboard' : 'User Dashboard'} */}
        </Typography>
      </div>
      <List>
        <Accordion
          open={open === 1}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${
                open === 1 ? "rotate-180" : ""
              }`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 1}>
            <AccordionHeader
              onClick={() => handleOpen(1)}
              className="border-b-0 p-3"
            >
              <ListItemPrefix>
                <PresentationChartBarIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Dashboard
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Analytics
              </ListItem>
              {isInstructor && (
                <NavLink className={({ isActive, isPending }) =>
    isPending ? "pending" : isActive ? "bg-[#EAECEE] p-2 rounded-md" : ""
  } to="/dashboard/my-course">
                  <ListItem>
                    <ListItemPrefix className="flex gap-4">
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    My Students
                  </ListItem>
                </NavLink>
              )}
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Payments History
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion>
        <Accordion
          open={open === 2}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${
                open === 2 ? "rotate-180" : ""
              }`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 2}>
            <AccordionHeader
              onClick={() => handleOpen(2)}
              className="border-b-0 p-3"
            >
              <ListItemPrefix>
                <ShoppingBagIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                {isAdmin ? "Manage" : "Courses"}
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              {isInstructor ? (
                <>
                  <NavLink className={({ isActive, isPending }) =>
    isPending ? "pending" : isActive ? "bg-[#EAECEE] p-2 rounded-md" : ""
  } to="/dashboard/add-course">
                    <ListItem>
                      <ListItemPrefix className="flex gap-4">
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                        Add Courses
                      </ListItemPrefix>
                    </ListItem>
                  </NavLink>

                  <NavLink className={({ isActive, isPending }) =>
    isPending ? "pending" : isActive ? "bg-[#EAECEE] p-2 rounded-md" : ""
  } to="/dashboard/my-course">
                    <ListItem>
                      <ListItemPrefix className="flex gap-4">
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                        My Courses
                      </ListItemPrefix>
                    </ListItem>
                  </NavLink>
                </>
              ) : isAdmin ? (
                <>
                  <NavLink className={({ isActive, isPending }) =>
    isPending ? "pending" : isActive ? "bg-[#EAECEE] p-2 rounded-md" : ""
  } to="/dashboard/manage-courses">
                    <ListItem>
                      <ListItemPrefix className="flex gap-4">
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      All Courses
                    </ListItem>
                  </NavLink>
                  <NavLink className={({ isActive, isPending }) =>
    isPending ? "pending" : isActive ? "bg-[#EAECEE] p-2 rounded-md" : ""
  } to="/dashboard/all-users">
                    <ListItem>
                      <ListItemPrefix className="flex gap-4">
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      All Users
                    </ListItem>
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink className={({ isActive, isPending }) =>
    isPending ? "pending" : isActive ? "bg-[#EAECEE] p-2 rounded-md" : ""
  } to="/dashboard/my-enrolled-courses">
                    <ListItem>
                      <ListItemPrefix className="flex gap-4">
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      My Enrolled
                      <Chip
                        value={enrolled.length}
                        size="sm"
                        variant="ghost"
                        color="blue-gray"
                        className="rounded-full mx-auto"
                      />
                    </ListItem>
                  </NavLink>
                  <NavLink className={({ isActive, isPending }) =>
    isPending ? "pending" : isActive ? "bg-[#EAECEE] p-2 rounded-md" : ""
  } to="/dashboard/my-selected-courses">
                    <ListItem>
                      <ListItemPrefix className="flex gap-4">
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      My Selected{" "}
                      <Chip
                        value={cart.length}
                        size="sm"
                        variant="ghost"
                        color="blue-gray"
                        className="rounded-full mx-auto"
                      />
                    </ListItem>
                  </NavLink>
                </>
              )}
            </List>
          </AccordionBody>
        </Accordion>
        <hr className="my-2 border-blue-gray-50" />
        <NavLink className={({ isActive, isPending }) =>
    isPending ? "pending" : isActive ? "bg-[#EAECEE] p-2 rounded-md" : ""
  } to="/">
          <ListItem>
            <ListItemPrefix>
              <HomeIcon className="h-5 w-5" />
            </ListItemPrefix>
            Home
          </ListItem>
        </NavLink>
        <ListItem>
          <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          Profile
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <Cog6ToothIcon className="h-5 w-5" />
          </ListItemPrefix>
          Settings
        </ListItem>
        <button onClick={handleSignOut}>
          <ListItem>
            <ListItemPrefix>
              <PowerIcon className="h-5 w-5" />
            </ListItemPrefix>
            Log Out
          </ListItem>
        </button>
      </List>
    </Card>
  );
}
