import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom"
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import profilepic from '../noprofile.jpg'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import 'react-pro-sidebar/dist/css/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './userhomepage.css'
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { MDBBtn } from 'mdb-react-ui-kit';

export default function Userhomepage() {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [attendance, setAttendance] = useState('Absent');
    const [UserData, setUserData] = useState('')
    const [inputLeave, setInputLeave] = useState({
        leaveSubject: '',
        leaveDate: '',
        leaveDescription: ''
    })
    const [showSuccess, setShowSuccess] = useState(false);

    const [disable, setDisable] = useState(false)

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const handleinputleave = (e) => { setInputLeave({ ...inputLeave, [e.target.name]: e.target.value }) }

    const ApplyLeave = async (e) => {
        e.preventDefault()
        const { userId, userName } = UserData
        const { leaveSubject, leaveDate, leaveDescription } = inputLeave
        const response = await fetch('/applyleave', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, userName, leaveSubject, leaveDate, leaveDescription })
        })

        const Leaveapplied = await response.json()
        if (response.status !== 200 || !Leaveapplied) {
            console.log("Something went wrong")
            window.alert('Something went wrong')
        }
        else {
            setShowSuccess(true)
            setShow(false);
        }

    }
    const PostAttendance = async (e) => {

        const { userId, userName } = UserData
        const attendanceStatus = attendance

        e.preventDefault();
        const response = await fetch('/userattendance', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, userName, attendanceStatus })
        })

        const AttendanceData = await response.json()
        if (response.status !== 200 || !AttendanceData) {
            console.log("Something went wrong")
            window.alert('Something went wrong')
        }
        else {
            setShowSuccess(true)
            setDisable(true)
        }
    }
    const callUserPage = async () => {
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

    const updatebtn = ()=>{
        setDisable(false)
    }

    useEffect(() => {
       setInterval(updatebtn, 86400000)
    }, []);

    useEffect(() => {
        callUserPage()
        //  eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>

            <Row className='my-row'>
                <Col className='mycol'>
                    <ProSidebar>
                        <Menu iconShape="square">
                            <MenuItem >
                                <div className="upload">
                                    <img src={profilepic} alt="" className='myimg' />
                                    <div className="round">
                                        <input type="file" />
                                        <i className="fa fa-camera"></i>
                                    </div>
                                </div>
                            </MenuItem>
                            <MenuItem>
                                <h4 className='text-center'>{UserData.userName}</h4>
                            </MenuItem>
                            <MenuItem>
                                <Link to='/adminpage/:/usersdata'>
                                    Control Panel
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
                    {
                        showSuccess ?
                            <Alert variant="primary" onClose={() => setShowSuccess(false)} dismissible>
                                <Alert.Heading >Success!!!

                                </Alert.Heading>
                            </Alert>
                            :
                            <></>
                    }

                    <h1>Attendance Form</h1>
                    <Table responsive="sm" className='mycont'>
                        <thead>
                            <tr>
                                <th>User ID</th>
                                <th>User Name</th>
                                <th>Present</th>
                                <th>Absent</th>
                                <th>Leave</th>
                                <th>Attendance</th>
                                <th> </th>
                                <th> </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{UserData.userId}</td>
                                <td>{UserData.userName}</td>
                                <td>{UserData.countPresent}</td>
                                <td>{UserData.countAbsent}</td>
                                <td>{UserData.countLeave}</td>
                                <td>
                                    <Form.Select value={attendance} onChange={e => { setAttendance(e.target.value) }}>
                                        <option value="Absent">Absent</option>
                                        <option value="Present">Present</option>
                                        <option value="Leave">Leave</option>
                                    </Form.Select>
                                </td>
                                <td className='text-end'>
                                    {
                                        disable ?
                                            <MDBBtn disabled='true' rounded size='sm'
                                                onClick={PostAttendance}>
                                                Save
                                            </MDBBtn> :
                                            <MDBBtn rounded size='sm'
                                                onClick={PostAttendance}>
                                                Save
                                            </MDBBtn>
                                    }
                                </td>
                                <td className='text-end'>
                                    <MDBBtn type="button" data-mdb-toggle="modal" rounded size='sm'
                                        data-mdb-target="#exampleModal" onClick={handleShow}>
                                        Leave
                                    </MDBBtn>
                                </td>
                            </tr>
                        </tbody>
                    </Table>

                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Leave</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>
                                        Subject
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder='Leave for Medical Reason'
                                        name='leaveSubject'
                                        value={inputLeave.leaveSubject}
                                        onChange={handleinputleave} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>
                                        Date
                                    </Form.Label>
                                    <Form.Control
                                        type="date"
                                        placeholder="name@example.com"
                                        name='leaveDate'
                                        value={inputLeave.leaveDate}
                                        onChange={handleinputleave} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>
                                        Description</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        name='leaveDescription'
                                        value={inputLeave.leaveDescription}
                                        onChange={handleinputleave} />
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={ApplyLeave}>
                                Submit
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Col>
            </Row>
        </>
    )
}
