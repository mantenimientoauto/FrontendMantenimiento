const fetchPost = async (url, data) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },   
      body: JSON.stringify(data)
    });
    
    // Verificar si la respuesta es válida antes de parsearla
    const contentType = response.headers.get('content-type');
    if (!response.ok || !contentType || !contentType.includes('application/json')) {
      const errorMessage = await response.text(); // Obtener el texto del error
      throw new Error(`Error: ${response.statusText} - ${errorMessage}`);
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export default fetchPost;

