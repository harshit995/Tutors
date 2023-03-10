import React, { useContext, useState } from 'react'
import Card from "react-bootstrap/Card"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { NavLink, useNavigate } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import login from "../images/login.png"
import 'react-toastify/dist/ReactToastify.css';
import { loginfunc } from '../services/Apis';
import { authContext } from '../components/context/ContextProvider';
import { toast, ToastContainer } from 'react-toastify';


const Login = () => {
    let navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { user, setUser } = useContext(authContext);


    const loginUser = async (e) => {
        e.preventDefault();

        if (email === "") {
            toast.error("Email is Required !")
        } else if (!email.includes("@")) {
            toast.error("Enter Valid Email !")
        }
        else {
            const data = new FormData();

            data.append("email", email)
            data.append("password", password)

            const response = await loginfunc(data);

            if (response.status === 200) {
                setEmail("")
                setPassword("")
                setUser({ ...response.data })
                console.log("user is..")
                console.log(user)
                navigate('/')
            }
            else {
                toast.error("Enter Valid details!")
            }

        }
    }
    return (
        <div className="container">
            <Card className='shadow mt-3 p-3'>
                <h2 className='text-center mt-1'> User Login</h2>
                <Form method="POST">
                    <Row>

                        <Form.Group className="mb-3 " controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" name='email' value={email}
                                onChange={(e) => setEmail(e.target.value)} placeholder='Enter Email' />
                        </Form.Group>
                        <Form.Group className="mb-3 " controlId="formBasicEmail">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name='password' value={password}
                                onChange={(e) => setPassword(e.target.value)} placeholder='Enter your password' />
                        </Form.Group>
                        <Button variant="primary" type="submit" value="Log In"
                            onClick={loginUser} >
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
            <ToastContainer position="top-center" />
        </div>
    )
}

export default Login
