import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table';

// import Form from 'react-bootstrap/Form';
// import { MDBBtn } from 'mdb-react-ui-kit';

export default function Usersdata() {
    const [UserData, setUserData] = useState([])

    const GetUsersData = async () => {
        try {
            const res = await fetch('/usersdata', {
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
            console.log(Error)
        }
    }
    useEffect(() => {
        GetUsersData();
        //  eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Table responsive="sm" className='mycont'>
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>User Name</th>
                        <th>Designation</th>
                        <th>Presents</th>
                        <th>Absents</th>
                        <th>Leave</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        UserData.map((index,obj) => {
                            return (
                                <>
                                    <tr key={obj}>
                                        <td>{index.userId}</td>
                                        <td>{index.userName}</td>
                                        <td>{index.designation}</td>
                                        <td>{index.countPresent}</td>
                                        <td>{index.countAbsent}</td>
                                        <td>{index.countLeave}</td>
                                    </tr>
                                </>
                            )
                        })
                    }

                </tbody>
            </Table>
        </>
    )
}
