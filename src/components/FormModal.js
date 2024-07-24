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
  const user = localStorage.getItem('nombre')

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
      // Validar si hay archivos para subir
      if (!files || files.length === 0) {
        alert('Por favor selecciona al menos un archivo para subir.');
        return;
      }

      const urls_before = await uploadFile(files); // Subir los archivos y obtener las URLs de descarga
      //console.log(urls_before)
      // Validar otros datos necesarios antes de enviar al backend
      if (!description || !id || !nombre) {
        alert('Por favor completa todos los campos obligatorios.');
        return;
      }

      // Datos para enviar al backend
      const reportData = {
        detalles: description,
        vehiculo_placa: id,
        usuario_nit: user, // Reemplaza con el NIT del usuario si lo tienes disponible
        estado: false, // Ajusta según sea necesario
        sugerencia: null,
        url_before: urls_before,
        url_after: null,
        nombre: nombre
      };
    
      const response = await fetchPost('https://mantenimientoautosbackend.onrender.com/mantenimientos/AddRegister', reportData);

      if (response) {
      handleClose();
      clearForm(); // Limpiar el formulario y cerrar el modal
    } else {
      alert(`Error al enviar el reporte`);
     }
    } catch (error) {
      alert('No se puede enviar datos por el momento.');
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
