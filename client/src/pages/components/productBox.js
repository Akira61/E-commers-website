import React, { useEffect, useRef, useState } from 'react'
export default function ProductBox({data}) {

    const [proudct, setProduct] = useState([]);
    useEffect(() => {
        setProduct(data);
    })

    async function readImg(img){

        const res = await fetch(`http://localhost:4000/image/${img}`);
        const data = await res.text();
        // const setImg = new FileReader();
        // setImg.readAsDataURL(data)

        // setImg.onload = function() {
        //     console.log(setImg.result)
        //     return setImg.result;
        // }
        console.log(res)
        return res
    }
    function getimg(link){
        const res = readImg(link);

        const image =  new Image().src = res
        console.log(image)
        return res
        
    }
  return (
    <div>
      {data.map(item => {
        return(
            <div className='product'>
                <div>
                    <img src={`/uploads/${item.fileName}`} width="236"/>
                </div>
                <h3>{item.name}</h3>
                <span>{item.price}</span>
                <p>{item.description}</p>
            </div>
        )
      })}
    </div>
  )
}
