import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import "../../style/Navbar.css"
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
import { adminUrl } from '../admin/includes/functions/admin.path';
import { language } from '../admin/includes/languages/english';
export default function Navbar_() {
    
    const redirect = useNavigate()
    const [userID, setUserID] = useState("");
    const [loggedin,setLoggedin] = useState(false);
    const [admin, setAdmin] = useState(false);
    const [memberName, setMemberName] = useState();
    const [categories, setCategories] = useState([]);
    useEffect(() => {

      id();
      async function id(){
        const response = await fetch("http://localhost:4000/userID",{credentials: 'include'})// fetching user's id
        const ID = await response.text();
        setUserID(ID);
      }

        //check if logged in
        checkLoggedin()
        async function checkLoggedin(){
          const response = await fetch(adminUrl.serverHost + '/check-role', {credentials : "include"});
          const validation = await response.json();
          console.log("(".repeat(3), validation);
          if(validation.isAdmin){
            setAdmin(true);
          }

          if(validation.role){
            return setLoggedin(true)
          }
        }

        // name of the member
        memberName()
        async function memberName(){
          const res = await fetch(`http://localhost:4000/user/get-user/${userID}`,{
            credentials : 'include'
          });
          const data = await res.json();
          console.log("#:".repeat(3),data)
          setMemberName(data.name);
        }

        //get categories
        getCategories()
        async function getCategories(){
          const res = await fetch(adminUrl.serverHost + `/categories/visible/get-all?sort=DESC`, {
            credentials : "include"
          });
          const data = await res.json();
          setCategories(data);
        }
    },[]);

    //edit profile
    // async function editProfile(){
    //   const response = await fetch(`http://localhost:4000/edit-profile?id=${userID}`);

    // }

    async function logout(){
      console.log("#".repeat(9), userID)
      const response = await fetch(`http://localhost:4000/logout/${userID}`, {
          method : "DELETE",
          credentials : "include",
      });
      console.log(await response.text());
      window.location.reload();
  };

  return (

    <div className='navbar-body'>
      {admin?<a href={adminUrl.dashboard} style={{color: '#FFF', borderRadius:'3px'}} className='upper-bar btn btn-sm btn-dark mx-5'>Admin Dashboard</a>:''}
      <Navbar className='navbar navbar-edit' style={{background : '#dcdde1'}} expand="lg">
      <Container>
        <a href='/' className='navbar-brand'>Home Page</a>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" >
          <Nav className="me-auto my-2 my-lg-0">
            {categories.map(category => (
              <ul className='nav'>
                <li><Nav.Link  href={`/section/${category.Name}`}>{category.Name}</Nav.Link></li>
              </ul>
            ))}
            
            {/* <Nav.Link href={adminUrl.dashboard}>kandys</Nav.Link>
            <Nav.Link href="/admin/categories">food</Nav.Link>
            <Nav.Link href={adminUrl.productsDashboard}>justify</Nav.Link>
            <Nav.Link href={adminUrl.manageStaff}></Nav.Link>
            <Nav.Link href={adminUrl.comments}></Nav.Link>
            <Nav.Link href="#action2"></Nav.Link> */}

          </Nav>
          
          {loggedin?
          <div>
            <a className='' href='/profile'>Profile</a>
            <a style= {{cursor: 'pointer'}} onClick={() => logout()}>Logout</a>
          </div>
          :<a className='' href='/login'>Login</a>}
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