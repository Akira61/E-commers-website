import React, { useEffect, useRef, useState } from 'react';
import '../../style/productBox.css';
export default function ProductBox({data}) {

    // async function readImg(img){

    //     const res = await fetch(`http://localhost:4000/image/${img}`);
    //     const data = await res.text();
    //     // const setImg = new FileReader();
    //     // setImg.readAsDataURL(data)

    //     // setImg.onload = function() {
    //     //     console.log(setImg.result)
    //     //     return setImg.result;
    //     // }
    //     console.log(res)
    //     return res
    // }
    // function getimg(link){
    //     const res = readImg(link);

    //     const image =  new Image().src = res
    //     console.log(image)
    //     return res
        
    // }
    
  return (
    <div className='container'>
      {data.map(item => {
        if(item.visible){
        return(
            <div className='product'>
                <div className='image'>
                    <img src={`/uploads/${item.fileName}`} width="236" height="236" style={{objectFit : 'cover'}}/>
                </div>
                <div className='info'>
                  <h3 className='productName'>{item.name}</h3>
                  <span className='productPrice'>{item.price}</span> ر.س
                  
                  {/* <p className='productDesc'>{item.description}</p> */}
                </div>
            </div>
        )
        }
      })}
    </div>
  )
}
