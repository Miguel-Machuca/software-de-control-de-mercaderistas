// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCQbyWCUVGl5EBUba8q5_TUf1vk0fEze5Y",
  authDomain: "seguimiento-mercaderista.firebaseapp.com",
  projectId: "seguimiento-mercaderista",
  storageBucket: "seguimiento-mercaderista.appspot.com",
  messagingSenderId: "862049787933",
  appId: "1:862049787933:web:50bcb58811705870e2e6f4",
  measurementId: "G-EP1R8DMK3F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage=getStorage(app);

export {
    app,
    auth,
    analytics,
    db,
    storage
}