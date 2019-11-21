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
