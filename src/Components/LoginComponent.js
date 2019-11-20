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
      no_rek: '',
      loggedIn:false,
    }
    this.onChange = this.onChange.bind(this)
    this.onLogin = this.onLogin.bind(this)
  }

  onChange (event) {
    const re = /^[0-9\b]+$/
    if (re.test(event.target.value)) {
      this.setState({ no_rek: event.target.value })
      console.log(this.state.no_rek);
    }
  }

  onLogin(e){
    localStorage.setItem("cookieBankPro", this.state.no_rek)
    this.setState({loggedIn:true});
    this.props.renderNavbar();
    e.preventDefault();
  }

  render () {
    const { error } = this.state;
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
                {error && <div color='red'
                                   error={error}
                                   content="There's no such account. Try again!"
                />}
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
