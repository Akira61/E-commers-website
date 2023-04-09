import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
export default function GetProductImage() {

    const {id} = useParams();

    const [img, setImg] = useState();
    useEffect(() => {
        fetch(`http://localhost:4000/image/${id}`)
        .then(imgURL => {
            setImg(imgURL)
        });
    })

  return (
    <div>
      <img src={img}/>
    </div>
  )
}
