import React, { useState } from 'react'
import '../Signup/signup.css';
import axios from "axios";
import {useNavigate,Link} from "react-router-dom";

const Signup = () => {
    const history = useNavigate();
    const [Inputs, setinputs] = useState({ emailID: "", userName: "", password: "" });

    const change = (e) => {
        const { name, value } = e.target;
        setinputs({ ...Inputs, [name]: value });
    };

    const submit = async (e) => {
        e.preventDefault();
        await axios.post(`https://todo-mern-stack-jo8o.onrender.com/api/r1/register`, Inputs,{ timeout: 1200000 })
            .then((response) => {
                if(response.data.message == "User already exists"){
                    alert(response.data.message);
                }
                else
                {
                    alert(response.data.message);
                    // console.log(response);
                    setinputs({
                        emailID: "",
                        userName: "",
                        password: ""
                    });
                    history("/login")
                }
            });
        // console.log(Inputs);

    };
    return (
        <div className='signup'>
            <div className='container'>
                <div className='row'>
                    <div className='col-lg-5 d-none d-lg-flex justify-content-center align-items-center column'>
                        <img src='/signup_login_img.png' style={{ width: '530px' }} />
                    </div>
                    <div className='col-lg-7 column d-flex justify-content-center align-items-center flex-column '>
                        <div className='custom-form p-5 '>
                            <div className='d-flex flex-column '>
                                <h2 className='text-center'>Sign Up</h2>
                                <input className='p-2 my-2' type='emial' name='emailID' placeholder='Enter your Email' value={Inputs.emailID} onChange={change} />
                                <input className='p-2 my-2' type='userName' name='userName' placeholder='Enter User Name' value={Inputs.userName} onChange={change} />
                                <input className='p-2 my-2' type='password' name='password' placeholder='Enter your Password' value={Inputs.password} onChange={change} />

                                <button className='btn-signup my-2' type='btn' name='btn_signup' onClick={submit}>Sign Up</button>
                                <p>do you have a Accpunt? <Link to={'/login'}> Login</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup;