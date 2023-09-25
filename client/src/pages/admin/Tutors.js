import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { getalltutorsfunc, statuschangefunc } from '../../services/Apis';
import { BASE_URL } from '../../services/helper';
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { NavLink } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
const Tutors = () => {

    const [tutors, setTutors] = useState({});


    const tutorsfunc = async () => {
        const response = await getalltutorsfunc()
        if (response.status === 200) {
            // console.log(response)
            setTutors(response.data)
        }
    }

    const handleaccountstatus = async (element, status) => {


        const data = new FormData()
        data.append("tutorId", element._id)
        data.append("userId", element.userId)
        data.append("status", status)

        console.log(status)
        const response = await statuschangefunc(data)
        if (response.status === 200) {
            toast.success("Account updated....")
        }
    }

    useEffect(() => {
        tutorsfunc();

    }, [])

    return (
        <Layout>
            <h2 className='p-2 text-center'>All Tutors</h2>
            <Row>
                <div className="col mt-3">
                    <Card className="shadow ">
                        <Table className="align-items-center" responsive="sm">
                            <thead className="thead-dark">
                                <tr className="table-dark">
                                    <th>ID</th>
                                    <th>FullName</th>
                                    <th>Email</th>
                                    <th>Mobile</th>
                                    <th>Status</th>
                                    <th>Profile</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tutors.length > 0 ? tutors.map((element, index) => {
                                    return (
                                        <>
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td>{element.firstname + " " + element.lastname}</td>
                                                <td>{element.email}</td>
                                                <td>{element.phone}</td>
                                                <td>{element.status}</td>
                                                <td className="img_parent">
                                                    <img style={{ width: "35px", borderRadius: "50%" }} src={`${BASE_URL}/uploads/${element.profile}`} alt="img" />
                                                </td>
                                                <td>{element.status === "pending" ? <Button variant="success" onClick={() => handleaccountstatus(element, "approved")}>Approve</Button> : <Button variant="danger">Reject</Button>}</td>
                                            </tr>

                                        </>
                                    )
                                }) : <div className="no_data text-center">No data Found</div>
                                }

                            </tbody>
                        </Table>
                    </Card>
                </div>
            </Row>
            <ToastContainer />
        </Layout>
    )
}

export default Tutors