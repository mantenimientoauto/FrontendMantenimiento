import React, { useState } from 'react';
import { Modal, Button, Form, Image, Row, Col } from 'react-bootstrap';
import { uploadFile } from "../Methods/config_img";

function FormModal({ show, handleClose, id }) {
  // Estados para los campos del formulario y las imágenes seleccionadas
  const [description, setDescription] = useState('');
  const [nombre, setNombre] = useState('');
  const [files, setFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  // Manejadores de cambios en los campos del formulario
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleNombreChange = (e) => {
    setNombre(e.target.value);
  };

  // Manejador de cambio de archivos seleccionados
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length + files.length > 3) {
      alert('Solo puedes subir un máximo de 3 imágenes.');
      return;
    }

    setFiles(prevFiles => [...prevFiles, ...selectedFiles]);

    const previews = selectedFiles.map(file => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      return new Promise(resolve => {
        reader.onload = () => resolve(reader.result);
      });
    });

    Promise.all(previews).then(images => {
      setImagePreviews(prevPreviews => [...prevPreviews, ...images]);
    });
  };

  // Limpiar los campos del formulario
  const clearForm = () => {
    setImagePreviews([]);
    setFiles([]);
    setDescription('');
    setNombre('');
  };

  // Manejador del envío del formulario
  const handleSubmit = async () => {
    try {
      // Subir los archivos y obtener las URLs de descarga
      const uploadPromises = files.map((file, index) => uploadFile(file, `${id}_${index}`));
      const urls = await Promise.all(uploadPromises);
      
      // Aquí puedes manejar las URLs obtenidas (ejemplo: enviarlas al servidor)
      console.log('URLs de descarga:', urls);

      // Limpiar el formulario y cerrar el modal
      clearForm();
      handleClose();
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
        <Modal.Title>Añadir Reporte {id}</Modal.Title>
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
            <Form.Label>Adjuntar imágenes (máximo 3)</Form.Label>
            <Form.Control type="file" accept="image/*" multiple onChange={handleFileChange} />
          </Form.Group>
          {/* Mostrar imágenes seleccionadas */}
          {imagePreviews.length > 0 && (
            <Row className="mb-3 text-center">
              {imagePreviews.map((preview, index) => (
                <Col key={index} xs={4} className="mb-2">
                  <Image src={preview} alt={`evidence-${index}`} fluid thumbnail />
                </Col>
              ))}
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
