import React, { useEffect } from 'react'
import Header from './includes/components/header'
import Footer from './includes/components/footer'
import { useNavigate } from 'react-router-dom';
import Navbar from './includes/components/Navbar';
export default function Dashboard() {

    const navigate = useNavigate()
    useEffect(() =>{

        auth() // check if user logged in
        async function auth(){
          const response = await fetch('http://localhost:4000/check-role', {credentials : "include",});
          const validation = await response.text();
          console.log(validation)
          //if user role is 'user'
          if(validation === 'user'){
            return navigate('/');
          }
          // if user doesn't logged in
          else if(!validation){
            return navigate('/login');
          }
          return navigate('/admin-dashboard'); // user is admin
        }
      },[]);
  return (
    <>
    
    <title>Admin</title>
        <Navbar />
        <Header />
        {/* content */}
        <Footer />
    </>
)}
