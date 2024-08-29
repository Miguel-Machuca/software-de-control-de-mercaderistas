import React, { useEffect, useState } from 'react';

const MapComponent = ({ lat, lng, locations }) => {
  const apiKey = 'AIzaSyAOjAyef-RDqvg1kmLyX5RnmQM4PdcZHqw'; // Reemplaza con tu propia API Key de Google Maps
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);

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
      center: { lat: lat || locations[0].lat, lng: lng || locations[0].lng },
      zoom: 12
    });

    setMap(mapInstance);

    // Añadir marcadores dependiendo de si se pasa una ubicación única o múltiples ubicaciones
    if (lat && lng) {
      addMarker({ lat, lng }, mapInstance, 'Ubicación');
    } else if (locations && locations.length > 0) {
      locations.forEach((location, index) => {
        addMarker(location, mapInstance, `Marcador ${index + 1}`);
      });
    }
  };

  // Función para agregar un marcador en la ubicación especificada
  const addMarker = (location, mapInstance, title) => {
    const marker = new window.google.maps.Marker({
      position: location,
      map: mapInstance,
      title: title,
      icon: {
        url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
      }
    });

    setMarkers((prevMarkers) => [...prevMarkers, marker]);
  };

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <div id="map" style={{ height: '100%' }}></div>
    </div>
  );
};

export default MapComponent;
