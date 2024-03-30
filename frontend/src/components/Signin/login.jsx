import React from 'react'
import '../Signup/signup.css';
import axios from "axios";
import { useState } from 'react'
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { authAction } from "../../store";
const Login = () => {
    const dispatch = useDispatch();
    const history = useNavigate();
    const [Inputs, setinputs] = useState({ emailID: "", password: "" });

    const change = (e) => {
        const { name, value } = e.target;
        setinputs({ ...Inputs, [name]: value });
    };

    const submit = async (e) => {
        e.preventDefault();
        // console.log(window.location.origin);
        try {
            const response = await axios.post(`${window.location.origin}/api/r1/login`, Inputs,{ timeout: 1200000 });
            if (response.data && response.data.others && response.data.others._id) {
                alert(response.data.message);
                console.log(response.data.others._id);
            } else {
                alert(response.data.message);
                sessionStorage.setItem("id", response.data._id);
                dispatch(authAction.login());
                console.error("response data:", response.data);
                // Handle invalid response data here
                if (response.data.message === "Login successful") {
                    history("/todo");
                }
            }
        } catch (error) {
            console.error("Error occurred during login:", error);
            // Handle login error here
        }
    };
    return (
        <div className='login'>
            <div className='container'>
                <div className='row'>
                    <div className='col-lg-5 d-none d-lg-flex justify-content-center align-items-center column'>
                        <img src='/signup_login_img.png' style={{ width: '530px' }} />
                    </div>
                    <div className='col-lg-7 column d-flex justify-content-center align-items-center flex-column '>
                        <div className='custom-form p-5 '>
                            <div className='d-flex flex-column '>
                                <h2 className='text-center'>Login</h2>
                                <input className='p-2 my-2' type='emial' name='emailID' placeholder='Enter your Email' value={Inputs.emailID} onChange={change} />
                                <input className='p-2 my-2' type='password' name='password' placeholder='Enter your Password' value={Inputs.password} onChange={change} />
                                <button className='btn-signup my-2' type='btn' name='btn_signup' onClick={submit}>Login</button>

                                <p>don't have an account ? <Link to={'/signup'}> Sign Up</Link></p>

                                <Link className="btn d-flex justify-content-center align-items-center google">
                                    <img src="google.png" alt="Google" className="mr-2 " style={{ width: '20px' }} />Continue with Google
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;
