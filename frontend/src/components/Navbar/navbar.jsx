import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css';
import { authAction } from '../../store';

const Navbar = () => {
    const isLogined = useSelector((state) => state.isLogined);
    const sessionID = sessionStorage.getItem('id');
    const dispatch = useDispatch();
    const navigate = useNavigate(); 
    
    const logout = () => {
        sessionStorage.clear('id');
        dispatch(authAction.logout());
        navigate('/'); 
    };

    return (
        <div>
            <div className="container mt-3" style={{ backgroundColor: 'aliceblue', borderRadius: '10px' }}>
                <nav className="navbar navbar-expand-lg navbar-light ">
                    <span className="navbar-brand">
                        <Link to='/' style={{ textDecoration: 'none' }}>
                            <FontAwesomeIcon icon={faBook} />
                            <b> Todo</b>
                        </Link>
                    </span>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                            </li>
                            <li className="nav-item active mx-2">
                                <Link className="nav-link" aria-current="page" to='/about'>
                                    About Us
                                </Link>
                            </li>
                            {sessionID && (
                                <li className="nav-item active mx-2">
                                    <Link className="nav-link" aria-current="page" to='/todo'>
                                        Todo
                                    </Link>
                                </li>
                            )}
                            {!sessionID && (
                                <>
                                    <li className="nav-item active btn-nav mx-2">
                                        <Link className="nav-link" aria-current="page" to='/signup'>
                                            Sign Up
                                        </Link>
                                    </li>
                                    <li className="nav-item active btn-nav mx-2">
                                        <Link className="nav-link" aria-current="page" to='/login'>
                                            Login
                                        </Link>
                                    </li>
                                </>
                            )}
                            {sessionID && (
                                <li className="nav-item active btn-nav mx-2" onClick={logout}>
                                    <Link className="nav-link" aria-current="page" to='#'>
                                        Log Out
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default Navbar;