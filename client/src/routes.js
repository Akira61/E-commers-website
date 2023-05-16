import React from 'react'
import {Route, Routes} from "react-router-dom"
import GetProductImage from './pages/admin/products/GetProductImage';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Index from './pages';
import Dashboard from "./pages/admin/dashboard";
import Admin_routes from './pages/admin/routes';
import admin_routes from './pages/admin/routes';
import Edit_profile from './pages/user/edit.profile';
import Sections from './pages/sections';
import Profile from './pages/user/Profile';
import Item from './pages/item';

export default function Router() {
  return (
    <>
      <Routes>
        {admin_routes}
        <Route path='/' element={<Index />}/>
        <Route path="/image/:id" element={<GetProductImage />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/edit-profile' element={<Edit_profile />} />
        <Route path='/section/:section_name' element={<Sections />}/>
        <Route path='/:productId' element={<Item />} />
        <Route path='/profile' element={<Profile />}/>
      </Routes>
    </>
  )
}
