import React from 'react'
import { Redirect } from 'react-router-dom'
import {
  Container, Col, Form,
  FormGroup, Label, Input,
  Button
} from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../CSS/Login.css'

export default class LoginComponent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      no_rek: null,
      loggedIn:false,
      error:false,
    }
    this.onChange = this.onChange.bind(this)
    this.onLogin = this.onLogin.bind(this)
  }

  onChange (event) {
    const re = /^[0-9\b]+$/
    if (re.test(event.target.value)) {
      this.setState({ no_rek: event.target.value })
    }
  }

  onCallback(rekeningExist){
    if(rekeningExist){
      console.log("wakgeng")
      console.log(this.state.no_rek)
      localStorage.setItem("cookieBankPro", this.state.no_rek)
      this.setState({loggedIn:true});
      this.props.renderNavbar();
    } else {
      this.setState({error:true});
    }
  }

  onLogin(e){
    console.log(this.state.no_rek);
    this.validateRekening(this.state.no_rek, this.onCallback.bind(this));
    e.preventDefault();
  }

  validateRekening(AccNo, cb){
    let res = false;
    var soap = require('soap');
    var url = 'http://3.93.238.160:8080/bankprowebservice-1.0-SNAPSHOT/NewWebService?wsdl';
    var args = {Rekening: AccNo};
    soap.createClient(url, function(err, client) {
      client.validateRekening(args, function(err, result) {
        console.log(result['return']);
        res = result['return'];
        cb(res)
      });
    });
  }

  render () {
    const { error } = this.state.error;
    return (
      <Container className="center-container">
        <div className="card">
          <h2>Login Bank Pro</h2>
          <Form className="form" onSubmit={this.onLogin}>
            <Col>
              <FormGroup>
                <Label style={{ fontStyle: 'italic' }}>Account Number</Label>
                <Input
                  type="number"
                  min="0"
                  name="accountNo"
                  id="accountNo"
                  placeholder="your account number"
                  onChange={(e) => this.onChange(e)}
                />
                {error && <div>There's no such account. Try again!</div>}
              </FormGroup>
            </Col>
            <Button type="submit" style={{ backgroundColor: '#21242D' }} >Login</Button>
            {
              this.state.loggedIn === true &&
              <Redirect to='/'/>
            }
          </Form>
        </div>
      </Container>
    )
  }
}
