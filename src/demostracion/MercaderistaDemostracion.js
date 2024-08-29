import React from 'react';
import AdminNavbar from "components/Navbars/AdminNavbar";
import Sidebar from "components/Sidebar/Sidebar";
import HeaderStats from "components/Headers/HeaderStats";
import FooterAdmin from "components/Footers/FooterAdmin";
import MercaderistaDominio from 'dominio/MercaderistaDominio';

function MercaderistaDemostracion(props) {
    return (
        <MercaderistaDominio>
            {({ 
                handleFormulario, 
                mercaderistas, 
                handleEliminar, 
                handleEditarMercaderista, 
                handleMercaderistaOrden, 
                handleFormularioActualizar }) => (
                <>
                    <Sidebar />
                    <div className="relative md:ml-64 bg-blueGray-100">
                        <AdminNavbar pageText="Gestión de Mercaderistas" />
                        {/* Header */}
                        <HeaderStats buttonText="Registrar Mercaderista" onClick={handleFormulario} showButton={true} />
                        <div className="px-4 md:px-10 mx-auto w-full -m-24">
                            <div className="flex flex-wrap mt-4">
                                <div className="w-full mb-12 px-4">
                                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
                                        <div className="rounded-t mb-0 px-4 py-3 border-0">
                                            <div className="flex flex-wrap items-center">
                                                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                                    <h3 className="font-semibold text-lg text-blueGray-700">
                                                        Mercaderistas
                                                    </h3>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="block w-full overflow-x-auto">
                                            {/* Mercaderistas table */}
                                            <table className="items-center w-full bg-transparent border-collapse">
                                                <thead>
                                                    <tr>
                                                        <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                                                            Nombre
                                                        </th>
                                                        <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                                                            CI
                                                        </th>
                                                        <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                                                            Teléfono
                                                        </th>
                                                        <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                                                            Acción
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {mercaderistas.map(mercaderista => (
                                                        <tr key={mercaderista.id}>
                                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                                                                <span className="ml-3 font-bold text-blueGray-600">
                                                                    {mercaderista.nombre} {mercaderista.apellido}
                                                                </span>
                                                            </td>
                                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                                {mercaderista.ci}
                                                            </td>
                                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                                {mercaderista.telefono}
                                                            </td>
                                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                                <button onClick={() => handleMercaderistaOrden(mercaderista.id)} className="bg-indigo-500 text-white active:bg-indigo-600 font-bold uppercase text-xs px-4 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                                                                    <i className="fas fa-file-alt"></i>
                                                                </button>
                                                                <button onClick={() => handleFormularioActualizar(mercaderista.id)} className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                                                                    <i className="fas fa-edit"></i>
                                                                </button>
                                                                <button onClick={() => handleEliminar(mercaderista.id)} className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
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
        </MercaderistaDominio>
    );
}

export default MercaderistaDemostracion;
