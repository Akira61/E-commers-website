import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
export default function Products() {

  const [data, setData] = useState([]);
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [visible, setVisible] = useState();
  const [desc, setDesc] = useState();
  const [image, setImage] = useState();

  const navigate = useNavigate();
  const [getImg, setGetImg] = useState();
  
  useEffect(() => {
    // get products info
    fetch("http://localhost:4000/api/products")
    .then(res=> res.json())
    .then(data => {
      console.log(data);
      setData(data);

    })

    // create new product
  popup()
  async function popup(){
    const { value: formValues } = await Swal.fire({
      icon : 'info',
      iconColor : 'green',
      title: 'Multiple inputs',
      html:
      '<div> <label>اسم المنتج <br/> <input id="name-input" class="swal2-input"> </label> </div><br/>' +
      '<div><label>  السعر بالريال<input id="price-input" type="number" min="0" class="swal2-input"></label> </div>' +
      '<div><label>صور</label><br/> <input type="file" draggable="true"/></div>' +
      '<div></div>',
      inputLabel : 'وصف المنتج',
      input : 'textarea',
      focusConfirm: false,
    
      preConfirm: () => {
        return {
          name : document.getElementById('name-input').value,
          price : document.getElementById('price-input').value
        }
        
      }
    })
    
    if (formValues) {
      Swal.fire(JSON.stringify(formValues));
      console.log(formValues)
    }
  }
  },[])
  
  
  function parseImg(img) {

    return <td><img src={`data:image/jpg;base64,${image}`} style={{width:'50%', objectFit:'cover'}}/></td>
    console.log(img.data)
    return image;
  }
  return (
    <div>
    
      <Link to="/new-product"><button>New product</button></Link>
      <div>
      <table style={{background : "black"}}>
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
                    <td><img src={new Image().src= new Text(element.fileData)} style={{width:'50%', objectFit:'cover'}}/></td>
                    <td>{element.name}</td>
                    <td><span>{element.price}</span></td>
                    <td>{element.description}</td>
                    <td><input type="checkbox" checked={element.visible}/> <label>Visible</label></td>
                    <td><a href={`/edit-product/${element.product_id}`}><button>Edit</button></a></td>
                    
                </tr>
                
              ))}
        </table>
      </div>
    </div>
  )
}
