import React from 'react';
import { Map, TileLayer, LayerGroup, Marker, LayersControl } from '../../../src/';

export default class Example4 extends React.Component {

  constructor (props) {
    super(props);
  }


  render() {
    const mbAttr = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
          '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
          'Imagery © <a href="http://mapbox.com">Mapbox</a';

    const mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoic3RlbGlvc21hbiIsImEiOiJjajJyc29qc2cwMDEwMndwYm43b3Q2a3RkIn0.Oq2yDGwP5mBx-7S9Td_e2w';
    return (
      <Map
        width='100%'
        height={400}
        center={[39.73, -104.99]}
        zoom={10}
        >
        <LayersControl position='topright'>
          <TileLayer
            name='Streets'
            url={mbUrl}
            attribution={mbAttr}
            id='mapbox.streets'
          />
          <TileLayer
            name='Grayscale'
            url={mbUrl}
            attribution={mbAttr}
            id='mapbox.light'
          />
          <LayerGroup
            name='Cities'
            >
            <Marker
              latlng={[39.61, -105.02]}
              popupContent={feature => <span>This is Littleton, CO.</span>}
            />
            <Marker
              latlng={[39.74, -104.99]}
              popupContent={feature => <span>This is Denver, CO.</span>}
            />
            <Marker
              latlng={[39.73, -104.8]}
              popupContent={feature => <span>This is Aurora, CO.</span>}
            />
            <Marker
              latlng={[39.77, -105.23]}
              popupContent={feature => <span>This is Golden, CO.</span>}
            />
          </LayerGroup>
        </LayersControl>
      </Map>
    );
  }
}

