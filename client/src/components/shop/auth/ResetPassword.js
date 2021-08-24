import React, { Fragment, useState, useContext } from 'react';
import { useParams } from 'react-router-dom'
import { resetPassReq } from "./fetchApi";
import { LayoutContext } from "../index";

// const initialState = {
//     password: '',
//     cf_password: '',
//     err: '',
//     success: ''
// }

// function ResetPassword() {
//     const [data, setData] = useState(initialState)
//     const { access_token } = useParams()

//     const { password, cf_password, err, success } = data

//     const handleChangeInput = e => {
//         const { name, value } = e.target
//         setData({ ...data, [name]: value, err: '', success: '' })
//     }


//     const handleResetPass = async () => {
//         if (isLength(password))
//             return setData({ ...data, err: "Password must be at least 6 characters.", success: '' })

//         if (!isMatch(password, cf_password))
//             return setData({ ...data, err: "Password did not match.", success: '' })

//         try {
//             const res = await axios.post(`/api/reset`, { password }, {
//                 headers: { Authorization: access_token }
//             })

//             return setData({ ...data, err: "", success: res.data.msg })

//         } catch (err) {
//             err.response.data.msg && setData({ ...data, err: err.response.data.msg, success: '' })
//         }

//     }


//     return (
//         <div className="fg_pass">
//             <h2>Reset Your Password</h2>

//             {err && showErrMsg(err)}
//             {success && showSuccessMsg(success)}

//             <div style={{ display: 'flex', justifyContent: 'center' }}>
//                 {success && showSuccessMsg(success) ? <div><Link to="/login" >Login Now</Link> </div> : <div></div>}
//             </div>

//             <div className="row">

//                 <label htmlFor="password">Password</label>
//                 <input type="password" name="password" id="password" value={password}
//                     onChange={handleChangeInput} />

//                 <label htmlFor="cf_password">Confirm Password</label>
//                 <input type="password" name="cf_password" id="cf_password" value={cf_password}
//                     onChange={handleChangeInput} />

//                 <button className="btn btn-primary w-100" onClick={handleResetPass}>Reset Password</button>
//             </div>
//         </div>
//     )
// }

const ResetPassword = (props) => {

    const { access_token } = useParams()

    const [data, setData] = useState({
        password: "",
        cPassword: "",
        error: false,
        loading: false,
        success: false,
    });

    const alert = (msg, type) => (
        <div className={`text-sm text-${type}-500`}>{msg}</div>
    );

    const formSubmit = async () => {
        setData({ ...data, loading: true });
        if (data.cPassword !== data.password) {
            return setData({
                ...data,
                error: {
                    cPassword: "Password doesn't match",
                    password: "Password doesn't match",
                },
            });
        }
        try {
            let responseData = await resetPassReq(data.password, access_token);
            if (responseData.error) {
                setData({
                    ...data,
                    loading: false,
                    error: responseData.error,
                    password: "",
                    cPassword: "",
                });
            } else if (responseData.success) {
                setData({
                    success: responseData.success,
                    password: "",
                    cPassword: "",
                    loading: false,
                    error: false,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Fragment>
            <div style={{ padding: '10%' }}>
                <div className="text-center text-2xl mb-6">Reset Password</div>
                {data.success ? alert(data.success, "green") : <div>
                    <form className="space-y-4">
                        <div className="flex flex-col">
                            <label htmlFor="password">
                                Password<span className="text-sm text-gray-600 ml-1">*</span>
                            </label>
                            <input
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        success: false,
                                        error: {},
                                        password: e.target.value,
                                    })
                                }
                                value={data.password}
                                type="password"
                                id="password"
                                className={`${data.error.password ? "border-red-500" : ""
                                    } px-4 py-2 focus:outline-none border`}
                            />
                            {!data.error ? "" : alert(data.error.password, "red")}
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="cPassword">
                                Confirm password
                                <span className="text-sm text-gray-600 ml-1">*</span>
                            </label>
                            <input
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        success: false,
                                        error: {},
                                        cPassword: e.target.value,
                                    })
                                }
                                value={data.cPassword}
                                type="password"
                                id="cPassword"
                                className={`${data.error.cPassword ? "border-red-500" : ""
                                    } px-4 py-2 focus:outline-none border`}
                            />
                            {!data.error ? "" : alert(data.error.cPassword, "red")}
                        </div>
                        <div
                            onClick={(e) => formSubmit()}
                            style={{ background: "#303031" }}
                            className="px-4 py-2 text-white text-center cursor-pointer font-medium"
                        >
                            Reset Password
                        </div>
                    </form>
                </div>
                }
            </div>
        </Fragment>
    )
}

export default ResetPassword