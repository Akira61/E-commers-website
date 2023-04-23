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

export default function Router() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Index />}/>
        <Route path="/admin-dashboard" element={<Dashboard />}/>
        <Route path='/products' element={<Products />}/>
        <Route path="/image/:id" element={<GetProductImage />}/>
        <Route path='/products-dashbord' element={<Products />} />
        <Route path='/edit-product/:id' element={<EidtProdut />} />
        <Route path='/register' element={<Register />}/>
        <Route path='/login' element={<Login />}/>
      </Routes>
    </>
  )
}
