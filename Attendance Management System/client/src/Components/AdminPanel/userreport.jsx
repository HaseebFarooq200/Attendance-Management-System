import React, { useState, useEffect } from 'react'
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

export default function Userreport() {
    let grade;
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
            <MDBTable className='mt-5' align='middle'>
                <MDBTableHead>
                    <tr>
                        <th scope='col'>User Id</th>
                        <th scope='col'>User Name</th>
                        <th scope='col'>Designation</th>
                        <th scope='col'>No. of Presents</th>
                        <th scope='col'>Grade</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    {
                        UserData.map((index,obj) => {
                            if(index.countPresent===10){
                                grade='A'
                               
                            }
                            else if(index.countPresent>=8 && index.countPresent<10){
                                grade='B'
                                
                            }
                            else if(index.countPresent>=5 && index.countPresent<8){
                                grade='C'
                                
                            }
                            else if(index.countPresent>=3 && index.countPresent<5){
                                grade='D'
                                
                            }
                            else if(index.countPresent>=0 && index.countPresent<3){
                                grade='F'
                            }
                            return (
                                <>
                                    <tr key={obj}>
                                        <td>
                                            <div className='d-flex align-items-center'>
                                                <div className='ms-3'>
                                                    <p className='fw-bold mb-1'>{index.userId}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <p className='fw-normal mb-1'>{index.userName}</p>
                                        </td>
                                        <td>
                                            <p className='fw-normal mb-1'>{index.designation}</p>
                                        </td>
                                        <td>
                                            {index.countPresent}
                                        </td>
                                        <td>
                                            { grade} 
                                        </td>
                                    </tr>
                                </>
                            )
                        })
                    }

                </MDBTableBody>
            </MDBTable>
        </>
    )
}
