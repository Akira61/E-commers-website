import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Dashboard from './dashboard'
import Products from './products/Products'
import Staff_manage from './staff/manage';
import { adminUrl } from './includes/functions/admin.path';

export default [
  <Route path={adminUrl.dashboard} element={<Dashboard />}/>,
  <Route path={adminUrl.manageStaff} element={<Staff_manage />} />,
  <Route path={adminUrl.productsDashboard}  element={<Products />}/>
];




// export default function Routes_(){
//   return(
//     <>
//     <Route path="/admin-dashboard" element={<Dashboard />}/>,
//     <Route path="/products"  element={<Products />}/>
//     </>
//   );
// }