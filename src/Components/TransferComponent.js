// TransferComponent.js

import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../CSS/Transfer.css'
import { Col, FormGroup, Input, Label, Button } from 'reactstrap'
import { PopupboxManager, PopupboxContainer } from 'react-popupbox'
import 'react-popupbox/dist/react-popupbox.css'
import { Form } from 'react-bootstrap'
class TransferComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      recipientFullName: 'Christopher Billy Setiawan',
      recipientAccNo: null,
      recipientAccNoExist: null,
      amount: null,
      messageState: 0,
      /*
      0 : haven't check rekening
      1 : if rekening exists
      2 : else if rekening not exists
      */
    }
    this.handleChangeRecipientAccNo = this.handleChangeRecipientAccNo.bind(this)
    this.handleChangeAmount = this.handleChangeAmount.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onCheck = this.onCheck.bind(this)
    this.changeMessageState = this.changeMessageState.bind(this)
  }

  handleChangeRecipientAccNo (event) {
    this.setState({ recipientAccNo: event.target.value })
  }

  handleChangeAmount (event) {
    this.setState({ amount: event.target.value })
  }

  handleSubmit (event) {
    this.openPopupbox()
    event.preventDefault()
  }

  handleSendButton () {
    let res;
    var soap = require('soap');
    var url = 'http://3.93.238.160:8080/bankprowebservice-1.0-SNAPSHOT/NewWebService?wsdl';
    var args = {
      RekeningPengirim: this.props.no_rek,
      RekeningPenerima: this.state.recipientAccNo,
      Nominal: this.state.nominal
    };
    soap.createClient(url, function(err, client) {
      console.log(err);
      client.transfer(args, function(err, result) {
        console.log(result);
        res = result;
      });
    });
    return res;
  }

  changeMessageState(messageState){
    if(messageState === 1){
      this.setState({messageState:1})
    }
    else if(messageState === 2){
      this.setState({messageState:2})
    }
    else {
      this.setState({messageState:0})
    }
  }

  handleCheckCallBack(rekeningExist){
    if(rekeningExist){
      this.changeMessageState(1)
      document.getElementById('send-button-transfer').disabled = false
    }
    else{
      this.changeMessageState(2)
    }
  }

  checkAccNumber (handleCheckCallback) {
    /*
    validateRekening()? this.changeMessageState(1) : this.changeMessageState(2)
    */

    let res = false;
    var soap = require('soap');
    var url = 'http://3.93.238.160:8080/bankprowebservice-1.0-SNAPSHOT/NewWebService?wsdl';
    var args = {Rekening: this.state.recipientAccNo};
    soap.createClient(url, function(err, client) {
      client.validateRekening(args, function(err, result) {
        res = result['return'];
        handleCheckCallback(res)
      });
    });

  }

  onCheck(e){
    this.checkAccNumber(this.handleCheckCallBack.bind(this))
    e.preventDefault();
  }

  openPopupbox () {
    const content = (
      <div className="flex-container-col">
        <label style={{ fontWeight: 'bold' }}>Recipient :</label>
        <label style={{ fontStyle: 'italic' }}>{this.state.recipientFullName}</label>
        <label style={{ fontWeight: 'bold' }}>Amount :</label>
        <Input type="money"/>
        <Button className="button-send-popup" style={{ width: '100%' }} onChange={this.handleChangeAmount} onClick={this.handleSendButton}>SEND</Button>
      </div>
    )

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
    })
  }

  render () {
    return (
      <div>
        <div className="card-transfer">
          <h2>Transfer</h2>
        </div>
        <Form className="card-transfer" onSubmit={this.handleSubmit} style={{ marginTop: '8px' }}>
          <Col>
            <FormGroup>
              <Label style={{ fontStyle: 'italic' }}>Send to :</Label>
              <div className="flex-container-row">
                <Input
                  type="number"
                  min="0"
                  name="accountNo"
                  id="accountNo"
                  placeholder="Recipient account number"
                  value={this.state.value}
                  onChange={this.handleChangeRecipientAccNo}
                />
                <Button className="button-check" name="check-button" onClick={this.onCheck}> CHECK</Button>
              </div>
            </FormGroup>
            <div className="custom-control custom-checkbox mb-3">
              <input type="checkbox" className="custom-control-input" id="customCheck" name="example1"/>
            </div>
          </Col>
          {
            this.state.messageState == 1 &&
            <div className="alert alert-success" id="receiver">
              <img src={require('../avatar.png')} alt="Azhar D." style={{ width: '50px', margin: '10px' }}/>
              <div className="flex-container-col">
                <div className="fullName" style={{ alignmentBaseline: 'left', marginTop: '6px' }}>
                  {/*{this.state.recipientFullName}*/}
                </div>
                <div style={{ alignSelf: 'left', marginTop:"5px"}}>
                                  Account No. : {this.state.recipientAccNo}
                </div>
              </div>
            </div>
          }

          {
            this.state.messageState == 2 &&
            <div className="alert alert-danger" id="receiver-none">
              oops... account not found
            </div>
          }

          <Button id="send-button-transfer" type="Submit" className="button-submit" disabled={true}> Submit </Button>
        </Form>
        <PopupboxContainer />
      </div>
    )
  }
}

export default TransferComponent
