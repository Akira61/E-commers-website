import React, { useEffect, useState } from 'react'
import Header from './includes/components/header'
import Footer from './includes/components/footer'
import { useNavigate } from 'react-router-dom';
import Navbar from './includes/components/Navbar';
import { adminUrl } from './includes/functions/admin.path';
import "./layout/css/dashboard.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag, faUsers } from '@fortawesome/free-solid-svg-icons';
import { faAdd, faEdit, faRemove } from '@fortawesome/free-solid-svg-icons';
import { EditMember } from './includes/functions/CRUD.member';
import { isAdmin } from './includes/functions/IsAdmin';

export default function Dashboard() {
    const navigate = useNavigate()
    
    const [userId, setUserId] = useState();
    const [Members, setMembers] = useState();
    const [product, setProduct] = useState();
    const [lastRegistered, setlastRegistered] = useState([]);
    useEffect(() =>{

        //auth()
        // async function auth(){
        //   const response = await fetch(adminUrl.serverHost + '/check-role', {credentials : "include"});
        //   const validation = await response.json();
        //   console.log(validation)
        //   //if user role is 'user'
        //   if(!validation.isAdmin){
        //     return navigate('/');
        //   }
        //   // if user doesn't logged in
        //   else if(!validation.role){
        //     return navigate('/login');
        //   }
        //   return navigate(adminUrl.dashboard); // user is admin
        // };
        
        // check if user logged in
        isAdmin(adminUrl.dashboard,navigate);

        // get user id
          id();
          async function id(){
            const response = await fetch("http://localhost:4000/userID",{credentials : "include",})// fetching user's id
            const ID = await response.text();
            setUserId(ID);
          }


        // Members number
          MembersNumber()
          async function MembersNumber(){
            const response = await fetch(adminUrl.serverHost + "/staff/members", {
              credentials : "include"
            });
            const data = await response.json();
            console.log(data)
            if(response.ok){
              setMembers(data.length);
            }
          }

        
        //Products number
          ProductsNumber()
          async function ProductsNumber(){

            const response = await fetch(adminUrl.serverHost + "/products", {
              method : 'GET',
              credentials : 'include'
            });
            const data = await response.json();
            console.log(data);
            setProduct(data.length);
          }

          
        //Last Registered 
          LastUsers()
          async function LastUsers(){
            const response = await fetch(adminUrl.serverHost + "/last-users-added?many=5", {
              credentials : "include"
            });
            const data = response.json();
            data.then(result =>{
              console.log("{".repeat(30),result);
              setlastRegistered(result)         
            })
          }
      },[]);
  return (
    <>
    
    <title>Admin</title>
        <Navbar />
        <Header />
        
        <h1 className='text-center'>Dashboard</h1>
        <div className='container home-stats text-center'>
          <div className='stat-container '>
          <div className='row'>
            <div className='col-md-3'>
              <div className='stat st-members'>Total Members <span><a href={adminUrl.manageStaff}>{Members}</a></span></div>
            </div>
            <div className='col-md-3'>
              <div className='stat st-pendingMembers'>pending Clients <span>15</span></div>
            </div>
            <div className='col-md-3'>
              <div className='stat st-products'>Total products <span><a href={adminUrl.productsDashboard}>{product}</a></span></div>
            </div>
            <div className='col-md-3'>
              <div className='stat st-comments'>Total Comments <span>300</span></div>
            </div>
          </div>
          </div>
        </div>

        <div className='container latest'>
          <div className='row'>
            <div className='col-sm-6'>
              <div className='panel panel-default'>
                <div className='panel-heading panel-header'>
                  <FontAwesomeIcon icon={faUsers}></FontAwesomeIcon> Latest Registered Users
                </div>
                <div className='panel-body'>
                  <ul className='list-unstyled latest-users'>
                    {lastRegistered.map(user =>(
                      <li>{user.username}<span onClick={() =>EditMember(user.user_id, userId)} className='btn btn-success float-start  float-end btn-sm'>
                        <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon> Eidt</span></li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className='col-sm-6'>
              <div className='panel panel-default'>
                <div className='panel-heading panel-header'>
                  <FontAwesomeIcon icon={faTag}></FontAwesomeIcon> Latest Products
                </div>
                <div className='panel-body'>
                  test
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <Footer /> */}
    </>
)}
