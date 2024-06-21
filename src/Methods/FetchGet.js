// src/Methods/FetchGet.js
const fetchGet = async (url) => {
    try {
      const response = await fetch(url); // URL de ejemplo
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  };
  
  export default fetchGet;
  
