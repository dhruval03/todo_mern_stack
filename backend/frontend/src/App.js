import React, { useEffect } from 'react'

import Navbar from './components/Navbar/navbar'
import Home from './components/Home/home';
import Footer from './components/Footer/footer';
import About from './components/About/about';
import Todo from './components/Todo/todo';
import Signup from './components/Signup/signup';
import Login from './components/Signin/login';
import Update from './components/Todo/update';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {authAction} from "./store";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const id = (sessionStorage.getItem('id'));
    if(id){
      dispatch(authAction.login());
    }
  }, []);
  return (
    
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home />}/>
          <Route path='/about' element={<About />}/>
          <Route path='/todo' element={<Todo />}/>
          <Route path='/signup' element={<Signup />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/update' element={<Update />}/>
        </Routes>
      </Router>
      {/* <Home /> */}
      <Footer />
    </div>
  )
}

export default App