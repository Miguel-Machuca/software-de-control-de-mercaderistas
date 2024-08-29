import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  updateDoc,
  query,  
  where 
} from "firebase/firestore";
import { db } from '../config/FirebaseConfig';
import bcrypt from 'bcryptjs';

const agregarMercaderista = async (nombre, apellido, email, password, fecha_nacimiento, ci, telefono, direccion, equipo) => {
  try {
    // Encriptar la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(password, 10);

    const docRef = await addDoc(collection(db, "mercaderista"), {
      nombre,
      apellido,
      email,
      password: hashedPassword,  // Guardar la contraseña encriptada
      telefono,
      fecha_nacimiento,
      ci,
      direccion,
      equipo
    });

    console.log("Document added with ID:", docRef.id);
  } catch (error) {
    console.error("Error adding user to Firestore:", error);
    throw error; // Lanzar el error para que pueda ser manejado por el llamador
  }
};

const obtenerMercaderistas = (setMercaderistas) => {
  const q = collection(db, "mercaderista");
  return onSnapshot(q, (querySnapshot) => {
    const mercaderistas = querySnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    }));
    setMercaderistas(mercaderistas);
    console.log('listen all');
  });
};

const actualizarMercaderista = async (id, updatedData) => {
  try {
    if (updatedData.password) {
      updatedData.password = await bcrypt.hash(updatedData.password, 10);
    }

    const docRef = doc(db, "mercaderista", id);
    await updateDoc(docRef, updatedData);

    console.log("Document updated with ID:", id);
  } catch (error) {
    console.error("Error updating user in Firestore:", error);
    throw error;
  }
};

const obtenerMercaderistaPorId = async (id) => {
  try {
    const docRef = doc(db, "mercaderista", id);
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

const eliminarMercaderista = async (id) => {
  try {
    const docRef = doc(db, "mercaderista", id);
    await deleteDoc(docRef);

    console.log("Document deleted with ID:", id);
  } catch (error) {
    console.error("Error deleting user from Firestore:", error);
    throw error;
  }
};

const obtenerMercaderistasConEstados = (setMercaderistasConEstados) => {
  const mercaderistasQuery = query(collection(db, "mercaderista"));
  
  return onSnapshot(mercaderistasQuery, async (mercaderistasSnapshot) => {
    const mercaderistas = await Promise.all(
      mercaderistasSnapshot.docs.map(async (mercaderistaDoc) => {
        const mercaderistaData = mercaderistaDoc.data();
        const mercaderistaId = mercaderistaDoc.id;

        // Obtener las órdenes de trabajo del mercaderista
        const ordenesQuery = query(
          collection(db, "orden_trabajo"),
          where("id_mercaderista", "==", mercaderistaId)
        );

        const ordenesSnapshot = await getDocs(ordenesQuery);
        const estados = ordenesSnapshot.docs.map(doc => doc.data().estado);

        return {
          id: mercaderistaId,
          nombre: mercaderistaData.nombre,
          apellido: mercaderistaData.apellido,
          estados
        };
      })
    );

    setMercaderistasConEstados(mercaderistas);
    console.log('Escuchando cambios en mercaderistas y sus estados de orden de trabajo');
  });
};


export {
  agregarMercaderista,
  actualizarMercaderista,
  eliminarMercaderista,
  obtenerMercaderistas,
  obtenerMercaderistaPorId, 
  obtenerMercaderistasConEstados
};