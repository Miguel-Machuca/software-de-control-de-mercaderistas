import React, { useEffect, useState } from 'react';

function MapaDominio({ location, onMapRightClick }) {
    const apiKey = 'AIzaSyAOjAyef-RDqvg1kmLyX5RnmQM4PdcZHqw'; // Reemplaza con tu propia API Key
    const [map, setMap] = useState(null);
    const [marker, setMarker] = useState(null);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
        script.async = true;
        script.defer = true;
        script.onload = () => {
            initMap(); // Llamada a la función initMap() cuando el script se carga
        };

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script); // Limpieza del script al desmontar el componente
        };
    }, [apiKey]);

    // Función initMap() que se llama cuando el script de Google Maps se carga
    const initMap = () => {
        const mapInstance = new window.google.maps.Map(document.getElementById('map'), {
            center: { lat: -17.78056270215515, lng: -63.17976450447126 },
            zoom: 14
        });

        setMap(mapInstance);

        // Agregar evento de clic derecho en el mapa
        mapInstance.addListener('rightclick', (event) => {
            const position = { lat: event.latLng.lat(), lng: event.latLng.lng() };
            addMarker(position, mapInstance);
            if (onMapRightClick) {
                onMapRightClick(position);
            }
        });

        // Agregar marcador si location está definido
        if (location) {
            addMarker(location, mapInstance);
        }
    };

    // Función para agregar un marcador en el mapa
    const addMarker = (position, mapInstance) => {
        // Eliminar marcador existente
        if (marker) {
            marker.setMap(null);
        }

        // Agregar nuevo marcador
        const newMarker = new window.google.maps.Marker({
            position,
            map: mapInstance,
            label: {
                text: 'Orden de Trabajo',
                color: 'white'
            },
            icon: {
                url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
            }
        });

        setMarker(newMarker);
    };

    return (
        <div style={{ height: '400px', width: '100%' }}>
            <div id="map" style={{ height: '100%' }}></div>
        </div>
    );
}

export default MapaDominio;