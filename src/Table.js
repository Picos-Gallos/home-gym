import React, {useEffect, useState} from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import './Table.css'; // Make sure to import the CSS file

const containerStyle = {
    width: '100%',
    height: '100%'
};

const locations = [
    {
        id: 1,
        name: "Fully Equipped Home Gym in Modern Condo",
        description: "Rent access to our fully equipped home gym located in a modern condo building. Includes treadmill, elliptical machine, free weights, yoga mats, and more. Available for daily, weekly, or monthly rentals. Conveniently located near downtown with easy access to public transportation.",
        price: { Daily: "$15", Weekly: "$35", Monthly: "$70" },
        amenities: ["Treadmill", "Elliptical machine", "Free weights", "Yoga mats", "Water dispenser", "Towels", "Wi-Fi access", "Changing room and showers"],
        host: "Matthew Thompson",
        email: "matt.thompson25@gmail.com",
        flevel: ["0","1", "2", "3"],
        goalVal: ["0", "1", "2"],
        timeAvail: ["2", "3"],
        gSize: ["0", "1", "2"],
        lat: -34.397,
        lng: 150.644
    },
    {
        id: 2,
        name: "Private Home Gym with Personal Trainer Option",
        description: "Rent our private home gym complete with a personal trainer option. Perfect for individuals or small groups looking for personalized fitness sessions. Equipment includes weight machines, cardio machines, and a variety of workout accessories. Trainer available for an additional fee. Flexible rental options available.",
        price: { Daily: "$25 per day", WithTrainer: "Additional $30 per session" },
        amenities: ["Weight machines", "Cardio machines", "Workout accessories", "Personal trainer available", "Water station", "Towels", "Wi-Fi access"],
        host: "Jessica Taylor",
        email: "jtaylor@hotmail.com",
        flevel: ["0","1", "2"],
        goalVal: ["0", "1", "2"],
        timeAvail: ["0", "1"],
        gSize: ["0", "1", "2", "3"],
        lat: -34.500,
        lng: 150.654
    },
    {
        id: 3,
        name: "Luxury Home Gym with Spa Amenities",
        description: "Experience luxury fitness with our home gym rental featuring spa amenities. Enjoy access to a sauna, steam room, and massage chair in addition to state-of-the-art fitness equipment including Peloton bike, rowing machine, and free weights. Ideal for those seeking a premium workout experience. Rent by the hour or by the day. ",
        price: { Hourly: "$40", Daily: "$150" },
        amenities: ["Peloton bike", "Rowing machine", "Free weights", "Sauna", "Steam room", "Massage chair", "Towels", "Water station", "Wi-Fi access"],
        host: "David Lee",
        email: "dlee1@gmail.com",
        flevel: ["0", "1", "2"],
        goalVal: ["0", "1", "2", "3"],
        timeAvail: ["0", "1", "2"],
        gSize: ["0", "1", "2"],
        lat: -34.600,
        lng: 150.664
    },
    {
        id: 4,
        name: "Private Garage Gym with Spa Amenities",
        description: "Experience luxury fitness with our home gym rental featuring spa amenities. Enjoy access to a sauna, steam room, and massage chair in addition to state-of-the-art fitness equipment including Peloton bike, rowing machine, and free weights. Ideal for those seeking a premium workout experience. Rent by the hour or by the day.",
        price: { Daily: "$50", Monthly: "$230" },
        amenities: ["Peloton bike", "Rowing machine", "Free weights", "Sauna", "Steam room", "Massage chair", "Towels", "Bathrobes", "Refreshments", "Wi-Fi access"],
        host: "Emily Wong",
        email: "emily.wong@att.net",
        flevel: ["0", "1", "2"],
        goalVal: ["0", "1", "2", "3"],
        timeAvail: ["0", "1", "3"],
        gSize: ["0", "1", "2"],
        lat: -34.390,  // Adjusted for proximity
        lng: 150.650
    },
    {
        id: 5,
        name: "Family-Friendly Home Gym",
        description: "Rent our family-friendly home gym suitable for all ages and fitness levels. Equipment includes a variety of cardio machines, strength training equipment, and a designated area for kids to play while adults work out. Perfect for families looking to stay active together. Weekly and monthly rental options available.",
        price: { Daily: "$15", Weekly: "$35", Monthly: "$120" },
        amenities: ["Cardio machines", "Strength training equipment", "Kids' play area", "Family-friendly atmosphere", "Water fountain", "Towels", "Wi-Fi access"],
        host: "Alex Patel",
        email: "alxptl@gmail.com",
        flevel: ["0", "1", "2"],
        goalVal: ["0", "1"],
        timeAvail: ["0", "1", "2"],
        gSize: ["1", "2"],
        lat: -34.405,  // Adjusted for proximity
        lng: 150.655
    },
    {
        id: 6,
        name: "Boutique Home Gym in Historic Neighborhood",
        description: "Discover our boutique home gym nestled in a charming historic neighborhood. Equipped with top-of-the-line cardio machines, weightlifting equipment, and a cozy yoga corner. Enjoy a unique workout experience away from crowded commercial gyms. Daily and weekly rentals offered with discounts for longer stays.",
        price: { Daily: "$30", Weekly: "$120" },
        amenities: ["Cardio machines", "Weightlifting equipment", "Yoga corner", "Ambient lighting", "Complimentary tea/coffee", "Towels", "Wi-Fi access"],
        host: "Ezmeralda Miller",
        email: "ezmiller14@yahoo.com",
        flevel: ["0", "1", "2"],
        goalVal: ["0", "1", "2", "3"],
        timeAvail: ["0", "1", "2"],
        gSize: ["0", "2"],
        lat: -34.392,  // Adjusted for proximity
        lng: 150.660
    },
    {
        id: 7,
        name: "Outdoor Home Gym Rental with Scenic Views",
        description: "Take your workout outdoors with our home gym rental featuring stunning scenic views. Equipment includes outdoor cardio machines, free weights, and resistance bands. Enjoy the fresh air and natural surroundings while staying active. Perfect for nature lovers and outdoor enthusiasts. Hourly and daily rental options available.",
        price: { Hourly: "$20", Daily: "$70" },
        amenities: ["Outdoor cardio machines", "Free weights", "Resistance bands", "Picnic area", "Restrooms", "Drinking water fountain", "Wi-Fi access"],
        host: "Davinh Lee",
        email: "davlee42@mailbox.org",
        flevel: ["0", "1"],
        goalVal: ["0", "1", "2"],
        timeAvail: ["0", "1", "2"],
        gSize: ["0", "1", "2", "3"],
        lat: -34.400,  // Adjusted for proximity
        lng: 150.635
    }
];


