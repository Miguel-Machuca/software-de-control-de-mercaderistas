import React, { useState } from 'react';
import MapaDominio from 'dominio/MapaDominio';

function RegistrarMapaOrden(props) {
    const [location, setLocation] = useState(null);
    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);

    const handleMapRightClick = (position) => {
        setLocation(position);
        setLat(position.lat);
        setLng(position.lng);
    };

    return (
        <div>
            
            <MapaDominio location={location} onMapRightClick={handleMapRightClick} />
            <div>
                <p>Latitud: {lat}</p>
                <p>Longitud: {lng}</p>
            </div>
        </div>
    );
}

export default RegistrarMapaOrden;
