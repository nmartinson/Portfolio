import React from 'react';
import { IndexLink, Link } from 'react-router';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const NavHeader = () => {
  return (
  <Navbar inverse>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="#">Portfolio Home</a>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <LinkContainer to="/galleries">
          <NavItem eventKey={1} >Galleries</NavItem>
        </LinkContainer>
        <LinkContainer to="/createGallery">
          <NavItem eventKey={1} >Create Gallery</NavItem>
        </LinkContainer>
        <NavItem eventKey={2} href="#">Favorites</NavItem>
        <NavItem eventKey={2} href="http://www.boundless-journey.com">Blog</NavItem>
        <LinkContainer to="/contact">
          <NavItem eventKey={3} >Contact</NavItem>
        </LinkContainer>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);
}

export default NavHeader;