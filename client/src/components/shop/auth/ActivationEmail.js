import React, { Fragment, useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { activationEmailReq } from "./fetchApi";

const ActivationEmail = () => {
    const { activation_token } = useParams()

    const [data, setData] = useState({
        error: false,
        loading: true,
    })

    const alert = (msg, type) => (
        <div className={`text-lg text-${type}-500`}>{msg}</div>
    );

    useEffect(async () => {
        if (activation_token) {
            try {
                let responseData = await activationEmailReq(activation_token)
                console.log(responseData)
                if (responseData.token) {
                    localStorage.setItem("jwt", JSON.stringify(responseData));
                    window.location.href = "/";
                } else if (responseData.error) {
                    setData({
                        ...data,
                        loading: false,
                        error: responseData.error
                    });
                }
            } catch (error) {
                console.log(error)
            }
        }
    }, [activation_token])

    return (
        <Fragment>
            <div style={{ padding: '10%', textAlign: 'center' }}>
                <div
                    style={{
                        fontFamily: 'Helvetica,Arial,Helvetica,sans-serif',
                        color: '#111111',
                        fontSize: '28px',
                        lineHeight: '18px',
                        padding: '0 0 8px',
                        font: '600 24px/32px Arial,Helvetica,sans-serif,Fira',
                    }}>
                    {data.error ? alert(data.error, "red") : ""}
                </div>
            </div>
        </Fragment>
    )
}

export default ActivationEmail