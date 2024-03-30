import React from 'react'
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';

const Todocards = ({ title, body, deadline, id, deleteid }) => {
    // console.log("Received props in Todocards:", title, body, deadline, id);
    const navigate = useNavigate();
    const handledelete = () => {
        deleteid(id);
    }

    const handleupdate = () => {
        console.log("Received update in Todocards:", title, body, deadline, id);
        navigate('/update', { state: { id, title, body, deadline } });
    }

    return (
        <div className='todo-cards'>
            <div className="card p-3">
                <div className='row p-3'>
                    <h5>{title}</h5>
                    <div className="ml-auto">
                        <p className=''>{deadline}</p>
                    </div>
                </div>
                <p className='todo-card-p'>{body}</p>
            </div>
            <div className='d-flex justify-content-around align-items-center p-3'>
                <FontAwesomeIcon icon={faPenToSquare} style={{ cursor: 'pointer', color: 'black' }} onClick={handleupdate} />
                <FontAwesomeIcon icon={faTrash} style={{ cursor: 'pointer' }} onClick={handledelete} />
            </div>
        </div>
    )
}

export default Todocards