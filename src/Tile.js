var React = require('react');
var L = require('leaflet');

var ControlHandlers = require('./handlers/');

var Tile = React.createClass({
  getDefaultProps: function() {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      name: 'Base',
      controlledLayer: true,
    };
  },

  componentWillMount: function() {
    this.layer = L.tileLayer(this.props.url, {
      attribution: this.props.attribution,
      ...this.props
    }).addTo(this.props.map);

  },

  componentWillUnmount: function() {
    this.layer.remove();
  },

  render: function() {
    return (
      <div>
        <ControlHandlers
          layer={this.layer}
          type='base'
          {...this.props} 
        />
      </div>
    );
  }
});

module.exports = Tile;
