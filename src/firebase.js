import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC51aPDk00E0uiKn6capSNYmY51LaPtyE4",
  authDomain: "petchanel-cc3d9.firebaseapp.com",
  projectId: "petchanel-cc3d9",
  storageBucket: "petchanel-cc3d9.firebasestorage.app",
  messagingSenderId: "886187282281",
  appId: "1:886187282281:web:c37584a9fedd64d1e2b7f8"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportar la base de datos para usarla en los componentes
export const db = getFirestore(app);
