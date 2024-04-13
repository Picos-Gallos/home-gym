import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./Firebase";
import './Table.css';
import image1 from '../src/img/gym1.jpg';
import image2 from '../src/img/gym2.jpg';
import image3 from '../src/img/gym3.jpg';
import image4 from '../src/img/gym4.jpg';
import image5 from '../src/img/gym5.jpg';
import image6 from '../src/img/gym6.jpeg';
import image7 from '../src/img/gym7.jpg';

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
        flevel: [0, 1, 2, 3],
        goalVal: [0, 1, 2],
        timeAvail: [2, 3],
        gSize: [0, 1, 2],
        lat: -34.397,
        lng: 150.644,
        image: image1
    },
    {
        id: 2,
        name: "Private Home Gym with Personal Trainer Option",
        description: "Rent our private home gym complete with a personal trainer option. Perfect for individuals or small groups looking for personalized fitness sessions. Equipment includes weight machines, cardio machines, and a variety of workout accessories. Trainer available for an additional fee. Flexible rental options available.",
        price: { Daily: "$25 per day", WithTrainer: "Additional $30 per session" },
        amenities: ["Weight machines", "Cardio machines", "Workout accessories", "Personal trainer available", "Water station", "Towels", "Wi-Fi access"],
        host: "Jessica Taylor",
        email: "jtaylor@hotmail.com",
        flevel: [0, 1, 2],
        goalVal: [0, 1, 2],
        timeAvail: [0, 1],
        gSize: [0, 1, 2, 3],
        lat: -34.500,
        lng: 150.654,
        image: image2
    },
    {
        id: 3,
        name: "Luxury Home Gym with Spa Amenities",
        description: "Experience luxury fitness with our home gym rental featuring spa amenities. Enjoy access to a sauna, steam room, and massage chair in addition to state-of-the-art fitness equipment including Peloton bike, rowing machine, and free weights. Ideal for those seeking a premium workout experience. Rent by the hour or by the day. ",
        price: { Hourly: "$40", Daily: "$150" },
        amenities: ["Peloton bike", "Rowing machine", "Free weights", "Sauna", "Steam room", "Massage chair", "Towels", "Water station", "Wi-Fi access"],
        host: "David Lee",
        email: "dlee1@gmail.com",
        flevel: [0, 1, 2],
        goalVal: [0, 1, 2, 3],
        timeAvail: [0, 1, 2],
        gSize: [0, 1, 2],
        lat: -34.600,
        lng: 150.664,
        image: image3
    },
    {
        id: 4,
        name: "Private Garage Gym with Spa Amenities",
        description: "Experience luxury fitness with our home gym rental featuring spa amenities. Enjoy access to a sauna, steam room, and massage chair in addition to state-of-the-art fitness equipment including Peloton bike, rowing machine, and free weights. Ideal for those seeking a premium workout experience. Rent by the hour or by the day.",
        price: { Daily: "$50", Monthly: "$230" },
        amenities: ["Peloton bike", "Rowing machine", "Free weights", "Sauna", "Steam room", "Massage chair", "Towels", "Bathrobes", "Refreshments", "Wi-Fi access"],
        host: "Emily Wong",
        email: "emily.wong@att.net",
        flevel: [0, 1, 2],
        goalVal: [0, 1, 2, 3],
        timeAvail: [0, 1, 3],
        gSize: [0, 1, 2],
        lat: -34.390,  // Adjusted for proximity
        lng: 150.650,
        image: image4
    },
    {
        id: 5,
        name: "Family-Friendly Home Gym",
        description: "Rent our family-friendly home gym suitable for all ages and fitness levels. Equipment includes a variety of cardio machines, strength training equipment, and a designated area for kids to play while adults work out. Perfect for families looking to stay active together. Weekly and monthly rental options available.",
        price: { Daily: "$15", Weekly: "$35", Monthly: "$120" },
        amenities: ["Cardio machines", "Strength training equipment", "Kids' play area", "Family-friendly atmosphere", "Water fountain", "Towels", "Wi-Fi access"],
        host: "Alex Patel",
        email: "alxptl@gmail.com",
        flevel: [0, 1, 2],
        goalVal: [0, 1],
        timeAvail: [0, 1, 2],
        gSize: [1, 2],
        lat: -34.405,  // Adjusted for proximity
        lng: 150.655,
        image: image5
    },
    {
        id: 6,
        name: "Boutique Home Gym in Historic Neighborhood",
        description: "Discover our boutique home gym nestled in a charming historic neighborhood. Equipped with top-of-the-line cardio machines, weightlifting equipment, and a cozy yoga corner. Enjoy a unique workout experience away from crowded commercial gyms. Daily and weekly rentals offered with discounts for longer stays.",
        price: { Daily: "$30", Weekly: "$120" },
        amenities: ["Cardio machines", "Weightlifting equipment", "Yoga corner", "Ambient lighting", "Complimentary tea/coffee", "Towels", "Wi-Fi access"],
        host: "Ezmeralda Miller",
        email: "ezmiller14@yahoo.com",
        flevel: [0, 1, 2],
        goalVal: [0, 1, 2, 3],
        timeAvail: [0, 1, 2],
        gSize: [0, 2],
        lat: -34.392,  // Adjusted for proximity
        lng: 150.660,
        image: image6
    },
    {
        id: 7,
        name: "Outdoor Home Gym Rental with Scenic Views",
        description: "Take your workout outdoors with our home gym rental featuring stunning scenic views. Equipment includes outdoor cardio machines, free weights, and resistance bands. Enjoy the fresh air and natural surroundings while staying active. Perfect for nature lovers and outdoor enthusiasts. Hourly and daily rental options available.",
        price: { Hourly: "$20", Daily: "$70" },
        amenities: ["Outdoor cardio machines", "Free weights", "Resistance bands", "Picnic area", "Restrooms", "Drinking water fountain", "Wi-Fi access"],
        host: "Davinh Lee",
        email: "davlee42@mailbox.org",
        flevel: [0, 1],
        goalVal: [0, 1, 2],
        timeAvail: [0, 1, 2],
        gSize: [0, 1, 2, 3],
        lat: -34.400,  // Adjusted for proximity
        lng: 150.635,
        image: image7
    }
];

