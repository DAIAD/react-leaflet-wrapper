'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _LayerGroup = require('./LayerGroup');

var _LayerGroup2 = _interopRequireDefault(_LayerGroup);

var _LayersControl = require('./LayersControl');

var _LayersControl2 = _interopRequireDefault(_LayersControl);

var _Popup = require('./Popup');

var _Popup2 = _interopRequireDefault(_Popup);

var _InfoControl = require('./InfoControl');

var _InfoControl2 = _interopRequireDefault(_InfoControl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ControlHandlers = function ControlHandlers(props) {
  return _react2.default.createElement(
    'div',
    null,
    props.layerGroup ? _react2.default.createElement(_LayerGroup2.default, props) : null,
    props.layersControl && props.controlledLayer ? _react2.default.createElement(_LayersControl2.default, props) : null,
    props.infoContent && props.updateInfo ? _react2.default.createElement(_InfoControl2.default, props) : null,
    props.popupContent ? _react2.default.createElement(_Popup2.default, props) : null
  );
};

module.exports = ControlHandlers;