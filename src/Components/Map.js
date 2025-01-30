import React, { useState } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  LoadScript,
} from "@react-google-maps/api";
import parks from "../parks.json";
import './main.css';

const containerStyle = {
  width: "100%",
  height: "600px",
};

const center = {
  lat: 39.8283,
  lng: -98.5795, 
};

const GOOGLE_MAPS_API_KEY = "AIzaSyClCQxuyfNKM8BHG7pZmzUlpBhJmeOqc04";

const MapComponent = () => {
  const [selectedPark, setSelectedPark] = useState(null);
  const [selectedState, setSelectedState] = useState("All");

  const states = ["All", ...new Set(parks.map((park) => park.state))];

  const filteredParks =
    selectedState === "All"
      ? parks
      : parks.filter((park) => park.state === selectedState);

  return (
    <>
      <header className="header">
        <h1 className="">GIS Mapping Module</h1>
      </header>

      <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
        <div style={{ marginBottom: "10px", textAlign: "center" }}>
          <label htmlFor="stateFilter">Filter by State: </label>
          <select
            id="stateFilter"
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
          >
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={4}>
          {filteredParks.map((park) => (
            <Marker
              key={park.id}
              position={{ lat: park.lat, lng: park.lng }}
              onClick={() => setSelectedPark(park)}
            />
          ))}

          {selectedPark && (
            <InfoWindow
              position={{ lat: selectedPark.lat, lng: selectedPark.lng }}
              onCloseClick={() => setSelectedPark(null)}
            >
              <div>
                <h3>{selectedPark.name}</h3>
                <p>{selectedPark.description}</p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
      <footer className="footer">
        <p> Morgan Allen</p>
      </footer>
    </>
  );
};

export default MapComponent;

//AIzaSyClCQxuyfNKM8BHG7pZmzUlpBhJmeOqc04
