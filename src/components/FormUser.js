import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import fetchPost from '../Methods/FetchPost';

function FormUser({ show, handleClose }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);


  const clearForm = () => {
    setUsername('');
    setPassword('');
  };

  const handleSubmit = async () => {
    const userData = {
      nit:username,
      contrasena:password,
    };

    try {
      const response = await fetchPost('https://mantenimientoautosbackend.onrender.com/user/register', userData);
      if (response) {
        handleClose();
        clearForm();
        alert('Usuario creados');
      } else {
        alert('Error al crear el usuario.');
      }
    } catch (error) {
      alert('Ocurrió un error al crear el usuario.');
    }
  };

  const handleCloseModal = () => {
    clearForm();
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Crear Usuario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formUsername" className="mb-3">
            <Form.Label>Nombre de Usuario</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el nombre de usuario"
              value={username}
              onChange={handleUsernameChange}
            />
          </Form.Group>
          <Form.Group controlId="formPassword" className="mb-3">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ingrese la contraseña"
              value={password}
              onChange={handlePasswordChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Crear Usuario
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default FormUser;
