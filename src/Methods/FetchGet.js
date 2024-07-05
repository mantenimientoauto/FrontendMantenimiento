const fetchGet = async (url) => {
  try {
    const response = await fetch(url); // Realizar la solicitud HTTP GET

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Leer la respuesta como texto
    const text = await response.text();

    // Manejar caso de respuesta vacía
    if (text === '') {
      return null; // Devolver null u otro valor indicativo de respuesta vacía
    }

    // Convertir la respuesta a formato JSON
    const data = JSON.parse(text);

    // Aquí puedes agregar validaciones adicionales si es necesario
    // Por ejemplo, verificar si la respuesta tiene el formato esperado
    // y si los datos son válidos antes de devolverlos

    return data; // Devolver los datos obtenidos
  } catch (error) {
    return null; // Devolver null u otro valor indicativo de error
  }
};

export default fetchGet;
