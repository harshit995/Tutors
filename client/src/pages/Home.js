import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { authContext } from '../components/context/ContextProvider';
import Layout from '../components/Layout';
import { usergetfunc } from '../services/Apis';

const Home = () => {
    const navigate = useNavigate();
    const { user, setUser } = useContext(authContext);

    const getUserdata = async () => {
        const response = await usergetfunc();
        if (response.status !== 200) {
            navigate('/login')
        }
        else {
            console.log("the data is..")
            console.log(user)
        }
    }
    useEffect(() => {
        getUserdata();
    }, [])


    return (
        <Layout>
            this is home page
        </Layout>
    )
}

export default Home
