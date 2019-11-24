// TransferComponent.js

import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../CSS/Transfer.css'
import { Col, FormGroup, Input, Label, Button } from 'reactstrap'
import { PopupboxManager, PopupboxContainer } from 'react-popupbox'
import 'react-popupbox/dist/react-popupbox.css'
import { Form } from 'react-bootstrap'
import { exportDefaultSpecifier } from '@babel/types'
class TransferComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      senderAccount: localStorage.getItem("cookieBankPro"),
      recipientFullName: 'Christopher Billy Setiawan',
      recipientAccNo: 0,
      amount: 0,
      messageState: 0,
      /*
      0 : haven't check rekening
      1 : if rekening exists
      2 : else if rekening not exists
      3 : if virtualaccount
      */
    }
    this.handleChangeRecipientAccNo = this.handleChangeRecipientAccNo.bind(this)
    this.handleChangeAmount = this.handleChangeAmount.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSendButton = this.handleSendButton.bind(this)
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

  // transferMoneyCallback(success){
  //   this.updatePopupbox(success);
  // }

  transfer(cb){
    var soap = require('soap');
    var url = 'http://100.26.43.243:8080/bankprowebservice-1.0-SNAPSHOT/NewWebService?wsdl';
    var args = {
      RekeningPengirim: this.state.senderAccount,
      RekeningPenerima: this.state.recipientAccNo,
      Nominal: this.state.amount
    };
    console.log(this.state.amount)
    soap.createClient(url, function(err, client) {
      client.Transfer(args, function(err, result) {
        console.log("transfer : ", result);
        cb(result.return);
      });
    });
  }

  handleSendButton(e) {
    this.transfer(this.updatePopupbox.bind(this))
    e.preventDefault()
  }

  changeMessageState(msgState){
    this.setState({messageState:msgState})
  }

  getReceiverProfileCallback(result){
    this.setState({recipientFullName:result.return.namaPengguna})
    this.changeMessageState(1)
    document.getElementById('send-button-transfer').disabled = false
    document.getElementById('send-button-transfer').enabled = true
  }

  getReceiverProfile(cb){
    var soap = require('soap');
    var url = 'http://100.26.43.243:8080/bankprowebservice-1.0-SNAPSHOT/NewWebService?wsdl';
    var args = {rekening: this.state.recipientAccNo};
    soap.createClient(url, function(err, client){
      client.historyTransaction(args, function(err,result){
        cb(result);
      })
    })
  }

  handleCheckCallBack(response){
    if(response.return.accountExists){
      this.getReceiverProfile(this.getReceiverProfileCallback.bind(this))
    }
    else if (response.return.virtualAccount){
      this.changeMessageState(3)
      document.getElementById('send-button-transfer').disabled = false
      document.getElementById('send-button-transfer').enabled = true
    }
    else{
      this.changeMessageState(2)
    }
  }

  checkAccNumber (handleCheckCallback) {
    if(this.state.recipientAccNo !== null){
      var soap = require('soap');
      var url = 'http://100.26.43.243:8080/bankprowebservice-1.0-SNAPSHOT/NewWebService?wsdl';
      var args = {Rekening: this.state.recipientAccNo};
      soap.createClient(url, function(err, client) {
        client.validateRekening(args, function(err, result) {
          handleCheckCallback(result)
        });
      });
    }
  }

  onCheck(e){
    this.checkAccNumber(this.handleCheckCallBack.bind(this))
    e.preventDefault();
  }

  updatePopupbox(success) {
    const contentSuccess = (
      <div>
        <div className="alert alert-success">Transfer Success</div>
        <Button className="button-submit" onClick={PopupboxManager.close}>Close</Button>
      </div>
    )

    const contentFail = (
      <div>
        <div className="alert alert-danger">Transfer Failed</div>
        <Button className="button-submit" onClick={PopupboxManager.close}>Close</Button>
      </div>
    )

    if(success){
      PopupboxManager.update({
        contentSuccess,
        config: {
          titleBar: {
            text: 'Transfer'
          }
        }
      })
      console.log('sukses')
    }
    else{
      console.log('gagal')
      PopupboxManager.update({
        contentFail,
        config: {
          titleBar: {
            text: 'Transfer'
          }
        }
      })
    }
  }

  openPopupbox () {
    const content = (
      <Form className="flex-container-col" onSubmit={this.handleSendButton}>
        <label style={{ fontWeight: 'bold' }}>Recipient :</label>
        <label style={{ fontStyle: 'italic' }}>{this.state.recipientFullName}</label>
        <label style={{ fontWeight: 'bold' }}>Amount :</label>
        <Input type="money" onChange={this.handleChangeAmount}/>
        <Button className="button-send-popup" type="submit" style={{ width: '100%' }}>SEND</Button>
      </Form>
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
          <Col style={{padding:"0px"}}>
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
          </Col>
          {
            this.state.messageState == 1 &&
            <div className="alert alert-success flex-container-row" id="receiver">
              <img src={require('../avatar.png')} alt="Azhar D." style={{ width: '50px', margin: '10px' }}/>
              <div className="flex-container-col">
                <div className="fullName" style={{ alignmentBaseline: 'left', marginTop: '6px' }}>
                  {this.state.recipientFullName}
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
          {
            this.state.messageState == 3 &&
            <div className="alert alert-info" id="receiver-virtualAcc">
              Virtual Account detected
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
