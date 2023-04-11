import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function EidtProdut() {

    const {id} = useParams();
    

    //onChange variables
    const [name, setName] = useState();
    const [price, setPrice] = useState();
    const [visible, setVisible] = useState();
    const [description, setDescription] = useState();
    const [fileData, setFileData] = useState();

    //get image from server
    const [image, setImage] = useState();
    useEffect(() => {

        fetchData()
        function fetchData(){
            fetch("http://localhost:4000/get-product/"+id)
            .then(res => res.json())
            .then(data => {
                console.log(data);
            
                setName(data.name);
                setPrice(data.price);
                setVisible(data.visible);
                setDescription(data.description);
                setFileData(data.fileData)

                // get image
                getImg(data.fileName);
                function getImg(img) {
                    console.log("$".repeat(39),data.fileName)
                    fetch(`http://localhost:4000/image/${img}`, {method: "GET"})
                    .then(res => res.text())
                    .then(DATA => {
                        console.log(DATA)
                        //let image = URL.createObjectURL(data);
                        let image = new Image().src = DATA;
                        console.log(image)
                        setImage(image);
                    })
        }
            })
        };

        

    },[]);

    async function updateData(){
        console.log("update sent");
        console.log(name, price, visible, description, fileData);
        
        const response =await fetch(`http://localhost:4000/update-product/${id}`, {
            method: "PUT",
            headers: {"Content-Type" : "application/json"},
            body : JSON.stringify({name, price, visible, description, fileData})
        });
        const data = await response.text();
        console.log(data);
    }

    function deleteProduct(){
        fetch(`http://localhost:4000/delete-product/${id}`, {method: "DELETE"})
        .then(res => console.log(res));
    }

 
  return (
    <div> 
        <img src={image} width="200"/>
      <input type="text" value={name} onChange={e => setName(e.target.value)}/>
        <input type='number' value={price} onChange={e => setPrice(e.target.value)}/>
        <textarea  id="" cols="30" rows="10" value={description} onChange={e => setDescription(e.target.value)}></textarea>
        <input type="file" id="" />
        <input type='checkbox' checked={visible} /*checked={info.visible}*/ onChange={e => setVisible(e.target.checked)}/>
        <Link to='/products-dashbord'>
        <button type='submit' onClick={() => updateData()}>update</button>
        <button onClick={() => deleteProduct()}>Delete product</button>
        </Link>
    </div>
  )
}

