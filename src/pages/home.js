import React from "react";
import Naipes from '../components/Naipes'; // Importa el componente Naipes desde su ubicación
import { Button } from 'react-bootstrap'; // Importa el componente Button de react-bootstrap
import { useNavigate } from 'react-router-dom'; // Importa el hook useNavigate de react-router-dom
import { Col, Row } from "react-bootstrap"; // Importa los componentes Col y Row de react-bootstrap

// Define el componente Home
function Home ({ onLogout, isAdmin}) {
    const navigate = useNavigate(); // Inicializa el hook useNavigate para la navegación

    // Función para manejar el cierre de sesión
    const handleLogout = () => {
        onLogout(); // Llama a la función onLogout
        navigate('/'); // Navega a la ruta '/'
    };

    return (
        <>  
            {/* Contenedor de la fila */}
            <Row>
                {/* Columna para el botón de cierre de sesión */}
                <Col sm={12} md={1} className="d-flex justify-content-center justify-content-md-end ">
                    {/* Botón para cerrar sesión */}
                    <Button variant="danger" onClick={handleLogout} className="mt-3">
                        Cerrar
                    </Button>
                </Col>
                {/* Columna para mostrar si es administrador */}
                <Col sm={12} md={2} className="d-flex justify-content-center">
                    {/* Condición para mostrar si es administrador */}
                    {isAdmin && <p className="fs-5 m-3 pt-2 fw-semibold text-wrap">Administrador</p>}
                </Col>
            </Row>

            {/* Componente Naipes con la URL proporcionada */}
            <Naipes url="https://jsonplaceholder.typicode.com/photos"/>
        </>
    )
}

export default Home; // Exporta el componente Home por defecto