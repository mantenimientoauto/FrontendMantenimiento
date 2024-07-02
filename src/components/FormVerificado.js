import React, { useState} from 'react';
import { Modal, Button, Form, Image, Row, Col } from 'react-bootstrap';
import { uploadFile } from "../Methods/config_img";
import fetchPut from '../Methods/FetchPut';


function FormVerificado({ show, handleClose, id }) {
  const [description, setDescription] = useState('');
  const [nombre, setNombre] = useState('');
  const [files, setFiles] = useState(null);
  const [imagePreviews, setImagePreviews] = useState(null);

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

  const handleSubmit = async () => {
    try {
      const urls_after = await uploadFile(files);

      const reportverificado = {
        sugerencia: description,
        url_after: urls_after,
        nom_tecnico: nombre
      };

      await updateState(id, reportverificado);
      handleCloseModal();
    } catch (error) {
      console.error('Error al enviar el mantenimiento:', error);
    }
  };
    // Función para manejar la verificación del dato
  const updateState = async (id, reportverificado) => {
      try { 
        const url = `https://mantenimientoautosbackend.onrender.com/mantenimientos/updateState/${id}`;
        const updatedDato = await fetchPut(url, reportverificado);
        if (updatedDato) {
          console.log('Envio Exitoso');
        }
      } catch (error) {
        console.error('Error al actualizar el estado del reporte:', error);
      }
    };

  const handleCloseModal = () => {
    clearForm();
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Añadir Reparación</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* Campos del formulario */}
          <Form.Group controlId="formNombre" className="mb-3">
            <Form.Label>Técnico de mantenimiento</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre"
              value={nombre}
              onChange={handleNombreChange}
            />
          </Form.Group>
          <Form.Group controlId="formDescription" className="mb-3">
            <Form.Label>Descripción del mantenimiento</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Ingrese mantenimiento"
              value={description}
              onChange={handleDescriptionChange}
            />
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
          Enviar Mantenimiento
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default FormVerificado;
