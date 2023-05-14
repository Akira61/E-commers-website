import React, { useEffect, useState } from 'react'
import { adminUrl } from '../includes/functions/admin.path'
import { isAdmin } from '../includes/functions/IsAdmin';
import { useNavigate } from 'react-router-dom';
import Navbar_ from '../includes/components/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import Table from 'react-bootstrap/esm/Table';
import Swal from 'sweetalert2';

export default function ManageComment() {
    const navigate = useNavigate();
    const [comments, setComments] = useState([]);

    useEffect(() => {
        //check if admin 
        isAdmin(adminUrl.comments, navigate);

        // get Comments
        getComments()
        async function getComments(){
            const response = await fetch(adminUrl.serverHost + "/comments/get-all", {
                credentials : 'include'
            })
            const data = await response.json();
            console.log(data);
            setComments(data);
        }
    },[]);

    //delete comment
    async function deleteComment(id){

        //warning before actions
        const {value : deletedProduct } =await Swal.fire({
            icon : 'warning',
            iconColor : 'red',
            confirmButtonColor : 'gray',
            title : 'هل انت متأكد؟',
            showCancelButton : true,
            showCloseButton: true,
        });
    
        if(deletedProduct){
        const res = await fetch(adminUrl.serverHost + `/comments/delete-one?id=${id}`,{
            method : "DELETE",
            credentials : "include"
        });
        const data = await res.json();

        if(data.success){
            //password updated succssfully, fire success popup
            const success = await Swal.fire({
                icon : 'success',
                title : "Category Deleted"
            })
            // on 'ok' button click
            if(success.isConfirmed){
                // reload the page
                window.location.reload();
            }
            } 
        }

    }

  return (
    <>
      <Navbar_ />

<h1 className='text-center'>Manage Comments</h1>

  {/* add new member button */}
  <div className='form-group row h-100 d-flex align-items-center justify-content-center'>
    <div className='col-sm-2'>
      <button className='btn btn-primary btn-sm'>
        <FontAwesomeIcon icon={faAdd}/>New Comment
        </button>
    </div>
  </div>

{/* Table */}
<div className='container manage-container'>

  {/* Members Table */}
  <div className='table-responsive'>
    <Table striped bordered hover className=' main-table table table-bordered text-center'>
      {/* table headers */}
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
          <th>Comment</th>
          <th>Product</th>
          <th>Visible</th>
          <th>Date</th>
          <th>Control</th>
        </tr>
      </thead>
      {/* table info */}
      <tbody>
      {comments.map(comment => (
        <tr>
          <td className='counterCell'></td>
          <td>{comment.name}</td>
          <td>{comment.username}</td>
          <td>{comment.comment}</td>
          <td>{comment.product_name}</td>
          <td>{comment.visible}</td>
          <td>{comment.updatedAt}</td>
          <td>
          <div>
             
              <a href='#' className='btn btn-danger btn-sm' onClick={() => deleteComment(comment.comment_id)} >
              <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon> Delete
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
