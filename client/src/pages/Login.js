import React, { useContext, useState } from 'react'
// import Card from "react-bootstrap/Card"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { NavLink, useNavigate } from "react-router-dom";
import Row from 'react-bootstrap/Row';
// import login from "../images/login.png"
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
            toast.error("Email is Required ! ")
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
                setUser({ ...response.data, isAuthenicated: true })
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
        <>
            {/* <div className="container">
            <Card className='shadow mt-3 p-3'>
              Password(e.target.value)} placeholder='Enter your password' />
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
} */}
            <div className="form-container">
                <section className="background-radial-gradient overflow-hidden">
                    <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
                        <div className="row gx-lg-5 align-items-center mb-5">
                            <div className="col-lg-6 mb-5 mb-lg-0" style={{ zIndex: "10", color: "white" }}>
                                <h1 className="my-5 display-5 fw-bold ls-tight" >
                                    The best offer <br />
                                    <span >for your business</span>
                                </h1>
                                <p className="mb-4 opacity-70" >
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                                    Temporibus, expedita iusto veniam atque, magni tempora mollitia
                                    dolorum consequatur nulla, neque debitis eos reprehenderit quasi
                                    ab ipsum nisi dolorem modi. Quos?
                                </p>
                            </div>

                            <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
                                <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
                                <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

                                <div className="card bg-glass">
                                    <div className="card-body px-4 py-5 px-md-5">
                                        <h2 className='text-center mt-1'> User Login</h2>
                                        <Form method="POST">
                                            <Row>
                                                {/* hiii */}
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
                                        <div className="cont2 text-center mt-2 ">
                                            <NavLink to="/register" className="signup-image-link">
                                                New User || Register
                                            </NavLink>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section >
                <ToastContainer position="top-right" />
            </div >
        </>
    )
}

export default Login
