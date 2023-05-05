import { faAdd, faComment, faCommentSlash, faComments, faEdit, faEye, faEyeDropper, faEyeSlash, faRemove, faSort, faStore, faStoreSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import $ from 'jquery';
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
        getCategories(adminUrl.serverHost  + "/admin/categories/get-all")
    },[]);

    //get categories function
    async function getCategories(url){
        const response = await fetch(url ,{
            credentials : "include"
        });
        const data = await response.json();
        console.log(data);
        setCategory(data);
    }


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
            title : "New Category Added"
          })
          
          // on 'ok' button click
          if(success.isConfirmed){
            // reload the page
            window.location.reload();
          }
        }
        
    }


    // Edite Categorie
        async function EditCategory(Category_id){

            //send request to get member info
            const response = await fetch(adminUrl.serverHost + `/admin/categories/get-one?id=${Category_id}`, {
                method : "get",
                credentials : "include",
            });
            const data = await response.json();
            if(!response.ok){
                return;
            }
            console.log(data)
        
            //edit popup
            popup()
            async function popup(){
                
                let category = await Swal.fire({
                icon : 'info',
                iconColor : 'gold',
                title : 'Edit Category',
                confirmButtonColor : 'gold',
                confirmButtonText : 'Edit Category',
                showCancelButton : true,
                showCloseButton: true,
                html : `
              <form>
                  <div class="form-row">
                  <div class="form-group col-md-6">
                      <input type="text" class="form-control" id="name" placeholder="Name" value="${data.Name}" required>
                  </div>
                  <div class="form-group col-md-6">
                      <input type="number" class="form-control" id="Ordering" placeholder="Ordering" value = ${data.Ordering} required>
                  </div>
                  <div class="form-group col-md-6">
                      <textarea class="form-control" id="description" placeholder="Description"  rows="5" cols="40" style="resize: none;" >${data.Description}</textarea>
                  </div>
                  </div>
                  <div class="form-group col-md-6">
                  <div class="form-check form-switch">
                    <input class="form-check-input Visible switch-color" type="checkbox" id="checkBox" ${data.Visible? 'checked':false}>
                    <label class="form-check-label" for="checkBox">Visible</label>
                  </div>
                
                  <div class="form-check form-switch">
                    <input class="form-check-input allow-comments switch-color" type="checkbox" id="checkBox" ${data.Allow_Comments ? 'checked' : false}>
                    <label class="form-check-label" for="checkBox">Allow Comments</label>
                  </div>
                  
                  <div class="form-check form-switch">
                    <input class="form-check-input allow-ads switch-color" type="checkbox" id="checkBox" ${data.Allow_Ads? 'checked':false}>
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
                }}
            });
                if(!data.Visible){
                    category.value.visible = false;
                }
        
                //send new data
                if(category.isConfirmed){
                console.log(category.value)
                const response = await fetch( adminUrl.serverHost + `/admin/categories/Edit-category`, {
                    method : 'PUT',
                    headers : {"Content-Type" : "application/json"},
                    credentials : "include",
                    body : JSON.stringify({
                    Name : category.value.name,
                    Description : category.value.description,
                    Ordering : category.value.ordering,
                    Allow_Ads : category.value.allowAds,
                    Allow_Comments : category.value.allowComments,
                    userId,
                    Category_id,
                    })
                });
            
                const data = await response.json();
                //handel server error
                if(data.err_message){
                    const res = await Swal.fire({
                        icon : 'error',
                        title : "unvalid data",
                        text : data.err_message,
                        showCancelButton : true,
                    });
                    // if user click 'ok' button popup change password
                    if(res.isConfirmed){
                        popup();
                    }
                }
                if(data.success){
                    //password updated succssfully, fire success popup
                    const success = await Swal.fire({
                    icon : 'success',
                    title : "Category Updated"
                    })
                    // on 'ok' button click
                    if(success.isConfirmed){
                    // reload the page
                    window.location.reload();
                    }
                }}
            }
            //send data
           
        }  


        //Delete Category
        async function DeleteCategory(Category_id){
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
                const sendReq = await fetch(adminUrl.serverHost + `/admin/categories/delete-category/${userId}/${Category_id}`, {
                method: "DELETE",
                credentials : "include"
                });
                const data = await sendReq.json()
                console.log(data)
        
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
    <script defer src="jquery-3.6.4.min.js"></script>
      <Navbar_ />

        <h1 className='text-center'>Manage Categories</h1>
        <br />
        <div className='container'>

            {/* Start add Button */}
                <div className='form-group'>
                    <div className='col-sm-2'>
                        <button className='btn btn-primary btn-sm' onClick={() => AddCategory()}>
                        <FontAwesomeIcon icon={faAdd}></FontAwesomeIcon> New Category
                        </button>
                    </div>
                </div>
            {/* End add button */}

            </div><div class="container card categories" style={{width: '60%'}}>
                {/* Header */}
                    <div class="card-header">
                        Manage Categories
                        <div className='ordering float-md-end'>
                           <FontAwesomeIcon icon={faSort}></FontAwesomeIcon> Ordering : 
                            <a href='#' onClick={() => getCategories(adminUrl.serverHost  + "/admin/categories/get-all?sort=DESC")}>Latest</a>|
                            <a href='#' onClick={() => getCategories(adminUrl.serverHost  + "/admin/categories/get-all?sort=ASC")}>Oldest</a>
                        </div>
                    </div>
                {/* End Header */}
            {/* body */}
                <div class="card-body">
                    {category.map((item,i) => (
                        
                        <div className='categories-body'>
                        {/* <span className='counterCell'></span> */}
                        
                            <h3>{item.Name}</h3>
                        <div className='full-view'>
                        <p>{item.Description}</p>
                        {/* <span>{item.Ordering}</span> */}

                        {item.Visible?
                        <span className='btn btn-success btn-sm'>
                            <FontAwesomeIcon icon={faEye}></FontAwesomeIcon> Visible
                        </span>:
                        <span className='btn btn-danger btn-sm'>
                            <FontAwesomeIcon icon={faEyeSlash}>
                            </FontAwesomeIcon> Hidden
                        </span>}

                        {item.Allow_Comments?
                        <span style={{backgroundColor: '#ff9f43'}} className='btn btn-success btn-sm'>
                            <FontAwesomeIcon icon={faComment}></FontAwesomeIcon> Comments Enabled
                        </span>:
                        <span style={{backgroundColor: '#ff6348'}} className='btn btn-danger btn-sm'>
                            <FontAwesomeIcon icon={faCommentSlash}></FontAwesomeIcon> Comments Disabled
                        </span>}

                        {item.Allow_Ads?
                        <span style={{backgroundColor: '#f368e0'}} className='btn btn-success btn-sm'>
                            <FontAwesomeIcon icon={faStore}></FontAwesomeIcon> Ads Enabled
                        </span>:
                        <span className='btn btn-danger btn-sm'>
                            <FontAwesomeIcon icon={faStoreSlash}></FontAwesomeIcon> Ads Disabled
                        </span>}
                        
                            <div className='float-md-end'>
                                <a href='#' onClick={() => EditCategory(item.Category_id)} style={{backgroundColor: '#5f27cd'}} className='btn btn-success btn-sm'>
                                <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon> Edit
                                </a>
                                <a href='#' onClick={() => DeleteCategory(item.Category_id)} className='btn btn-danger btn-sm' >
                                <FontAwesomeIcon icon={faRemove}></FontAwesomeIcon> Delete
                                </a>
                            </div>
                            <hr />
                        </div>
                    </div>
                    ))}
                </div>
            {/* End body */}
            
        </div>
    </>
  )
}


{/* <div className='container manage-container'>
    
    
    <div className='table-responsive'>
    <div className='form-group'>
      <div className='col-sm-2'>
        <button className='btn btn-primary btn-sm' onClick={() => AddCategory()}>
          <FontAwesomeIcon icon={faAdd}></FontAwesomeIcon> New Member
          </button>
      </div>
    </div>
  
      <Table striped bordered hover className='main-table table table-bordered text-center'>
        
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
  </div> */}