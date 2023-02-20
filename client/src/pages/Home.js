import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { usergetfunc } from '../services/Apis';

const Home = () => {
    const navigate = useNavigate();
    const getUserdata = async () => {

        const response = await usergetfunc();
        if (response.status !== 200) {
            navigate('/login')
        }
    }
    useEffect(() => {
        getUserdata();
    }, [])


    return (
        <div>
            this is home page

        </div>
    )
}

export default Home
