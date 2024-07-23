import { initializeApp } from "firebase/app";
import { getAuth, signInWithCustomToken } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAv4HfVbHwnoKAaYfOOuyCbv4fMqpTCFek",
  authDomain: "images-6d562.firebaseapp.com",
  projectId: "images-6d562",
  storageBucket: "images-6d562.appspot.com",
  messagingSenderId: "223014870412",
  appId: "1:223014870412:web:f9c04c3497fe3962790aa9",
  measurementId: "G-CKWNJZPCX4"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const storage = getStorage(app); // Este objeto nos permite interactuar con las imagenes

/**
 * Función para autenticar al usuario con un token personalizado
 * @param {string} token - El token personalizado
 */
const authenticateWithToken = async (token) => {
  try {
    await signInWithCustomToken(auth, token);
    console.log('Usuario autenticado con el token personalizado');
  } catch (error) {
    console.error('Error en la autenticación con el token personalizado:', error);
  }

};


/**
 * Función para subir un archivo a Firebase Storage
 * @param {File} file - El archivo a subir
 * @returns {Promise<string>} - URL de descarga del archivo
 */
export async function uploadFile(file, token) {

    // Autenticarse antes de intentar subir el archivo
    await authenticateWithToken(token);
    
    const user = auth.currentUser;
    if (!user) {
      throw new Error('El usuario no está autenticado');
    }

    const date = new Date();
    const timestamp = date.toISOString().replace(/[-:.]/g, '');
    const uniqueFileName = `${timestamp}`;
    
    const storageRef = ref(storage, uniqueFileName);

    await uploadBytes(storageRef, file);
    const url_img = await getDownloadURL(storageRef);
    return url_img;
}
