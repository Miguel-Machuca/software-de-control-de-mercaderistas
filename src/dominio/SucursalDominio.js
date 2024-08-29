import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { agregarSucursal, actualizarSucursal, eliminarSucursal, obtenerSucursales, obtenerSucursalPorId } from 'dato/SucursalDato';


function SucursalDominio(props) {
  const { id } = useParams();  // Obtener el ID del cliente desde los parámetros de la URL  
  const [sucursal, setSucursal] = useState({
        id: "",
        nombre: "",
        direccion: "",              
      });

      useEffect(() => {
        if (id) {
          const obtenerSucursal= async () => {
            const sucursalObtenido = await obtenerSucursalPorId(id);
            setSucursal(sucursalObtenido);
          };
          obtenerSucursal();
        }
        const unsubscribe = obtenerSucursales(setSucursales);
        return () => unsubscribe();
      }, [id]);  // Ejecutar este efecto solo si el ID cambia  
    
      const [sucursales, setSucursales] = useState([]);
    

   
    
      const [error, setError] = useState(null);
    
      const navigate = useNavigate();
      
    
      const handleChange = (event) => {
        const { name, value } = event.target;
        setSucursal((prevSucursal) => ({
          ...prevSucursal,
          [name]: value,
        }));
      };
    
      const handleAgregar = async (event) => {
        event.preventDefault();
        setError(null);
        try {
          navigate("/sucursal"); // Asegúrate de que esta línea esté ejecutándose después del registro          
          await agregarSucursal(
            sucursal.nombre,
            sucursal.direccion,          
          );
          
          
        } catch (error) {
          setError(error.message);
        }
      };
    
      const handleActualizar = async (event) => {
        event.preventDefault();
        setError(null);
        try {
          navigate("/sucursal");
          await actualizarSucursal(sucursal.id, {            
            nombre: sucursal.nombre,
            direccion: sucursal.direccion,
          });
          
        } catch (error) {
          setError(error.message);
        }
      };  
    
      const handleEliminar = async (id) => {
        setError(null);
        try {
          navigate("/sucursal");
          await eliminarSucursal(id);
        } catch (error) {
          setError(error.message);
        }
      };
    
      const handleFormulario = () => {
        navigate('/registrarSucursal');
      };

      const handleFormularioActualizar = (id) => {
        navigate(`/actualizarSucursal/${id}`);
      };
    

  return (
    <>{props.children({
        sucursal,
        sucursales,
        handleFormulario,
        handleFormularioActualizar,
        handleChange,
        handleAgregar,
        handleActualizar,
        handleEliminar,
        navigate,
        error
      })}</>
  )
}

export default SucursalDominio