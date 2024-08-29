import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { agregarCliente, actualizarCliente, eliminarCliente, obtenerClientes, obtenerClientePorId } from '../dato/ClienteDato';
import { useAuth } from '../context/AuthContext';

function ClienteDominio(props) {
  
  const [cliente, setCliente] = useState({
    id: "",
    nombre: "",
    apellido: "",
    email: "",
    direccion: "",
    telefono: "",
    fecha_nacimiento: "",
    ci: "",
    nit: "",
    password: ""
  });

  const [clientes, setClientes] = useState([]);
  const { id } = useParams();  // Obtener el ID del cliente desde los parámetros de la URL

  useEffect(() => {
    if (id) {
      const obtenerCliente = async () => {
        const clienteObtenido = await obtenerClientePorId(id);
        setCliente(clienteObtenido);
      };
      obtenerCliente();
    }
    const unsubscribe = obtenerClientes(setClientes);
    return () => unsubscribe();
  }, [id]);  // Ejecutar este efecto solo si el ID cambia  

  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const { signup } = useAuth();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCliente((prevCliente) => ({
      ...prevCliente,
      [name]: value,
    }));
  };

  const handleAgregar = async (event) => {
    event.preventDefault();
    setError(null);
    try {
      navigate("/cliente"); // Asegúrate de que esta línea esté ejecutándose después del registro
      await signup(cliente.email, cliente.password);
      await agregarCliente(
        cliente.nombre,
        cliente.apellido,
        cliente.email,
        cliente.password,
        cliente.ci,
        cliente.fecha_nacimiento,
        cliente.telefono,
        cliente.direccion,
        cliente.nit
      );      
      
    } catch (error) {
      setError(error.message);
    }
  };

  const handleActualizar = async (event) => {
    event.preventDefault();
    setError(null);
    try {
      navigate("/cliente");
      await actualizarCliente(cliente.id, {
        nombre: cliente.nombre,
        apellido: cliente.apellido,
        email: cliente.email,
        password: cliente.password,
        ci: cliente.ci,
        fecha_nacimiento: cliente.fecha_nacimiento,
        telefono: cliente.telefono,
        direccion: cliente.direccion,
        nit: cliente.nit
      });
      
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEliminar = async (id) => {
    setError(null);
    try {
      navigate("/cliente");
      await eliminarCliente(id);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLogin = () => {
    navigate('/');
  };

  const handleFormulario = () => {
    navigate('/registrarCliente');
  };


  const handleFormularioActualizar = (id) => {
    navigate(`/actualizarCliente/${id}`);
  };    

  return (
    <>{props.children({
      cliente,
      clientes,
      handleFormulario,
      handleFormularioActualizar,
      handleChange,
      handleAgregar,
      handleActualizar,
      handleEliminar,      
      handleLogin,
      navigate,
      error
    })}</>
  );
}

export default ClienteDominio;
