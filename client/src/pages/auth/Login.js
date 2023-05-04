import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./css/login.css"
import { adminUrl } from '../admin/includes/functions/admin.path';

export default function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [response, setResponse] = useState();
    useEffect(() =>{

      auth() // check if user logged in
      async function auth(){
        const response = await fetch('http://localhost:4000/check-role', {credentials : "include",});
        const validation = await response.json();
        console.log(validation)
        if(validation.role){
          navigate(adminUrl.dashboard);
        }
      }
    },[]);

    async function login(){
        
        const response = await fetch("http://localhost:4000/login", {
          method: 'POST',
          credentials : "include", // to send HTTP only cookies
          headers : {"Content-Type" : "application/json"},
          body : JSON.stringify({username, password})
        });
        const data = await response.json()
    
        console.log(data);
        console.log(response.status);
        setResponse(data.message);
        // const csrfToken =  data.csrfToken;// setting the token globally in the javascript        
    }
  return (
    <div className='login-body'>
      <div className='login'>
        <h4 className='text-center'>Login</h4>
        <span style={{color: 'red'}} >{response}</span>
        <div>
            {/* <label form='username'>username :  </label> */}
            <input id='username' type='text' className='form-control' placeholder='example@example.com' onChange={(e) => setUsername(e.target.value)}/>
        </div>
        <div>
            {/* <label form='password'>Password :  </label> */}
            <input id='password' type='password'  className='form-control' placeholder='password' onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <button className='btn btn-primary btn-block' type='submit' onClick={() => login()}>Login</button>
        <Link to='/register' className='text-center'>or  signup</Link>
      </div>
    </div>
  )
}

