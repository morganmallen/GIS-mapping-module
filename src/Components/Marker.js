import { Marker, InfoWindow } from "@react-google-maps/api";
import { useState } from "react";

const MarkerComponent = ({ marker }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Marker
        position={{ lat: marker.lat, lng: marker.lng }}
        onClick={() => setIsOpen(true)}
      />
      {isOpen && (
        <InfoWindow
          position={{ lat: marker.lat, lng: marker.lng }}
          onCloseClick={() => setIsOpen(false)}
        >
          <div>
            <h2>{marker.name}</h2>
            <p>{marker.description}</p>
          </div>
        </InfoWindow>
      )}
    </>
  );
};

export default MarkerComponent;
