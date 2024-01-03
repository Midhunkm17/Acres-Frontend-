import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Header.css'
import { Link } from 'react-router-dom';

function Header() {

  const [loggedIn, setLoggedIn]=useState(false)

useEffect(()=>{
  if(localStorage.getItem("token")){
    setLoggedIn(true)
  
  }
},[loggedIn])
  



  return (
    <div>
        <Navbar expand="lg" className="bg-dark nbar">
      <Container>
        <div className='flex'> 
      <img className='mt-2' src= "https://i.postimg.cc/vm28PfBT/kisspng-property-management-clip-art-real-property-property-management-assistance-program-pma-cabre.png" style={{width:'60px', height:'60px'}} alt="" />
       <Link to={'/'} style={{textDecoration:'none'}}> <Navbar.Brand href="#home" className='hdng fs-1 ms-1 flex font-extrabold p-2 me-auto'>Acres</Navbar.Brand></Link>
       </div>
        <Navbar.Toggle className='bg-warning' aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home"></Nav.Link>
            <Nav.Link href="#link"></Nav.Link>
            
            <Link to={'/all-properties'} style={{textDecoration:'none'}}><Navbar.Brand href="#home" className='menu text-light fs-5 p-2 '>Properties</Navbar.Brand></Link>
           
            <a href="#about" className='menu text-light fs-5 p-2 '>About</a>
            {
              loggedIn&& 
              <Link to={'/add-property'} style={{textDecoration:'none'}}><Navbar.Brand href="#home" className='menu text-light fs-5  p-2 '>Add Property</Navbar.Brand></Link>
            }
          </Nav>
          <div className='flex' >
          { loggedIn ?(
            
          <Link to={'/profile'} style={{textDecoration:'none'}}><img width={30} height={30} src="https://i.postimg.cc/W37LZxYR/no-profile-picture-15255.png" alt="" /></Link>
          ):(
            <Link to={'/login'} style={{textDecoration:'none'}}><button className='b1 fs-6 p-2' >Sign In/Sign Up</button></Link> )
           }
           
            </div>
        </Navbar.Collapse>
    
      </Container>
    </Navbar>
    </div>
  )
}

export default Header