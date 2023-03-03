import React, { useContext } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import Badge from 'react-bootstrap/Badge';

import { adminMenu, userMenu } from '../Data/data'
import { logoutfunc } from '../services/Apis'
import "../style/Layout.css"
import { authContext } from './context/ContextProvider'

const Layout = ({ children }) => {
    const navigate = useNavigate();
    const { user } = useContext(authContext);
    const location = useLocation();

    //logout
    const handlelogout = async () => {
        const response = await logoutfunc()
        if (response.status === 200) {
            navigate('/login')
        }
    }

    //tutor menu
    const tutorMenu = [
        {
            name: 'Home',
            path: '/',
            icon: "fa-solid fa-house"
        },
        {
            name: 'Appointment',
            path: '/appointments',
            icon: "fa-solid fa-list"
        },
        {
            name: 'Profile',
            path: `/tutor/profile/${user?._id}`,
            icon: "fa-solid fa-address-card"
        },
    ];

    //tutor menu end

    //rendering menu list
    const SidebarMenu = user?.isAdmin ? adminMenu : user?.isTutor ? tutorMenu : userMenu
    return (
        <>
            <div className="main">
                <div className="layout">
                    <div className="sidebar">
                        <div className="logo">
                            <h2>Tutors</h2>
                            <hr style={{ color: "black" }} />
                        </div>
                        <div className="menu">
                            {SidebarMenu.map(menu => {
                                const isActive = location.pathname === menu.path
                                return (
                                    <>
                                        <div className={`menu-item ${isActive && 'active'}`}>
                                            <i className={menu.icon}></i>
                                            <NavLink to={menu.path}>{menu.name}</NavLink>
                                        </div>
                                    </>
                                )
                            })}
                            <div className="menu-item " onClick={handlelogout} >
                                <i className="fa-solid fa-right-from-bracket"></i>
                                <NavLink to="/login">Logout</NavLink>
                            </div>
                        </div>
                    </div>
                    <div className="content">
                        <div className="header">
                            <div className="header-content">

                                {/* <Badge style={{ marginBottom: "28px", marginRight: "20px" }} count={user?.notification.length}></Badge> */}
                                <i onClick={() => {
                                    navigate('/notification')
                                }}
                                    style={{ cursor: "pointer" }}
                                    className="fa-solid fa-bell"></i>
                                <Badge onClick={() => {
                                    navigate('/notification')
                                }}
                                    style={{ cursor: "pointer", marginBottom: "28px", marginRight: "20px" }} bg="secondary">{user?.notification.length}

                                </Badge>
                                <NavLink className="text-decoration-none " to='/profile'>{user?.name}</NavLink>
                            </div>
                        </div>
                        <div className="body">{children}</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Layout