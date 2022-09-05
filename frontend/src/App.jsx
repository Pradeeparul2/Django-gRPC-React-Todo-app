import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import TaskModal from './components/TaskModal';

function App() {
  const [taskList, setTaskList] = useState([]);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [currentTask, setCurrentTask] = useState({});

  useEffect(() => {
    axios
      .get('/api/list_task')
      .then((res) => setTaskList(res.data));
  }, []);

  const deleteTask = (id) => {
    axios
      .delete(`/api/delete_task/${id}`)
      .then(() => window.location.reload(false));
  };

  const updateTask = (id) => {
    axios
      .get(`api/task/${id}`)
      .then((res) => setCurrentTask(res.data));
    setShowAddTaskModal(true);
  };

  return (
    <>
      <div className="App">
        <div className="container">
          <h1 className="text-gray text-uppercase text-center my-4 font-weight-bold">Todo app</h1>
          <p className="h5 text-center my-3">A simple Todo app backend build with Django, gRPC and frontend build with React js</p>
          <div className="d-flex justify-content-center flex-column my-5" style={{ width: '600px', margin: 'auto' }}>
            {taskList.map((Obj) => (
            // eslint-disable-next-line no-prototype-builtins
              Obj.hasOwnProperty('isCompleted') ? (
                <div key={Obj.id} className="alert alert-success text-left show" role="button" aria-hidden onClick={() => updateTask(Obj.id)}>
                  <strong>{Obj.task}</strong>
                  <button type="button" className="close" onClick={() => deleteTask(Obj.id)} data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>

              ) : (
                <div key={Obj.id} className="alert alert-warning text-left show" role="button" aria-hidden onClick={() => updateTask(Obj.id)}>
                  {Obj.task}
                  <button type="button" className="close" onClick={() => deleteTask(Obj.id)} data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
              )
            ))}
          </div>
          <button className="btn btn-primary" onClick={() => setShowAddTaskModal(true)} type="button">Add Task</button>
        </div>
      </div>
      <TaskModal
        showAddTaskModal={showAddTaskModal}
        currentTask={currentTask}
      />
    </>
  );
}

export default App;
