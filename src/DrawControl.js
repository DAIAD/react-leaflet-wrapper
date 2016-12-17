var React = require('react');
var L = require('leaflet');
require('leaflet-draw');
var GeoJSON = require('./GeoJSON');

var DrawControl = React.createClass({
  
  getInitialState: function() {
    return {
      data: this.props.data,
      geojson: null,
    };
  },

  getDefaultProps: function() {
    return {
      position: 'topleft',
      data: null,
      edit: {},
      draw: {},
      style: {}
    };
  },

  componentWillMount: function() {
    this.props.map.on('draw:created', this.createHandler);
    this.props.map.on('draw:edited', this.editHandler);
    this.props.map.on('draw:deleted', this.deleteHandler);

  },
  
  componentWillUpdate: function(nextProps, nextState) {
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
  },

  componentWillReceiveProps: function(nextProps) {
    if (nextProps.data !== this.state.data) {
      this.setState({ data: nextProps.data });
    }
  },

  componentWillUnmount: function() {
    
    this.control.remove();
    
    this.props.map.off('draw:created');
    this.props.map.off('draw:edited');
    this.props.map.off('draw:deleted');

  },

  getDrawOptions: function() {
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
  },

  getEditOptions: function() {
    return {
      edit: true,
      remove: true,
      ...this.props.edit
    };
  },

  createHandler: function (e) {
    const layer = e.layer.toGeoJSON();
    this.updateData(layer);
  },

  editHandler: function(e) {
    const layer = e.layers.toGeoJSON();
    this.updateData(layer);
  },

  deleteHandler: function (e) {
    this.updateData(null);
  },

  updateData: function(data) {
    this.setState({ data });

    if(typeof this.props.onFeatureChange === 'function') {
      this.props.onFeatureChange(data);
    }
  },

  render: function() {
    return (
      <GeoJSON
        ref={geojson => { 
          if (geojson && !this.state.geojson) { 
            this.setState({ geojson: geojson.layer}); 
          }
        }}
        {...this.props}
        data={this.state.data}
      />
    );
  }
});

module.exports = DrawControl;
