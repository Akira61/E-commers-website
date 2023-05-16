import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { adminUrl } from './admin/includes/functions/admin.path';

export default function Item() {
    const {productId} = useParams();

    const [product, setProduct] = useState({});
    useEffect(() => {
        
        getProduct()
    },[])

    async function getProduct(){
        const res= await fetch(adminUrl.serverHost + `/get-product/${productId}`);
        const data = await res.json();
        setProduct(data);
    }
  return (
    <>
      {product.name}

      
    </>
  )
}
