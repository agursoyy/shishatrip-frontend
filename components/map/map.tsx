import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './map.scss';
import { FC } from 'react';

import L from 'leaflet';

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

interface IProps {
  location: Array<number>;
  locationName: string;
  locationAddress: string;
}
const Map: FC<IProps> = ({ location, locationAddress, locationName }) => {
  return (
    <MapContainer
      center={location as any}
      zoom={13}
      scrollWheelZoom={false}
      className="map-container"
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={location as any}>
        <Popup>
          <div className="location-name">{locationName}</div>
          <div className="location-address">{locationAddress}</div>
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
