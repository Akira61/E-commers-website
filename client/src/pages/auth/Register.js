import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Register() {

    const [name, setName] = useState();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [confirmPass, setConfirmPass] = useState();

    async function register(){
        console.log("register process")
        console.log(name, username, password, confirmPass)
        const response = await fetch("http://localhost:4000/register", {
            method : "POST",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify({name, username, password, confirmPass})
        });
        const data = await response.text();
        console.log(data);
    }

  return (
    <div>
        <div>
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
        <Link to='/login'><a>login</a></Link>
    </div>
  )
}
