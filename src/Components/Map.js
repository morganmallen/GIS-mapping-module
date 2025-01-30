import React, { useState } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  LoadScript,
} from "@react-google-maps/api";
import parks from "../parks.json";
import './main.css';

//determines how big the map is
const containerStyle = {
  width: "100%",
  height: "600px",
};

//determines where the map opens to
const center = {
  lat: 39.8283,
  lng: -98.5795, 
};

const GOOGLE_MAPS_API_KEY = "AIzaSyClCQxuyfNKM8BHG7pZmzUlpBhJmeOqc04";

const MapComponent = () => {
  const [selectedPark, setSelectedPark] = useState(null);
  const [selectedState, setSelectedState] = useState("All");

  //populates the dropdown with the states
  const states = ["All", ...new Set(parks.map((park) => park.state))];

  //filter function
  const filteredParks =
    selectedState === "All"
      ? parks
      : parks.filter((park) => park.state === selectedState);

  return (
    //what is seen on screen
    <>
      <header className="header">
        <h1 className="">GIS Mapping Module</h1>
      </header>

      {/* loads the map into the app */}
      <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
        <div style={{ marginBottom: "10px", textAlign: "center" }}>
          {/* dropdown filter */}
          <label htmlFor="stateFilter">Filter by State: </label>
          <select
            id="stateFilter"
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
          >
            {/* maps all of the states from the parks.json */}
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

            {/* GoogleMap is the component that holds the map. The properties passed into it determine the zoom, center, and size of the map */}
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={4}>
          {/* set the markers */}
          {filteredParks.map((park) => (
            <Marker
              key={park.id}
              position={{ lat: park.lat, lng: park.lng }}
              onClick={() => setSelectedPark(park)}
            />
          ))}

          {selectedPark && (
            // InfoWindow is the popup that displays when a marker is selected
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
