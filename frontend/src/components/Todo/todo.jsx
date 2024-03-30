import React, { useEffect, useState } from 'react';
import './todo.css';
import Todocards from './todocards';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Todo = () => {
    const userObjId = sessionStorage.getItem('id');
    const [inputs, setInputs] = useState({ title: "", body: "", deadline: "" });
    const [tasks, setTasks] = useState([]);
    // const [selectedTask, setSelectedTask] = useState(null);
    const navigate = useNavigate();

    const show = () => {
        document.getElementById('textarea').style.display = 'block';
        document.getElementById('deadline').style.display = 'block';
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs({ ...inputs, [name]: value });
    }

    const handleSubmit = async () => {
        if (inputs.title === "" || inputs.body === "" || inputs.deadline === "") {
            toast.error("Please fill out all details");
        } else {
            if (userObjId) {
                try {
                    const response = await axios.post(`${window.location.origin}/api/r2/addTask`, {
                        Title: inputs.title,
                        Body: inputs.body,
                        Deadline: inputs.deadline,
                        _id: userObjId,
                    });
                    console.log(response.data);
                    setInputs({ title: "", body: "", deadline: "" });
                    toast.success("Your task was added successfully!");
                    fetchData(); // Fetch updated tasks after adding
                } catch (error) {
                    console.error("Error adding task:", error);
                    toast.error("Failed to add task. Please try again later.");
                }
            } else {
                toast.error("Your task was not saved! Please log in first.");
                navigate('/');
            }
        }
    }

    const fetchData = async () => {
        if (userObjId) {
            try {
                const response = await axios.get(`${window.location.origin}/api/r2/getTask/${userObjId}`);
                setTasks(response.data.tasks || []);
            } catch (error) {
                console.error("Error fetching tasks:", error);
                // toast.error("Failed to fetch tasks. Please try again later.");
            }
        }
    };

    const handleDelete = async (id) => {
        try {
            // console.log("Deleting task with ID:", id);
            await axios.delete(`${window.location.origin}/api/r2/deleteTask/${id}`, { data: { userId: userObjId } });
            console.log("Task deleted successfully!");
            toast.success("Task deleted successfully!");
            fetchData(); // Fetch updated tasks after deletion
        } catch (error) {
            console.error("Error deleting task:", error);
            toast.error("Failed to delete task. Please try again later.");
        }
    };
    
    useEffect(() => {
        fetchData();
    }, [userObjId]);

    if (!userObjId) {
        navigate('/'); 
        return null;
    }

    return (
        <div className='todo'>
            <ToastContainer />
            <div className='todo-main container d-flex flex-column justify-content-center align-items-center'>
                <div className='d-flex flex-column w-50 custom-form-task p-3 m-3'>
                    <input
                        className='my-2'
                        name='title'
                        type='text'
                        placeholder='Task Title'
                        onChange={handleChange}
                        onClick={show}
                        value={inputs.title}
                        style={{ border: 'none', outline: 'none' }}
                        required />

                    <textarea
                        className='my-2'
                        type='text'
                        name='body'
                        id='textarea'
                        placeholder='Task Body'
                        onChange={handleChange}
                        value={inputs.body}
                        style={{ border: 'none', outline: 'none' }}
                        required />

                    <input
                        name='deadline'
                        id='deadline'
                        type='date'
                        onChange={handleChange}
                        value={inputs.deadline}
                        style={{ border: 'none', outline: 'none' }}
                        required />

                </div>
                <div className='d-flex justify-content-end w-50'>
                    <button
                        className='home-btn px-3 ' onClick={handleSubmit}>Add</button>
                </div>
            </div>
            <div className="todo-body">
                <div className="container-fluid">
                    <div className="row">
                        {tasks.length === 0 ? (
                            <div className="col-12 text-center">
                                <p>No tasks available</p>
                            </div>
                        ) : (
                            tasks.map((task, index) => (
                                <div className="col-lg-3 mx-5 my-2" key={index}>
                                    <Todocards
                                        title={task.Title}
                                        body={task.Body}
                                        deadline={task.Deadline}
                                        id={task._id}
                                        deleteid={handleDelete}
                                    />
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Todo;
