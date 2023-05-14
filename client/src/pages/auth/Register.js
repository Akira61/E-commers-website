import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./css/register.css"
import Navbar_ from '../components/Navbar';
export default function Register() {
    const navigate = useNavigate();
    const [name, setName] = useState();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [confirmPass, setConfirmPass] = useState();
    const [error, setError] = useState();
    useEffect(() => {
        document.title = 'Register';
    },[])

    async function register(){
        console.log("register process")
        console.log(name, username, password, confirmPass)
        const response = await fetch("http://localhost:4000/register", {
            method : "POST",
            credentials : "include", // to send HTTP only cookies
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify({name, username, password, confirmPass})
        });
        const data = await response.json();
        // if user already auth redirect to home page
        if(response.status == 401){
            return navigate('/');
        }
        if(data.success){
          return navigate('/login');
        }
        setError(data.err_message);
        console.log(data);
    }

  return (
    <>
        <Navbar_ />
        {/* <div>
            <label form='name'>Name : </label>
            <input type='text' id='name' onChange={(e) => setName(e.target.value)}/>
        </div>
       <div>
            <label>username : </label>
            <input type='text' onChange={(e) => setUsername(e.target.value)}/>
        </div>
        <div>
            <label>Password : </label>
            <input type='password' onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <div>
            <label>confirm password : </label>
            <input type='password' onChange={(e) => setConfirmPass(e.target.value)}/>
        </div>
        <button onClick={() => register()}>Sign up</button>
        <Link to='/login'><a>login</a></Link> */}

        <h1 className='text-center'>Register</h1>
      <div className='container register-page'>
        <div className='register'>

          <div className='form my-5'>

            {/*Error messages */}
            <span style={{color: 'red'}} >{error}</span><br/>

            Full Name <span className='text-danger'>*</span>
                <input id='name' type='text' className='form-control'
                onChange={(e) => setName(e.target.value)}/>

                Username <span className='text-danger'>*</span>
                <input id='username' type='email' className='form-control'
                placeholder='your@email.com'
                onChange={(e) => setUsername(e.target.value)}/>

                Password <span className='text-danger'>*</span>
                <input id='password' type='password'  className='form-control'
                onChange={(e) => setPassword(e.target.value)}/>

                Confirm Password <span className='text-danger'>*</span>
                <input type='password'  className='form-control'
                onChange={(e) => setConfirmPass(e.target.value)}/>

                <button className='btn btn-primary btn-block' type='submit' onClick={() => register()}>Register</button>
                <div><Link to='/login' className='text-center'>or  Login</Link></div>
          </div>
        </div>
      </div>
    </>
  )
}
