import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
    width: '400px',
    height: '400px'
};

const center = {
    lat: -34.397,
    lng: 150.644
};

const locations = [
    { id: 1, name: "John Doe", equipment: ["Peleton", "Smith Machine"], lat: -34.397, lng: 150.644, email: 'john@example.com'},
    { id: 2, name: "Jane Smith", equipment: ["Treadmill"], lat: -34.500, lng: 150.644, email: 'jane@example.com'},
    // Add more locations as needed
];

const Table = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
                <h1>Home Gym Equipment Owners</h1>
                <ul>
                    {locations.map(location => (
                        <li key={location.id}>
                            {location.name} - {location.equipment.join(", ")}
                        </li>
                    ))}
                </ul>
            </div>
            <LoadScript
                googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={10}
                >
                    {locations.map(loc => (
                        <Marker key={loc.id} position={{ lat: loc.lat, lng: loc.lng }} />
                    ))}
                </GoogleMap>
            </LoadScript>
        </div>
    );
};

export default Table;