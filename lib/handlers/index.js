'use strict';

var React = require('react');

var HandleLayerGroup = require('./LayerGroup');
var HandleLayersControl = require('./LayersControl');

var ControlHandlers = function ControlHandlers(props) {
  return React.createElement(
    'div',
    null,
    React.createElement(HandleLayerGroup, props),
    React.createElement(HandleLayersControl, props)
  );
};

module.exports = ControlHandlers;