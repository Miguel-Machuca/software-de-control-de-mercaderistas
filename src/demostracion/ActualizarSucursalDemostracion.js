import SucursalDominio from 'dominio/SucursalDominio'
import React from 'react'
import AdminNavbar from "components/Navbars/AdminNavbar";
import Sidebar from "components/Sidebar/Sidebar";
import HeaderStats from "components/Headers/HeaderStats";
import FooterAdmin from "components/Footers/FooterAdmin";


function ActualizarSucursalDemostracion(props) {
  return (
    <SucursalDominio>
        {({handleActualizar, handleChange, sucursal}) => (
            <>
                <Sidebar />
                <div className="relative md:ml-64 bg-blueGray-100">
                  <AdminNavbar pageText="GESTION SUCURSAL"/>
                  {/* Header */}
                  <HeaderStats/>
                  <div className="px-4 md:px-10 mx-auto w-full -m-24">
                    <div className="flex flex-wrap">
                      <div className="container mx-auto px-4 h-full">
                        <div className="flex content-center items-center justify-center h-full">
                          <div className="w-full lg:w-10/12 px-4"> {/* Aumentar el ancho del contenedor */}
                            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                              <div className="rounded-t mb-0 px-6 py-6">
                                <div className="text-center mb-3">
                                  <h6 className="text-blueGray-500 text-sm font-bold">
                                    Registro de Sucursal
                                  </h6>
                                </div>
                                <div className="btn-wrapper text-center">
          
                                </div>
                                <hr className="mt-6 border-b-1 border-blueGray-300" />
                              </div>
                              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                                <form onSubmit={handleActualizar}>
                                  <div className="flex flex-wrap">
                                    <div className="w-full lg:w-6/12 px-4">
                                      <div className="relative w-full mb-3">
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-nombre">
                                          Nombre
                                        </label>
                                        <input
                                            type="text" 
                                            id="nombre" 
                                            name="nombre"               
                                            value={sucursal.nombre}                                                        
                                            onChange={handleChange}
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            placeholder="Nombre"
                                        />
                                      </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4">
                                      <div className="relative w-full mb-3">
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-apellido">
                                          Direccion
                                        </label>
                                        <input
                                          type="text"
                                          id="direccion" 
                                          name="direccion"               
                                          value={sucursal.direccion}        
                                          onChange={handleChange}
                                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                          placeholder="Direccion"
                                        />
                                      </div>
                                    </div>                                                                                                                         
                                  </div>
                                  <div className="text-center mt-6">
                                  <button type="submit" className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" >
                                      Actualizar
                                  </button>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>          
                    </div>
                    <FooterAdmin />
                  </div>
                </div>
              </>              
        )}

    </SucursalDominio>
  )
}

export default ActualizarSucursalDemostracion