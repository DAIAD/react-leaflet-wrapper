'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var L = require('leaflet');
require('leaflet.heat');

var ControlHandlers = require('./handlers/');

var HeatLayer = React.createClass({
  displayName: 'HeatLayer',


  getDefaultProps: function getDefaultProps() {
    return {
      data: null,
      style: {},
      name: 'Heatmap',
      radius: 30,
      maxZoom: 11
    };
  },

  componentWillMount: function componentWillMount() {
    this.layer = L.heatLayer(this.props.data, this.props).addTo(this.props.map);
  },

  componentWillUnmount: function componentWillUnmount() {
    this.layer.remove();
  },

  render: function render() {
    return React.createElement(ControlHandlers, _extends({
      layer: this.layer
    }, this.props));
  }
});

module.exports = HeatLayer;