const Table = () => {
    const [selectedLocation, setSelectedLocation] = useState(null);

    // Add the class when the component mounts and remove when it unmounts
    useEffect(() => {
        document.body.classList.add('body-with-table');

        // Cleanup function to remove the class when the component unmounts
        return () => {
            document.body.classList.remove('body-with-table');
        };
    }, []);

    const handleSelectLocation = (location) => {
        setSelectedLocation(location);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'row', height: '100vh', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '300px', overflowY: 'auto', padding: '10px' }}>
                <h1 style={{ fontSize: '20px', fontFamily: 'Frutiger Linotype', fontWeight: 'normal', marginBottom: '15px', marginLeft: '15px' }}>Home Gym Rentals</h1>
                <table style={{ width: '100%' }}>
                    <tbody>
                    {locations.map(location => (
                        <div key={location.id} className="listing-card" onClick={() => handleSelectLocation(location)}>
                            <h3>{location.name}</h3>
                            <img src={location.image} alt={location.name} />
                        </div>
                    ))}
                    </tbody>
                </table>
            </div>
            <div style={{ flex: 2, minWidth: '300px', padding: '10px', borderLeft: '1px solid #ccc', borderRight: '1px solid #ccc' }}>
            {selectedLocation ? (
                <div>
                    <h2>{selectedLocation.name}</h2>
                    <img src={selectedLocation.image} alt={selectedLocation.name} />
                    <div className="detail-section">
                        <p><strong>Description:</strong> {selectedLocation.description}</p>
                    </div>
                    <div className="detail-section">
                        <p><strong>Price:</strong> {Object.entries(selectedLocation.price).map(([key, value]) => <div key={key}>{key}: {value}</div>)}</p>
                    </div>
                    <div className="detail-section">
                        <p><strong>Amenities:</strong> {selectedLocation.amenities.join(", ")}</p>
                    </div>
                    <div className="detail-section">
                        <p><strong>Host:</strong> {selectedLocation.host}</p>
                        <p><strong>Email:</strong> {selectedLocation.email}</p>
                    </div>
                </div>
            ) : (
                <p>Select a location to see details</p>
            )}
        </div>

            <div style={{ flex: 2, minWidth: '300px', height: '100%' }}>
                <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={selectedLocation ? { lat: selectedLocation.lat, lng: selectedLocation.lng } : { lat: -34.397, lng: 150.644 }}
                        zoom={selectedLocation ? 15 : 10}
                    >
                        {locations.map(loc => (
                            <Marker
                                key={loc.id}
                                position={{ lat: loc.lat, lng: loc.lng }}
                                onClick={() => handleSelectLocation(loc)}
                            />
                        ))}
                    </GoogleMap>
                </LoadScript>
            </div>
        </div>
    );
};

export default Table;