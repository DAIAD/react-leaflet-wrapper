import React from 'react';
import L from 'leaflet';
import 'leaflet-draw';

import GeoJSON from './GeoJSON';
import ControlHandlers from './handlers/';

class DrawControl  extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: this.props.data,
      geojson: null
    };
  }

  componentWillMount() {
    this.props.map.on('draw:created', this.createHandler.bind(this));
    this.props.map.on('draw:edited', this.editHandler.bind(this));
    this.props.map.on('draw:deleted', this.deleteHandler.bind(this));
  }
  
  componentWillUpdate(nextProps, nextState) {
    if (nextState.geojson && !this.state.geojson) {
      this.control = new L.Control.Draw({
        position: this.props.position,
        edit: {
          featureGroup: nextState.geojson,
          ...this.getEditOptions() 
        },
        draw: this.getDrawOptions()
      });
      this.control.addTo(this.props.map);
    }
  }

  componentWillUnmount() {
    this.control.remove();
    
    this.props.map.off('draw:created');
    this.props.map.off('draw:edited');
    this.props.map.off('draw:deleted');
  }

  getDrawOptions() {
    return {
      polyline: false,
      rectangle: {
        shapeOptions: {
          ...this.props.style
        }
      },
      circle: false,
      marker: false,
      polygon: {
        allowIntersection: false,
        showArea: true,
        shapeOptions: {
          ...this.props.style
        }
      },
    };
  }

  getEditOptions() {
    return {
      edit: true,
      remove: true,
      ...this.props.edit
    };
  }

  createHandler(e) {
    const layer = {
      type: 'FeatureCollection',
      features: [e.layer.toGeoJSON()]
    };
    this.updateData(layer);
  }

  editHandler(e) {
    const layer = e.layers.toGeoJSON();
    this.updateData(layer);
  }

  deleteHandler(e) {
    this.updateData(null);
  }

  updateData(data) {
    if (!this.props.controlled) {
      this.setState({ data });
    }

    if(typeof this.props.onFeatureChange === 'function') {
      this.props.onFeatureChange(data);
    }
  }

  render() {
    return (
      <GeoJSON
        ref={geojson => { 
          if (geojson && !this.state.geojson) { 
            this.setState({ geojson: geojson.layer}); 
          }
        }}
        {...this.props}
        data={this.props.controlled ? this.props.data : this.state.data}
      />
    );
  }
}

DrawControl.defaultProps = {
  position: 'topleft',
  data: null,
  edit: {},
  draw: {},
  style: {
    color: '#2c3e50',
    fillColor: '#2980b9'
  },
  controlled: false
};

module.exports = DrawControl;
