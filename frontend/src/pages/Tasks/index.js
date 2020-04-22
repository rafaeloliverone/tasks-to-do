import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../api';
import './style.css';

function Tasks() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [editing, setEditing] = useState(false);
    const [idEditingTask, setIdTaskEdit] = useState('');
    const history = useHistory();

    async function handleNewTask(e) {
        e.preventDefault();

        const data = {
            title,
            completed: false
        };

        if (editing === true) {
            try {
                await api.post(`/task-update/${idEditingTask}/`, data)
                setEditing(false);
                setTitle('');
            } catch (error) {
                alert('Erro ao editar item, tente novamente');
            }
        } else {
            await api.post('/task-create/', data);
            setTitle('');
        }

        history.push('/');
    }


    useEffect(() => {
        api.get('task-list').then(response => {
            setTasks(response.data);
        });
    });


    return (
        <div className="container">
            <div id="task-container">
                <div id="form-wrapper">
                    <form id="form">
                        <div className="flex-wrapper">
                            <div style={{ flex: 6 }}>
                                <input className="form-control"
                                    placeholder="Add task.."
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                />
                            </div>

                            <div style={{ flex: 1 }}>
                                <button id="submit" onClick={handleNewTask} 
                                    className="btn btn-warning" type="submit">
                                        Register
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

                <div id="list-wrapper">
                    {tasks.map(task => (

                        <div key={task.id} className="task-wrapper flex-wrapper">
                            <div onClick={() => strikeUnstrike(task)} style={{ flex: 7 }}>
                                {task.completed === false ? (<span> {task.title} </span>) : (<strike> {task.title} </strike>)}
                            </div>

                            <div style={{ flex: 1 }}>
                                <button id="submit" onClick={() => taskEdit(task)} 
                                    className="btn btn-sm btn-outline-info" type="submit">
                                        Edit
                                </button>
                            </div>

                            <div style={{ flex: 1 }}>
                                <button onClick={() => taskDelete(task.id)} 
                                    className="btn btn-sm btn-outline-dark delete" type="button">
                                        Delete
                                </button>
                            </div>

                        </div>

                    ))}
                </div>



            </div>

        </div>


    );
}

export default Tasks;
