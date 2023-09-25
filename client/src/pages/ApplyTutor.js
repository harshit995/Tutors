import React, { useContext, useEffect, useState } from 'react'
import Layout from '../components/Layout'
import Card from "react-bootstrap/Card"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { ToastContainer, toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import "../style/Layout.css"
import man from "../images/man.png"
import 'react-toastify/dist/ReactToastify.css';
import { authContext } from '../components/context/ContextProvider';
import { applytutfunc } from '../services/Apis';
// import { addData } from '../../components/context/ContextProvider';

const ApplyTutor = () => {
    const { user } = useContext(authContext);
    const [inputdata, setInputData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        age: "",
        phone: "",
        website: "",
        address: "",
        specialization: "",
        experience: "",
        feesPerStudent: "",
        timings: "",
        userId: user._id
    });

    const [image, setImage] = useState("");
    const [preview, setPreview] = useState("");


    const navigate = useNavigate();

    // setInput Value
    const setInputValue = (e) => {
        const { name, value } = e.target;
        setInputData({ ...inputdata, [name]: value })
    }

    // profile set
    const setProfile = (e) => {
        setImage(e.target.files[0])
    }

    //submit userdata
    const submitUserData = async (e) => {
        e.preventDefault();

        const userId = user._id
        const { firstname, lastname, email, age, phone, website, address, specialization, experience, feesPerStudent, timings } = inputdata;

        if (firstname === "") {
            toast.error("First name is Required !")
        } else if (lastname === "") {
            toast.error("Last name is Required !")
        } else if (email === "") {
            toast.error("Email is Required !")
        } else if (!email.includes("@")) {
            toast.error("Enter Valid Email !")
        } else if (phone === "") {
            toast.error("Mobile is Required !")
        } else if (age === "") {
            toast.error("Age is Required !")
        } else if (address === "") {
            toast.error("location is Required !")
        } else {

            const data = new FormData();
            data.append("firstname", firstname)
            data.append("lastname", lastname)
            data.append("email", email)
            data.append("age", age)
            data.append("phone", phone)
            data.append("website", website)
            data.append("address", address)
            data.append("specialization", specialization)
            data.append("experience", experience)
            data.append("feesPerStudent", feesPerStudent)
            data.append("doc_profile", image)
            data.append("timings", timings)
            data.append("userId", userId)

            const config = {
                "Content-Type": "multipart/form-data"
            }
            console.log(userId)
            const response = await applytutfunc(data, config);
            // console.log(response)

            if (response.status === 200) {
                setInputData({
                    ...inputdata,
                    firstname: "",
                    lastname: "",
                    email: "",
                    age: "",
                    phone: "",
                    website: "",
                    address: "",
                    specialization: "",
                    experience: "",
                    feesPerStudent: "",
                    timings: "",
                    userId: user._id
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
        <Layout>
            {/* <h1 className='text-center'>ApplyTutor</h1> */}
            <div className="container">
                <h2 className='text-center mt-1'>Apply Tutor</h2>
                <Card className='shadow mt-3 p-3'>
                    <div className="profile_div text-center">
                        <img src={preview ? preview : man} alt="img" />
                    </div>

                    <Form method="POST">
                        <Row>
                            <h4>Personal Details</h4>
                            <hr />
                            <Form.Group className="mb-3 col-lg-6"  >
                                <Form.Label>First name</Form.Label>
                                <Form.Control type="text" name='firstname' value={inputdata.firstname} onChange={setInputValue} placeholder='Enter FirstName' />
                            </Form.Group>
                            <Form.Group className="mb-3 col-lg-6" >
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" name='lastname' value={inputdata.lastname} onChange={setInputValue} placeholder='Enter LastName' />
                            </Form.Group>
                            <Form.Group className="mb-3 col-lg-6" >
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" name='email' value={inputdata.email} onChange={setInputValue} placeholder='Enter Email' />
                            </Form.Group>
                            <Form.Group className="mb-3 col-lg-6" >
                                <Form.Label>Mobile</Form.Label>
                                <Form.Control type="number" name='phone' value={inputdata.phone} onChange={setInputValue} placeholder='Enter Mobile' />
                            </Form.Group>
                            <Form.Group className="mb-3 col-lg-6" >
                                <Form.Label>Select Your Profile</Form.Label>
                                <Form.Control type="file" name='doc_profile' onChange={setProfile} placeholder='Select Your Profile' />
                            </Form.Group>
                            <Form.Group className="mb-3 col-lg-6" >
                                <Form.Label>Enter Your Location</Form.Label>
                                <Form.Control type="text" name='address' value={inputdata.address} onChange={setInputValue} placeholder='Enter Your Location' />
                            </Form.Group>
                            <Form.Group className="mb-3 col-lg-6" >
                                <Form.Label>Enter Your Age</Form.Label>
                                <Form.Control type="text" name='age' value={inputdata.age} onChange={setInputValue} placeholder='Enter Your Age' />
                            </Form.Group>
                            <Form.Group className="mb-3 col-lg-6" >
                                <Form.Label>Enter Your Website</Form.Label>
                                <Form.Control type="text" name='website' value={inputdata.website} onChange={setInputValue} placeholder='Enter Your website' />
                            </Form.Group>

                            <h4>Professional Details</h4>
                            <hr />
                            <Form.Group className="mb-3 col-lg-6" >
                                <Form.Label>Enter Your specialization</Form.Label>
                                <Form.Control type="text" name='specialization' value={inputdata.specialization} onChange={setInputValue} placeholder='Enter Your specialization' />
                            </Form.Group>
                            <Form.Group className="mb-3 col-lg-6" >
                                <Form.Label>Enter Your experience</Form.Label>
                                <Form.Control type="text" name='experience' value={inputdata.experience} onChange={setInputValue} placeholder='Enter Your experience' />
                            </Form.Group>
                            <Form.Group className="mb-3 col-lg-6" >
                                <Form.Label>Enter Your fees Per Student</Form.Label>
                                <Form.Control type="text" name='feesPerStudent' value={inputdata.feesPerStudent} onChange={setInputValue} placeholder='Enter Your feesPerStudent' />
                            </Form.Group>
                            <Form.Group className="mb-3 col-lg-6" >
                                <Form.Label>Enter Your timings</Form.Label>
                                <Form.Control type="text" name='timings' value={inputdata.timings} onChange={setInputValue} placeholder='Enter Your timings' />
                            </Form.Group>
                            <Button navigate="/" variant="primary" onClick={submitUserData} type="submit" >
                                Submit
                            </Button>
                        </Row>

                    </Form>
                </Card>
                <ToastContainer position="top-center" />
            </div>
        </Layout>
    )
}

export default ApplyTutor