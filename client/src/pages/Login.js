import React from 'react'
import Card from "react-bootstrap/Card"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { NavLink } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import login from "../images/login.png"


const Login = () => {
    return (
        <div className="container">
            <Card className='shadow mt-3 p-3'>
                <h2 className='text-center mt-1'> User Login</h2>
                <Form method="POST">
                    <Row>

                        <Form.Group className="mb-3 " controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" name='email' placeholder='Enter Email' />
                        </Form.Group>
                        <Form.Group className="mb-3 " controlId="formBasicEmail">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name='password' placeholder='Enter your password' />
                        </Form.Group>
                        <Button variant="primary" type="submit" >
                            Log in
                        </Button>
                    </Row>

                </Form>

            </Card>
            <div className="cont2 ">
                <img src={login} alt="signup" />
                <NavLink to="/register" className="signup-image-link">
                    New User
                </NavLink>
            </div>
        </div>
    )
}

export default Login
