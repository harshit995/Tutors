import React, { useContext, useEffect, useState } from 'react'
import Row from 'react-bootstrap/esm/Row';
import { useNavigate } from 'react-router-dom';
// import { authContext } from '../components/context/ContextProvider';
import Layout from '../components/Layout';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import TutorsList from '../components/TutorsList';
import { usergetfunc } from '../services/Apis';

const Home = () => {
    const navigate = useNavigate();
    // const { user, setUser } = useContext(authContext);
    const [tutors, setTutors] = useState([])
    const [search, setSearch] = useState("")

    console.log(search)
    const getUserdata = async () => {
        const response = await usergetfunc(search);
        if (response.status !== 200) {
            navigate('/login')
        }
        else {
            // console.log("the approved tutors are..")
            // console.log(response)
            setTutors(response.data)
        }
    }

    useEffect(() => {
        getUserdata();
    }, [search])


    return (
        <Layout>
            <h1 className='text-center p-2'>Home Page</h1>
            <div className="d-flex justify-content-center container">
                <div className="search col-lg-4">
                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Search by address"
                            className="me-2"
                            aria-label="Search"
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </Form>
                </div>
            </div>

            <Row>
                {tutors && tutors.map((tutor) => <TutorsList tutor={tutor} />)}
            </Row>
        </Layout>
    )
}

export default Home
