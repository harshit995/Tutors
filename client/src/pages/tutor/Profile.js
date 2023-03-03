import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { authContext } from '../../components/context/ContextProvider'
import Layout from '../../components/Layout'
import { gettutorinfofunc } from '../../services/Apis'

const Profile = () => {

    const { user } = useContext(authContext)
    const [tutor, setTutor] = useState(null)

    const { id } = useParams();
    const gettutorinfo = async () => {
        const response = await gettutorinfofunc(id);
        console.log(id)
        console.log("the profile data is..")
        console.log(response.data)
        if (response.status === 200) {
            setTutor(response.data)
            toast.success("Profile Viewed")
        }
    }

    useEffect(() => {
        gettutorinfo()
    }, [])


    return (
        <Layout>
            <h2>Manage Profile</h2>
            <ToastContainer position="top-center" />
        </Layout>
    )
}

export default Profile