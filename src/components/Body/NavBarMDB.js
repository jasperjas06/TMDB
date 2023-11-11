import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'

export const Header = () => {
  return (
    <div>
      <Navbar className='Nav'>
        <Container style={{justifyContent:"flex-end"}}>
        <Nav>
            <Nav.Link href="/SignUp" className='navlink' style={{color:"white"}}>SignUp</Nav.Link>
            <Nav.Link href="/SignIn" className='navlink' style={{color:"white"}}>SignIn</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  )
}
