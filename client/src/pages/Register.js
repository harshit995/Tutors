import React, { useEffect, useState } from 'react'
// import Card from "react-bootstrap/Card"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { NavLink } from "react-router-dom";
import Row from 'react-bootstrap/Row';
// import register from "../images/signup.png"
import man from "../images/man.png"
import "../style/register.css"
import { registerfunc } from "../services/Apis"
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom"
// import Select from 'react-select';

const Register = () => {

  const navigate = useNavigate();

  const [inputdata, setInputData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    location: ""
  });

  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");

  const setInputValue = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputdata, [name]: value })
  }

  const setProfile = (e) => {
    setImage(e.target.files[0])
  }

  const submitUserData = async (e) => {
    e.preventDefault();

    const { name, email, password, mobile, location } = inputdata;

    if (name === "") {
      toast.error("First name is Required !")
    } else if (password === "") {
      toast.error("password is Required !")
    } else if (email === "") {
      toast.error("Email is Required !")
    } else if (!email.includes("@")) {
      toast.error("Enter Valid Email !")
    } else if (mobile === "") {
      toast.error("Mobile is Required !")
    } else if (image === "") {
      toast.error("Prfile is Required !")
    } else if (location === "") {
      toast.error("location is Required !")
    } else {

      const data = new FormData();
      data.append("name", name)
      data.append("email", email)
      data.append("password", password)
      data.append("mobile", mobile)
      data.append("user_profile", image)
      data.append("location", location)

      const config = {
        "Content-Type": "multipart/form-data"
      }

      const response = await registerfunc(data, config);
      console.log(response.status)

      if (response.status === 200) {
        setInputData({
          ...inputdata,
          name: "",
          email: "",
          password: "",
          mobile: "",
          location: ""
        });
        setImage("");
        navigate('/')
      }
      else {
        toast.error("Form not submitted..")
      }
    }

  }

  useEffect(() => {
    if (image) {
      setPreview(URL.createObjectURL(image))
    }
  }, [image])


  return (
    //     <>
    //       <div className="container">
    //         <Card className='shadow mt-3 p-3'>
    //           <h2 className='text-center mt-1'> User Registeration</h2>
    //           <div className="profile_div text-center">
    //             <img src={preview ? preview : man} alt="img" />
    //           </div>

    //           <Form method="POST">
    //             <Row>
    //               <Form.Group className="mb-3 col-lg-6" >
    //                 <Form.Label>Full name</Form.Label>
    //                 <Form.Control type="text" name='name' placeholder='Enter FullName' value={inputdata.name} onChange={setInputValue} required />
    //               </Form.Group>
    //               <Form.Group className="mb-3 col-lg-6" >
    //                 <Form.Label>Email address</Form.Label>
    //                 <Form.Control type="email" name='email' placeholder='Enter Email' value={inputdata.email} onChange={setInputValue} required />
    //               </Form.Group>
    //               <Form.Group className="mb-3 col-lg-6" >
    //                 <Form.Label>Mobile</Form.Label>
    //                 <Form.Control type="text" name='mobile' placeholder='Enter Mobile' value={inputdata.mobile} onChange={setInputValue} required />
    //               </Form.Group>
    //               <Form.Group className="mb-3 col-lg-6" >
    //                 <Form.Label>Password</Form.Label>
    //                 <Form.Control type="password" name='password' placeholder='Enter your password' value={inputdata.password} onChange={setInputValue} required />
    //               </Form.Group>
    //               <Form.Group className="mb-3 col-lg-6" >
    //                 <Form.Label>Select Your Profile</Form.Label>
    //                 <Form.Control type="file" name='user_profile' onChange={setProfile} placeholder='Select Your Profile' />
    //               </Form.Group>
    //               <Form.Group className="mb-3 col-lg-6" >
    //                 <Form.Label>Enter Your Location</Form.Label>
    //                 <Form.Control type="text" name='location' placeholder='Enter Your Location' value={inputdata.location} onChange={setInputValue} required />
    //               </Form.Group>
    //               <Button variant="primary" type="submit" onClick={submitUserData}>
    //                 Submit
    //               </Button>
    //             </Row>

    //           </Form>

    //         </Card>
    //         <div className="cont2 ">
    //           <img src={register} alt="signup" />
    //           <NavLink to="/login" className="signup-image-link">
    //             I am already Registered
    //           </NavLink>

    //         </div>
    //         <ToastContainer position="top-center" />
    //       </div>
    //     </>
    //   )
    // }
    <>
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
                    <h2 className='text-center mt-1'> User Registeration</h2>
                    <div className="profile_div text-center">
                      <img src={preview ? preview : man} alt="img" />
                    </div>

                    <Form method="POST">
                      <Row>
                        <Form.Group className="mb-3 col-lg-6" >
                          <Form.Label>Full name</Form.Label>
                          <Form.Control type="text" name='name' placeholder='Enter FullName' value={inputdata.name} onChange={setInputValue} required />
                        </Form.Group>
                        <Form.Group className="mb-3 col-lg-6" >
                          <Form.Label>Email address</Form.Label>
                          <Form.Control type="email" name='email' placeholder='Enter Email' value={inputdata.email} onChange={setInputValue} required />
                        </Form.Group>
                        <Form.Group className="mb-3 col-lg-6" >
                          <Form.Label>Mobile</Form.Label>
                          <Form.Control type="text" name='mobile' placeholder='Enter Mobile' value={inputdata.mobile} onChange={setInputValue} required />
                        </Form.Group>
                        <Form.Group className="mb-3 col-lg-6" >
                          <Form.Label>Password</Form.Label>
                          <Form.Control type="password" name='password' placeholder='Enter your password' value={inputdata.password} onChange={setInputValue} required />
                        </Form.Group>
                        <Form.Group className="mb-3 col-lg-6" >
                          <Form.Label>Select Your Profile</Form.Label>
                          <Form.Control type="file" name='user_profile' onChange={setProfile} placeholder='Select Your Profile' />
                        </Form.Group>
                        <Form.Group className="mb-3 col-lg-6" >
                          <Form.Label>Enter Your Location</Form.Label>
                          <Form.Control type="text" name='location' placeholder='Enter Your Location' value={inputdata.location} onChange={setInputValue} required />
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={submitUserData}>
                          Submit
                        </Button>
                      </Row>

                    </Form>
                    <div className="cont2 text-center pt-3">
                      <NavLink to="/login" className="signup-image-link">
                        I am already Registered || Sign In
                      </NavLink>

                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </section >
        <ToastContainer position="top-center" />
      </div >
    </>
  )
}

export default Register
