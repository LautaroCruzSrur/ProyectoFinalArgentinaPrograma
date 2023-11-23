import { useContext, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { ModalBody, ModalHeader} from "react-bootstrap";
import { TaskContext } from "../context/TaskContext";
import { BsFillPencilFill} from "react-icons/bs";
import Swal from "sweetalert2";

const UpdateTaskModal = ({task}) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { updateTask , tasks} = useContext(TaskContext);
  const initialValues = {
    title: task.title,
    description: task.description,
    deadline: task.deadline,
    state: task.state,
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('El título es requerido'),
    description: Yup.string().required('La descripción es requerida'),
    deadline: Yup.date().required('La fecha de finalización es requerida'),
  });
  const handleSubmit = (values, { resetForm }) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción actulizara la tarea de forma permanente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, Confirmar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        updateTask(task.id , values);
        handleClose();
        resetForm();
        Swal.fire("Actualizada!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("No se modificaron cambios.", "", "info");
        handleClose();
        resetForm();
      }
    });
    
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
      <BsFillPencilFill />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <ModalHeader closeButton>
          <Modal.Title>Tarea</Modal.Title>
        </ModalHeader>
        <ModalBody>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Título:</label>
                  <Field type="text" id="title" name="title" className="form-control" />
                  {errors.title && touched.title && <div className="text-danger">{errors.title}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Descripción:</label>
                  <Field as="textarea" id="description" name="description" className="form-control" />
                  {errors.description && touched.description && (
                    <div className="text-danger">{errors.description}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="deadline" className="form-label">Fecha de Finalización:</label>
                  <Field type="date" id="deadline" name="deadline" className="form-control"/>
                  {errors.deadline && touched.deadline && <div className="text-danger">{errors.deadline}</div>}
                </div>
                <Button type="submit" variant="primary">Actulizar Tarea</Button>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </Modal>
    </>
  );
};

export default UpdateTaskModal;