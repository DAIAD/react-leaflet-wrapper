import React from 'react';
import { Map, InfoControl, TileLayer, Marker } from '../../../src/';

export default class Example1 extends React.Component {

  constructor (props) {
    super(props);
    
  }

  render() {
    return ( 
      <Map
        width='100%'
        height={400}
        center={[51.505, -0.09]}
        zoom={13}
        >
        <TileLayer
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker
          latlng={[51.5, -0.09]}
          popupContent={feature => <span>A pretty CSS3 popup.<br /> Easily customizable.</span>}
        />
    </Map>
    );
  }
}
