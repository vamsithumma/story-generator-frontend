import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import * as Icon from 'react-bootstrap-icons';

function OffcanvasExample() {
  const [navbarFixed, setNavbarFixed] = useState(false);


  return (
    <>
      <Navbar expand="xl" bg="primary" fixed={navbarFixed ? 'top' : ''}>
        <Container fluid>
          <Navbar.Brand href="/" className='fw-bold fs-3'>AI Story Generator</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/leaderBoard" className='fw-bold fs-5'>Leader Board</Nav.Link>
              <Nav.Link href="#action2" className='fw-bold fs-5'>About</Nav.Link>
            </Nav>
            <Nav className="ml-auto"> {/* Use ml-auto to align to the right on larger screens */}
              <Nav.Link href="https://github.com/vamsithumma" target="blank" className='fw-bold fs-5'><Icon.Github size={25} /> Clone</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default OffcanvasExample;
