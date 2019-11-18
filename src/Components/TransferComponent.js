// TransferComponent.js

import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../CSS/Transfer.css'
import {Col, FormGroup, Input, Label, Button} from "reactstrap";
import {PopupboxManager, PopupboxContainer} from 'react-popupbox';
import 'react-popupbox/dist/react-popupbox.css'
import {Form} from "react-bootstrap";
class TransferComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipientFullName: 'Azhar D.',
            recipientAccNo: '12367890345'
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        this.openPopupbox();
        event.preventDefault();
    }
    
    handleSendButton(event){

    }

    checkAccNumber(){
        document.getElementById("receiver").style.display= "flex";
        document.getElementById("receiver-none").style.display="flex";
        document.getElementById("send-button-transfer").disabled=false;
        document.getElementById("send-button-transfer").enabled=true;
    }

    openPopupbox() {
        const content = (
            <div className="flex-container-col">
                <label style={{fontWeight:"bold"}}>Recipient :</label>
                <label style={{fontStyle:"italic"}}>{this.state.recipientFullName}</label>
                <label style={{fontWeight:"bold"}}>Amount :</label>
                <Input type="money"/>
                <Button className="button-send-popup" style={{width:"100%"}} onClick={this.handleSendButton}>SEND</Button>
            </div>
        );

        PopupboxManager.open({
            content,
            config: {
                titleBar: {
                    enable: true,
                    text: 'Transfer'
                },
                fadeIn: true,
                fadeInSpeed: 100
            }
        });
    }

    render() {
        return (
            <div>
                <div className="card-transfer">
                    <h2>Transfer</h2>
                </div>
                <Form className="card-transfer" onSubmit={this.handleSubmit} style={{marginTop:"8px"}}>
                    <Col>
                        <FormGroup>
                            <Label style={{fontStyle:"italic"}}>Send to :</Label>
                            <div className="flex-container-row">
                                <Input
                                    type="number"
                                    min="0"
                                    name="accountNo"
                                    id="accountNo"
                                    placeholder="Recipient account number"
                                    value={this.state.value}
                                    onChange={this.handleChange}
                                />
                                <Button className="button-check" name="check-button" onClick={this.checkAccNumber}> CHECK</Button>
                            </div>
                        </FormGroup>
                        <div className="custom-control custom-checkbox mb-3">
                            <input type="checkbox" className="custom-control-input" id="customCheck" name="example1"/>
                            <label className="custom-control-label" htmlFor="customCheck">Virtual Account</label>
                        </div>
                    </Col>
                    <div className="recipient-card" id="receiver">
                        <img src={require('../avatar.png')} alt="Azhar D." style={{width:"50px", margin :"10px"}}/>
                        <div className="flex-container-col">
                            <div className="fullName" style={{alignmentBaseline:"left", marginTop:"6px"}}>
                                {this.state.recipientFullName}
                            </div>
                            <div style={{alignSelf:"left"}}>
                                Account No. : {this.state.recipientAccNo}
                            </div>
                        </div>
                    </div>
                    <div className="recipient-card-none" id="receiver-none">
                        oops... account not found
                    </div>
                    <Button id="send-button-transfer" type="Submit" className="button-submit" disabled={true}> Submit </Button>
                </Form>
                <PopupboxContainer />
            </div>
        );
    }
}

export default TransferComponent;