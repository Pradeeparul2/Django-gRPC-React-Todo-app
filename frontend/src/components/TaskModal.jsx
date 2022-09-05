import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
} from 'reactstrap';

function TaskModal(props) {
  const { showAddTaskModal, currentTask } = props;
  const [addTask, setAddTask] = useState(currentTask);

  const handleChange = (e) => {
    // eslint-disable-next-line prefer-const
    let { name, value } = e.target;
    if (e.target.type === 'checkbox') {
      value = e.target.checked;
    }
    const newAddTask = { ...addTask, [name]: value };
    setAddTask(newAddTask);
  };

  const saveTask = (newTask) => {
    const formData = new FormData();
    Object.keys(newTask).forEach((key) => {
      formData.append(key, newTask[key]);
    });
    axios
      .post('api/add_task', formData)
      .then(() => window.location.reload(false));
  };

  useEffect(() => {
    setAddTask(currentTask);
  }, [currentTask]);

  const updateTask = (newTask) => {
    const formData = new FormData();
    Object.keys(newTask).forEach((key) => {
      formData.append(key, newTask[key]);
    });
    axios
      .post('api/update_task', formData)
      .then(() => window.location.reload(false));
  };

  return (
    <Modal isOpen={showAddTaskModal}>
      <ModalHeader>Add Todo Item</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="todo-title">Task</Label>
            <Input
              type="text"
              id="todo-title"
              name="task"
              placeholder="Enter Todo Task"
              onChange={handleChange}
              value={addTask.task}
            />
            <Input
              id="todo-title"
              type="hidden"
              name="id"
              placeholder="Enter Todo Task"
              onChange={handleChange}
              value={addTask.id}
            />
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="checkbox"
                name="status"
                checked={addTask.status}
                onChange={handleChange}
              />
              Completed
            </Label>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        {
            // eslint-disable-next-line no-prototype-builtins
            !addTask.hasOwnProperty('id') ? (
              <Button
                color="success"
                onClick={() => saveTask(addTask)}
              >
                Save
              </Button>
            ) : (
              <Button
                color="success"
                onClick={() => updateTask(addTask)}
              >
                Update
              </Button>

            )
        }
      </ModalFooter>
    </Modal>
  );
}
TaskModal.propTypes = {
  showAddTaskModal: PropTypes.bool,
  currentTask: PropTypes.shape({
    id: PropTypes.number,
    task: PropTypes.string,
    status: PropTypes.bool,
  }),

};
TaskModal.defaultProps = {
  showAddTaskModal: false,
  currentTask: {},
};
export default TaskModal;
