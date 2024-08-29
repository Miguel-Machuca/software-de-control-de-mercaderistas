// ClienteDato.js

import { db } from '../config/FirebaseConfig';
import bcrypt from 'bcryptjs';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
  getDoc,
  setDoc
} from "firebase/firestore";

// Agregar Cliente
const agregarCliente = async (nombre, apellido, email, password, ci, fecha_nacimiento, telefono, direccion, nit) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const docRef = await setDoc(doc(collection(db, "cliente")), {
      nombre,
      apellido,
      email,
      password: hashedPassword,
      ci,
      fecha_nacimiento,
      telefono,
      direccion,
      nit
    });

    console.log("Document added with ID:", docRef.id);
  } catch (error) {
    console.error("Error adding user to Firestore:", error);
    throw error;
  }
};

// Actualizar Cliente
const actualizarCliente = async (id, updatedData) => {
  try {
    if (updatedData.password) {
      updatedData.password = await bcrypt.hash(updatedData.password, 10);
    }

    const docRef = doc(db, "cliente", id);
    await updateDoc(docRef, updatedData);

    console.log("Document updated with ID:", id);
  } catch (error) {
    console.error("Error updating user in Firestore:", error);
    throw error;
  }
};

// Eliminar Cliente
const eliminarCliente = async (id) => {
  try {
    const docRef = doc(db, "cliente", id);
    await deleteDoc(docRef);

    console.log("Document deleted with ID:", id);
  } catch (error) {
    console.error("Error deleting user from Firestore:", error);
    throw error;
  }
};

// Obtener un cliente por ID
const obtenerClientePorId = async (id) => {
  try {
    const docRef = doc(db, "cliente", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      throw new Error("No such document!");
    }
  } catch (error) {
    console.error("Error fetching client:", error);
    throw error;
  }
};

// Obtener todos los clientes
const obtenerClientes = (setClientes) => {
  const q = query(collection(db, "cliente"));
  return onSnapshot(q, (querySnapshot) => {
    const clientes = querySnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    }));
    setClientes(clientes);
    console.log('listen all');
  });
}

export {
  agregarCliente,
  actualizarCliente,
  eliminarCliente,
  obtenerClientes,
  obtenerClientePorId
};
