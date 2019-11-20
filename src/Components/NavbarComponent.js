import React from 'react'
import { Nav} from 'reactstrap'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom'
import '../CSS/Navbar.css'

import TransferComponent from './TransferComponent'
import HomeComponent from '../Components/HomeComponent'
import TransactionsComponent from './TransactionsComponent'
import LoginComponent from '../Components/LoginComponent'


export class NavbarComponent extends React.Component{

  constructor(props){
    super(props)
    this.state= {
      isAuthenticated: true,
    }
    this.handleLogout = this.handleLogout.bind(this)
  }

  getProfile(){

  }

  handleLogout() {
    localStorage.removeItem("cookieBankPro");
    this.setState({isAuthenticated:false});
    this.props.unRenderNavbar();
  }

  render() {
    return (
        <div>
          <Router>
            <Nav tabs className="bar-wrapper" >
              <div className="header-home"><b>Bank</b>Pro</div>
              <div>
                <Link to={'/home'} className="nav-link">Home</Link>
                <Link to={'/transfer'} className="nav-link">Transfer</Link>
                <Link to={'/transactions'} className="nav-link">Transactions</Link>
                <Link className="nav-link" onClick={this.handleLogout} to='/login'>
                  {
                    (this.state.isAuthenticated === false) &&
                    <Redirect to='/login'/>
                  }
                  Logout</Link>
              </div>
            </Nav>
            <Switch>
              <Route exact path='/' component={HomeComponent} />
              <Route path='/home' component={HomeComponent} />
              <Route path='/transfer' component={TransferComponent} />
              <Route path='/transactions' component={TransactionsComponent} />
              <Route path='/login' component={LoginComponent} />
            </Switch>
          </Router>
        </div>
    );
  }
}

export default NavbarComponent
