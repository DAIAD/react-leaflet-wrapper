var React = require('react');
var L = require('leaflet');
require('leaflet-draw');

var DrawControl = React.createClass({
  
  getDefaultProps: function() {
    return {
      position: 'topleft',
      edit: {},
      draw: {}
    };
  },

  componentWillMount: function() {
  
    this.drawnItems = new L.FeatureGroup();
    this.props.map.addLayer(this.drawnItems);

    //have to break Control -> Layer logic
    //since this control needs to know layers on creation
    this.control = new L.Control.Draw({
      position: this.props.position,
      edit: {
        featureGroup: this.drawnItems,
        ...this.getEditOptions() 
      },
      draw: this.getDrawOptions()
    });
    this.control.addTo(this.props.map);
    
    this.props.map.on('draw:created', this.createHandler);
    this.props.map.on('draw:edited', this.editHandler);
    this.props.map.on('draw:deleted', this.deleteHandler);

  },

  componentWillUnmount: function() {
    
    this.control.remove();
    this.drawnItems.remove();
    
    this.props.map.off('draw:created');
    this.props.map.off('draw:edited');
    this.props.map.off('draw:deleted');

  },

  getDrawOptions: function() {
    return {
      polyline: false,
      rectangle: {
        shapeOptions: {
          color: '#2c3e50',
          fillColor: '#2980b9'
        }
      },
      circle: false,
      marker: false,
      polygon: {
        allowIntersection: false,
        showArea: true,
        shapeOptions: {
          color: '#2c3e50',
          fillColor: '#2980b9'
        }
      },
      ...this.props.draw
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
    const layer = e.layer;

    this.drawnItems.eachLayer(layer => {
      this.drawnItems.removeLayer(layer);
    });
    
    this.drawnItems.addLayer(layer);
    
    if(typeof this.props.onDraw === 'function') {
      this.props.onDraw.bind(this)(layer);
    }

    if(typeof this.props.onFeatureChange === 'function') {
      this.props.onFeatureChange(this.drawnItems.toGeoJSON().features);
    }
  },

  editHandler: function(e) {
    const layers = e.layers;

    this.drawnItems.clearLayers();
    
    layers.eachLayer(layer => {
      this.drawnItems.addLayer(layer);
  
      if(typeof this.props.onDraw === 'function') {
        this.props.onDraw.bind(this)(layer);
      }
    });

    if(typeof this.props.onFeatureChange === 'function') {
      this.props.onFeatureChange(this.drawnItems.toGeoJSON().features);
    }

  },

  deleteHandler: function (e) {
    const layer = e.layers;

    if(typeof this.props.onFeatureChange === 'function') {
      this.props.onFeatureChange(this.drawnItems.toGeoJSON().features);
    }
  },

  render: function() {
    return null; 
  }
});

module.exports = DrawControl;
