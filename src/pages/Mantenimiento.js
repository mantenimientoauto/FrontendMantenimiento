import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import fetchGet from '../Methods/FetchGet';
import Cards from '../components/Cards';
import Image from 'react-bootstrap/Image';
import FormVerificado from '../components/FormVerificado';

function Mantenimiento({isAdmin}) {
 
  const location = useLocation(); // Obtener la ubicación actual
  const { dato } = location.state || {};// Obtener el dato del estado de la ubicación
  const [showModal, setShowModal] = useState(false);// Estado para controlar la visibilidad del modal
  const [selectedDato, setSelectedDato] = useState(null);// Estado para almacenar los reportes hechos
  const [reports, setReports] = useState([]);

  // Obtener los datos de forma asíncrona
  useEffect(() => {
    if (dato.placa) {
      fetchReports(dato.placa); // Llamar a la función para obtener los reportes por la placa (id)
    }
  }, [dato.placa]);

    // Función para obtener los reportes por la placa
    const fetchReports = async (placa) => {

      try {
        const response = await fetchGet(`https://mantenimientoautosbackend.onrender.com/mantenimientos/registros/${placa}`);
        if (response) {
          setReports(response); // Almacenar los reportes en el estado local
        } else {
          console.error('Error al obtener los reportes');
        }
      } catch (error) {
        console.error('Error al obtener los reportes:', error);
      }
    };

  // Función para mostrar el modal con el dato seleccionado
  const handleShowModal = (dato) => {
    setSelectedDato(dato);
    setShowModal(true);
  };

  // Función para cerrar el modal y limpiar el dato seleccionado
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedDato(null);
  };

  // Función para manejar la verificación del dato
  const handleVerifyClick = () => {
    console.log("verificado")
    // setDatos(prevDatos => prevDatos.map(item =>
    //   item.id === dato.item ? { ...item, isVerified: !item.isVerified } : item
    // ));
  };

  return (
    <div>
      {/* Mostrar la imagen, el título y la miniatura del dato si están disponibles */}
      {dato && (
        <div>
          {dato.marca && <h3 className='d-flex justify-content-center m-2 p-4'>{dato.equipo} {dato.marca}</h3>}
          {dato.dir_img && <div className='d-flex justify-content-center mt-3' style={{ maxHeight: '300px', width: '100%' }}><Image className='img-fluid' src={dato.dir_img} alt="Imagen" /> </div>}
          {dato.placa && <p className='d-flex justify-content-center'>Placa: {dato.placa}, {dato.modelo}</p>}
          {dato.linea && <p className='d-flex justify-content-center'>{dato.linea}</p>}
        </div>
      )}
      <h4 className='d-flex justify-content-center'>Lista de reportes</h4>
      {/* Renderizar los Cards con los datos */}
      <Cards 
        currentItems={reports} 
        handleShowModal={handleShowModal}
        handleRepairClick={handleVerifyClick}
        showVerButton={isAdmin}
        showAddButton={true}
        dataFields={{ text: 'email' }}
        isHome={false}
      />
      {/* Mostrar el formulario verificado si hay un dato seleccionado */}
      {selectedDato && (
        <FormVerificado show={showModal} handleClose={handleCloseModal} id={selectedDato.id} />
      )}
    </div>
  );
}

export default Mantenimiento;
