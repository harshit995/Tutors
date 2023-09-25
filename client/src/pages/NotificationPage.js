import React, { useContext, useEffect, useState } from 'react'
import Layout from '../components/Layout'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { authContext } from '../components/context/ContextProvider';
import { getRefreshToken, getdeletefunc, getmarkallreadfunc } from '../services/Apis';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const NotificationPage = () => {
    const { user, setUser } = useContext(authContext);
    useEffect(() => {
        async function getData() {
            const response = await getRefreshToken();
            if (response.status == 200) {
                setUser({ ...response.data, token: response.data.token, isAuthenticated: true });
            }
            console.log("theUserIs")
        }
        getData();
    }, [])
    // const { user } = useContext(authContext);
    const [key, setKey] = useState('home');

    let navigate = useNavigate();

    console.log("noti  is...")
    // console.log(user.seennotification)
    console.log(user)

    const handlemarkallread = async () => {

        const userId = user._id
        const data = new FormData()
        data.append("userId", userId)
        console.log("aftter append..")
        console.log(data)
        console.log("now id is...")
        console.log(userId)
        const response = await getmarkallreadfunc(data)
        console.log("The response is..")
        console.log(userId)
        if (response.status === 200) {
            toast.success("Message Read ")
        }
    }

    const handledeleteread = async () => {
        const userId = user._id
        const data = new FormData()
        data.append("userId", userId)
        // console.log("aftter append..")
        // console.log(data)
        // console.log("now id is...")
        // console.log(userId)

        const response = await getdeletefunc(data)
        if (response.status === 200) {
            toast.success("Message deleted ")
        }

    }
    // const { user, setUser } = useContext(authContext);

    return (
        <Layout>
            <h3 className='p-2 text-center'>Notification Page</h3>
            <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className=""
            >
                <Tab eventKey="Unread" title="Unread">
                    <div className="d-flex justify-content-end">
                        <h4 className='p-2 text-primary' onClick={handlemarkallread} style={{ cursor: "pointer" }} >Mark all read</h4>
                    </div>
                    {
                        user?.notification.map((notificationMsg) => (
                            <div className="card" >
                                <div className="card-body " onClick={() => navigate(notificationMsg.onClickpath)} style={{ cursor: "pointer" }}>
                                    {notificationMsg.message}
                                </div>
                            </div>
                        ))
                    }
                </Tab>
                <Tab eventKey="read" title="read">
                    <div className="d-flex justify-content-end">
                        <h4 className='p-2 text-primary' style={{ cursor: "pointer" }} onClick={handledeleteread}  >Delete all read</h4>
                    </div>
                    {
                        user?.seennotification.map((notificationMsg) => (
                            <div className="card" >
                                <div className="card-body " onClick={() => navigate(notificationMsg.onClickpath)} style={{ cursor: "pointer" }}>
                                    {notificationMsg.message}
                                </div>
                            </div>
                        ))
                    }
                </Tab>
            </Tabs>
            <ToastContainer position="top-center" />
        </Layout>
    )
}

export default NotificationPage