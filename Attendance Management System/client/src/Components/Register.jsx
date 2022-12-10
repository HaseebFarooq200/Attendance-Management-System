import React,{useState} from 'react'
import { useNavigate } from "react-router-dom"
import './Signin.css'
import {
    MDBContainer,
    MDBRow,
    MDBCardBody,
    MDBCard,
    MDBCol,
    MDBInput,
    MDBBtn,
} from 'mdb-react-ui-kit';

export default function Register() {
    const [formValue, setFormValue] = useState({
        userId: '',
        userName: '',
        designation: '',
        password: '',
        confirmpassword: ''
    });

    const navigate = useNavigate();

    const onChange = (e) => {
        setFormValue({ ...formValue, [e.target.name]: e.target.value });
    };

    const CreateUser = async (e) => {
        const { userId, userName, designation, password, confirmpassword } = formValue
        e.preventDefault();
        const response = await fetch('/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, userName, designation, password, confirmpassword })
        })

        const UserData = await response.json()
        if (response.status === 200 || !UserData) {
            setFormValue({ 
            userId: '',
            userName: '',
            designation: '',
            password: '',
            confirmpassword: ''
        });
        window.alert("Registered Successfully")

        navigate('/')

        }
        else {
            console.log("Something went wrong")
            window.alert('Something went wrong')
        }
    }
    return (
        <MDBContainer fluid className='p-4 background-radial-gradient overflow-hidden'>

            <MDBRow className='row d-flex justify-content-center'>

                <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>
                    <h1 className="my-5 display-3 fw-bold ls-tight px-3" style={{ color: 'hsl(218, 81%, 95%)' }}>
                        Welcome To The <br />
                        <span style={{ color: 'hsl(218, 81%, 75%)' }}>Attendance Management Systems</span>
                    </h1>
                </MDBCol>

                <MDBCol md='4' className='position-relative mt-5'>
                    <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
                    <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

                    <div className="signin-card">
                        <MDBCard className='my-5 bg-glass square  '>
                            <MDBCardBody className='p-5 shadow-5 '>
                                <h4 className='mb-5'>Register</h4>
                                <MDBInput
                                    value={formValue.userId}
                                    name='userId'
                                    onChange={onChange}
                                    id='validationCustom03'
                                    required
                                    label='UserID'
                                    onKeyPress={event => event.key === 'Enter' ? CreateUser(event) : null} />

                                <MDBInput className='mt-3'
                                    value={formValue.userName}
                                    name='userName'
                                    onChange={onChange}
                                    id='validationCustom02'
                                    required
                                    label='User Name'
                                    onKeyPress={event => event.key === 'Enter' ? CreateUser(event) : null} />

                                <MDBInput className='mt-3'
                                    value={formValue.designation}
                                    name='designation'
                                    onChange={onChange}
                                    id='validationCustom03'
                                    required
                                    label='Designation'
                                    onKeyPress={event => event.key === 'Enter' ? CreateUser(event) : null} />

                                <MDBInput className='mb-4 mt-3'
                                    value={formValue.password}
                                    onChange={onChange}
                                    type='password'
                                    name='password'
                                    id='form1Example2'
                                    required
                                    label='Password'
                                    onKeyPress={event => event.key === 'Enter' ? CreateUser(event) : null} />

                                <MDBInput className='mb-4 mt-3'
                                    value={formValue.confirmpassword}
                                    onChange={onChange}
                                    type='password'
                                    name='confirmpassword'
                                    id='form1Example2'
                                    required
                                    label='Confirm Password'
                                    onKeyPress={event => event.key === 'Enter' ? CreateUser(event) : null} />

                                <div className='col-12'>
                                    <MDBBtn type='submit' onClick={CreateUser}>Register</MDBBtn>
                                </div>
                                <br />
                                <div className='col-12'>
                                    <MDBBtn type='submit' onClick={()=>{navigate('/')}}>Already have an account ? </MDBBtn>
                                </div>
                            </MDBCardBody>
                        </MDBCard>
                    </div>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    )
}
