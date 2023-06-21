import React from 'react';
import Header from '../shared/header/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../shared/footer/Footer';
import MyNav from '../shared/header/MyNav';

const UserLayout = () => {
    return (
        <div className="">
           <MyNav></MyNav>
          
          <Outlet></Outlet>
         
            <Footer></Footer>
        </div>
    );
};

export default UserLayout;