const Table = () => {
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [sortedLocations, setSortedLocations] = useState([]);

    useEffect(() => {
        const sortPriority = async () => {
            let values = [];
            try {
                const docSnap = await getDoc(doc(db, "users", auth.currentUser.uid));
                if (docSnap.exists()) {
                    values = docSnap.data().questions;
                    console.log("Document data:", values);
                    const sorted = locations.map(location => {
                        location.priority = 0;
                        location.flevel.forEach(flevel => {
                            if (values[0] === flevel) {
                                location.priority += 1;
                            }
                        });
                        location.goalVal.forEach(goalVal => {
                            if (values[1] === goalVal) {
                                location.priority += 1;
                            }
                        });
                        location.timeAvail.forEach(timeAvail => {
                            if (values[2] === timeAvail) {
                                location.priority += 1;
                            }
                        });
                        location.gSize.forEach(gSize => {
                            if (values[3] === gSize) {
                                location.priority += 1;
                            }
                        });
                        return location;
                    }).sort((a, b) => b.priority - a.priority);
                    console.log(sorted);
                    setSortedLocations(sorted);
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error getting document:", error);
            }
        };
        sortPriority();
    }, []);

    const handleSelectLocation = (location) => {
        setSelectedLocation(location);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'row', height: '100vh', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '300px', overflowY: 'auto', padding: '10px' }}>
                <h1 style={{ fontSize: '20px', fontFamily: 'Frutiger Linotype', fontWeight: 'normal', marginBottom: '15px', marginLeft: '15px' }}>For you Page</h1>
                <table style={{ width: '100%' }}>
                    <tbody>
                    {sortedLocations.map((location, index) => (
                        <tr key={location.id}>
                            <td style={{padding: '8px', border: '1px solid #ccc', cursor: 'pointer'}}
                                onClick={() => handleSelectLocation(location)}>
                                {location.name}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div style={{
                flex: 2,
                minWidth: '300px',
                padding: '10px',
                borderLeft: '1px solid #ccc',
                borderRight: '1px solid #ccc' }}>
            {selectedLocation ? (
                <div>
                    <h2>{selectedLocation.name}</h2>
                    <img  src={selectedLocation.image} alt={selectedLocation.name} style={{ width: '500px', height: '500px', marginLeft: '10px', marginRight: '10px' }}/>
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
                        {sortedLocations.map(loc => (
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
