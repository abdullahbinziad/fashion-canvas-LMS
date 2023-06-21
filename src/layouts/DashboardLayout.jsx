import React from 'react';
import Header from '../shared/header/Header';
import Dashboard from '../dashboard/Dashboard';
import { Outlet } from 'react-router-dom';


const DashboardLayout = () => {
    return (
        <div>
            {/* <Header></Header>
             */}
            <Header></Header>
           <div className='flex gap-20 '>
            <div className='w-2/12  '> <Dashboard></Dashboard>
            </div>
            <div className='mx-10 w-3/4  mt-24 mb-8  '>
            <Outlet></Outlet>
            </div>
           </div>
        </div>
    );
};

export default DashboardLayout;