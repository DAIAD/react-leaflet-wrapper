'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var L = require('leaflet');

var ControlHandlers = require('./handlers/');

var Tile = React.createClass({
  displayName: 'Tile',

  getDefaultProps: function getDefaultProps() {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      name: 'Base',
      controlledLayer: true
    };
  },

  componentWillMount: function componentWillMount() {
    this.layer = L.tileLayer(this.props.url, _extends({
      attribution: this.props.attribution
    }, this.props)).addTo(this.props.map);
  },

  componentWillUnmount: function componentWillUnmount() {

    this.layer.remove();
  },

  render: function render() {
    return React.createElement(
      'div',
      null,
      React.createElement(ControlHandlers, _extends({
        layer: this.layer,
        type: 'base'
      }, this.props))
    );
  }
});

module.exports = Tile;