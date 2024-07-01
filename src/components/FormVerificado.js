import React, { useState} from 'react';
import { Modal, Button, Form, Image, Row, Col } from 'react-bootstrap';

function FormVerificado({ show, handleClose, id }) {
  const [description, setDescription] = useState('');
  const [nombre, setNombre] = useState('');
  const [files, setFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);


  const handleDescriptionChange = (e) => {
    setDescription(e.target.value); 
  };

  const handleNombreChange = (e) => {
    setNombre(e.target.value);
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    // Limitar la cantidad de imágenes seleccionadas a 3
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

  const clearForm = () => {
    setImagePreviews([]);
    setFiles([]);
    setDescription('');
    setNombre('');
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('id', id)
    formData.append('description', description);
    formData.append('nombre', nombre);
    files.forEach((file, index) => {
      formData.append(`file_${index}`, file);
    });

    // Manejar el envío del formulario aquí

    clearForm();
    handleClose();
  }

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
            <Form.Label>Carro</Form.Label>
            <Form.Control
              type="text"
              placeholder="Titulo del problema"
              value={nombre}
              onChange={handleNombreChange}
            />
          </Form.Group>
          <Form.Group controlId="formDescription" className="mb-3">
            <Form.Label>Descripción del reporte</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Ingrese texto"
              value={description}
              onChange={handleDescriptionChange}
            />
          </Form.Group>
          <Form.Group controlId="formFiles" className="mb-3">
            <Form.Label>Adjuntar imágenes (máximo 3)</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
            />
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

export default FormVerificado;
