import { createContext, useEffect, useState } from 'react';

export const TaskContext = createContext();

const TaskProvider = ({children}) => {
    const [tasks , setTasks] = useState([]);
    const [taskIdCounter, setTaskIdCounter] = useState(1);

    useEffect(() => {
        const savedTasks = getTasksFromLocalStorage();
        setTasks(savedTasks);
    },[])
    const saveTasksToLocalStorage = (tasks) => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
      };
    
      const getTasksFromLocalStorage = () => {
        const tasks = localStorage.getItem('tasks');
        return tasks ? JSON.parse(tasks) : [];
      };

    const getTask = () => {
    const savedTasks = getTasksFromLocalStorage();
    setTasks(savedTasks);
  };

  const addTask = (newTask) => {
    const taskWithId = { ...newTask, id: taskIdCounter };
    const updatedTasks = [...tasks, taskWithId];
    setTasks(updatedTasks);
    setTaskIdCounter(taskIdCounter + 1);
    saveTasksToLocalStorage(updatedTasks);
  };
  
  const updateTask = (taskId, updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, ...updatedTask } : task
    );
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  return (
    <TaskContext.Provider
    value={{
        tasks,
        getTask,
        addTask,
        updateTask,
        deleteTask
    }}>
        {children}
    </TaskContext.Provider>
  )
}

export default TaskProvider