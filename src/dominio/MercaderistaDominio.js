import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { obtenerMercaderistas, obtenerMercaderistaPorId, actualizarMercaderista, eliminarMercaderista, agregarMercaderista } from 'dato/MercaderistaDato';
import { obtenerOrdenTrabajosMercaderista } from 'dato/OrdenTrabajoDato';
import { useAuth } from '../context/AuthContext';

function MercaderistaDominio(props) {
  const { id } = useParams();
  const [mercaderista, setMercaderista] = useState({
    id: "",
    nombre: "",
    apellido: "",
    email: "",
    direccion: "",
    telefono: "",
    fecha_nacimiento: "",
    ci: "",
    equipo: "",
    password: ""
  });

  const [mercaderistas, setMercaderistas] = useState([]);

  const [ordenTrabajos, setOrdenTrabajos] = useState([]);

  useEffect(() => {
    const unsubscribe = obtenerMercaderistas(setMercaderistas);
    return () => unsubscribe();
  }, [])  

  useEffect(() => {
    const unsubscribe = obtenerOrdenTrabajosMercaderista(setOrdenTrabajos, id);
    return () => unsubscribe();
  }, [id]);

  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMercaderistas = async () => {
      const unsubscribe = obtenerMercaderistas(setMercaderistas);
      return unsubscribe;
    };

    fetchMercaderistas();
  }, []);

  const navigate = useNavigate();

  const { signup } = useAuth();

  const handleAgregar = async (event) => {
    event.preventDefault();
    setError(null);
    try {
      navigate("/mercaderista"); // Asegúrate de que esta línea esté ejecutándose después del registro
      await signup(mercaderista.email, mercaderista.password);
      await agregarMercaderista(
        mercaderista.nombre,
        mercaderista.apellido,
        mercaderista.email,
        mercaderista.password,
        mercaderista.fecha_nacimiento,
        mercaderista.ci,        
        mercaderista.telefono,
        mercaderista.direccion,
        mercaderista.equipo
      );
      
      // Después de agregar el cliente
      
      
    } catch (error) {
      setError(error.message);
    }
  };  

  const handleEliminar = async (id) => {
    setError(null);
    try {
      navigate("/mercaderista");
      await eliminarMercaderista(id);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    const fetchMercaderistaPorId = async () => {
      try {
        const mercaderistaData = await obtenerMercaderistaPorId(id);
        if (mercaderistaData) {
          setMercaderista(mercaderistaData);
        } else {
          console.log(`No mercaderista found with ID: ${id}`);
        }
      } catch (error) {
        console.error("Error fetching mercaderista:", error);
        setError(error.message);
      }
    };

    if (id) {
      fetchMercaderistaPorId();
    }
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMercaderista((prevMercaderista) => ({
      ...prevMercaderista,
      [name]: value,
    }));
  };

  const handleActualizar = async (event) => {
    event.preventDefault();
    setError(null);
    try {
      navigate("/mercaderista");
      await actualizarMercaderista(mercaderista.id, mercaderista);
      
    } catch (error) {
      setError(error.message);
    }
  };

  const handleFormulario = () => {
    navigate('/registrarMercaderista');
  };


  const handleFormularioActualizar = (id) => {
    navigate(`/actualizarMercaderista/${id}`);
  };

  const handleMercaderistaOrden = (id) => {
    navigate(`/mercaderistaOrden/${id}`);
  }; 

  const handleMap = (id) => {
    navigate(`/mapa/${id}`);
  };

  return (
    <>{props.children({
      mercaderista,
      mercaderistas,
      ordenTrabajos,
      handleFormulario,
      handleFormularioActualizar,
      handleChange,
      handleAgregar,
      handleActualizar,
      handleEliminar,
      handleMercaderistaOrden,
      handleMap,
      navigate,
      error
    })}</>
  )
}

export default MercaderistaDominio;
