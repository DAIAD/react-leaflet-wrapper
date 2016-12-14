# react-leaflet-wrapper

React components that wrap Leaflet js v.1.0.0 (http://leafletjs.com) elements. <br><br>

## Installation
    npm install --save https://github.com/DAIAD/react-leaflet-wrapper.git

## Usage

 The following React components are provided that wrap the respective leaflet elements.

| Leaflet element | Type | Documentation |
| -------- | ---- | ----------- |
| Map | Map | http://leafletjs.com/reference-1.0.0.html#map |
| Tile | Layer | http://leafletjs.com/reference-1.0.0.html#tilelayer |
| GeoJSON | Layer | http://leafletjs.com/reference-1.0.0.html#geojson |
| Choropleth | Layer | - |
| Heat | Layer | https://github.com/Leaflet/Leaflet.heat | 
| Marker | Layer | http://leafletjs.com/reference-1.0.0.html#marker | 
| LayerGroup | Layer | http://leafletjs.com/reference-1.0.0.html#layergroup |   
| DrawControl | Control | https://leaflet.github.io/Leaflet.draw/docs/leaflet-draw-latest.html |
| InfoControl | Control | http://leafletjs.com/reference-1.0.0.html#control |
| LayersControl | Control | http://leafletjs.com/reference-1.0.0.html#control-layers |

### Indicative components type hierarchy 

    <Map>
      <Layer1 />
      <Control1>
        <Layer2 />
        <Layer3 />
      </Control1>
      <Control2 />
    </Map>

## Example

A quick-start example is shown here

    import { Map, TileLayer, Marker } from 'react-leaflet-wrapper';
    
    <Map
      style={{ width: '100%', height: 300 }}
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


For more examples: 
    
    NODE_HOST=localhost NODE_PORT=3000 npm run example

Requires node >= 4.3.2
