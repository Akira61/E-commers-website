import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function EidtProdut() {

    const {id} = useParams();
    
        const [info, setInfo] = useState({});

    //onChange variables
    const [name, setName] = useState(info.name);
    const [price, setPrice] = useState(info.price);
    const [visible, setVisible] = useState(info.visible);
    const [description, setDescription] = useState(info.description);
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
                setInfo(data);

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
      <input type="text" defaultValue={info.name} onChange={e => setName(e.target.value)}/>
        <input type='number' defaultValue={info.price} onChange={e => setPrice(e.target.value)}/>
        <textarea  id="" cols="30" rows="10" defaultValue={info.description} onChange={e => setDescription(e.target.value)}></textarea>
        <input type="file" id="" />
        <input type='checkbox' defaultValue={info.visible} /*checked={info.visible}*/ onChange={e => setVisible(e.target.value)}/>
        <button type='submit' onClick={() => updateData()}>update</button>
        <button onClick={() => deleteProduct()}>Delete product</button>
    </div>
  )
}





// const {id} = useParams();

//     const [name, setName] = useState();
//     const [price, setPrice] = useState();
//     const [desc, setDesc] = useState();
//     const [Visible, setVisible] = useState();
//     const [image, setImage] = useState();

//     // onChange variables
//     const [proudct, setProduct] = useState({});
//     const [updateName , setUpadteName] = useState();
//     const [updatePrice , setUpadtePrice] = useState();
//     const [updateDesc , setUpadteDesc] = useState();
//     const [updateVisible , setUpadteVisible] = useState();
//     const [updateImage , setUpadteImage] = useState();

//     useEffect(() => {
//         fetch( `http://localhost:4000/get-product/${id}`)
//         .then(res => res.json())
//         .then(data => {
//             console.log(data);
//             setProduct(data);
//             setName(data.name);
//             setPrice(data.price);
//             setDesc(data.description);
//             setVisible(data.visible);
//             setImage(data.fileData);
//         })
//     },[]);

//     function update(){
//         console.log("update sent");
//         fetch("http://localhost:4000/update-product/?", id,{
//             method : "put",
//             headers :{'Content-Type': 'application/json'},
//             body : JSON.stringify({name: updateName, price: updatePrice, visible: updateVisible, description : updateDesc, image: updateImage})
//         }).then(res => console.log(res));
//     };


//     function deleteProduct(){
//         fetch("http://localhost:4000/delete-product/?", id,{
//             method : "delete",
//             headers :{'Content-Type': 'application/json'},
//         }).then(res => console.log(res));
//     }
