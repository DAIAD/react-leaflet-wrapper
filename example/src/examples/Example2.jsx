import React from 'react';
import { Map, TileLayer, GeoJSON } from '../../../src/';
import L from 'leaflet';

import GEOJSON from '../geojson';

export default class Example2 extends React.Component {

  constructor (props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Leaflet GeoJSON example</h1>

         <Map
           width='100%'
           height={400}
           center={[39.74739, -105]}
           zoom={13}
           >
           <TileLayer
             url='https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoic3RlbGlvc21hbiIsImEiOiJjajJyc29qc2cwMDEwMndwYm43b3Q2a3RkIn0.Oq2yDGwP5mBx-7S9Td_e2w'
             attribution='Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>'
             id='mapbox.light'
           />
           <GeoJSON
             data={[GEOJSON.bicycleRental, GEOJSON.campus]}
             style={feature => feature.properties && feature.properties.style}
             popupContent={popupContent}
             circleMarkers
             markerStyle={{
              radius: 8,
              fillColor: "#ff7800",
              color: "#000",
              weight: 1,
              opacity: 1,
              fillOpacity: 0.8
            }}
           />

           <GeoJSON
             data={GEOJSON.freeBus}
             popupContent={popupContent}
             filter={(feature, layer) => 
               feature.properties && feature.properties.underConstruction != null ? !feature.properties.underConstruction : false
             }
           />

           <GeoJSON
             data={GEOJSON.coorsField}
             popupContent={popupContent}
             markerOptions={{ 
               icon: L.icon({
                 iconUrl: 'dist/baseball-marker.png',
                 iconSize: [32, 37],
                 iconAnchor: [16, 37],
                 popupAnchor: [0, -28]
               }) 
             }}
           />
         </Map>
          
      </div>
    );
  }
}

function popupContent (feature, layer) {
  return <span>
    <p>
      {`I started out as a GeoJSON ${feature.geometry.type}, but now I'm a Leaflet vector!`}
    </p>
    <p>
      { feature.properties.popupContent }
    </p>
  </span>;
}
