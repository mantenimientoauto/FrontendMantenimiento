import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// La función Cards recibe varios datos ya que está renderizando tanto los autos como los reportes
function Cards({ currentItems, handleShowModal, handleRepairClick, showVerButton, showAddButton, isHome, reportsCount}) {

  return (
    <Row> 
      {/* Mapeo de los items para mostrar las tarjetas */}
      {currentItems.map((dato) => (
        <Col sm={12} md={6} lg={4} xl={3} key={dato.id||dato.item} className="d-flex justify-content-center mb-4">
          <Card style={{ width: '18rem' }} className='mt-5 p-3'>
            {/* Mostrar la imagen del auto */}
            <Card.Img variant="top" src={dato.dir_img||dato.url_before} alt='Imagen carro'/>
            <Card.Body>
              {/* Mostrar el nombre del auto */}
              <Card.Title>{dato.equipo} {dato.marca}</Card.Title>
              {/* Mostrar la descripción del carro */}
              <Card.Text>{dato.placa ? `Placa: ${dato.placa}, ${dato.modelo}`:`${dato.nombre}`}</Card.Text>
              <Card.Text>{dato.linea ? `Linea: ${dato.linea}`: `Problema: ${dato.detalles}`}</Card.Text>
              <Card.Text>{dato.nom_tecnico ? `Técnico: ${dato.nom_tecnico}`: null}</Card.Text>
              <Card.Text>{dato.sugerencia ? `Solución: ${dato.sugerencia}`: null}</Card.Text>
              <Card.Text>{dato.fecha_registro ? `Fecha: ${dato.fecha_registro}`: ` `}</Card.Text>
              {/* Mostrar botones según las props */}
              <Row>
              {showVerButton && (
                  <Col>
                    <Button
                      variant={dato.estado ? 'success' : 'primary'}
                      onClick={isHome ?  () => handleRepairClick(dato): () => handleRepairClick(dato.id)}

                      disabled={dato.estado}
                    >
                      {isHome ? 'Ver' : (dato.estado ? 'Verificado' : 'Verificar')}
                    </Button>
                  </Col>
              )}
                {showAddButton && (
                  <Col>
                    <Button variant="primary" onClick={() => handleShowModal(dato)} disabled={dato.estado} >Añadir</Button>
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

