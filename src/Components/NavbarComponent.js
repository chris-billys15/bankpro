import React, { useState } from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import '../CSS/Navbar.css';

import TransferComponent from "./TransferComponent";
import HomeComponent from "../Components/HomeComponent";
// import LoginComponent from "./Login/LoginComponent";
import TransactionsComponent from './TransactionsComponent';
import LoginComponent from "../Components/LoginComponent";

const NavbarComponent = (props) => {
    function getCookie(){
        return localStorage.getItem("cookie");
    }
    function isCookieExist(){
        return getCookie() != null;
    }

    return (
        <div>
            <Router>
                <Nav tabs className="bar-wrapper" >
                    <div className="header-home"><b>Bank</b>Pro</div>
                    <div>
                        <Link to={'/'} className="nav-link">Home</Link>
                        <Link to={'/transfer'} className="nav-link">Transfer</Link>
                        <Link to={'/transactions'} className="nav-link">Transactions</Link>
                        <Link to={'/login'} className="nav-link">Login</Link>
                    </div>
                </Nav>
                <Switch>
                    <Route exact path='/' component={HomeComponent} />
                    <Route path='/transfer' component={TransferComponent} />
                    <Route path='/transactions' component={TransactionsComponent} />
                    <Route path='/login' component={LoginComponent} />
                </Switch>
            </Router>
        </div>
    );
}

export default NavbarComponent;

// class NavbarComponent extends React.Component {
//     constructor(props){
//         super(props);
//
//     }
//     render() {
//         return (
//             <div className="navbar">
//                 <div className="bar-wrapper">
//                     <div className="header-home"><b>Bank</b>Pro</div>
//                     <div>
//                         <a href='#'>Transfer</a>
//                         <a href='#'>Transactions</a>
//                         <a href='#'>Logout</a>
//                     </div>
//                 </div>
//             </div>
//         )
//     }
// }

// class NavbarComponent2 extends React.Component {
//     constructor(props){
//         super(props);
//
//     }
//     render() {
//         return (
//             <div>
//
//                 <Nav tabs>
//                     <NavItem>
//                         <NavLink href="#" active>Link</NavLink>
//                     </NavItem>
//                     <NavItem>
//                         <NavLink href="#">Link</NavLink>
//                     </NavItem>
//                     <NavItem>
//                         <NavLink href="#">Another Link</NavLink>
//                     </NavItem>
//                     <NavItem>
//                         <NavLink disabled href="#">Disabled Link</NavLink>
//                     </NavItem>
//                 </Nav>
//             </div>
//         )
//     }
// }