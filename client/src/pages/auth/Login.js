import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Login() {

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const [response, setResponse] = useState();

    async function login(e){
        
        if(username == undefined || password == undefined){
            return
        }
        const response = await fetch("http://localhost:4000/login", {
            method: 'POST',
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify({username, password})
        });
        const data = await response.text();
        console.log(data)
        setResponse(data)
    }

  return (
    <div>
      <div>
        <span color='red'>{response}</span>
        <div>
            <label>username : </label>
            <input type='text' placeholder='example@example.com' onChange={(e) => setUsername(e.target.value)}/>
        </div>
        <div>
            <label>Password : </label>
            <input type='password' placeholder='password' onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <button type='submit' onClick={() => login()}>Login</button>
        <Link to='/register'>sign up</Link>
      </div>
    </div>
  )
}
