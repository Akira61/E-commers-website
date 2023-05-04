import { adminUrl } from "./admin.path";

import { useNavigate } from 'react-router-dom';



// check if user logged in
export async function isAdmin(direction, navigate){
  const response = await fetch(adminUrl.serverHost + '/check-role', {credentials : "include"});
  const validation = await response.json();
  console.log(validation)
  //if user role is 'user'
  if(!validation.isAdmin){
    return navigate('/');
  }
  // if user doesn't logged in
  else if(!validation.role){
    return navigate('/login');
  }
  return navigate(direction); // user is admin
};