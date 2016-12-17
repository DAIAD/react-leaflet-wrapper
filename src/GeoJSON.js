var React = require('react');
var { renderToStaticMarkup } = require('react-dom/server');
var { render, unmountComponentAtNode } = require('react-dom');
var L = require('leaflet');

var ControlHandlers = require('./handlers/');

var GeoJSON = React.createClass({
  getInitialState: function() {
    return {
      mouseover: null,
      click: null
    };
  },
  getDefaultProps: function() {
    return {
      data: null,
      style: {},
      info: null,
      name: '',
      circleMarkers: false,
      controlledLayer: true,
    };
  },

  componentWillMount: function() {
    
    this.layer = L.geoJson(this.props.data, { 
      onEachFeature: this.onEachFeature,
      pointToLayer: this.props.circleMarkers ? this.pointToCircleMarker : this.pointToMarker,
      ...this.props,
    }).addTo(this.props.map);

  },

  componentWillReceiveProps: function(nextProps) {
    if (nextProps.data == null) {
      this.layer.clearLayers();
    }
    if (nextProps.data) {
      this.layer.clearLayers();
      this.layer.addData(nextProps.data);
    }
  },

  componentWillUnmount: function() {
    this.layer.remove();
  },

  featureClick: function(feature, layer) {
    
    if (typeof this.props.onClick === 'function') {
      this.props.onClick(feature, layer, this.props.map);
    }

    this.setState({ click: feature });
  },

  featureMouseover: function(feature, layer) {
    
    if (this.props.highlightStyle && (layer.feature.geometry.type !== 'Point' || this.props.circleMarkers)) {
      layer.setStyle(this.props.highlightStyle);
      
      if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
      }
    }
    
    this.setState({ mouseover: feature });
  },

  featureMouseout: function(feature, layer) {
    if (this.props.highlightStyle && (layer.feature.geometry.type !== 'Point' || this.props.circleMarkers)) {
    this.layer.resetStyle(layer);
    }
    this.setState({ mouseover: null });
  },

  onEachFeature: function(feature, layer) {
    layer.on({
      mouseover: this.featureMouseover.bind(null, feature, layer),
      mouseout: this.featureMouseout.bind(null, feature, layer),
      click: this.featureClick.bind(null, feature, layer)
    }); 
  },

  pointToCircleMarker: function(point, latlng) {
    return L.circleMarker(latlng, this.props.markerStyle || this.props.style);
  },

  pointToMarker: function(point, latlng) {
    return L.marker(latlng, this.props.markerOptions);
  },

  render: function() {
    return (
        <ControlHandlers
          layer={this.layer}
          click={this.state.click}
          mouseover={this.state.mouseover}
          {...this.props} 
        />
    );
  }
});

module.exports = GeoJSON;
