import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  PencilIcon,
  TrashIcon,
  EyeIcon,
  UserPlusIcon,
} from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import useMyCourses from "../../hooks/useMyCourses";

const TABLE_HEAD = [
  "Course",
  "Course Title",
  "Price",
  "Enrolled ",
  "Status & Feedback",
  "",
];

const MyCreatedCourse = () => {
  const navigate = useNavigate();

  const [courses, refetch] = useMyCourses();

  return (
    <Card className="h-full w-full">
      <CardHeader
        floated={false}
        shadow={false}
        className="rounded-none relative"
      >
        <div className="flex  flex-col items-center justify-between gap-4 md:flex-row">
          <div className="w-full md:w-72">
            <Input
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />
          </div>
          <Button className="flex items-center gap-3" color="blue" size="sm">
            <UserPlusIcon strokeWidth={2} className="h-4 w-4" />{" "}
            <Link to="/dashboard/add-course"> Add Course</Link>
          </Button>
        </div>
      </CardHeader>
      <CardBody className=" px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {courses.map(
              (
                {
                  _id,
                  InstructorEmail,
                  InstructorName,
                  Enrolled,
                  Nowstatus,
                  image,
                  courseTitle,
                  totalSeats,
                  courseOutline,
                  coursePrice,
                  courseDuration,
                  adminMesage,
                },
                index
              ) => {
                const isLast = index === courses.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4  border-b border-blue-gray-50";

                return (
                  <tr key={name}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Avatar
                          variant="square"
                          src={image}
                          alt={courseTitle}
                          size="xxl"
                        />
                      </div>
                    </td>
                    <td className={`${classes} w-64 2xl:w-96`}>
                      <div className="flex flex-col">
                        <Typography
                          variant="h6"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {courseTitle}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="h6"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          ${coursePrice}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="h6"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {Enrolled}
                      </Typography>
                    </td>

                    <td className={classes}>
                      <div className="w-max">
                        <Tooltip
                          content={
                            Nowstatus == "denied"
                              ? adminMesage
                              : Nowstatus == "approved"
                              ? "Approved"
                              : "Not Approve Yet"
                          }
                        >
                          <Chip
                            variant="outlined"
                            size="sm"
                            value={
                              Nowstatus == "pending"
                                ? "Pending"
                                : Nowstatus == "approved"
                                ? "Approved"
                                : "Denied"
                            }
                            color={
                              Nowstatus == "pending"
                                ? "blue-gray"
                                : Nowstatus == "approved"
                                ? "green"
                                : " red"
                            }
                          />
                        </Tooltip>
                      </div>
                    </td>

                    <td className={classes}>
                      <Tooltip content="View Course">
                        <IconButton variant="text" color="blue-gray">
                          <EyeIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip content="Edit Course">
                        <IconButton
                          onClick={() =>
                            navigate(`/dashboard/edit-course/${_id}`)
                          }
                          variant="text"
                          color="blue-gray"
                        >
                          <PencilIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
};

export default MyCreatedCourse;
