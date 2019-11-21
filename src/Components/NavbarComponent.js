import React from 'react'
// eslint-disable-next-line no-unused-vars
import {Nav} from 'reactstrap'
// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom'
import '../CSS/Navbar.css'
// eslint-disable-next-line no-unused-vars
import TransferComponent from './TransferComponent'
// eslint-disable-next-line no-unused-vars
import HomeComponent from '../Components/HomeComponent'
// eslint-disable-next-line no-unused-vars
import TransactionsComponent from './TransactionsComponent'
// eslint-disable-next-line no-unused-vars
import LoginComponent from '../Components/LoginComponent'

export class NavbarComponent extends React.Component{

  constructor(props){
    super(props)
    this.state= {
      noRekening: localStorage.getItem("cookieBankPro"),
      isAuthenticated: true,
      responseObj: null
    }
    this.handleLogout = this.handleLogout.bind(this)
    this.onCallback =this.onCallback.bind(this)
    console.log("state: ",this.state.noRekening)
  }

  onCallback(responseObject){
    console.log(responseObject);
    this.setState({responseObj: responseObject})
  }

  getProfile(AccNo, cb){
    // eslint-disable-next-line no-undef
    var soap = require('soap');
    var url = 'http://3.93.238.160:8080/bankprowebservice-1.0-SNAPSHOT/NewWebService?wsdl';
    var args = {rekening: AccNo};
    soap.createClient(url, function(err, client) {
      client.historyTransaction(args, function(err, result) {
        cb(result)
      });
    });
  }

  componentDidMount() {
    if(this.state.noRekening){
      this.getProfile(this.state.noRekening, this.onCallback.bind(this));
    }
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
                <Link className="nav-link" onClick={this.handleLogout} to='/login'>Logout</Link>
              </div>
              {
                (this.state.isAuthenticated === false) &&
                <Redirect to='/login'/>
              }
            </Nav>
            <Switch>
              <Route exact path='/' component={() => <HomeComponent responseObject={this.state.responseObj}/>} />
              <Route path='/home' component={() => <HomeComponent responseObject={this.state.responseObj}/>} />
              <Route path='/transfer' component={() => <TransferComponent responseObject={this.state.responseObj}/>} />
              <Route path='/transactions' component={() => <TransactionsComponent responseObject={this.state.responseObj}/>} />
              <Route path='/login' component={() => <LoginComponent/>} />
            </Switch>
          </Router>
        </div>
    );
  }
}

export default NavbarComponent
