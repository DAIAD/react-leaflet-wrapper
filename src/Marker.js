var React = require('react');
var { renderToStaticMarkup } = require('react-dom/server');
var { render, unmountComponentAtNode } = require('react-dom');
var L = require('leaflet');

var ControlHandlers = require('./handlers/');

var Marker = React.createClass({

  getInitialState: function() {
    return {
      click: null,
      mouseover: null, 
    };
  },
  getDefaultProps: function() {
    return {
      latlng: null,
      name: 'Marker',
      controlledLayer: false,
    };
  },

  componentWillMount: function() {
    this.layer = L.marker(this.props.latlng, this.props)
    .addTo(this.props.map);

    this.layer.on({
      click: this.onMarkerClick,
      mouseover: this.onMarkerMouseover,
      mouseout: this.onMarkerMouseout
    });

  },

  componentWillUnmount: function() {
    this.layer.remove();
    this.layer.off('click', this.onMarkerClick);

  },

  onMarkerClick: function(e) {
    this.setState({ click: e.target }); 
  },

  onMarkerMouseover: function(e) {
    this.setState({ mouseover: e.target });
  },

  onMarkerMouseout: function(e) {
    this.setState({ mouseover: null });
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

module.exports = Marker;
