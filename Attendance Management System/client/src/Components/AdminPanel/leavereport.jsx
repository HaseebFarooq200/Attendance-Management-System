import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container';

import Card from 'react-bootstrap/Card';

export default function Leavereport() {
    const [LeaveReport, setLeaveReport] = useState([])

    const GetLeaveReport = async () => {
        try {
            const res = await fetch('/usersleave', {
                method: 'GET',
                headers: {
                    Accept: 'application/json', 'Content-type': 'application/json'
                },
                credentials: 'include'
            })
            const myleave = await res.json()
            setLeaveReport(myleave)
            if (res.status !== 200) {
                const error = new Error(res.error);
                throw error
            }
        } catch (error) {
            console.log(Error)
        }
    }
    useEffect(() => {
        GetLeaveReport()
        //  eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <>
            <Container className="mt-5" >
                {
                    LeaveReport.map((index, obj) => {
                        return (
                            <Card key={obj} className="mt-3">
                                <Card.Body>
                                    <Card.Title>Subject: {index.leaveSubject}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">Leave Date: {index.leaveDate}</Card.Subtitle>
                                    <Card.Text>
                                        {index.leaveDescription}
                                    </Card.Text>
                                    <span style={{ fontSize: '12px' }}>{index.currentDate}</span>
                                </Card.Body>
                            </Card>
                        )
                    })
                }

            </Container>
        </>
    )
}
