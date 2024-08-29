import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { 
    agregarOrdenTrabajo, 
    obtenerOrdenTrabajos, 
    actualizarOrdenTrabajo, 
    eliminarOrdenTrabajo, 
    obtenerOrdenTrabajoPorId,
    actualizarOrdenTrabajoEstado 
} from 'dato/OrdenTrabajoDato';
import { obtenerClientes, obtenerClientePorId } from 'dato/ClienteDato';
import { obtenerSucursales, obtenerSucursalPorId } from 'dato/SucursalDato';
import { obtenerMercaderistas, obtenerMercaderistaPorId } from 'dato/MercaderistaDato';


function OrdenTrabajoDominio(props) {
    const { id } = useParams();
    const [ordenTrabajo, setOrdenTrabajo] = useState({
        id: "",
        id_mercaderista: "",
        id_cliente: "",
        id_sucursal: "",
        estado: "Creado",
        fecha: "",
        url_qr: "",
        servicio: ""        
    });
    const [mercaderista, setMercaderista] = useState({});
    const [cliente, setCliente] = useState({});
    const [sucursal, setSucursal] = useState({});

    const [ordenTrabajos, setOrdenTrabajos] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [sucursales, setSucursales] = useState([]);
    const [mercaderistas, setMercaderistas] = useState([]);
    const [error, setError] = useState(null);

    const [location, setLocation] = useState(null);
    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);

    const handleMapRightClick = (position) => {
        setLocation(position);
        setLat(position.lat);
        setLng(position.lng);
    };

    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = obtenerOrdenTrabajos(setOrdenTrabajos);
        return () => unsubscribe();
    }, []);  

    useEffect(() => {
        const unsubscribe = obtenerClientes(setClientes);
        return () => unsubscribe();
    }, []);  
    
    useEffect(() => {
        const unsubscribe = obtenerSucursales(setSucursales);
        return () => unsubscribe();
    }, []);  
    
    useEffect(() => {
        const unsubscribe = obtenerMercaderistas(setMercaderistas);
        return () => unsubscribe();
    }, []);  

    useEffect(() => {
        if (ordenTrabajo.id_mercaderista) {
            const fetchMercaderista = async () => {
                const mercaderistaData = await obtenerMercaderistaPorId(ordenTrabajo.id_mercaderista);
                setMercaderista(mercaderistaData);
            };
            fetchMercaderista();
        }
    }, [ordenTrabajo.id_mercaderista]); 
    
    useEffect(() => {
        if (ordenTrabajo.id_cliente) {
            const fetchCliente = async () => {
                const clienteData = await obtenerClientePorId(ordenTrabajo.id_cliente);
                setCliente(clienteData);
            };
            fetchCliente();
        }
    }, [ordenTrabajo.id_cliente]); 

    useEffect(() => {
        if (ordenTrabajo.id_sucursal) {
            const fetchSucursal = async () => {
                const sucursalData = await obtenerSucursalPorId(ordenTrabajo.id_sucursal);
                setSucursal(sucursalData);
            };
            fetchSucursal();
        }
    }, [ordenTrabajo.id_sucursal]); 
    
    useEffect(() => {
        if (id) {
            const fetchOrdenTrabajo = async () => {
                const ordenObtenido = await obtenerOrdenTrabajoPorId(id);
                setOrdenTrabajo(ordenObtenido);
            };
            fetchOrdenTrabajo();
        }        
    }, [id]);  // Ejecutar este efecto solo si el ID cambia      

    const handleChange = (event) => {
        const { name, value } = event.target;
        setOrdenTrabajo((prevOrdenTrabajo) => ({
            ...prevOrdenTrabajo,
            [name]: value,
        }));
    };

    const handleAgregar = async (event) => {
        event.preventDefault();
        setError(null);
        try {
            navigate("/ordenTrabajo"); // Navegar después de agregar la orden de trabajo
            const estadoActualizado = ordenTrabajo.id_mercaderista ? "Asignado" : "Creado";
            await agregarOrdenTrabajo(
                ordenTrabajo.id_mercaderista,
                ordenTrabajo.id_cliente,
                ordenTrabajo.id_sucursal,
                estadoActualizado,
                ordenTrabajo.fecha,
                ordenTrabajo.url_qr,
                ordenTrabajo.servicio,
                lat,
                lng
            );            
        } catch (error) {
            setError(error.message);
        }
    };

    const handleActualizar = async (event) => {
        event.preventDefault();
        setError(null);
        try {
            navigate("/ordenTrabajo");
            const estadoActualizado = ordenTrabajo.id_mercaderista ? "Asignado" : "Creado";
            await actualizarOrdenTrabajo(ordenTrabajo.id, {            
                id_mercaderista: ordenTrabajo.id_mercaderista,
                id_cliente: ordenTrabajo.id_cliente,
                estado: estadoActualizado,
                fecha: ordenTrabajo.fecha,
                url_qr: ordenTrabajo.url_qr,
                servicio: ordenTrabajo.servicio
            });            
        } catch (error) {
            setError(error.message);
        }
    };  


    const handleEliminar = async (id) => {
        setError(null);
        try {
            navigate("/ordenTrabajo");
            await eliminarOrdenTrabajo(id);            
        } catch (error) {
            setError(error.message);
        }
    };

    const handleFormulario = () => {
        navigate('/registrarOrdenTrabajo');
    };

    const handleMap = (id) => {
        navigate(`/mapa/${id}`);
    };

    const handleVer = (id) => {
        navigate(`/verOrdenTrabajo/${id}`);
    };    

    const handleQrGenerador = (id) => {
        navigate(`/generarQr/${id}`);
    };
    
    const handleFormularioActualizar = (id) => {
        navigate(`/actualizarOrdenTrabajo/${id}`);
    };

    return (
        <>{props.children({
            ordenTrabajo,
            cliente,
            mercaderista,
            sucursal,
            ordenTrabajos,
            clientes,
            sucursales,
            mercaderistas,
            handleFormulario,
            handleFormularioActualizar,
            handleChange,
            handleAgregar,
            handleActualizar,
            handleEliminar,
            handleQrGenerador,
            handleVer,
            handleMap,
            navigate,
            handleMapRightClick,
            location,
            error
        })}</>
    );
}

export default OrdenTrabajoDominio;
