'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var L = require('leaflet');

var LayersControl = React.createClass({
  displayName: 'LayersControl',


  getDefaultProps: function getDefaultProps() {
    return {
      position: 'topright'
    };
  },

  componentWillMount: function componentWillMount() {
    this.control = L.control.layers({}, {}, { position: this.props.position });
    this.control.addTo(this.props.map);
  },

  componentWillUnmount: function componentWillUnmount() {
    this.control.remove();
  },

  render: function render() {
    var _this = this;

    return React.createElement(
      'div',
      null,
      this.control ? React.Children.map(this.props.children, function (child, idx) {
        var properties = Object.keys(_this.props).filter(function (key) {
          return key !== 'children';
        }).reduce(function (p, key) {
          p[key] = _this.props[key];return p;
        }, {});
        return React.cloneElement(child, _extends({ layersControl: _this.control }, properties, child.props));
      }) : null
    );
  }
});

module.exports = LayersControl;