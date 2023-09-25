import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../components/Layout'
import { tutorgetfunc } from '../services/Apis'
// import { authContext } from '../components/context/ContextProvider'


const BookingPage = () => {
    const [tutors, setTutors] = useState([])

    const { id } = useParams()
    const getUserdata = async () => {
        const response = await tutorgetfunc(id);
        if (response.status === 200) {

            console.log("the tutors are..")
            console.log(response)
            setTutors(response.data)
        }
    }
    useEffect(() => {
        getUserdata();
    }, [])
    return (
        <Layout>
            <h2 className='text-center p-2'>Booking Page</h2>
            <div className="container">
                {tutors && (
                    <div>
                        <h3>{tutors.firstname} {tutors.lastname}</h3>
                        <h4>Fees Per Student : {tutors.feesPerStudent} </h4>
                        <h4>timings : {tutors.timings} </h4>
                    </div>
                )}
            </div>
        </Layout>
    )
}


export default BookingPage