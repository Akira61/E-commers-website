import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
export default function GetProductImage() {

    const {id} = useParams();
    const [img, setImg] = useState();
    useEffect(() => {
        fetch(`http://localhost:4000/image/${id}`, {method: "GET"})
        .then(res => res.text())
        .then(data => {
            console.log(data)
            //let image = URL.createObjectURL(data);
            let image = new Image().src = data;
            console.log(image)
            setImg(image)
        })
    },[])

  return (
    <div>
      <img src={img}/>
    </div>
  )
}
