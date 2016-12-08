var React = require('react');
var L = require('leaflet');
require('leaflet-draw');

var DrawControl = React.createClass({
  
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

    this.drawnItems = L.geoJSON();
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

    if (this.props.data) {
      this.drawnItems.addData(this.props.data);
      this.drawnItems.setStyle(this.control.options.draw.polygon.shapeOptions);
    }
    
    this.props.map.on('draw:created', this.createHandler);
    this.props.map.on('draw:edited', this.editHandler);
    this.props.map.on('draw:deleted', this.deleteHandler);

  },
  
  componentWillReceiveProps: function(nextProps) {
    if (nextProps.data !== this.props.data) {
      this.drawnItems.clearLayers();
      if (nextProps.data) {
        this.drawnItems.addData(nextProps.data);
        //TODO: need to set style at this point cause it automatically resets to default
        this.drawnItems.setStyle(this.control.options.draw.polygon.shapeOptions);
      }
      
    }  
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
          fillColor: '#2980b9',
          ...this.props.style
        }
      },
      circle: false,
      marker: false,
      polygon: {
        allowIntersection: false,
        showArea: true,
        shapeOptions: {
          color: '#2c3e50',
          fillColor: '#2980b9',
          ...this.props.style
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

    /*
    this.drawnItems.eachLayer(layer => {
      this.drawnItems.removeLayer(layer);
      });
      */
    this.drawnItems.clearLayers();
    
    this.drawnItems.addLayer(layer);
    
    if(typeof this.props.onDraw === 'function') {
      this.props.onDraw.bind(this)(layer);
    }

    if(typeof this.props.onFeatureChange === 'function') {
      this.props.onFeatureChange(this.drawnItems.toGeoJSON());
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
      this.props.onFeatureChange(this.drawnItems.toGeoJSON());
    }

  },

  deleteHandler: function (e) {
    const layer = e.layers;

    if(typeof this.props.onFeatureChange === 'function') {
      this.props.onFeatureChange(this.drawnItems.toGeoJSON());
    }
  },

  render: function() {

    return null; 
  }
});

module.exports = DrawControl;
