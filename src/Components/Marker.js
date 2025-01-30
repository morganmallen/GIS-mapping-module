import { Marker, InfoWindow } from "@react-google-maps/api";
import { useState } from "react";

const MarkerComponent = ({ marker }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
    {/* Sets the markers at the latitude and longitude. Also Opens the popup when clicked */}
      <Marker
        position={{ lat: marker.lat, lng: marker.lng }}
        onClick={() => setIsOpen(true)}
      />
      {isOpen && (
        <InfoWindow
          position={{ lat: marker.lat, lng: marker.lng }}
          // closes the popup
          onCloseClick={() => setIsOpen(false)}
        >
          <div>
            {/* displays info  */}
            <h2>{marker.name}</h2>
            <p>{marker.description}</p>
          </div>
        </InfoWindow>
      )}
    </>
  );
};

export default MarkerComponent;
