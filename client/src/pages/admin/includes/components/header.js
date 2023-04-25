import React from 'react'
import {language} from "../languages/english"
export default function Header() {
  return (
    <>
        <head>
            <title>Admin</title>

        </head>
        <i class="fa-sharp fa-solid fa-user"></i>
        <h1>{language('hello')}</h1>
      this is header
    </>
  )
}
