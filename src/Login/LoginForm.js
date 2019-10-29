import React from 'react';
import ReactDOM from 'react-dom';
import {
    Container, Col, Form,
    FormGroup, Label, Input,
    Button,
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LoginForm.css';

export default class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            no_rek : ''
        }
    }

    render(){
        return (
            <Container className="App">
                <div className="card">
                    <h2>Login Bank Pro</h2>
                    <Form className="form">
                        <Col>
                            <FormGroup>
                                <Label>Account Number</Label>
                                <Input
                                    type="number"
                                    name="email"
                                    id="exampleEmail"
                                    placeholder="your account number"
                                />
                            </FormGroup>
                        </Col>
                        <Button>Login</Button>
                    </Form>
                </div>
            </Container>
        );
    }
}