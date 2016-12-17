import React from 'react';
import fetch from 'isomorphic-fetch';
import { Map, TileLayer, Choropleth, InfoControl } from '../../../src/';

const STATES_URL = 'dist/states.json';

export default class Example3 extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      states: null
    };
  }

  componentWillMount () {
    fetch(STATES_URL)
    .then(response => response.json())
    .then(geojson =>  this.setState({ states: geojson }));
  }

  render() {
    const { states } = this.state;
    return (
      <div>
        <h1>Leaflet choropleth example</h1>
        <Map
          width='100%'
          height={600}
          center={[37.8, -96]}
          zoom={4}
          >
          <TileLayer />
          <InfoControl position='topright'> 
            <Choropleth
              data={states}
              legend='bottomright'
              legendClass='info legend'
              valueProperty='density'
              steps={8}
              buckets={[0, 10, 20, 50, 100, 200, 500, 1000, 'inf']}
              colors={['#FFEDA0', '#FED976', '#FEB24C', '#FD8D3C', '#FC4E2A', '#E31A1C', '#BD0026', '#800026']}
              infoContent={feature => InfoContent(feature)}
              onClick={(feature, layer, map) => map.fitBounds(layer.getBounds()) }
              style={{
                weight: 2,
                opacity: 1,
                color: 'white',
                dashArray: 3,
                fillOpacity: 0.7
              }}
              highlightStyle={{ 
                weight: 5, 
                color: '#666', 
                dashArray: '', 
                fillOpacity: 0.7  
              }}
            />
          </InfoControl>
        </Map>
       
      </div>
    );
  }
}

function InfoContent (feature) {
  return (
    <div>
      <h4>US Population Density</h4>
      { 
        feature ? 
          <div>
            <b>{feature.properties.name}</b>
            <br />
            {feature.properties.density} people / mi<sup>2</sup>
          </div>
            : 
              <span>Hover over a state...</span>
       }
     </div>
  );
}

