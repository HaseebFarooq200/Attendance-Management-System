import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import profilepic from '../noprofile.jpg'
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link,Outlet} from "react-router-dom";
import 'react-pro-sidebar/dist/css/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../UserPanel/userhomepage.css'

export default function Adminpage() {
    const navigate = useNavigate();
    const [UserData, setUserData] = useState('')

    const GetAdminPage = async () => {
        try {
            const res = await fetch('/userpanel', {
                method: 'GET',
                headers: {
                    Accept: 'application/json', 'Content-type': 'application/json'
                },
                credentials: 'include'
            })
            const mydata = await res.json()
            setUserData(mydata)
            if (res.status !== 200) {
                const error = new Error(res.error);
                throw error
            }
        } catch (error) {
            navigate('/')
        }
    }
    useEffect(() => {
        GetAdminPage()
        //  eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <Row className='my-row'>
            <Col className='mycol'>
                <ProSidebar>
                    <Menu iconShape="square">
                        <MenuItem >
                            <div className="upload">
                                <img src={profilepic} alt="" className='myimg' />
                                <div className="round">
                                    <input type="file"  />
                                    <i className="fa fa-camera"></i>
                                </div>
                            </div>
                        </MenuItem>
                        <MenuItem>
                            <h4 className='text-center'>{UserData.userName}</h4>
                        </MenuItem>
                        <MenuItem>
                            <Link to=':/generatereport'>
                                Generate Report
                            </Link>
                        </MenuItem>
                        <MenuItem>
                            <Link to=':/updateattendance'>
                                View Attendance
                            </Link>
                        </MenuItem>
                        <MenuItem>
                            <Link to=':/usersdata'>
                                Get Users Data
                            </Link>
                        </MenuItem>
                        <MenuItem>
                            <Link to=':/leavereport'>
                                View Applied Leaves
                            </Link>
                        </MenuItem>
                        <MenuItem>
                            <Link to='/userpage'>
                                Back to User Page
                            </Link>
                        </MenuItem>
                        <MenuItem>
                            <Link to='/signout'>
                                Logout
                            </Link>
                        </MenuItem>
                    </Menu>
                </ProSidebar>
            </Col>

            <Col className='mycol'>
                <h1>Admin Page</h1>
                <Outlet />
            </Col>
        </Row>
    )
}
