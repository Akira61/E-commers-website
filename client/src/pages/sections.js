import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { adminUrl } from './admin/includes/functions/admin.path';
import ProductBox from './components/productBox';
import Navbar_ from './components/Navbar';

export default function Sections() {
    const {section_name} = useParams();
    
    console.log(section_name);

    const [product, setProduct] = useState([]);
    useEffect((e) => {
        //get category's products
        cateProducts()
        async function cateProducts(){
            const res= await fetch(adminUrl.serverHost + `/categories/products/${section_name}`);
            const data = await res.json();
            console.log("#".repeat(7),data)
            setProduct(data);
        }
    },[])
  return (
    <>
        <Navbar_ />
        {product.length >0 ?<ProductBox data={product}/> : <p className='text-center py-5' style={{fontSize:'20px'}}>No Product Posted Yet</p>}
      {/* <ProductBox data={product}/> */}
    </>
  )
}
