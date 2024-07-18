import React, { useState }  from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BsArrowRight } from 'react-icons/bs';

// La función Cards recibe varios datos ya que está renderizando tanto los autos como los reportes
function Cards({ currentItems, handleShowModal, handleRepairClick, showVerButton, showAddButton, isHome, reportsCount}) {
// Función para obtener el conteo de reportes según la placa
const getReportsCount = (placa) => {
  // Validar que reportsCount sea un array y tenga al menos un elemento
  if (!Array.isArray(reportsCount) || reportsCount.length === 0) {
    return 0; // O cualquier valor predeterminado que desees retornar
  }

  const report = reportsCount.find(r => r.placa === placa);
  return report ? report.count : 0;
};

  // Estado para manejar qué imagen se está mostrando y si se muestra url_after
  const [showAfterImage, setShowAfterImage] = useState(false);

  // Función para alternar entre mostrar imagen antes y después
  const toggleImage = () => {
    setShowAfterImage(!showAfterImage);
  };

return (
  <Row>
    {currentItems.map((dato) => {
      const reportsPending = getReportsCount(dato.placa);

      return (
        <Col sm={12} md={6} lg={4} xl={3} key={dato.id || dato.item} className="d-flex justify-content-center mb-4">
          <Card style={{ width: '18rem' }} className='mt-5 p-3'>
          <div style={{ width: '200px', height: '200px', overflow: 'hidden', margin: '0 auto', position: 'relative' }}>
            {!dato.dir_img && (
                <div style={{ position: 'absolute', top: '0', left: '50%', transform: 'translateX(-20%)', backgroundColor: 'rgba(0, 0, 0, 0.8)', color: '#fff', padding: '2px 10px', borderRadius: '5px', zIndex: '2' }}>
                  <small>{showAfterImage && dato.url_after ? 'Después' : 'Antes'}</small>
                </div>)}

                <Card.Img
                  variant="top"
                  src={showAfterImage && dato.url_after ? dato.url_after : dato.dir_img || dato.url_before} // Aquí se asegura de mostrar url_before si dir_img no está presente
                  alt='Imagen carro'
                  style={{ objectFit: 'cover', width: '200px', height: '200px' }}
                />
                {/* Flecha para cambiar imagen en el lateral derecho */}
                {dato.url_after && (
                  <div
                    className="position-absolute top-50 end-0 translate-middle-y"
                    style={{ zIndex: 1, cursor: 'pointer', backgroundColor: 'rgba(0, 0, 0, 0.5)', color: '#fff', padding: '5px' }}
                    onClick={toggleImage}
                  >
                    <BsArrowRight size={25} color="#fff" />
                  </div>
                )}
              </div>
            <Card.Body>
              <Card.Title className="mb-3">{dato.equipo} {dato.marca}</Card.Title>
              {dato.equipo && (<hr className="mb-3" />)}
              <Card.Text className="mb-1">
                {dato.placa ? <strong>Placa:</strong> : null} {dato.placa ? `${dato.placa}, ${dato.modelo}` : <strong>{dato.nombre}</strong>}
              </Card.Text>
              {dato.nombre && (<hr className="mb-3" />)}
              <Card.Text className="mb-1">
                {dato.linea ? <strong>Linea:</strong> : <strong>Problema:</strong>} {dato.linea ? `${dato.linea}` : `${dato.detalles}`}
              </Card.Text>
              {dato.nom_tecnico && (
                <Card.Text className="mb-1"><strong>Técnico:</strong> {dato.nom_tecnico}</Card.Text>
              )}
              {dato.sugerencia && (
                <Card.Text className="mb-1"><strong>Solución:</strong> {dato.sugerencia}</Card.Text>
              )}
              <Card.Text className="mb-1">
                {dato.fecha_registro ? <strong>Fecha:</strong> : ' '} {dato.fecha_registro ? `${dato.fecha_registro}` : ' '}
              </Card.Text>
              <Row className='pt-3'>
                {showVerButton && (
                  <Col>
                    <Button
                      variant={dato.estado ? 'success' : reportsPending > 0 ? 'warning' : 'primary'}
                      onClick={isHome ? () => handleRepairClick(dato) : () => handleRepairClick(dato.id)}
                      disabled={dato.estado}
                    >
                      {isHome ? `Ver (${reportsPending})` : (dato.estado ? 'Verificado' : `Verificar`)}
                    </Button>
                  </Col>
                )}
                {showAddButton && (
                  <Col>
                    <Button 
                      variant="primary" 
                      onClick={() => handleShowModal(dato)} 
                      disabled={dato.estado}
                    >
                      Añadir
                    </Button>
                  </Col>
                )}
              </Row>
            </Card.Body>
          </Card>
        </Col>
      );
    })}
  </Row>
);
}

// Utilizando React.memo para evitar renders innecesarios
export default React.memo(Cards);

