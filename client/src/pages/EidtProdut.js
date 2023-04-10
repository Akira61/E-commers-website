import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function EidtProdut() {
    const {id} = useParams();
    const [proudct, setProduct] = useState();

    useEffect(() => {

        fetch( `http://localhost:4000/get-product/${id}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setProduct(data);
        })
    },[])

    function update(){};
  return (
    <div>
      {/* <input type="text" value={proudct.name}/>
        <input type='number' value={proudct.price}/>
        <textarea  id="" cols="30" rows="10" value={proudct.description}></textarea>
        <input type="file" id="" />
        <input type='checkbox' checked={proudct.visible} />
        <Link to="/products-dashbord"><button onClick={() => update()}>update</button></Link> */}
    </div>
  )
}
