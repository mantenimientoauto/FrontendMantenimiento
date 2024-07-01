import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Configuración de Firebase
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
export const storage = getStorage(app); // Este objeto nos permite interactuar con las imagenes


/**
 * 
 * @param {file, id} file  recibe el archivo
 * @param {url_ing} id recibe el id tipo entero
 * @returns  url_img  para la descarga del archivo
 */
// Función para subir un archivo a Firebase Storage
export async function uploadFile(file, id,nombre) {
  // Convertir el id a una cadena de texto si es numérico
  const stringId = id.toString()+nombre;

  // Crear una referencia de almacenamiento usando el id
  const storageRef = ref(storage, stringId);
  
  // Subir el archivo a la referencia de almacenamiento
  await uploadBytes(storageRef, file)
  const url_img = await getDownloadURL(storageRef)
  return url_img
}

