import React, { useState } from 'react';
import { Modal, Button, Form, Image, Row, Col } from 'react-bootstrap';
import { uploadFile } from "../Methods/config_img";
import fetchPost from '../Methods/FetchPost';

function FormModal({ show, handleClose, id }) {
  // Estados para los campos del formulario y las imágenes seleccionadas
  const [description, setDescription] = useState('');
  const [nombre, setNombre] = useState('');
  const [files, setFiles] = useState(null);
  const [imagePreviews, setImagePreviews] = useState(null);

  // Manejadores de cambios en los campos del formulario
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const handleNombreChange = (e) => {
    setNombre(e.target.value);
  };
  // Manejador de cambio de archivo seleccionado
  const handleFileChange = (e) => {
    const selectedFiles = e.target.files[0];
    if (selectedFiles) {
      setFiles(selectedFiles);

      const reader = new FileReader();
      reader.readAsDataURL(selectedFiles);
      reader.onload = () => {
        setImagePreviews(reader.result);
      };
    }
  };
  // Limpiar los campos del formulario
  const clearForm = () => {
    setImagePreviews(null);
    setFiles(null);
    setDescription('');
    setNombre('');
  };

  // Manejador del envío del formulario
  const handleSubmit = async () => {
    try {
      const urls_before = await uploadFile(files, id, nombre); // Subir los archivos y obtener las URLs de descarga

      // Datos para enviar al backend
      const reportData = {
        detalles: description,
        vehiculo_placa: id,
        usuario_nit: "usuario1", // Reemplaza con el NIT del usuario si lo tienes disponible
        estado: false, // Ajusta según sea necesario
        sugerencia: null,
        url_before: urls_before,
        url_after: null,
        nombre: nombre
      };


      const response = await fetchPost('https://mantenimientoautosbackend.onrender.com/mantenimientos/AddRegister', reportData);

      if (response) {
        console.log('Reporte enviado con éxito:');
        handleClose();
        clearForm(); // Limpiar el formulario y cerrar el modal
      } else {
        const errorData = await response.json();
        console.error('Error al enviar el reporte:', errorData);
        alert(`Error al enviar el reporte: ${errorData.error || 'Error en la solicitud'}`);
      }
    } catch (error) {
      console.error('Error al subir archivos:', error);
      alert('Ocurrió un error al subir las imágenes. Por favor, intenta de nuevo.');
    }
  };

  // Cerrar el modal
  const handleCloseModal = () => {
    clearForm();
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Añadir Reporte, placa: {id}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* Campos del formulario */}
          <Form.Group controlId="formNombre" className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control type="text" placeholder="Titulo del problema" value={nombre} onChange={handleNombreChange} />
          </Form.Group>
          <Form.Group controlId="formDescription" className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="Ingrese texto" value={description} onChange={handleDescriptionChange} />
          </Form.Group>
          <Form.Group controlId="formFiles" className="mb-3">
            <Form.Label>Adjuntar imagen (máximo 1)</Form.Label>
            <Form.Control type="file" accept="image/*" onChange={handleFileChange} />
          </Form.Group>
          {/* Mostrar imagen seleccionada */}
          {imagePreviews && (
            <Row className="mb-3 text-center">
              <Col xs={4} className="mb-2">
                <Image src={imagePreviews} alt='' fluid thumbnail />
              </Col>
            </Row>
          )}
        </Form>
      </Modal.Body>
      {/* Botones de acción */}
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Enviar reporte
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default FormModal;
