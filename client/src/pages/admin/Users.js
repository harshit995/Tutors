import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { getallusersfunc } from '../../services/Apis';
import { BASE_URL } from '../../services/helper';
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { NavLink } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Users = () => {

    const [user, setUser] = useState({});

    const usersfunc = async () => {
        const response = await getallusersfunc()
        if (response.status === 200) {
            // console.log(response)
            setUser(response.data)
        }
    }

    useEffect(() => {
        usersfunc();

    }, [])
    return (
        <Layout>

            <h2 className='p-2 text-center'>All Users</h2>
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
                                    <th>Tutor</th>
                                    <th>Profile</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {user.length > 0 ? user.map((element, index) => {
                                    return (
                                        <>
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td>{element.name}</td>
                                                <td>{element.email}</td>
                                                <td>{element.mobile}</td>
                                                <td>{element.isTutor ? "Yes" : "No"}</td>
                                                <td className="img_parent">
                                                    <img style={{ width: "35px", borderRadius: "50%" }} src={`${BASE_URL}/uploads/${element.profile}`} alt="img" />
                                                </td>
                                                <td>

                                                    <Button variant="danger">
                                                        &nbsp; Block
                                                    </Button>

                                                </td>
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

export default Users