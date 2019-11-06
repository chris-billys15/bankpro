// import logo from './logo.svg';
import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import './App.css';
import LoginComponent from "./Login/LoginComponent";
import TransferComponent from "./Transfer/TransferComponent";
import NavbarComponent from "./Navbar/NavbarComponent.js";

function App() {
    return (
        <div>
            <NavbarComponent/>
            {/*<LoginComponent/>*/}
        </div>
    );
}

export default App;


