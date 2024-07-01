import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// La función Cards recibe varios datos ya que está renderizando tanto los autos como los reportes
function Cards({ currentItems, handleShowModal, handleRepairClick, showVerButton, showAddButton, dataFields, isHome }) {
  return (
    <Row> 
      {/* Mapeo de los items para mostrar las tarjetas */}
      {currentItems.map((dato) => (
        <Col sm={12} md={6} lg={4} xl={3} key={dato.vehiculo_placa} className="d-flex justify-content-center mb-4">
          <Card style={{ width: '18rem' }} className='mt-5 p-3'>
            {/* Mostrar la imagen del auto */}
            <Card.Img variant="top" src={dato.dir_img||dato.url_before} alt='Imagen carro'/>
            <Card.Body>
              {/* Mostrar el nombre del auto */}
              <Card.Title>{dato.equipo} {dato.marca}</Card.Title>
              {/* Mostrar la descripción del carro */}
              <Card.Text>{dato.placa ? `Placa: ${dato.placa}, ${dato.modelo}`:`${dato.nombre}`}</Card.Text>
              <Card.Text>{dato.linea ? `Linea: ${dato.linea}`: `Detalle: ${dato.detalles}`}</Card.Text>
              <Card.Text>{dato.fecha_registro ? `Fecha: ${dato.fecha_registro}`: ` `}</Card.Text>
              {/* Mostrar botones según las props */}
              <Row>
                {showVerButton && (
                  <Col>
                    <Button variant={'success'} onClick={() => handleRepairClick(dato)}>
                      {/* Control de texto del botón basado en la propiedad isVerified */}
                      {isHome ? 'Ver' : (dato.isVerified ? 'Verificado' : 'Verificar')}
                    </Button>
                  </Col>
                )}
                {showAddButton && (
                  <Col>
                    <Button variant="primary" onClick={() => handleShowModal(dato)}>Añadir</Button>
                  </Col>
                )}
              </Row>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

// Utilizando React.memo para evitar renders innecesarios
export default React.memo(Cards);

