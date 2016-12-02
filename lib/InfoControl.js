'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var L = require('leaflet');

var InfoControl = React.createClass({
  displayName: 'InfoControl',


  getDefaultProps: function getDefaultProps() {
    return {
      position: 'bottomright',
      className: 'info'
    };
  },

  componentWillMount: function componentWillMount() {
    var _this = this;

    this.control = L.control({ position: this.props.position });

    this.control.onAdd = function (map) {
      return L.DomUtil.create('div', _this.props.className);
    };

    this.control.addTo(this.props.map);
    this.updateInfo('');
  },
  componentWillUnmount: function componentWillUnmount() {
    this.control.remove();
  },

  updateInfo: function updateInfo(display) {
    this.control.getContainer().innerHTML = display;
  },

  render: function render() {
    var _this2 = this;

    return React.createElement(
      'div',
      null,
      this.control ? React.Children.map(this.props.children, function (child, idx) {
        var properties = Object.keys(_this2.props).filter(function (key) {
          return key !== 'children';
        }).reduce(function (p, key) {
          p[key] = _this2.props[key];return p;
        }, {});

        return React.cloneElement(child, _extends({ infoControl: _this2.control, updateInfo: _this2.updateInfo }, properties, child.props));
      }) : null
    );
  }
});

module.exports = InfoControl;