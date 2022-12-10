import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table';
// import Form from 'react-bootstrap/Form';
// import { MDBBtn } from 'mdb-react-ui-kit';

export default function Updateattendance() {
    const [AttendanceRecord, setAttendanceRecord] = useState([])
    // const [attendance, setAttendance] = useState('Absent');

    const GetAttendanceRecord = async () => {
        try {
            const res = await fetch('/attendancerecord', {
                method: 'GET',
                headers: {
                    Accept: 'application/json', 'Content-type': 'application/json'
                },
                credentials: 'include'
            })

            const myAttendanceRecord = await res.json()
            setAttendanceRecord(myAttendanceRecord)
            if (res.status !== 200) {
                const error = new Error(res.error);
                throw error
            }
        } catch (error) {
            console.log(Error)
        }
    }
    useEffect(() => {
        GetAttendanceRecord()
        //  eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <>
            <Table responsive="sm" className='mycont'>
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>User Name</th>
                        <th>Attendance</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        AttendanceRecord.map((object,index) => {
                            return (
                                    <tr key={index}>
                                        <td >{object.userId}</td>
                                        <td>{object.userName}</td>
                                        <td >{object.attendanceStatus}</td>
                                        <td >{object.Date}</td>
                                        
                                        {/* <td></td> */}
                                    </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </>
    )
}
