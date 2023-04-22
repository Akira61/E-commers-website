import React, { useEffect, useRef, useState } from 'react'

export default function ProductBox({data}) {
    const imgRef = useRef();

    const [proudct, setProduct] = useState([]);
    useEffect(() => {
        setProduct(data);
        console.log("3".repeat(29),window.webkitURL.createObjectURL(new Blob(data.fileData)))
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
        return data
    }
    function getimg(link){
        const res = readImg(link);

        const image =  new Image().src = res
        console.log(image)
        return image
        
    }
  return (
    <div>
      {data.map(item => {
        return(
            <div className='products'>
                <div>
                    <img src={getimg(item.fileName)}/>
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
