import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Navbar_ from '../includes/components/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faClipboard, faComment, faEdit, faEye, faEyeSlash, faRemove, faStar, faUser } from '@fortawesome/free-solid-svg-icons';
import "../layout/css/products.css"
import { adminUrl } from '../includes/functions/admin.path';
import { isAdmin } from '../includes/functions/IsAdmin';

export default function Products() {

  const [data, setData] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {

    //check if admin
    isAdmin(adminUrl.productsDashboard, navigate);

    // get products info
    fetch("http://localhost:4000/products", {
      credentials : 'include'
    })
    .then(res=> res.json())
    .then(data => {
      console.log(data);
      setData(data);
    })
    
  },[])

  // create new product
  async function newProduct(){
    //get categories
    const response = await fetch(adminUrl.serverHost + "/admin/categories/get-all", {
      credentials : 'include'
    });
    const categories = await response.json();
    console.log(categories)
    const { value: formValues } = await Swal.fire({
      icon : 'info',
      iconColor : 'green',
      title: 'بيانات المنتج',
      showCloseButton: true,
      html:
      `
      <form>
        <div class="form-row">
          <div class="form-group col-md-6">
            <input type="text" class="form-control" id="name-input" placeholder="Product Name" required>
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <input type="number" class="form-control" id="price-input" placeholder="Price" required>
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label from='file-input'> Image </label>
            <input type="file" class="form-control" id="file-input" required>
        </div>
        <div class="form-group col-md-6">
          <textarea class="form-control" id="description" placeholder="Description"  rows="5" cols="40" style="resize: none;" ></textarea>
        </div>
        <div class="form-group col-md-6">
        <select id="rating" class="form-select" aria-label="Default select example">
          <option default hidden>Rating</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
      </select>
        </div>
        <div class="form-group col-md-6">
        <select id="category" class="form-select" aria-label="Default select example">
          <option default hidden>Categories</option>
          ${categories.map((category,i) => (
            `<option catId=${category.id}>${category.Name}</option>`
          ))}
      </select>
        </div>
        <div class="form-group col-md-6">
          <div class="form-check form-switch">
          <input class="form-check-input Visible switch-color" type="checkbox" id="visible-input">
          <label class="form-check-label" for="visible-input">Show it in the store?</label>
        </div>
      </form>
      `,
      focusConfirm: false,
    
      preConfirm: () => {
        return {
          name : document.getElementById('name-input').value,
          price : document.getElementById('price-input').value,
          img : document.querySelector('#file-input').files[0],
          description : document.querySelector('#description').value,
          rating : document.querySelector("#rating").value,
          visible : document.querySelector("#visible-input").checked,
          category  :document.querySelector("#category").value,
        }
        
      }
    })
    console.log(formValues);
    // post inputs to the backend
    insertData()
    async function insertData(){

      const formData = new FormData();
        formData.append('productName', formValues.name);
        formData.append('price', formValues.price);
        formData.append('productDesc', formValues.description);
        formData.append('fileData', formValues.img);
        formData.append('rating', formValues.rating);
        formData.append('visible', formValues.visible);
        formData.append('category', formValues.category);
      
      const response = await fetch(adminUrl.serverHost + "/product/new-product", {
        method : "POST",
        credentials : "include",
        body :  formData,
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
            newProduct();
        }
    } 
    if(data.success){
        //password updated succssfully, fire success popup
        const success = await Swal.fire({
        icon : 'success',
        title : "Product Added"
        })
        // on 'ok' button click
        if(success.isConfirmed){
        // reload the page
        window.location.reload();
        }
    }
    }
    
  }
  

  // edit products
  async function editProduct(productId){

    //get product information
    const getData = await fetch(`http://localhost:4000/get-product/${productId}`);
    let data = await getData.json();
    console.log(data);
    //get categories
    const response = await fetch(adminUrl.serverHost + "/admin/categories/get-all", {
      credentials : 'include'
    });
    const categories = await response.json();
    
    // aplay info to the alert
    const { value : updatedData } = await Swal.fire({
      title : 'تعديل بيانات المنتج',
      imageUrl: `/uploads/${data.fileName}`,
      imageWidth : '50%',
      showCloseButton: true,
      html : 
      `<form>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label>Auther : <span>${data.member_name}</span></label>
      </div>
        <div class="form-group col-md-6">
          <span>Name :</span> <input type="text" class="form-control" id="name-input" value='${data.name}'>
      </div>
      <div class="form-row">
        <div class="form-group col-md-6">
          Price : <input type="number" min="0" class="form-control" id="price-input" value=${data.price}>
      </div>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label from='file-input'> Edit Image :</label>
          <input type="file" class="form-control" id="file-input" required>
      </div>
      <div class="form-group col-md-6">
        Description : <textarea class="form-control" id="description" placeholder="Description"  rows="5" cols="40" style="resize: none;" >${data.description}</textarea>
      </div>
      <div class="form-group col-md-6">
      Rating : <select id="rating" class="form-select" aria-label="Default select example">
        <option default hidden>${data.rating}</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
    </select>
      </div>
      <div class="form-group col-md-6">
      Category : <select id="category" class="form-select" aria-label="Default select example">
        <option default hidden>${data.Category_Name}</option>
        ${categories.map((category,i) => (
          `<option catId=${category.id}>${category.Name}</option>`
        ))}
    </select>
      </div>
      <div class="form-group col-md-6">
        <div class="form-check form-switch">
        <input class="form-check-input Visible switch-color" type="checkbox" id="visible-input" ${data.visible?'checked':false}>
        <label class="form-check-label" for="visible-input">Show it in the store?</label>
      </div>
    </form>`,
      preConfirm: () => {
        return {
          name : document.getElementById('name-input').value,
          price : document.getElementById('price-input').value,
          img : document.querySelector('#file-input').files[0],
          description : document.querySelector('textarea').value,
          visible : document.querySelector("#visible-input").checked,
          rating : document.querySelector("#rating").value,
          category : document.querySelector("#category").value,
        }
        
      }
    });

    // send new data to the server
    if(updatedData){

      const formData = new FormData();
        formData.append('name', updatedData.name);
        formData.append('price', updatedData.price);
        formData.append('description', updatedData.description);
        formData.append('fileData', updatedData.img);
        formData.append('visible', updatedData.visible);
        formData.append('rating', updatedData.rating);
        formData.append('category', updatedData.category);


      const response =await fetch(`http://localhost:4000/update-product/${productId}`, {
        method: "PUT",
        credentials : "include",
        // headers: {"Content-Type" : "application/json"},
        // body : JSON.stringify({name : updatedData.name,
        //   price : updatedData.price,
        //   visible : updatedData.visible,
        //   description : updatedData.description,
        //   fileData : updatedData.img,
        //   rating : updatedData.rating,
        //   category : updatedData.category,
        // })
        body : formData,
      });
      const data = await response.text();
      console.log(data);

      Swal.fire({
        icon : 'success',
        title : "تم حفظ التغييرات بنجاح"
      });
    }
  }


  // delete product 
  async function deleteProduct(id){

    //warning before actions
    const {value : deletedProduct } =await Swal.fire({
      icon : 'warning',
      iconColor : 'red',
      title : 'Are You Sure ?',
      showCancelButton : true,
      showCloseButton: true,
    });

    if(deletedProduct){
      const sendReq = await fetch(`http://localhost:4000/delete-product/${id}`, {
        method: "DELETE",
        credentials : 'include'
      });
      console.log(sendReq);
    }
  }


  //show comments
  async function showComments(product_id){
    const response  = await fetch(adminUrl.serverHost + `/comments/get-one?product_id=${product_id}`, {
      credentials : "include"
    });
    const comments = await response.json();

    const { value : updatedData } = await Swal.fire({
      title : "Product Comments",
      showCloseButton: true,
      html : 
      `<form>
      ${comments.map(comment => (
      `<div class="form-group col-md-6">
          ${comment.name} : <div class="form-control" id="description" placeholder="Description"  rows="5" cols="40" style="resize: none;" >${comment.comment}</div>
          <hr/>
        </div>`
      ))}
    </form>`,
    });
  }

  return (
    <div>
      {/* <Navbar_ />
      <button onClick={() => newProduct()}>New product</button>

      <div>
      <table style={{background : "black", color: 'black'}}>
            <tr style={{background : "green"}}>
                <th style={{width : 200}}>Image</th>
                <th style={{width : 200}}>Name</th>
                <th style={{width : 200}}>price</th>
                <th style={{width : 200}}>Description</th>
                <th style={{width : 200}}>Visible</th>
                <th>Edit / Delete</th>
                

            </tr>
              {data.map(element => (
                <tr style={{background : "gray"}}>
                    <td><img src={`/uploads/${element.fileName}`} style={{width:'50%', objectFit:'cover'}}/></td>
                    <td>{element.name}</td>
                    <td><span>{element.price}</span></td>
                    <td>{element.description}</td>
                    <td><input type="checkbox" checked={element.visible} value={element.visible}/> <label>Visible</label></td>
                    <td><button onClick={() => editProduct(element.product_id)}>Edit</button>
                    <button onClick={() => deleteProduct(element.product_id)}>delete</button></td>
                </tr>
                
              ))}
        </table>
      </div> */}


      <Navbar_ />

<h1 className='text-center'>Manage Products</h1>

<div className='form-group'>
      <div className='col-sm-2'>
        <button className='btn btn-primary btn-sm' onClick={() => newProduct()}>
          <FontAwesomeIcon icon={faAdd}></FontAwesomeIcon> New Product
          </button>
      </div>
</div>
{/* Table */}
      <div className='container'>
        {data.map(element => (
          <div class="card" style={{width : '18rem', borderRadius: '5px'}}>
            <div class="card" onClick={() => editProduct(element.product_id)} style={{cursor:"pointer"}}>
              <img src={`/uploads/${element.fileName}`} style={{borderRadius: '5px',height:'50%', objectFit:'cover'}}/>
              <div class="card-body">
                <h5 class="card-title">{element.name}</h5>
                <span>${element.price}</span>
                <p class="card-text">{element.description}</p>

                {/* check visibility */}
                {element.visible?
                  <span className='btn btn-success btn-sm'>
                      <FontAwesomeIcon icon={faEye}></FontAwesomeIcon> Visible
                  </span>:
                  <span className='btn btn-danger btn-sm'>
                      <FontAwesomeIcon icon={faEyeSlash}>
                      </FontAwesomeIcon> Hidden
                  </span>
                }
                {/* End check */}
                <span style={{backgroundColor: '#ff9f43', color:'#FFF'}} className='btn  btn-sm'><FontAwesomeIcon icon={faClipboard} /> : {element.Category_Name}</span>< br/>
                <span className='btn btn-danger btn-sm'> <FontAwesomeIcon icon={faUser} /> : {element.member_name}</span>
            </div>
              </div>
              <div>
                    <a href='#' className='btn btn-success btn-sm' onClick={() => editProduct(element.product_id)}>
                    <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon> Edit
                        </a>
                    <a href='#' className='btn btn-danger btn-sm' onClick={() => deleteProduct(element.product_id)}>
                    <FontAwesomeIcon icon={faRemove}></FontAwesomeIcon> Delete
                    </a>
                    <a href='#' style={{backgroundColor: '#f368e0', color: '#FFF'}} className='btn btn-sm' onClick={() => showComments(element.id)}>
                    <FontAwesomeIcon icon={faComment}></FontAwesomeIcon> Comments
                    </a>
                  </div>
            
          </div>
        ))}
      </div>

    </div>
  )
}



