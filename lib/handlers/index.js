'use strict';

var React = require('react');

var HandleLayerGroup = require('./LayerGroup');
var HandleLayersControl = require('./LayersControl');
var HandlePopup = require('./Popup');
var HandleInfoControl = require('./InfoControl');

var ControlHandlers = function ControlHandlers(props) {
  return React.createElement(
    'div',
    null,
    props.layerGroup ? React.createElement(HandleLayerGroup, props) : null,
    props.layersControl && props.controlledLayer ? React.createElement(HandleLayersControl, props) : null,
    props.infoContent && props.updateInfo ? React.createElement(HandleInfoControl, props) : null,
    props.popupContent ? React.createElement(HandlePopup, props) : null
  );
};

module.exports = ControlHandlers;