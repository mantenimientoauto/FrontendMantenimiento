import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import fetchGet from '../Methods/FetchGet';
import Cards from '../components/Cards';
import Image from 'react-bootstrap/Image';
import FormVerificado from '../components/FormVerificado';

function Mantenimiento({isAdmin}) {
  // Obtener la ubicación actual
  const location = useLocation();
  // Obtener el dato del estado de la ubicación o establecerlo como un objeto vacío si no está definido
  const { dato } = location.state || {};
  // Estado para almacenar los reportes hechos para este auto
  const [datos, setDatos] = useState([]);
  // Estado para controlar la visibilidad del modal
  const [showModal, setShowModal] = useState(false);
  // Estado para almacenar el dato seleccionado
  const [selectedDato, setSelectedDato] = useState(null);

  // Obtener los datos de forma asíncrona
  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const data = await fetchGet('https://jsonplaceholder.typicode.com/users');

        // Filtrar los datos si hay un dato específico
        if (dato && dato.id) {
          const filteredData = data.filter(item => item.id === dato.id);
          setDatos(filteredData);
        } else {
          setDatos(data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDatos();
  }, [dato]);

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
  const handleVerifyClick = (dato) => {
    setDatos(prevDatos => prevDatos.map(item =>
      item.id === dato.id ? { ...item, isVerified: !item.isVerified } : item
    ));
  };

  return (
    <div>
      {/* Mostrar la imagen, el título y la miniatura del dato si están disponibles */}
      {dato && (
        <div>
          {dato.url && <div className='d-flex justify-content-center mt-3' style={{ maxHeight: '300px', width: '100%' }}><Image className='img-fluid' src={dato.url} alt="Imagen" /> </div>}
          {dato.title && <h3 className='d-flex justify-content-center m-2 p-4'>{dato.title}</h3>}
          {dato.thumbnailUrl && <p className='d-flex justify-content-center'>{dato.thumbnailUrl}</p>}
        </div>
      )}
      <h4 className='d-flex justify-content-center'>Lista de reportes</h4>
      {/* Renderizar los Cards con los datos */}
      <Cards 
        currentItems={datos} 
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
