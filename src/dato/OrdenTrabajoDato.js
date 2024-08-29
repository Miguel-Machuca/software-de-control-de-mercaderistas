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

// Agregar orden trabajo
const agregarOrdenTrabajo = async (id_mercaderista, id_cliente, id_sucursal, estado, fecha, url_qr, servicio, lat, lng) => {
  try {
    
    const docRef = await setDoc(doc(collection(db, "orden_trabajo")), {
      id_mercaderista,
      id_cliente,
      id_sucursal,
      estado,
      fecha,
      url_qr,
      servicio,
      lat,
      lng      
    });

    console.log("Document added with ID:", docRef.id);
  } catch (error) {
    console.error("Error adding user to Firestore:", error);
    throw error;
  }
};

// Actualizar Orden de trabajo
const actualizarOrdenTrabajo= async (id, updatedData) => {
  try {

    const docRef = doc(db, "orden_trabajo", id);
    await updateDoc(docRef, updatedData);

    console.log("Document updated with ID:", id);
  } catch (error) {
    console.error("Error updating user in Firestore:", error);
    throw error;
  }
};

const actualizarOrdenTrabajoEstado = async (id, attributeValue) => {
  try {
    const docRef = doc(db, "orden_trabajo", id);
    await updateDoc(docRef, {
      estado: attributeValue
    });
    console.log(`Attribute estado updated to ${attributeValue} for document with ID:`, id);
  } catch (error) {
    console.error("Error updating attribute in Firestore:", error);
    throw error;
  }
};

// Eliminar Orden Trabajo
const eliminarOrdenTrabajo = async (id) => {
  try {
    const docRef = doc(db, "orden_trabajo", id);
    await deleteDoc(docRef);

    console.log("Document deleted with ID:", id);
  } catch (error) {
    console.error("Error deleting user from Firestore:", error);
    throw error;
  }
};


const obtenerOrdenTrabajos = (setOrdenTarabajos) => {
  const q = query(collection(db, "orden_trabajo"));
  return onSnapshot(q, (querySnapshot) => {
    const ordenTrabajos = querySnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    }));
    setOrdenTarabajos(ordenTrabajos);
    console.log('listen all');
  });
}

const obtenerOrdenTrabajoPorId = async (id) => {
  try {
    const docRef = doc(db, "orden_trabajo", id);
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

const obtenerOrdenTrabajoAtributosPorId = async (id) => {
  try {
    const docRef = doc(db, "orden_trabajo", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        lat: data.lat,
        lng: data.lng
      };
    } else {
      console.log("No such orden_trabajo document!");
      return null;
    }
  } catch (error) {
    console.error("Error getting orden_trabajo attributes by ID:", error);
    throw error;
  }
};


const obtenerOrdenTrabajosMercaderista = (setOrdenTrabajos, id_mercaderista) => {
  let q = collection(db, "orden_trabajo");

  if (id_mercaderista) {
    q = query(q, where("id_mercaderista", "==", id_mercaderista));
  }

  return onSnapshot(q, (querySnapshot) => {
    const ordenTrabajos = querySnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    }));
    setOrdenTrabajos(ordenTrabajos);
    console.log('listen all');
  });
};

const obtenerOrdenTrabajosLatLng = (setOrdenTrabajos) => {
  const q = query(collection(db, "orden_trabajo"));
  return onSnapshot(q, (querySnapshot) => {
    const ordenTrabajos = querySnapshot.docs.map(doc => ({
      id: doc.id,
      lat: doc.data().lat,
      lng: doc.data().lng
    }));
    setOrdenTrabajos(ordenTrabajos);
    console.log('Escuchando cambios en orden_trabajo');
  });
}

const obtenerOrdenTrabajosEstadoFecha = (setOrdenTrabajos) => {
  const q = query(collection(db, "orden_trabajo"));
  return onSnapshot(q, (querySnapshot) => {
    const ordenTrabajos = querySnapshot.docs.map(doc => ({
      id: doc.id,
      estado: doc.data().estado,
      fecha: doc.data().fecha,
    }));
    setOrdenTrabajos(ordenTrabajos);
    console.log('Escuchando cambios en orden_trabajo');
  });
}



export {
  agregarOrdenTrabajo,
  actualizarOrdenTrabajo,
  eliminarOrdenTrabajo,
  obtenerOrdenTrabajos,
  obtenerOrdenTrabajosMercaderista,
  obtenerOrdenTrabajoPorId,
  actualizarOrdenTrabajoEstado,
  obtenerOrdenTrabajoAtributosPorId,
  obtenerOrdenTrabajosLatLng,
  obtenerOrdenTrabajosEstadoFecha
};
