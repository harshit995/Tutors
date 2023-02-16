import React from 'react'
import Card from "react-bootstrap/Card"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { NavLink } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import register from "../images/signup.png"
import man from "../images/man.png"
import "../style.css/register.css"
// import Select from 'react-select';

const Register = () => {
  return (
    <>
      <div className="container">
        <Card className='shadow mt-3 p-3'>
          <h2 className='text-center mt-1'> User Registeration</h2>
          <div className="profile_div text-center">
            <img src={man} alt="img" />
          </div>

          <Form method="POST">
            <Row>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>Full name</Form.Label>
                <Form.Control type="text" name='name' placeholder='Enter FirstName' required />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" name='email' placeholder='Enter Email' required />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>Mobile</Form.Label>
                <Form.Control type="text" name='mobile' placeholder='Enter Mobile' required />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name='password' placeholder='Enter your password' required />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>Select Your Profile</Form.Label>
                <Form.Control type="file" name='user_profile' placeholder='Select Your Profile' />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>Enter Your Location</Form.Label>
                <Form.Control type="text" name='location' placeholder='Enter Your Location' required />
              </Form.Group>
              <Button variant="primary" type="submit" >
                Submit
              </Button>
            </Row>

          </Form>

        </Card>
        <div className="cont2 ">
          <img src={register} alt="signup" />
          <NavLink to="/login" className="signup-image-link">
            I am already Registered
          </NavLink>
        </div>
      </div>
    </>
  )
}

export default Register
