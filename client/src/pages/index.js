import React, { useEffect, useState } from 'react'
import ProductBox from './components/productBox';
import Navbar from './components/Navbar';

export default function Index() {

    const [data , setData] = useState([]);

    useEffect(() => {

        getData()
        async function getData(){
            const req = await fetch("http://localhost:4000/products/visible");
            const res = await req.json();
            console.log(res);
            setData(res);
        }
    },[])
  return (
    <> 
      <Navbar />
      <br />
      
      
      <ProductBox data={data}/>
    </>
  )
}
