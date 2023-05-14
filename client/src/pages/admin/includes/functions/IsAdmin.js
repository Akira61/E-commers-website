import { adminUrl } from "./admin.path"


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
  
  navigate(direction); // user is admin
  return true
};

// check if user logged in
export async function isLoggedin(direction, navigate){
  const response = await fetch(adminUrl.serverHost + '/check-role', {credentials : "include"});
  const validation = await response.json();
  // if user doesn't logged in
  if(!validation.role){
    return navigate('/login');
  }
  
  navigate(direction); // user is admin
  return true
};