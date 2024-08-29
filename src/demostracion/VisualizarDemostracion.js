import React, { useEffect, useState } from 'react';
import MapComponent from 'dominio/MapComponent';

// Components
import AdminNavbar from "components/Navbars/AdminNavbar";
import Sidebar from "components/Sidebar/Sidebar";
import HeaderStats from "components/Headers/HeaderStats";
import FooterAdmin from "components/Footers/FooterAdmin";
import { obtenerOrdenTrabajosLatLng } from 'dato/OrdenTrabajoDato';

const VisualizarDemostracion = () => {
  const [ordenLatLng, setOrdenLatLng] = useState([]);
  
  // Coordenadas de las ubicaciones adicionales estáticas
  const locations = [
    { lat: -17.784117103324043, lng: -63.194969067622246 },
    { lat: -17.77750255953871, lng: -63.20614589034096 },
    { lat: -17.785818499366986, lng: -63.20844581501015 },
    { lat: -17.821222869035775, lng: -63.18231899819021 },
    { lat: -17.779997306458622, lng: -63.15075292179648 },
    { lat: -17.759304922965796, lng: -63.152865906473146 },
    { lat: -17.733028962792353, lng: -63.16855226979191 },
    { lat: -17.816852438875245, lng: -63.214168925457436 },
    { lat: -17.798830119375726, lng: -63.17181168096519 }
  ];

  useEffect(() => {
    // Obtener los datos de latitud y longitud desde Firebase
    const unsubscribe = obtenerOrdenTrabajosLatLng((ordenTrabajos) => {
      setOrdenLatLng(ordenTrabajos);
    });

    // Limpieza del efecto al desmontar el componente
    return () => unsubscribe();
  }, []);

  // Mapear los datos obtenidos a las ubicaciones estáticas
  const dynamicLocations = ordenLatLng.map((orden) => ({
    lat: orden.lat,
    lng: orden.lng
  }));

  console.log("locations estáticas:", locations);
  console.log("locations dinámicas:", dynamicLocations);

  const combinedLocations = [...locations, ...dynamicLocations];

  return (

        <>
        <Sidebar />
        <div className="relative md:ml-64 bg-blueGray-100">
          <AdminNavbar />
          {/* Header */}
          <HeaderStats />
          <div className="px-4 md:px-10 mx-auto w-full -m-24">
            <div className="flex flex-wrap">
     
                <MapComponent locations={combinedLocations} />
  
            </div>
            <FooterAdmin />
          </div>
        </div>
      </>
  );
};

export default VisualizarDemostracion;
