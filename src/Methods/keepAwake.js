const keepAwake = () => {
    setInterval(() => {
      fetch('/')
        .then(response => console.log('Manteniendo la aplicación despierta', response))
        .catch(error => console.error('Error al mantener la aplicación despierta', error));
    }, 60000); // Cada 5 minutos
  };
  
  export default keepAwake;
  