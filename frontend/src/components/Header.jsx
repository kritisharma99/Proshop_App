import React from 'react'
import {Navbar, Nav, Container, Image, NavDropdown} from "react-bootstrap"
import { Routes,Route } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap';
import {useDispatch, useSelector} from "react-redux"
import { logout } from '../actions/userAction';
import SearchBox from './searchBox';


function Header() {

  const userLogin = useSelector(state => state.user)
  const dispatch = useDispatch()
  const {userinfo} = userLogin
  const logoutHandler = () =>{
    dispatch(logout())
    
  }
  return (
    <header>
      <Navbar bg="dark" variant ="dark" expand="lg" collapseOnSelect>
        <Container>
            <Navbar.Brand href="/">ProShop</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              {/* <Routes>
              <Route render={()=> <SearchBox/>}></Route>
              </Routes> */}
              
              <SearchBox/>
            <Nav className="ml-auto">
              <Nav.Link href="/cart"><i className="fas fa-shopping-cart"></i>Cart</Nav.Link>
                
            {userinfo ? (
              <NavDropdown title={userinfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>
                      Profile
                    </NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
              </NavDropdown>
            ) : <Nav.Link href="/signIn"><i className="fas fa-user"></i>Sign In</Nav.Link>}

            {userinfo && userinfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu'>
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            
            </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
    </header>
  )
}

export default Header