{/* <div className='container manage-container'>
    
    
    <div className='table-responsive'>
    <div className='form-group'>
      <div className='col-sm-2'>
        <button className='btn btn-primary btn-sm' onClick={() => newProduct()}>
          <FontAwesomeIcon icon={faAdd}></FontAwesomeIcon> New Product
          </button>
      </div>
    </div>
  
      <Table striped bordered hover className='main-table table table-bordered text-center'>
        
        <thead>
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Name</th>
            <th>price</th>
            <th>Description</th>
            <th>Visible</th>
            <th>Controls</th>
          </tr>
        </thead>
       
        <tbody>
          {data.map(element => (
              <tr>
              <td className='counterCell'></td>
              <td><img src={`/uploads/${element.fileName}`} style={{width:'50%', objectFit:'cover'}} id='product-img'/></td>
              <td>{element.name}</td>
              <td><span>{element.price}</span></td>
              <td>{element.description}</td>
              <td><input type="checkbox" checked={element.visible} value={element.visible}/> <label>Visible</label></td>
              <td>
              <div>
                  <a href='#' className='btn btn-success btn-sm' onClick={() => editProduct(element.product_id)}>
                  <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon> Edit
                      </a>
                  <a href='#' className='btn btn-danger btn-sm' onClick={() => deleteProduct(element.product_id)}>
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
*/}