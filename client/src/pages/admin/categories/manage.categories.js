import { faAdd, faEdit, faRemove } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/esm/Table'
import Navbar_ from '../includes/components/Navbar'
import { isAdmin } from '../includes/functions/IsAdmin'
import { adminUrl } from '../includes/functions/admin.path'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import "../layout/css/categories.css"
export default function ManageCategories() {

    const navigate = useNavigate()
    const [userId, setUserId] = useState();
    const [category, setCategory] = useState([]);
    useEffect(() => {
        //check if admin 
        isAdmin(adminUrl.categories, navigate);

        // get user id
        id();
        async function id(){
            const response = await fetch(adminUrl.serverHost  + "/userID",{credentials : "include",})// fetching user's id
            const ID = await response.text();
            setUserId(ID);
        }

        //get categories
        categories()
        async function categories(){
            const response = await fetch(adminUrl.serverHost  + "/admin/categories/get-all",{
                credentials : "include"
            });
            const data = await response.json();
            console.log(data);
            setCategory(data);
        }
    },[]);


    // Add new Category
    async function AddCategory(){

        // insert new Category data
        const { value : insertCategory } = await Swal.fire({
          icon : 'question',
          iconColor : '#fdcb6e',
          title : 'Add New Category',
          confirmButtonColor : '#fdcb6e',
          confirmButtonText : 'Add Category',
          showCancelButton : true,
          showCloseButton: true,
          html : `
              <form>
                  <div class="form-row">
                  <div class="form-group col-md-6">
                      <input type="text" class="form-control" id="name" placeholder="Name" required>
                  </div>
                  <div class="form-group col-md-6">
                      <input type="number" class="form-control" id="Ordering" placeholder="Ordering" required>
                  </div>
                  <div class="form-group col-md-6">
                      <textarea class="form-control" id="description" placeholder="Description"  rows="5" cols="40" style="resize: none;"></textarea>
                  </div>
                  </div>
                  <div class="form-group col-md-6">
                  <div class="form-check form-switch">
                    <input class="form-check-input Visible switch-color" type="checkbox" id="checkBox">
                    <label class="form-check-label" for="checkBox">Visible</label>
                  </div>
                
                  <div class="form-check form-switch">
                    <input class="form-check-input allow-comments switch-color" type="checkbox" id="checkBox">
                    <label class="form-check-label" for="checkBox">Allow Comments</label>
                  </div>
                  
                  <div class="form-check form-switch">
                    <input class="form-check-input allow-ads switch-color" type="checkbox" id="checkBox">
                    <label class="form-check-label" for="checkBox">Allow Ads</label>
                  </div>
                  </div>
                  </div>
              </form>`,
              

            preConfirm: () => {
                return {
                name : document.getElementById('name').value,
                ordering : document.getElementById('Ordering').value,
                description : document.getElementById('description').value,
                visible : document.querySelector('.Visible').checked,
                allowComments : document.querySelector('.allow-comments').checked,
                allowAds : document.querySelector('.allow-ads').checked,
                }
          }
        });
        console.log(insertCategory);
        // check fields
        if(!insertCategory.name || !insertCategory.ordering || !insertCategory.description){
          const warning = await Swal.fire({
            icon : 'warning',
            iconColor : 'red',
            title : "Please complete the form",
            showCancelButton : true
          });
          // on 'ok' button click
          if(warning.isConfirmed){
            AddCategory();
          }
          return;
        }
    
        //send member data
        const response = await fetch(adminUrl.serverHost +  "/admin/categories/new-category", {
          method : 'POST',
          credentials : 'include',
          headers : {"Content-Type" : "application/json"},
          body : JSON.stringify({
            userId,
            name : insertCategory.name,
            ordering : insertCategory.ordering,
            description : insertCategory.description,
            visible : insertCategory.visible,
            allowComments : insertCategory.allowComments,
            allowAds : insertCategory.allowAds,
          })
        });
    
        const data = await response.json();
    
        // if there is an error fire a popup
        if(data.err_message){
          const warning = await Swal.fire({
            icon : 'warning',
            iconColor : 'red',
            title : "Something Went Rowng",
            text  : data.err_message,
            showCancelButton : true
          });
          // on 'ok' button click
          if(warning.isConfirmed){
            AddCategory();
          }
          return;
        }
        // if everything is correct 
        if(data.success){
          //password updated succssfully, fire success popup
          const success = await Swal.fire({
            icon : 'success',
            title : "New Member Added"
          })
          
          // on 'ok' button click
          if(success.isConfirmed){
            // reload the page
            window.location.reload();
          }
        }
        
    }



  return (
    <div>
      <Navbar_ />

<h1 className='text-center'>Manage Categories</h1>

{/* Table */}
<div className='container manage-container'>
    
  {/* add new member button */}
  <div className='table-responsive'>
  <div className='form-group'>
    <div className='col-sm-2'>
      <button className='btn btn-primary btn-sm' onClick={() => AddCategory()}>
        <FontAwesomeIcon icon={faAdd}></FontAwesomeIcon> New Member
        </button>
    </div>
  </div>

    <Table striped bordered hover className='main-table table table-bordered text-center'>
      {/* table headers */}
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Description</th>
          <th>Ordering</th>
          <th>Visible</th>
          <th>Allow Comments</th>
          <th>Allow Ads</th>
          <th>Controls</th>
        </tr>
      </thead>
      {/* table info */}
      <tbody>
        {category.map(item => (
            <tr>
            <td className='counterCell'></td>
            <td>{item.Name}</td>
            <td>{item.Description}</td>
            <td>{item.Ordering}</td>
            <td>{String(item.Visible)}</td>
            <td>{String(item.Allow_Comments)}</td>
            <td>{String(item.Allow_Ads)}</td>
            <td>
            <div>
                <a href='#' className='btn btn-success btn-sm'>
                <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon> Edit
                    </a>
                <a href='#' className='btn btn-danger btn-sm' >
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


    </div>
  )
}
