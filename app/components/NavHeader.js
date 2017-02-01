import React from 'react';
import { IndexLink, Link, History } from 'react-router';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Social from './SocialComponent';

class NavHeader extends React.Component {
  render() {
    return (
      <Navbar inverse style={{marginBottom:"0px"}}>
        <Navbar.Header>
            <LinkContainer to="/featured">
              <Navbar.Brand>Featured Photos</Navbar.Brand>
            </LinkContainer>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} href="http://www.boundless-journey.com">Blog</NavItem>
            <LinkContainer to="/contact">
              <NavItem eventKey={2} >Contact</NavItem>
            </LinkContainer>
            <LinkContainer to="/about">
              <NavItem eventKey={3} >About</NavItem>
            </LinkContainer>
            <LinkContainer to='/examples'>
              <NavItem eventKey={4} >Examples</NavItem>
            </LinkContainer>
            <LinkContainer to='/orderingInfo'>
              <NavItem eventKey={5} >Ordering Info</NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )}
}

export default NavHeader;