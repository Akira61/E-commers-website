import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';

export default function Products() {

  const [data, setData] = useState([]);
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [visible, setVisible] = useState();
  const [desc, setDesc] = useState();
  const [image, setImage] = useState();

  const [getImg, setGetImg] = useState();
  useEffect(() => {

    fetch("http://localhost:4000/api/products")
    .then(res=>res.json())
    .then(data => {
      console.log(data);
      setData(data);

    })

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
