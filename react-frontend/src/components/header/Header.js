import React from 'react'
import './Header.css'
import { BrowserRouter as Route } from 'react-router-dom';
import {
    Navbar,
    Nav,
} from 'react-bootstrap'
import SearchBar from './SearchBar';

function Header() {
    return (
        <Route>
                {/* <nav id="fixed-header">
                    <Navbar.Brand href="#home" className="ml-5 brand">JAPMAN</Navbar.Brand>
                    
                </nav> */}
                <Navbar collapseOnSelect expand="lg" id="fixed-header" fixed="top" className="">
                    <Navbar.Brand href="#home" className="ml-5 brand">JAPMAN</Navbar.Brand>
                    <SearchBar/>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ml-auto">
                            <Nav.Link href="#deets" className="link">More deets</Nav.Link>
                            <Nav.Link eventKey={2} href="#memes" className="link">
                                Dank memes
                        </Nav.Link>
                        </Nav>
                    </Navbar.Collapse> 
                </Navbar>
        </Route>
    )
}

export default Header