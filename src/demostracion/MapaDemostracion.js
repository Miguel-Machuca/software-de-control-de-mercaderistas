import React, { useEffect, useState } from 'react';
import MapComponent from 'dominio/MapComponent';
import { useParams } from "react-router-dom";
// Components
import AdminNavbar from "components/Navbars/AdminNavbar";
import Sidebar from "components/Sidebar/Sidebar";
import HeaderStats from "components/Headers/HeaderStats";
import FooterAdmin from "components/Footers/FooterAdmin";
import { obtenerOrdenTrabajoAtributosPorId } from 'dato/OrdenTrabajoDato';

function MapaDemostracion(props) {
  const { id } = useParams();
  const [orden, setOrden] = useState({});

  useEffect(() => {
    const fetchOrden = async () => {
      if (id) {
        try {
          const ordenData = await obtenerOrdenTrabajoAtributosPorId(id);
          setOrden(ordenData);
        } catch (error) {
          console.error("Error al obtener la orden de trabajo:", error);
        }
      }
    };

    fetchOrden();
  }, [id]);

  // Acceder a lat y lng después de que orden se actualice
  const lat = orden.lat;
  const lng = orden.lng;

  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <div className="flex flex-wrap">
            {/* Verificar que lat y lng existan antes de pasarlos */}
            {lat && lng && <MapComponent lat={lat} lng={lng} />}
          </div>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}

export default MapaDemostracion;
