import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const Map = ({ lat, lng }: { lat: number; lng: number }) => {
  return (
    <MapContainer
      center={[lat, lng]}
      zoom={18}
      scrollWheelZoom={false}
      id="map"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.mapbox.com/">Mapbox</a>'
        url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWxleGNydWR1IiwiYSI6ImNsZjRjZGpyMjExNTgzeXBuMTd2OW9zNjEifQ.rP9R5wB2JsMd8c-zRiPTNw`}
      />
      <Marker position={[lat, lng]}>
        <Popup>CSS popup</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
