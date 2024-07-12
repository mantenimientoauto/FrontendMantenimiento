import React, { useContext } from "react";
import Naipes from '../components/Naipes'; // Importa el componente Naipes desde su ubicación
import { Button } from 'react-bootstrap'; // Importa el componente Button de react-bootstrap
import { useNavigate } from 'react-router-dom'; // Importa el hook useNavigate de react-router-dom
import { Col, Row } from "react-bootstrap"; // Importa los componentes Col y Row de react-bootstrap
import { AuthContext } from '../context/AuthContext';
import { Container } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';

// Define el componente Home
function Home () {
    const navigate = useNavigate(); // Inicializa el hook useNavigate para la navegación
    const { isAdmin, handleLogout } = useContext(AuthContext);
    const nombre = localStorage.getItem('nombre')
    // Función para manejar el cierre de sesión

    const handleLogoutClick = () => {
        handleLogout(); // Llama a la función handleLogout del contexto
        navigate('/'); // Navega a la página de inicio de sesión después de cerrar sesión
    };

    return (
        <Container>  
            {/* Contenedor de la fila */}
            <Row>
                {/* Columna para el botón de cierre de sesión */}
                <Col sm={12} md={1} className="d-flex justify-content-center justify-content-md-end ">
                    {/* Botón para cerrar sesión */}
                    <Button variant="danger" onClick={handleLogoutClick} className="mt-3">
                        Cerrar
                    </Button>
                </Col>
                {/* Columna para mostrar si es administrador */}
                <Col sm={12} md={2} className="d-flex justify-content-center">
                    {/* Condición para mostrar si es administrador */}
                    {isAdmin ? <p className="fs-5 m-3 pt-2 fw-semibold text-wrap"><Image src="https://firebasestorage.googleapis.com/v0/b/images-6d562.appspot.com/o/images_mantenimiento%2Fusuario.png?alt=media&token=379901c5-3817-4531-9f69-ed5157a80ff1" alt='Logo' thumbnail  style={{ width: '35px', height: '35px', objectFit: 'cover' }} /> ({nombre})</p>:
                    <p className="fs-4 m-3 pt-2 fw-semibold text-wrap"> <Image src="https://firebasestorage.googleapis.com/v0/b/images-6d562.appspot.com/o/images_mantenimiento%2Fusuario.png?alt=media&token=379901c5-3817-4531-9f69-ed5157a80ff1" alt='Logo' thumbnail  style={{ width: '35px', height: '35px', objectFit: 'cover' }} /> {nombre}</p>}

                </Col>
            </Row>

            {/* Componente Naipes con la URL proporcionada */}
            <Naipes url="https://mantenimientoautosbackend.onrender.com/vehiculos/getAll"/>
        </Container>
    )
}

export default Home; // Exporta el componente Home por defecto