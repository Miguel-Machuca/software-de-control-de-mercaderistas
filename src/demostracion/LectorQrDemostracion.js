import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import { useNavigate } from "react-router-dom";
import AdminNavbar from "components/Navbars/AdminNavbar";
import Sidebar from "components/Sidebar/Sidebar";
import HeaderStats from "components/Headers/HeaderStats";
import FooterAdmin from "components/Footers/FooterAdmin";
import { actualizarOrdenTrabajoEstado } from 'dato/OrdenTrabajoDato';

function LectorQrDemostracion() {
  const [data, setData] = useState('No result');
  const navigate = useNavigate();

  const handleScan = async (result) => {
    if (result) {
      const id = result?.text; // Asumiendo que el QR contiene el ID de la orden de trabajo
      setData(id || 'No result');
      try {
        await actualizarOrdenTrabajoEstado(id, "Completado" );
        navigate(`/verOrdenTrabajo/${id}`); // Navegar a la vista de la orden de trabajo después de actualizar
      } catch (error) {
        console.error("Error updating order state:", error);
      }
    }
  };

  const handleError = (error) => {
    console.error(error);
  };

  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar pageText="Lector Qr de la orden de trabajo"/>
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <div className="flex flex-wrap">
            <div className="bg-primary flex h-screen w-screen items-center justify-center">			
              <div style={{ width: '320px', height: '320px' }}>
                <QrReader
                  delay={300}
                  onError={handleError}
                  onResult={handleScan}
                  style={{ width: '100%', height: '100%' }}
                />
              </div>
            </div>			
            <p className="mt-4 items-center ">{data}</p> {/* Asegúrate de que 'data' es una cadena */}
          </div>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}

export default LectorQrDemostracion;
