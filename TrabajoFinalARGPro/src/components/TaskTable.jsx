import { Container, Table, Form, Button } from "react-bootstrap";
import { TaskContext } from "../context/TaskContext";
import { useContext, useEffect, useState } from "react";
import { BsFillPencilFill , BsFillTrash3Fill } from "react-icons/bs";
import Swal from "sweetalert2";
import UpdateTaskModal from "./UpdateTaskModal";
import './Table.css';

const TaskTable = () => {
  const { getTask, tasks, setTasks, deleteTask , updateTask } = useContext(TaskContext);

  const handleDelete = (id) =>{
    Swal.fire({
        title: "¿Estás seguro?",
        text: "Esta acción eliminará el producto de forma permanente.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
            console.log(id);
            deleteTask(id);
          Swal.fire("Eliminado con Exito", "", "success");
        } else if (result.isDenied) {
          Swal.fire("No se realizaron Cambios", "", "info");
        }
      });
  } 

  return (
    <>
      <Container>
        <Table responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Titulo</th>
              <th>Descripcion</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={task.id} className={task.completed ? 'completed' : ''}>
                <td>
                <Form.Check
        type="checkbox"
        aria-label="option 1"
        checked={task.completed}
        onClick={() => handleDelete(task.id)}
      />
                </td>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.deadline}</td>
                <td>{task.state ? "Completada" : "Pendiente"}</td>
                <td>
                    <UpdateTaskModal task={task}/>
                    <Button variant="danger" onClick={() => handleDelete(task.id)}><BsFillTrash3Fill /></Button>

                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default TaskTable;
