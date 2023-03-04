import React, { useContext, useEffect, useState } from 'react'
import Row from 'react-bootstrap/esm/Row';
import { useNavigate } from 'react-router-dom';
// import { authContext } from '../components/context/ContextProvider';
import Layout from '../components/Layout';
import TutorsList from '../components/TutorsList';
import { usergetfunc } from '../services/Apis';

const Home = () => {
    const navigate = useNavigate();
    // const { user, setUser } = useContext(authContext);
    const [tutors, setTutors] = useState([])

    const getUserdata = async () => {
        const response = await usergetfunc();
        if (response.status !== 200) {
            navigate('/login')
        }
        else {
            console.log("the approved tutors are..")
            console.log(response)
            setTutors(response.data)
        }
    }
    useEffect(() => {
        getUserdata();
    }, [])


    return (
        <Layout>
            <h1 className='text-center p-2'>Home Page</h1>
            <Row>
                {tutors && tutors.map((tutor) => <TutorsList tutor={tutor} />)}
            </Row>
        </Layout>
    )
}

export default Home
