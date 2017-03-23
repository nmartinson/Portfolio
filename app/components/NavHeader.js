import React from 'react';
// import { Link, History } from 'react-router';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import axios from 'axios';

class NavHeader extends React.Component {
  constructor(){
    super();
    this.state = {
      galleries: [],
      loading: true
    }
  }
  
  componentDidMount(){
    const apiUrl =process.env.API_URL;
    const path = `${apiUrl}/galleries`
    axios.get(path)
      .then((response) => {
        var galleries = response.data;
        this.setState({
          loading: false,
          galleries: galleries
        })
      })
      .catch((error) => {
        console.log("Error in navbar:", error);
      });
  }

  render() {
    const { galleries, loading} = this.state;

    return (
      <Navbar inverse style={{marginBottom:"0px"}}>
        <Navbar.Header>
            <LinkContainer to="/featured">
              <a href="#" className="navbar-left"><img height="50px" alt="Boundless Journey Photography Logo" src="http://www.boundless-journey.com/portfolio/images/resources/logo.png"/></a>
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
            <NavDropdown eventKey={3} title="Galleries" id="basic-nav-dropdown">
            {
              galleries.map(function(gallery, index){
                return(
                  <LinkContainer to={`/gallery/${gallery.id}`}>
                    <MenuItem value={gallery.id} eventKey={3.1}>{gallery.name}</MenuItem>
                  </LinkContainer>
                )
              }.bind(this))
            }
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )}
}

export default NavHeader;

