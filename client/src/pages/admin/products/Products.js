import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function Products() {

  const [data, setData] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    // get products info
    fetch("http://localhost:4000/api/products")
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
      cancelButtonText : 'الغاء'
    });

    if(deletedProduct){
      const sendReq = await fetch(`http://localhost:4000/delete-product/${id}`, {method: "DELETE"});
      console.log(sendReq);
    }
  }

  return (
    <div>
    
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
      </div>
    </div>
  )
}
