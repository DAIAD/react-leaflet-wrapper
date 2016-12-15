import React from 'react';
import { Map, TileLayer, DrawControl } from '../../../src/';

export class Example5 extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      geometry: JSON.parse('{"type":"FeatureCollection","features":[{"type":"Feature","properties":{},"geometry":{"type":"Polygon","coordinates":[[[-105.45823574066164,39.62929193911971],[-105.45823574066164,39.94902962057473],[-105.02976894378664,39.94902962057473],[-105.02976894378664,39.62929193911971],[-105.45823574066164,39.62929193911971]]]}}]}'),
    };
  }


  render() {
    const { geometry } = this.state;
    return (
      <div>
        <h1>Leaflet draw control</h1>

        <button style={{ float: 'right', marginBottom: 20 }} onClick={() => { this.setState({ geometry: null }); }}>Reset geometry</button>
        <Map
          width='100%'
          height={600}
          center={[39.73, -104.99]}
          zoom={10}
          >
          <TileLayer />

          <DrawControl
            onFeatureChange={features => this.setState({ geometry: features })}
            data={geometry}
          />

        </Map>
       
      </div>
    );
  }
}

