// Función para formatear la fecha
const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    // Obtener componentes de la fecha
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Ajustar el mes para que tenga dos dígitos
    const day = ('0' + date.getDate()).slice(-2); // Ajustar el día para que tenga dos dígitos
  
    // Formatear la fecha en el formato deseado
    const formattedDate = `${day}/${month}/${year}`;
  
    return formattedDate;
  };

export default formatDate;