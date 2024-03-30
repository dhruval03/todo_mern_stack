import React from 'react'
import '../Home/home.css';
import {Link} from 'react-router-dom';
const home = () => {
  return (
    <div className='home d-flex justify-content-center align-items-center'>
        <div className='container d-flex justify-content-center align-items-center flex-column text-center'>
            <h1>Manage Your <br></br>Work & Life, Finally.</h1>
            <p>Become Focused, Oraganized, and calm with<br/>todo app. The world's #1 task manager app.</p>
            <Link to={'/signup'}>
            <button className='home-btn p-1'>Make Todo List</button>
            </Link>
        </div>
    </div>
  )
}

export default home