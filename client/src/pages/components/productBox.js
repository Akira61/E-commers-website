import React, { useEffect, useRef, useState } from 'react';
import '../../style/productBox.css';
import Navbar_ from './Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpand, faHeart, faPlus, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
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
    console.log('3'.repeat(5), data)
  return (
    <>
      <div className='container d-flex align-items-center justify-content-center'>     
        <div className='row my-5'>
          {data.map(item => {
            if(item.visible){
            return(
                    // <div className='col-sm-6 col-md-3'>
                    //   <div className='thumbnail item-box'>
                    //     <span className='price-tag'>{item.price}</span> ر.س
                    //     <img className='img-responsive' src={`/uploads/${item.fileName}`} width="236" height="236" style={{objectFit : 'cover'}}/>
                    //     <div className='caption '>
                    //       <h3 className=''>{item.name}</h3>
                    //       <p className=''>{item.description}</p>
                    //     </div>
                    //   </div>
                      
                    // </div>

                      <div className="card mx-3 my-3 col-8 col-lg-4 col-xl-5" style={{width : '18rem', borderRadius: '5px'}}>
                        <a style={{textDecoration :'none', color : 'black'}} href={item.product_id}>
                        <img className="card-img-top" src={`/uploads/${item.fileName}`} alt="image" style={{objectFit : 'cover'}}/>
                        <div className="card-body py-2">
                          <h5 className="card-title">{item.name}</h5>
                          <div className='card-subtitle'>
                            {/* <p className="card-text">{item.description}</p> */}
                            <div className="card-text">{item.price} ر.س </div>
                          </div>
                        </div>
                        </a>
                    </div>
                  
                )}
            })
          }
        </div>
      </div>
    </>
  )
}
