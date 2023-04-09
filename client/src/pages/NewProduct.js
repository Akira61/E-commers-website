import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function NewProduct() {

    const [productName, setProductName] = useState();
    const [price, setPrice] = useState();
    const [productDesc, setProductDesc] = useState();
    const [productImg, setProductImg] = useState();
    const [visible, setVisible] = useState(false);

    // new image name from server
    const [resLink, setResLink] = useState();

    // files configrations
    async function newProduct(){

      const fileName = productImg.name;
      const render = new FileReader();
      render.readAsDataURL(productImg);

      render.onload =async () => {
        console.log(render.result);
        const response = await fetch("http://localhost:4000/api/new-product", {
            method : "POST",
            headers : { "Content-Type" : "application/json"},
            body : JSON.stringify({productName, price, productDesc, fileData : render.result, fileName, visible})
        });
        const data = await response.json();
        console.log(data);
        setResLink(`/image/${data.imgUrl}`)
      };

    };

  return (
    <div>
        <input type="text" value={productName}   onChange={(e) => setProductName(e.target.value)}/>
        <input type='number' onChange={(e) => setPrice(e.target.value)}/>
        <textarea  id="" cols="30" rows="10" value={productDesc} onChange={(e) => setProductDesc(e.target.value)}></textarea>
        <input type="file" id="" onChange={(e) => setProductImg(e.target.files[0])}/>
        <input type='checkbox' checked={visible} onChange={(e) => setVisible(e.target.checked)}/>
        <button onClick={() => newProduct()}>upload</button>
        <Link to={resLink}>see image</Link>
    </div>
  )
}
