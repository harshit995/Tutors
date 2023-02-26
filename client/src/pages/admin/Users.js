import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { getallusersfunc } from '../../services/Apis';

const Users = () => {

    const [user, setUser] = useState({});

    const usersfunc = async () => {
        const response = await getallusersfunc()
        if (response.status === 200) {
            console.log(response)
            setUser(response.data)
        }
    }

    useEffect(() => {
        usersfunc();

    }, [])
    return (
        <Layout>
            <h2 className='p-2 text-center'>All Users</h2>
        </Layout>
    )
}

export default Users