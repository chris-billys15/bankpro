// Home.js

import React, { Component } from 'react';
import '../CSS/Home.css';
import '../CSS/Transactions.css'
import TransactionsComponent from "./TransactionsComponent";
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 2
});
class HomeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName :'Christopher Billy Setiawan',
            acc_no : '1234567890',
            balance : '1000000'
        };
    }
    render() {
        return (
            <div className="container">
                <div className="card">
                    <div className="welcome">Welcome to Bank Pro</div>
                </div>
                <div className="flex-container-row">
                    <div className="card">
                        <div className="flex-container-row">
                            <img src={require('../avatar.png')} alt={this.state.fullName} style={{width:"80px", margin :"10px"}}/>
                            <div className="flex-container-col">
                                <div className="fullName">
                                    {this.state.fullName}
                                </div>
                                <div style={{alignSelf:"left"}}>
                                    Account No. : {this.state.acc_no}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-balance" >
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
                <TransactionsComponent/>
            </div>
        );
    }
}

export default HomeComponent;