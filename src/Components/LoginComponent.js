import React from 'react';
import ReactDOM from 'react-dom';
import {
    Container, Col, Form,
    FormGroup, Label, Input,
    Button,
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../CSS/Login.css';

export default class LoginComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            no_rek : '',
            value: ''
        };
        this.onChange = this.onChange.bind(this)
    }

    onChange(event){
        const re = /^[0-9\b]+$/;
        if (event.target.value === '' || re.test(event.target.value)) {
            this.setState({value: event.target.value})
        }
    }

    render(){
        return (
            <Container className="center-container">
                <div className="card">
                    <h2>Login Bank Pro</h2>
                    <Form className="form">
                        <Col>
                            <FormGroup>
                                <Label style={{fontStyle:"italic"}}>Account Number</Label>
                                <Input
                                    type="number"
                                    min="0"
                                    name="accountNo"
                                    id="accountNo"
                                    placeholder="your account number"
                                />
                            </FormGroup>
                        </Col>
                        <Button style={{backgroundColor:"#21242D"}}>Login</Button>
                    </Form>
                </div>
            </Container>
        );
    }
}