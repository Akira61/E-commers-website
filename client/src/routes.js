import React from 'react'
import {Route, Routes} from "react-router-dom"
import Products from './pages/admin/products/Products';
import NewProduct from './pages/admin/products/NewProduct';
import GetProductImage from './pages/admin/products/GetProductImage';
import EidtProdut from './pages/admin/products/EidtProdut';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Index from './pages';
import Dashboard from "./pages/admin/dashboard";
import Admin_routes from './pages/admin/routes';
import admin_routes from './pages/admin/routes';
import Edit_profile from './pages/user/edit.profile';

export default function Router() {
  return (
    <>
      <Routes>
        {admin_routes}
        <Route path='/' element={<Index />}/>
        <Route path="/image/:id" element={<GetProductImage />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/edit-profile/:id' element={<Edit_profile />} />
      </Routes>
    </>
  )
}
