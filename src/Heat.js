var React = require('react');
var L = require('leaflet');
require('leaflet.heat');

var ControlHandlers = require('./handlers/');

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
  },

  componentWillUnmount: function() {
    this.layer.remove();
  },

  render: function() {
    return (
      <ControlHandlers
        layer={this.layer}
        {...this.props} 
      />
    );
  }
});

module.exports = HeatLayer;


