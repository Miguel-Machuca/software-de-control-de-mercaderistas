import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import {AuthProvider} from "../context/AuthContext";
import LoginDemostracion from "../demostracion/LoginDemostracion";
import RegistrarClienteDemostracion from '../demostracion/RegistrarClienteDemostracion';
import Panel from 'demostracion/Panel';
import ClienteDemostracion from 'demostracion/ClienteDemostracion';
import MercaderistaDemostracion from 'demostracion/MercaderistaDemostracion';
import OrdenTrabajoDemostracion from 'demostracion/OrdenTrabajoDemostracion';
import RegistrarMercaderistaDemostracion from 'demostracion/RegistrarMercaderistaDemostracion';
import RegistrarOrdenTrabajoDemostracion from 'demostracion/RegistrarOrdenTrabajoDemostracion';
import GenerarQrDemostracion from 'demostracion/GenerarQrDemostracion';
import LectorQrDemostracion from 'demostracion/LectorQrDemostracion';
import RegistrarSucursalDemostracion from 'demostracion/RegistrarSucursalDemostracion';
import SucursalDemostracion from 'demostracion/SucursalDemostracion';
import MercaderistaOrdenDemostracion from 'demostracion/MercaderistaOrdenDemostracion';
import MapaDemostracion from 'demostracion/MapaDemostracion';
import ActualizarClienteDemostracion from 'demostracion/ActualizarClienteDemostracion';
import ActualizarMercaderistaDemostracion from 'demostracion/ActualizarMercaderistaDemostracion';
import ActualizarOrdenTrabajoDemostracion from 'demostracion/ActualizarOrdenTrabajoDemostracion';
import ActualizarSucursalDemostracion from 'demostracion/ActualizarSucursalDemostracion';
import VerOrdenTrabajoDemostracion from 'demostracion/VerOrdenTrabajoDemostracion';
import VisualizarDemostracion from 'demostracion/VisualizarDemostracion';
import RegistrarMapaOrden from 'demostracion/RegistrarMapaOrden';
import VerificarImagen from 'demostracion/VerificarImagen';

function router() {
    return (
        <BrowserRouter>        
            <AuthProvider>
                <Routes>
                    <Route path={'/'} element={<LoginDemostracion />} />
                    <Route path={'/panel'} element={<Panel />} />
                    
                    <Route path={'/cliente'} element={<ClienteDemostracion />} />                    
                    <Route path={'/mercaderista'} element={<MercaderistaDemostracion />} />                    
                    <Route path={'/ordenTrabajo'} element={<OrdenTrabajoDemostracion />} />                    
                    <Route path={'/sucursal'} element={<SucursalDemostracion />} />  

                    <Route path={'/registrarCliente'} element={<RegistrarClienteDemostracion />} />
                    <Route path={'/registrarMercaderista'} element={<RegistrarMercaderistaDemostracion />} />
                    <Route path={'/registrarOrdenTrabajo'} element={<RegistrarOrdenTrabajoDemostracion />} />
                    <Route path={'/registrarSucursal'} element={<RegistrarSucursalDemostracion />} />

                    <Route path={'actualizarCliente/:id'} element={<ActualizarClienteDemostracion />} />
                    <Route path={'actualizarMercaderista/:id'} element={<ActualizarMercaderistaDemostracion />} />
                    <Route path={'actualizarOrdenTrabajo/:id'} element={<ActualizarOrdenTrabajoDemostracion />} />
                    <Route path={'actualizarSucursal/:id'} element={<ActualizarSucursalDemostracion />} />
                                        
                    <Route path={'generarQr/:id'} element={<GenerarQrDemostracion />}></Route>            
                    <Route path={'/lectorQr'} element={<LectorQrDemostracion />}></Route>
                    <Route path={'mercaderistaOrden/:id'} element={<MercaderistaOrdenDemostracion />}></Route>
                    <Route path={'mapa/:id'} element={<MapaDemostracion />}></Route>   
                    <Route path={'verOrdenTrabajo/:id'} element={<VerOrdenTrabajoDemostracion />}></Route> 
                    <Route path={'/visualizar'} element={<VisualizarDemostracion/>}></Route>
                    <Route path={'/registrarMapa'} element={<RegistrarMapaOrden />}></Route>
                    <Route path={'verificarImagen/:id'} element={<VerificarImagen />}></Route>
                </Routes>
            </AuthProvider>                
        </BrowserRouter>
    );
}

export default router;

