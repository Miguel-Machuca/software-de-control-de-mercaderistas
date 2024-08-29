import React from 'react';
import AdminNavbar from "components/Navbars/AdminNavbar";
import Sidebar from "components/Sidebar/Sidebar";
import HeaderStats from "components/Headers/HeaderStats";
import FooterAdmin from "components/Footers/FooterAdmin";
import OrdenTrabajoDominio from 'dominio/OrdenTrabajoDominio';

function OrdenTrabajoDemostracion({ color }) {
  return (
    <OrdenTrabajoDominio>
      {({
        ordenTrabajos,
        handleFormulario,
        handleFormularioActualizar,
        handleQrGenerador,
        handleEliminar,
        handleVer,
        handleMap
      }) => (
        <>
          <Sidebar />
          <div className="relative md:ml-64 bg-blueGray-100">
            <AdminNavbar pageText="Gestion de Orden de Trabajo" />
            <HeaderStats buttonText="Registrar Orden de Trabajo" onClick={handleFormulario} showButton={true} />
            <div className="px-4 md:px-10 mx-auto w-full -m-24">
              <div className="flex flex-wrap mt-4">
                <div className="w-full mb-12 px-4">
                  <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
                    <div className="rounded-t mb-0 px-4 py-3 border-0">
                      <div className="flex flex-wrap items-center">
                        <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                          <h3 className="font-semibold text-lg text-blueGray-700">
                            Ordenes de Trabajo
                          </h3>
                        </div>
                      </div>
                    </div>
                    <div className="block w-full overflow-x-auto">
                      <table className="items-center w-full bg-transparent border-collapse">
                        <thead>
                          <tr>
                            <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                              Servicio
                            </th>
                            <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                              Estado
                            </th>
                            <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                              Acción
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {ordenTrabajos.map(event => (
                            <tr key={event.id}>
                              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                <span className="ml-3 font-bold text-blueGray-600">
                                  {event.servicio}
                                </span>
                              </td>
                              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                <span className={`ml-3 font-bold text-white ${event.estado === "Completado" ? "bg-emerald-500" : event.estado === "Incumplido" ? "bg-red-600" : event.estado === "Asignado" ? "bg-orange-600" : event.estado === "Creado" ? "bg-lightBlue-600" : ""} rounded px-2 py-1`}>
                                  {event.estado}
                                </span>
                              </td>
                              <td className="border-t-0 px-6 align-middle font-bold border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                <button onClick={() => handleQrGenerador(event.id)} className="bg-orange-500 text-white active:bg-orange-600 font-bold uppercase text-xs px-4 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                                  <i className="fas fa-qrcode"></i>
                                </button>
                                <button onClick={() => handleMap(event.id)} className="bg-indigo-500 text-white active:bg-indigo-600 font-bold uppercase text-xs px-4 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                                  <i className="fas fa-map-marked"></i>
                                </button>
                                <button onClick={() => handleVer(event.id)} className="bg-teal-500 text-white active:bg-teal-600 font-bold uppercase text-xs px-4 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                                  <i className="fas fa-eye"></i>
                                </button>
                                <button onClick={() => handleFormularioActualizar(event.id)} className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                                  <i className="fas fa-edit"></i>
                                </button>
                                <button onClick={() => handleEliminar(event.id)} className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                                  <i className="fas fa-trash"></i>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <FooterAdmin />
            </div>
          </div>
        </>
      )}
    </OrdenTrabajoDominio>
  );
}

export default OrdenTrabajoDemostracion;
