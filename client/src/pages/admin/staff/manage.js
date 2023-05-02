/*
 * add memeber staff
 * eidt memeber staff data
 * delete member stafff
 */
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import "../layout/css/ManageStaff.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { adminUrl } from '../includes/functions/admin.path';
import Table from 'react-bootstrap/Table';
import Navbar_ from '../includes/components/Navbar';


export default function Staff_manage() {

  const [userId, setUserId] = useState("");
  const [members, setMembers] = useState([]);

  useEffect(() => {

    // get members data
    membersInfo();
    async function membersInfo(){
      const response = await fetch(`http://localhost:4000/staff/members`, {
        method : 'get',
        credentials : 'include'
      });
      const data = await response.json();
      
      if(response.ok){
        setMembers(data);
      }
      console.log(members)
    }
  },[]);

  async function addMember(){

    //get userId
    // get user id
    id();
    async function id(){
        const response = await fetch("http://localhost:4000/userID",{credentials : "include",})// fetching user's id
        const ID = await response.text();
        setUserId(ID);
    }



    // insert new member data
    const { value : insertMember } = await Swal.fire({
      icon : 'question',
      iconColor : 'green',
      title : 'Add New Member',
      confirmButtonColor : 'green',
      confirmButtonText : 'Add Member',
      showCancelButton : true,
      html : `
          <form>
              <div class="form-row">
              <div class="form-group col-md-6">
                  <input type="text" class="form-control" id="name" placeholder="Member's Name" required>
              </div>
              <div class="form-group col-md-6">
                  <input type="email" class="form-control" id="email" placeholder="Member's Email" required>
              </div>
              </div>
              <div class="form-group col-md-6">
              <input type="password" class="form-control" id="password" placeholder="Member's Password" required>
              </div>
          </form>`,
      preConfirm: () => {
        return {
          name : document.getElementById('name').value,
          email : document.getElementById('email').value,
          password : document.querySelector('#password').value,
        }
      }
    });

    // check fields
    if(!insertMember.name || !insertMember.email, !insertMember.password){
      const warning = await Swal.fire({
        icon : 'warning',
        iconColor : 'red',
        title : "Please complete the form",
        showCancelButton : true
      });
      // on 'ok' button click
      if(warning.isConfirmed){
        addMember();
      }
      return;
    }

    //send member data
    const response = await fetch("http://localhost:4000/staff/manage/add-member", {
      method : 'POST',
      credentials : 'include',
      headers : {"Content-Type" : "application/json"},
      body : JSON.stringify({
        userId,
        name : insertMember.name,
        username : insertMember.email,
        password : insertMember.password 
      })
    });

  }
  

  return (
    <>
      <Navbar_ />

      <h1 className='text-center'>Manage Members</h1>
        {/* add new member button */}
        <div className='form-group row'>
          <div className='col-sm-2'>
            <button className='form-control btn btn-primary'
            onClick={() => addMember()}>
              <FontAwesomeIcon icon={faAdd}></FontAwesomeIcon> add new member
              </button>
          </div>
        </div>

      {/* Table */}
      <div className='container'>

        {/* Members Table */}
        <div className='table-responsive'>
          <Table striped bordered hover className='main-table table table-bordered text-center'>
            {/* table headers */}
            <tr>
              <th>#</th>
              <th>Member ID</th>
              <th>Name</th>
              <th>Username</th>
              <th>Role</th>
              <th>Registered Date</th>
              <th>Control</th>
            </tr>
            {/* table info */}
            {members.map(member => (
              <tr>
                <td className='counterCell'></td>
                <td>{member.user_id}</td>
                <td>{member.name}</td>
                <td>{member.username}</td>
                <td>{member.role}</td>
                <td>{member.updatedAt}</td>
                <td>
                <div>
                    <a href='#' className='btn btn-success'>Edit</a>
                    <a href='#' className='btn btn-danger'>Delete</a>
                  </div>
                </td>
              </tr>
            ))}
          </Table>
        </div>
      </div>


    </>
  )
}
