import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { agregarCliente } from '../dato/ClienteDato';




function RegistrarClienteDominio(props) {
  const [cliente, setCliente] = useState({
    nombre: "",
    apellido: "",
    email: "",
    direccion: "",
    telefono: "",
    fecha_nacimiento: "",
    ci: "",
    nit: "",
  });

  const [error, setError] = useState(null);

  const navigate = useNavigate();
  
  //const { signup } = useAuth();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCliente((prevUsuario) => ({
      ...prevUsuario,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    try {
      await agregarCliente(
        cliente.nombre,
        cliente.apellido,
        cliente.email,
        cliente.password,
        cliente.grado_academico,
        cliente.fecha_nacimiento,
        
      );
      await signup(cliente.email, cliente.password);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLogin = () => {
    navigate('/');
  };
  
    return (
    <>{props.children({
        cliente,
        handleChange,
        handleSubmit,
        error
    })}</>
  )
}

export default RegistrarClienteDominio