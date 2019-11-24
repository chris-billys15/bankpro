import React from 'react'
import { Redirect } from 'react-router-dom'
import { Container, Col, Form, FormGroup, Label, Input, Button
} from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../CSS/Login.css'

export default class LoginComponent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      noRekening: null,
      loggedIn:false,
      error:false,
    }
    this.onChange = this.onChange.bind(this)
    this.onLogin = this.onLogin.bind(this)
  }

  onChange (event) {
    const re = /^[0-9\b]+$/
    if (re.test(event.target.value)) {
      this.setState({ noRekening: event.target.value })
    }
  }

  onCallback(rekeningExists){
    console.log(rekeningExists);
    if(rekeningExists){
      console.log(this.state.noRekening)
      localStorage.setItem("cookieBankPro", this.state.noRekening)
      this.setState({error:false, loggedIn:true});
      this.props.renderNavbar(this.state.noRekening);
    } else {
      this.setState({error:true, loggedIn:false});
    }
  }

  validateRekening(AccNo, cb){
    let res = false;
    var soap = require('soap');
    var url = 'http://100.26.43.243:8080/bankprowebservice-1.0-SNAPSHOT/NewWebService?wsdl';
    var args = {Rekening: AccNo};
    soap.createClient(url, function(err, client) {
      client.validateRekening(args, function(err, result) {
        console.log(result);
        res = result.return.accountExists;
        cb(result.return.accountExists);
      });
    });
  }

  onLogin(e){
    console.log(this.state.noRekening);
    this.validateRekening(this.state.noRekening, this.onCallback.bind(this));
    e.preventDefault();
  }

  render () {
    return (
      <Container className="center-container">
        <div className="card">
          <h2>Login Bank Pro</h2>
          <Form className="form" onSubmit={this.onLogin}>
            <Col>
              <FormGroup>
                <Label style={{ fontStyle: 'italic' }}>Account Number</Label>
                {this.state.error && <div className="alert alert-danger"style={{padding:"5px", marginBottom:"8px"}}><strong>There's no such account.</strong> Try again!</div>}
                <Input
                  type="number"
                  min="0"
                  name="accountNo"
                  id="accountNo"
                  placeholder="your account number"
                  onChange={(e) => this.onChange(e)}
                />
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
