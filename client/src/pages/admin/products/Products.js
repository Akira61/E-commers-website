import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Navbar_ from '../includes/components/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faEdit, faRemove } from '@fortawesome/free-solid-svg-icons';
import Table from 'react-bootstrap/esm/Table';
import "../layout/css/products.css"

export default function Products() {

  const [data, setData] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    // get products info
    fetch("http://localhost:4000/products")
    .then(res=> res.json())
    .then(data => {
      console.log(data);
      setData(data);

    })

  },[])


  // create new product
  async function newProduct(){
    const { value: formValues } = await Swal.fire({
      icon : 'info',
      iconColor : 'green',
      title: 'بيانات المنتج',
      showCloseButton: true,
      html:
      '<div> <label> جاهز للعرض؟ <br/> <input type="checkbox" id="visible-input"> </label> </div><br/>'+
      '<div> <label>اسم المنتج <br/> <input id="name-input" class="swal2-input"> </label> </div><br/>' +
      '<div><label> السعر بالريال <br/><input id="price-input" type="number" min="0" class="swal2-input"></label> </div>' +
      '<div><label>صور</label><br/> <input type="file" id="file-input" draggable="true"/></div>' +
      '<div></div>',
      inputLabel : 'وصف المنتج',
      input : 'textarea',
      focusConfirm: false,
    
      preConfirm: () => {
        return {
          name : document.getElementById('name-input').value,
          price : document.getElementById('price-input').value,
          img : document.querySelector('#file-input').files[0],
          description : document.querySelector('textarea').value,
          visible : document.querySelector("#visible-input").checked,
        }
        
      }
    })
    // post inputs to the backend
    insertData()
    async function insertData(){

      const formData = new FormData();
        formData.append('productName', formValues.name);
        formData.append('price', formValues.price);
        formData.append('productDesc', formValues.description);
        formData.append('fileData', formValues.img);
        formData.append('visible', formValues.visible);

      const response = await fetch("http://localhost:4000/api/new-product", {
        method : "POST",
        body :  formData,
      });
      const data = await response.json();
    }
    
    // alert success if values inserted
    if (formValues) {
      Swal.fire({
        icon : 'success',
        title : "تم حفظ المنتج بنجاح"
      });
      console.log(formValues);
    }
  }
  

  // edit products
  async function editProduct(productId){

    //get product information
    const getData = await fetch(`http://localhost:4000/get-product/${productId}`);
    let data = await getData.json();
    console.log(data);
    
    // aplay info to the alert
    const { value : updatedData } = await Swal.fire({
      icon : 'question',
      title : 'تعديل بيانات المنتج',
      showCloseButton: true,
      html : 
      `<div> <label> جاهز للعرض؟ <br/> <input type="checkbox" id="visible-input" checked=${data.visible}> </label> </div><br/>`+
      `<div> <label>اسم المنتج <br/> <input id="name-input" class="swal2-input" value="${data.name}" > </label> </div><br/>` +
      `<div><label> السعر بالريال <br/><input id="price-input" type="number" min="0" value=${data.price}></label> </div>` +
      `<div><label>صور</label><br/> <img src="/uploads/${data.fileName}" width ='50%' objectFit='cover'/></div>` +
      '<div><label> تعديل الصورة </label><br/> <input type="file" id="file-input" draggable="true"/></div>' +
      '<div></div>',
      inputLabel : 'وصف المنتج',
      input : 'textarea',
      inputValue : data.description,
      preConfirm: () => {
        return {
          name : document.getElementById('name-input').value,
          price : document.getElementById('price-input').value,
          img : document.querySelector('#file-input').files[0],
          description : document.querySelector('textarea').value,
          visible : document.querySelector("#visible-input").checked,
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


      const response =await fetch(`http://localhost:4000/update-product/${productId}`, {
        method: "PUT",
        headers: {"Content-Type" : "application/json"},
        body : JSON.stringify({name : updatedData.name,
          price : updatedData.price,
          visible : updatedData.visible,
          description : updatedData.description,
          fileData : updatedData.img
        })
        // body : formData,
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
      title : 'هل انت متأكد؟',
      showCancelButton : true,
      showCloseButton: true,
      cancelButtonText : 'الغاء'
    });

    if(deletedProduct){
      const sendReq = await fetch(`http://localhost:4000/delete-product/${id}`, {method: "DELETE"});
      console.log(sendReq);
    }
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

{/* Table */}
      <div className='container'>
        {data.map(element => (
          <div class="card" style={{width : '18rem', borderRadius: '5px'}}>
            <div class="card" onClick={() => editProduct(element.product_id)} style={{cursor:"pointer"}}>
              <img src={`/uploads/${element.fileName}`} style={{borderRadius: '5px'}}/>
              <div class="card-body">
                <h5 class="card-title">{element.name}</h5>
                <span>${element.price}</span>
                <p class="card-text">{element.description}</p>
              </div>
            </div>
              <div>
                    <a href='#' className='btn btn-success btn-sm' onClick={() => editProduct(element.product_id)}>
                    <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon> Edit
                        </a>
                    <a href='#' className='btn btn-danger btn-sm' onClick={() => deleteProduct(element.product_id)}>
                    <FontAwesomeIcon icon={faRemove}></FontAwesomeIcon> Delete
                        </a>
                        <input type="checkbox" checked={element.visible} value={element.visible}/> <label>Visible</label>
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