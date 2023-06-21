import React from 'react';
import DashboardChart from '../../components/dashboardChart/DashboardChart';

const StatiscticsDashboard = () => {
    return (
        <div className='w-5/6 flex flex-col  mx-auto space-y-10'>
            <h1 className='text-3xl font-bold '>Welcome to Dashoard Demo Chart</h1>
   
                  <DashboardChart />

        </div>
    );
};

export default StatiscticsDashboard;