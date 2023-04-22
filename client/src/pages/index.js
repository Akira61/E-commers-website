import React, { useEffect, useState } from 'react'
import ProductBox from './components/productBox';

export default function Index() {

    const [data , setData] = useState([]);

    useEffect(() => {

        getData()
        async function getData(){
            const req = await fetch("http://localhost:4000/api/products");
            const res = await req.json();
            console.log(res);
            setData(res);
        }
    },[])
  return (
    <> 
        <ProductBox data={data}/>
      <div className="product" style={{backgroud : 'green'}}>
        
      </div>
    </>
  )
}
