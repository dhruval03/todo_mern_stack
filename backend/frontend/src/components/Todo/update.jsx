import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate
import './todo.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Update = () => {
    const location = useLocation();
    const navigate = useNavigate(); // Use useNavigate hook
    const [taskData, setTaskData] = useState({
        id: null,
        title: '',
        body: '',
        deadline: ''
    });

    const userid = sessionStorage.getItem('id');

    useEffect(() => {
        if (location.state) {
            const { id, title, body, deadline } = location.state;
            setTaskData({ id, title, body, deadline });
        }
    }, [location.state]);

    const handleUpdate = async () => {
        try {
            const response = await fetch(`https://todo-mern-stack-jo8o.onrender.com/api/r2/updateTask/${taskData.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Title: taskData.title,
                    Body: taskData.body,
                    Deadline: taskData.deadline,
                    userid: userid, 
                })
            });
            const data = await response.json(); // Parse response body
            if (response.ok) {
                toast.success('Task successfully updated');
                navigate('/todo');
            } else {
                toast.error(data.message); // Display error message from API response
            }
        } catch (error) {
            console.error('Error updating task:', error);
            toast.error('Internal Server Error'); // Display generic error message
        }
    };    

    return (
        <div className='todo-update'>
            <ToastContainer />
            <div className="container p-5 d-flex justify-content-center align-items-center flex-column my-3" style={{ backgroundColor: '#f1f0bb' }}>
                <h2>Update Your Task</h2>
                <input type="text" className="todo-task-update my-4 w-100 p-3" id='title-update' name='title' value={taskData.title} onChange={(e) => setTaskData({ ...taskData, title: e.target.value })} />
                <textarea className="todo-task-update w-100 p-3" name='body' value={taskData.body} onChange={(e) => setTaskData({ ...taskData, body: e.target.value })} />
                <input type='date' className="todo-task-update my-4 w-100 p-3" name='deadline' value={taskData.deadline} onChange={(e) => setTaskData({ ...taskData, deadline: e.target.value })} />
                <button className='home-btn justify-content-start'  onClick={handleUpdate}>Update</button>
            </div>
        </div>
    );
}

export default Update;
