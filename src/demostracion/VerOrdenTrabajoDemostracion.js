import React from 'react';
import AdminNavbar from "components/Navbars/AdminNavbar";
import Sidebar from "components/Sidebar/Sidebar";
import HeaderStats from "components/Headers/HeaderStats";
import FooterAdmin from "components/Footers/FooterAdmin";
import OrdenTrabajoDominio from 'dominio/OrdenTrabajoDominio';

function VerOrdenTrabajoDemostracion(props) {
  return (
    <OrdenTrabajoDominio>
      {({ ordenTrabajo, cliente, mercaderista, sucursal }) => (
        <>
          <Sidebar />
          <div className="relative md:ml-64 bg-blueGray-100 min-h-screen flex flex-col">
            <AdminNavbar pageText="Gestion de Orden de Trabajo" />
            {/* Header */}
            <HeaderStats />
            <div className="px-4 md:px-10 mx-auto w-full -m-24 flex-grow">
              <div className="flex flex-wrap justify-center items-center h-full">
                {ordenTrabajo ? (
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                      <div className="px-4 py-5 flex-auto">
                        <h4 className="text-blueGray-400 text-center mb-6 font-bold uppercase">
                          Orden de Trabajo
                        </h4>
                        <div className="space-y-4">                          
                          <p className={'my-4'}><strong>Mercaderista:</strong> {mercaderista.nombre} {mercaderista.apellido}</p>
                          <p className={'my-4'}><strong>Cliente:</strong> {cliente.nombre} {cliente.apellido}</p>
                          <p className={'my-4'}><strong>Sucursal:</strong> {sucursal.nombre}</p>
                          <p className={'my-4'}><strong>Estado:</strong> {ordenTrabajo.estado}</p>
                          <p className={'my-4'}><strong>Fecha:</strong> {ordenTrabajo.fecha}</p>                          
                          <p className={'my-4'}><strong>Servicio:</strong> {ordenTrabajo.servicio}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p>No hay información disponible de la orden de trabajo.</p>
                )}
              </div>
              <FooterAdmin />
            </div>
          </div>
        </>
      )}
    </OrdenTrabajoDominio>
  );
}

export default VerOrdenTrabajoDemostracion;
