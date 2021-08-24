import React, { Fragment, useState, useContext } from 'react';
import { forgotPassReq } from "./fetchApi";
import { LayoutContext } from "../index";

const ForgotPassword = (props) => {

    const { data: layoutData, dispatch: layoutDispatch } = useContext(LayoutContext)

    const [data, setData] = useState({
        email: "",
        error: false,
        loading: true,
    })

    const alert = (msg, type) => (
        <div className={`text-sm text-${type}-500`}>{msg}</div>
    );

    const formSubmit = async () => {
        setData({ ...data, loading: true });
        try {
            let responseData = await forgotPassReq(data.email);
            if (responseData.error) {
                setData({
                    ...data,
                    loading: false,
                    error: responseData.error
                });
            } else if (responseData.success) {
                setData({
                    success: responseData.success,
                    email: "",
                    loading: false,
                    error: false,
                })
            } else {
                setData({ email: "", loading: false, error: false });
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Fragment>
            <div style={{ padding: '10%' }}>
                <div className="text-center text-2xl mb-6">Forgot Password</div>
                {layoutData.loginSignupError ? (
                    <div className="bg-red-200 py-2 px-4 rounded">
                        You need to login for checkout. Haven't accont? Create new one.
                    </div>
                ) : (
                    ""
                )}
                {data.success ? alert(data.success, "green") : ""}
                <form className="space-y-4">
                    <div className="flex flex-col">
                        <label htmlFor="name">
                            Email Address
                            <span className="text-sm text-gray-600 ml-1">*</span>
                        </label>
                        <input
                            onChange={(e) => {
                                setData({ ...data, email: e.target.value, error: false });
                                layoutDispatch({ type: "loginSignupError", payload: false });
                            }}
                            value={data.email}
                            type="text"
                            id="name"
                            className={`${!data.error ? "" : "border-red-500"
                                } px-4 py-2 focus:outline-none border`}
                        />
                        {!data.error ? "" : alert(data.error, "red")}
                    </div>
                    <div
                        onClick={(e) => formSubmit()}
                        style={{ background: "#303031" }}
                        className="font-medium px-4 py-2 text-white text-center cursor-pointer"
                    >
                        Send Mail
                    </div>
                </form>
            </div>
        </Fragment>
    )
}

export default ForgotPassword