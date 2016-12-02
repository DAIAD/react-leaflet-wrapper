var React = require('react');
var L = require('leaflet');

var Tile = React.createClass({
  getDefaultProps: function() {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      name: 'Base'
    };
  },

  componentWillMount: function() {
    this.layer = L.tileLayer(this.props.url, {
      attribution: this.props.attribution,
      ...this.props
    }).addTo(this.props.map);
    
    if (this.props.layersControl) {
      this.props.layersControl.addBaseLayer(this.layer, this.props.name);
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

module.exports = Tile;
