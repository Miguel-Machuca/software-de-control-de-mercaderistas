import { db } from '../config/FirebaseConfig';

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
  arrayUnion,
  getDoc,
  setDoc
} from "firebase/firestore";

// Agregar sucursal
const agregarSucursal = async (nombre, direccion) => {
  try {    
    const docRef = await setDoc(doc(collection(db, "sucursal")), {
      nombre,
      direccion    
    });

    console.log("Document added with ID:", docRef.id);
  } catch (error) {
    console.error("Error adding user to Firestore:", error);
    throw error;
  }
};

// Actualizar sucursa
const actualizarSucursal = async (id, updatedData) => {
  try {

    const docRef = doc(db, "sucursal", id);
    await updateDoc(docRef, updatedData);

    console.log("Document updated with ID:", id);
  } catch (error) {
    console.error("Error updating user in Firestore:", error);
    throw error;
  }
};

// Eliminar Sucursal
const eliminarSucursal = async (id) => {
  try {
    const docRef = doc(db, "sucursal", id);
    await deleteDoc(docRef);

    console.log("Document deleted with ID:", id);
  } catch (error) {
    console.error("Error deleting user from Firestore:", error);
    throw error;
  }
};

const obtenerSucursalPorId = async (id) => {
  try {
    const docRef = doc(db, "sucursal", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      console.log("No such mercaderista document!");
      return null;
    }
  } catch (error) {
    console.error("Error getting mercaderista by ID:", error);
    throw error;
  }
};


const obtenerSucursales = (setSucursales) => {
  const q = query(collection(db, "sucursal"));
  return onSnapshot(q, (querySnapshot) => {
    const sucursales = querySnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    }));
    setSucursales(sucursales);
    console.log('listen all');
  });
}


export {
  agregarSucursal,
  actualizarSucursal,
  eliminarSucursal,
  obtenerSucursales,
  obtenerSucursalPorId
};
