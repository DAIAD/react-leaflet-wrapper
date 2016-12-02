var React = require('react');
var L = require('leaflet');
require('leaflet.heat');

var HeatLayer = React.createClass({
  
  getDefaultProps: function() {
    return {
      data: null,
      style: {},
      name: 'Heatmap',
      radius: 30,
      maxZoom: 11
    };
  },

  componentWillMount: function() {
    this.layer = L.heatLayer(this.props.data, this.props)
    .addTo(this.props.map);
    
    if (this.props.layersControl) {
      this.props.layersControl.addOverlay(this.layer, this.props.name);
    }
  },

  componentWillUnmount: function() {
    if (this.props.layersControl) {
      this.props.layersControl.removeLayer(this.layer);
    }

    this.layer.remove();
  },

  render: function() {
    return null; 
  }
});

module.exports = HeatLayer;


