import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import './Signin.css'
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
}
  from 'mdb-react-ui-kit';

export default function Signin() {
  const navigate = useNavigate();

  const [formValue, setFormValue] = useState({
    userId: '',
    password: ''
  });

  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const Signin = async (e) => {
    const { userId,password} = formValue
    e.preventDefault();
    const response = await fetch('/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, password})
    })

    const UserData = await response.json()
    if (response.status === 200 || !UserData) {
      setFormValue({ 
        userId: '',
        password: ''
      });
      navigate('/userpage')

    }
    else {
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
            <MDBCard className='my-5 bg-glass square mt-5 '>
              <MDBCardBody className='p-5 shadow-5'>
                <h4 className='mb-5'>Sign in</h4>

                <MDBInput
                  value={formValue.userId}
                  name='userId'
                  onChange={onChange}
                  wrapperClass='mb-4'
                  label='User Id'
                  id='form3'
                  type='text' 
                  onKeyPress={event => event.key === 'Enter' ? Signin(event) : null}/>
                <MDBInput
                  value={formValue.password}
                  name='password'
                  onChange={onChange}
                  wrapperClass='mb-4'
                  label='Password'
                  id='form4'
                  type='password' 
                  onKeyPress={event => event.key === 'Enter' ? Signin(event) : null}/>
                <MDBBtn className='w-100 mb-4' size='md' onClick={Signin}>sign in</MDBBtn>
                <MDBBtn className='w-100 mb-4' size='md' onClick={()=>{navigate('/register')}}  >Create new account</MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </div>

        </MDBCol>

      </MDBRow>

    </MDBContainer>
  )
}
