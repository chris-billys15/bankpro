// import logo from './logo.svg';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom'
import React from 'react';
import './App.css';
import NavbarComponent from "./Components/NavbarComponent.js";
import LoginComponent from './Components/LoginComponent.js';
// import HomeComponent from "./Components/HomeComponent";

export class App extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            noRekening: null,
            renderNavbar : false
        }
        this.mountNavbar = this.mountNavbar.bind(this);
        this.unMountNavbar = this.unMountNavbar.bind(this);
    }

    componentDidMount() {
        if (this.isCookieExist()) {
            this.setState({renderNavbar:true})
        }
    }

    getCookie () {
        return localStorage.getItem("cookieBankPro")
    }
    isCookieExist () {
        return this.getCookie() != null
    }

    mountNavbar(AccNo){
        this.setState({renderNavbar:true})
        this.setState({noRekening: AccNo})
    }

    unMountNavbar(){
        this.setState({renderNavbar:false})
    }

    render() {
        let component = '';
        if(this.isCookieExist()){
            component='/';
        }
        else{
            component='/login'
        }
        return (
            <Router>
                <Redirect to={component}/>
                <Switch>
                    <Route path="/login" component={() => this.state.renderNavbar === false ? <LoginComponent renderNavbar={this.mountNavbar}/> : null} />
                    <Route path="/" component={() => this.state.renderNavbar === true ? <NavbarComponent unRenderNavbar={this.unMountNavbar}/> : null} />
                </Switch>
            </Router>
        );
    }
}

export default App;

