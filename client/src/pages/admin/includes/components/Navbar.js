import React, { useEffect, useState } from 'react'
import { language } from '../languages/english';
import "../../layout/css/components/Navbar.css"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
export default function Navbar_() {
    
    const redirect = useNavigate()
    const [userID, setUserID] = useState("");
    useEffect(() => {
        fetch("http://localhost:4000/userID",{credentials : "include",})// fetching user's id
        .then(res => res.text())
        .then(ID => {
            setUserID(ID);
        });
    },[]);

    //edit profile
    // async function editProfile(){
    //   const response = await fetch(`http://localhost:4000/edit-profile?id=${userID}`);

    // }

    async function logout(){
        const response = await fetch(`http://localhost:4000/logout/${userID}`, {
            method : "DELETE",
            credentials : "include",
        });
        console.log(await response.text());
        return redirect("/");
    };

  return (
    <div className='navbar-body'>
      <Navbar className='navbar' bg="light" variant='light' expand="lg">
      <Container >
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" >
          <Nav className="me-auto my-2 my-lg-0">

            <Nav.Link href="/admin/dashboard">{language("home")}</Nav.Link>
            <Nav.Link href="#action2">{language("categories")}</Nav.Link>
            <Nav.Link href="/admin/products">{language("items")}</Nav.Link>
            <Nav.Link href="#action2">{language("members")}</Nav.Link>
            <Nav.Link href="#action2">{language("statistics")}</Nav.Link>
            <Nav.Link href="#action2">{language("logs")}</Nav.Link>

          </Nav>

            <Nav bg="light" variant='light' className="ms-auto">

                <NavDropdown title="Fahad" id="navbarScrollingDropdown">
                <NavDropdown.Item href={`/edit-profile/${userID}`} >{language("Edit Profile")}</NavDropdown.Item>
                <NavDropdown.Item href="#action4">{language("Settings")}</NavDropdown.Item>
                <NavDropdown.Item href="#action5" onClick={() => logout()}>{language("Logout")}</NavDropdown.Item>
                </NavDropdown>
            
            </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    
    </div>
  )
}


/*
 <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div className='container'>
    
    <a class="navbar-brand" href="#">Admin</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
        <li class="nav-item">
            <a class="nav-link" href="#">Home</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#">cateories</a>
        </li>
        </ul>

        <div className='nav navbar-nav navbar-right'>
        
      <Dropdown>
        <Dropdown.Toggle variant="Secondary">
          user
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item href="#">
            Edit Profile
          </Dropdown.Item>
          <Dropdown.Item href="#">
            Settings
          </Dropdown.Item>
          <Dropdown.Item href="#">
            Logout
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      
    </div>
    </div>
  </div>
</nav>
*/