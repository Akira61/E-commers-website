/*
 * add memeber staff
 * eidt memeber staff data
 * delete member stafff
 */
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import "../layout/css/ManageStaff.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faEdit, faRemove } from '@fortawesome/free-solid-svg-icons';
import { adminUrl } from '../includes/functions/admin.path';
import Table from 'react-bootstrap/Table';
import Navbar_ from '../includes/components/Navbar';
import { useNavigate } from 'react-router-dom';
import { DeleteMember, EditMember, addMember } from '../includes/functions/CRUD.member';
import { isAdmin } from '../includes/functions/IsAdmin';


export default function Staff_manage() {

  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [members, setMembers] = useState([]);

  useEffect(() => {

    // check if user logged in
      isAdmin(adminUrl.manageStaff,navigate)

      
    // get user id
    id();
    async function id(){
        const response = await fetch("http://localhost:4000/userID",{credentials : "include",})// fetching user's id
        const ID = await response.text();
        setUserId(ID);
    }

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

  return (
    <>
      <Navbar_ />

      <h1 className='text-center'>Manage Members</h1>
        {/* add new member button */}
        <div className='form-group row h-100 d-flex align-items-center justify-content-center'>
          <div className='col-sm-2'>
            <button className='btn btn-primary btn-sm'
            onClick={() => addMember(userId)}>
              <FontAwesomeIcon icon={faAdd}></FontAwesomeIcon> New Member
              </button>
          </div>
        </div>

      {/* Table */}
      <div className='container manage-container'>

        {/* Members Table */}
        <div className='table-responsive'>
          <Table striped bordered hover className='main-table table table-bordered text-center'>
            {/* table headers */}
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Username</th>
                <th>Role</th>
                <th>Registered Date</th>
                <th>Control</th>
              </tr>
            </thead>
            {/* table info */}
            <tbody>
            {members.map(member => (
              <tr>
                <td className='counterCell'></td>
                <td>{member.name}</td>
                <td>{member.username}</td>
                <td>{member.role}</td>
                <td>{member.updatedAt}</td>
                <td>
                <div>
                    <a href='#' className='btn btn-success btn-sm' onClick={() => EditMember(member.user_id,userId)}>
                    <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon> Edit
                      </a>
                    <a href='#' className='btn btn-danger btn-sm' onClick={() => DeleteMember(member.user_id,userId)}>
                    <FontAwesomeIcon icon={faRemove}></FontAwesomeIcon> Delete
                      </a>
                  </div>
                </td>
              </tr>
            ))}
            </tbody>
          </Table>
        </div>
      </div>


    </>
  )
}
