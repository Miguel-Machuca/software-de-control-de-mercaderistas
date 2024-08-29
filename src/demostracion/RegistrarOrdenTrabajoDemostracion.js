import OrdenTrabajoDominio from 'dominio/OrdenTrabajoDominio';
import React, { useState } from 'react';
import AdminNavbar from "components/Navbars/AdminNavbar";
import Sidebar from "components/Sidebar/Sidebar";
import HeaderStats from "components/Headers/HeaderStats";
import FooterAdmin from "components/Footers/FooterAdmin";
import { createPopper } from '@popperjs/core';
import MapaDominio from 'dominio/MapaDominio';

function RegistrarOrdenTrabajoDemostracion(props) {
    const [dropdownClienteShow, setDropdownClienteShow] = useState(false);
    const [dropdownSucursalShow, setDropdownSucursalShow] = useState(false);
    const [dropdownMercaderistaShow, setDropdownMercaderistaShow] = useState(false);

    const [selectedCliente, setSelectedCliente] = useState('');
    const [selectedSucursal, setSelectedSucursal] = useState('');
    const [selectedMercaderista, setSelectedMercaderista] = useState('');

    const btnClienteRef = React.createRef();
    const popoverClienteRef = React.createRef();

    const btnSucursalRef = React.createRef();
    const popoverSucursalRef = React.createRef();

    const btnMercaderistaRef = React.createRef();
    const popoverMercaderistaRef = React.createRef();

    const openDropdownPopover = (refBtn, refPopover, setDropdownShow) => {
        createPopper(refBtn.current, refPopover.current, {
            placement: "bottom-start"
        });
        setDropdownShow(true);
    };

    const closeDropdownPopover = (setDropdownShow) => {
        setDropdownShow(false);
    };

    return (
        <OrdenTrabajoDominio>
            {({
                handleAgregar,
                handleChange,
                ordenTrabajo,
                clientes,
                sucursales,
                mercaderistas,
                handleMapRightClick,
                location
            }) => {
                const handleFormSubmit = (e) => {
                    e.preventDefault();
                    if (!location) {
                        alert("Por favor, haga clic derecho en el mapa para colocar un marcador antes de registrar.");
                        return;
                    }
                    handleAgregar(e);
                };

                return (
                    <>
                        <Sidebar />
                        <div className="relative md:ml-64 bg-blueGray-100">
                            <AdminNavbar pageText="GESTION DE ORDEN DE TRABAJO" />
                            {/* Header */}
                            <HeaderStats />
                            <div className="px-4 md:px-10 mx-auto w-full -m-24">
                                <div className="flex flex-wrap">
                                    <div className="container mx-auto px-4 h-full">
                                        <div className="flex content-center items-center justify-center h-full">
                                            <div className="w-full lg:w-10/12 px-4">
                                                {/* Aumentar el ancho del contenedor */}
                                                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                                                    <div className="rounded-t mb-0 px-6 py-6">
                                                        <div className="text-center mb-3">
                                                            <h6 className="text-blueGray-500 text-sm font-bold">
                                                                Registro de Orden de Trabajo
                                                            </h6>
                                                        </div>
                                                        <div className="btn-wrapper text-center">
                                                        </div>
                                                        <hr className="mt-6 border-b-1 border-blueGray-300" />
                                                    </div>
                                                    <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                                                        <form onSubmit={handleFormSubmit}>
                                                            <div className="flex flex-wrap">
                                                                <div className="w-full lg:w-6/12 px-4">
                                                                    <div className="relative w-full mb-3">
                                                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-servicio">
                                                                            Servicio
                                                                        </label>
                                                                        <input
                                                                            type="text"
                                                                            id="servicio"
                                                                            name="servicio"
                                                                            value={ordenTrabajo.servicio}
                                                                            onChange={handleChange}
                                                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                                            placeholder="Servicio"
                                                                        />
                                                                    </div>
                                                                </div>

                                                                <div className="w-full lg:w-6/12 px-4">
                                                                    <div className="relative w-full mb-3">
                                                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-fecha">
                                                                            Fecha
                                                                        </label>
                                                                        <input
                                                                            type="date"
                                                                            id="fecha"
                                                                            name="fecha"
                                                                            value={ordenTrabajo.fecha}
                                                                            onChange={handleChange}
                                                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                                            placeholder="Fecha"
                                                                        />
                                                                    </div>
                                                                </div>

                                                                <div className="w-full lg:w-6/12 px-4">
                                                                    <div className="relative w-full mb-3">
                                                                        <button
                                                                            className="text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 bg-lightBlue-500 active:bg-lightBlue-600 ease-linear transition-all duration-150"
                                                                            type="button"
                                                                            ref={btnClienteRef}
                                                                            onClick={() => {
                                                                                dropdownClienteShow
                                                                                    ? closeDropdownPopover(setDropdownClienteShow)
                                                                                    : openDropdownPopover(btnClienteRef, popoverClienteRef, setDropdownClienteShow);
                                                                            }}
                                                                        >
                                                                            {selectedCliente ? selectedCliente : 'Seleccione un Cliente'}
                                                                        </button>
                                                                        <div
                                                                            ref={popoverClienteRef}
                                                                            className={
                                                                                (dropdownClienteShow ? "block " : "hidden ") +
                                                                                "bg-lightBlue-500 text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mt-1 min-w-48"
                                                                            }
                                                                        >
                                                                            {clientes.map(cliente => (
                                                                                <a
                                                                                    key={cliente.id}
                                                                                    onClick={() => {
                                                                                        handleChange({
                                                                                            target: {
                                                                                                name: 'id_cliente',
                                                                                                value: cliente.id
                                                                                            }
                                                                                        });
                                                                                        setSelectedCliente(`${cliente.nombre} ${cliente.apellido}`);
                                                                                        closeDropdownPopover(setDropdownClienteShow);
                                                                                    }}
                                                                                    className="text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-white cursor-pointer"
                                                                                >
                                                                                    {cliente.nombre} {cliente.apellido}
                                                                                </a>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="w-full lg:w-6/12 px-4">
                                                                    <div className="relative w-full mb-3">
                                                                        <button
                                                                            className="text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 bg-lightBlue-500 active:bg-lightBlue-600 ease-linear transition-all duration-150"
                                                                            type="button"
                                                                            ref={btnSucursalRef}
                                                                            onClick={() => {
                                                                                dropdownSucursalShow
                                                                                    ? closeDropdownPopover(setDropdownSucursalShow)
                                                                                    : openDropdownPopover(btnSucursalRef, popoverSucursalRef, setDropdownSucursalShow);
                                                                            }}
                                                                        >
                                                                            {selectedSucursal ? selectedSucursal : 'Seleccione una Sucursal'}
                                                                        </button>
                                                                        <div
                                                                            ref={popoverSucursalRef}
                                                                            className={
                                                                                (dropdownSucursalShow ? "block " : "hidden ") +
                                                                                "bg-lightBlue-500 text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mt-1 min-w-48"
                                                                            }
                                                                        >
                                                                            {sucursales.map(sucursal => (
                                                                                <a
                                                                                    key={sucursal.id}
                                                                                    onClick={() => {
                                                                                        handleChange({
                                                                                            target: {
                                                                                                name: 'id_sucursal',
                                                                                                value: sucursal.id
                                                                                            }
                                                                                        });
                                                                                        setSelectedSucursal(sucursal.nombre);
                                                                                        closeDropdownPopover(setDropdownSucursalShow);
                                                                                    }}
                                                                                    className="text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-white cursor-pointer"
                                                                                >
                                                                                    {sucursal.nombre}
                                                                                </a>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="w-full lg:w-6/12 px-4">
                                                                    <div className="relative w-full mb-3">
                                                                        <button
                                                                            className="text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 bg-lightBlue-500 active:bg-lightBlue-600 ease-linear transition-all duration-150"
                                                                            type="button"
                                                                            ref={btnMercaderistaRef}
                                                                            onClick={() => {
                                                                                dropdownMercaderistaShow
                                                                                    ? closeDropdownPopover(setDropdownMercaderistaShow)
                                                                                    : openDropdownPopover(btnMercaderistaRef, popoverMercaderistaRef, setDropdownMercaderistaShow);
                                                                            }}
                                                                        >
                                                                            {selectedMercaderista ? selectedMercaderista : 'Seleccione un Mercaderista'}
                                                                        </button>
                                                                        <div
                                                                            ref={popoverMercaderistaRef}
                                                                            className={
                                                                                (dropdownMercaderistaShow ? "block " : "hidden ") +
                                                                                "bg-lightBlue-500 text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mt-1 min-w-48"
                                                                            }
                                                                        >
                                                                            {mercaderistas.map(mercaderista => (
                                                                                <a
                                                                                    key={mercaderista.id}
                                                                                    onClick={() => {
                                                                                        handleChange({
                                                                                            target: {
                                                                                                name: 'id_mercaderista',
                                                                                                value: mercaderista.id
                                                                                            }
                                                                                        });
                                                                                        setSelectedMercaderista(`${mercaderista.nombre} ${mercaderista.apellido}`);
                                                                                        closeDropdownPopover(setDropdownMercaderistaShow);
                                                                                    }}
                                                                                    className="text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-white cursor-pointer"
                                                                                >
                                                                                    {mercaderista.nombre} {mercaderista.apellido}
                                                                                </a>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <MapaDominio location={location} onMapRightClick={handleMapRightClick} />

                                                            <div className="text-center mt-6">
                                                                <button type="submit" className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                                                                    Registrar
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
                );
            }}
        </OrdenTrabajoDominio>
    );
}

export default RegistrarOrdenTrabajoDemostracion;
