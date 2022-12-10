import React, {useEffect } from 'react';
import { useNavigate } from "react-router-dom"

export default function Signout() {
    const navigate = useNavigate();

    const GetSignout = async () => {
        try {
            const res = await fetch('/logout', {
                method: 'GET',
                headers: {
                    Accept: 'application/json', 'Content-type': 'application/json'
                },
                credentials: 'include'
            })
            await res.json()
            if (res.status !== 200) {
                const error = new Error(res.error);
                throw error
            }
        } catch (error) {
            navigate('/')
        }
    }

    useEffect(() => {
        GetSignout()
        //  eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
    <>
    </>
  )
}
