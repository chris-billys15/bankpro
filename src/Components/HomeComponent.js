// Home.js
// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom'
import {Button} from 'reactstrap'

// eslint-disable-next-line no-unused-vars
import TransactionsComponent from './TransactionsComponent'
import '../CSS/Transactions.css'
import '../CSS/Home.css'
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'IDR',
  minimumFractionDigits: 2
})
class HomeComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      fullName: 'Christopher Billy Setiawan',
      acc_no: props.no_rek,
      balance: '1000000'
    }
  }

  handleLogout() {
    // this.cookie.remove("cookieBankPro")
    return (
        <Redirect to='/login'/>
    );
  }
  render () {
    return (
      <div className="container">
        <div className="card">
          <div className="welcome">Welcome to Bank Pro</div>
        </div>
        <div className="flex-container-row">
          <div className="card">
            <div className="flex-container-row">
              <img src={require('../avatar.png')} alt={this.state.fullName} style={{ width: '80px', margin: '10px' }}/>
              <div className="flex-container-col">
                <div className="fullName">
                  {this.state.fullName}
                </div>
                <div style={{ alignSelf: 'left' }}>
                  Account No. : {this.state.acc_no}
                </div>
              </div>
            </div>
          </div>
          <div className="card" style={{ backgroundColor: '#e12159' }}>
            <div className="flex-container-col">
              <div className="balance">
                Total Balance
              </div>
              <div className="balance">
                {formatter.format(this.state.balance)}
              </div>
            </div>
          </div>
        </div>
        <TransactionsComponent className="home-transactions"/>
      </div>
    )
  }
}

export default HomeComponent
