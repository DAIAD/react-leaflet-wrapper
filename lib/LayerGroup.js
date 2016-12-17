'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var L = require('leaflet');
var HandleLayersControl = require('./handlers/LayersControl');

var LayerGroup = React.createClass({
  displayName: 'LayerGroup',


  getDefaultProps: function getDefaultProps() {
    return {
      name: 'Group',
      controlledLayer: true
    };
  },

  componentWillMount: function componentWillMount() {
    this.layer = L.layerGroup().addTo(this.props.map);
  },

  componentWillUnmount: function componentWillUnmount() {

    this.layer.clearLayers();
    this.layer.remove();
  },

  render: function render() {
    var _this = this;

    return React.createElement(
      'div',
      null,
      React.Children.map(this.props.children, function (Child, idx) {
        var properties = Object.keys(_this.props).filter(function (key) {
          return key !== 'children';
        }).reduce(function (p, key) {
          p[key] = _this.props[key];return p;
        }, {});
        return React.cloneElement(Child, _extends({ layerGroup: _this.layer }, properties, Child.props));
      }),
      React.createElement(HandleLayersControl, _extends({
        layer: this.layer
      }, this.props))
    );
  }
});

module.exports = LayerGroup;