import React, { useEffect, useState, useContext  } from 'react';
import { useLocation } from 'react-router-dom';
import fetchGet from '../Methods/FetchGet';
import fetchPut from '../Methods/FetchPut';
import Cards from '../components/Cards';
import Image from 'react-bootstrap/Image';
import FormVerificado from '../components/FormVerificado';
import { AuthContext } from '../context/AuthContext';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import formatDate from '../Methods/formattedDate';


function Mantenimiento() {
 
  const location = useLocation(); // Obtener la ubicación actual
  const { dato } = location.state || {};// Obtener el dato del estado de la ubicación
  const [showModal, setShowModal] = useState(false);// Estado para controlar la visibilidad del modal
  const [reports, setReports] = useState([]);
  const [selectedDato, setSelectedDato] = useState(null); 
  const { isAdmin } = useContext(AuthContext);

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
    fetchReports(dato.placa); // Esto garantiza que los datos se actualicen después de cada acción de actualización
  };

  // Función para manejar la verificación del dato
  const handleVerifyClick = async (id) => {
    try { 
      const url = `https://mantenimientoautosbackend.onrender.com/mantenimientos/updateState/${id}`;
      const updatedDato = await fetchPut(url, { estado: true });
      if (updatedDato) {
        // Actualizar el estado local para reflejar el cambio
        setReports((prevReports) =>
          prevReports.map((report) =>
            report.id === updatedDato.id ? updatedDato : report
          )
        );
        console.log('Actualización exitosa del estado del reporte');
      }
    } catch (error) {
      console.error('Error al actualizar el estado del reporte:', error);
    }
  };

    // Función para descargar los reportes en PDF
  const downloadPDF = () => {
    const doc = new jsPDF();
  
    // Configurar la tabla para el PDF
    const tableColumn = ['Titulo', 'Descripción','Solución','Tecnico', 'Estado','Fecha'];
      
    const tableRows = reports.map(report => [
        
        report.nombre,
        report.detalles,
        report.sugerencia,
        report.nom_tecnico,
        report.estado ? 'Verificado' : 'No Verificado',
        formatDate(report.fecha_registro)
      ]);

            // Agregar la tabla al documento PDF
    doc.autoTable({
        head: [tableColumn],
        body: tableRows
      });

      // Descargar el archivo PDF con un nombre específico
      doc.save(`reportes_${dato.placa}.pdf`);
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
      {/* Botón para descargar reportes en PDF */}
      <div className='d-flex justify-content-center mb-3'>
        <button className='btn btn-primary mx-2' onClick={downloadPDF}>Descargar PDF</button>
      </div>
      <Cards 
        currentItems={reports} 
        handleShowModal={handleShowModal}
        handleRepairClick={handleVerifyClick}
        showVerButton={isAdmin}
        showAddButton={true}
        isHome={false}
        totalReports = {null}
        verifiedReports = {null}

      />
      {/* Mostrar el formulario verificado si hay un dato seleccionado */}
      {selectedDato && (
        <FormVerificado show={showModal} handleClose={handleCloseModal} id={selectedDato.id} />
      )}
    </div>
  );
}

export default Mantenimiento;
