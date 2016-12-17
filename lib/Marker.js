'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');

var _require = require('react-dom/server'),
    renderToStaticMarkup = _require.renderToStaticMarkup;

var _require2 = require('react-dom'),
    render = _require2.render,
    unmountComponentAtNode = _require2.unmountComponentAtNode;

var L = require('leaflet');

var ControlHandlers = require('./handlers/');

var Marker = React.createClass({
  displayName: 'Marker',


  getInitialState: function getInitialState() {
    return {
      click: null,
      mouseover: null
    };
  },
  getDefaultProps: function getDefaultProps() {
    return {
      draggable: false,
      latlng: null,
      name: 'Marker',
      controlledLayer: false
    };
  },

  componentWillMount: function componentWillMount() {
    this.layer = L.marker(this.props.latlng, this.props).addTo(this.props.map);

    this.layer.on({
      click: this.onMarkerClick,
      mouseover: this.onMarkerMouseover,
      mouseout: this.onMarkerMouseout
    });
  },

  componentWillUnmount: function componentWillUnmount() {
    this.layer.remove();
    this.layer.off('click', this.onMarkerClick);
  },

  onMarkerClick: function onMarkerClick(e) {
    this.setState({ click: e.target });
  },

  onMarkerMouseover: function onMarkerMouseover(e) {
    this.setState({ mouseover: e.target });
  },

  onMarkerMouseout: function onMarkerMouseout(e) {
    this.setState({ mouseover: null });
  },

  render: function render() {
    return React.createElement(ControlHandlers, _extends({
      layer: this.layer,
      click: this.state.click,
      mouseover: this.state.mouseover
    }, this.props));
  }
});

module.exports = Marker;