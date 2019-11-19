import React, { useState } from 'react'
import { Nav, NavItem, NavLink } from 'reactstrap'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import '../CSS/Navbar.css'

import TransferComponent from './TransferComponent'
import HomeComponent from '../Components/HomeComponent'
import TransactionsComponent from './TransactionsComponent'
import LoginComponent from '../Components/LoginComponent'

const NavbarComponent = (props) => {
  function getCookie () {
    return localStorage.getItem('cookie')
  }
  function isCookieExist () {
    return getCookie() != null
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
  )
}

export default NavbarComponent
