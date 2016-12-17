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

var GeoJSON = React.createClass({
  displayName: 'GeoJSON',

  getInitialState: function getInitialState() {
    return {
      mouseover: null,
      click: null
    };
  },
  getDefaultProps: function getDefaultProps() {
    return {
      data: null,
      style: {},
      info: null,
      name: '',
      circleMarkers: false,
      controlledLayer: true
    };
  },

  componentWillMount: function componentWillMount() {

    this.layer = L.geoJson(this.props.data, _extends({
      onEachFeature: this.onEachFeature,
      pointToLayer: this.props.circleMarkers ? this.pointToCircleMarker : this.pointToMarker
    }, this.props)).addTo(this.props.map);
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (nextProps.data == null) {
      this.layer.clearLayers();
    }
    if (nextProps.data) {
      this.layer.clearLayers();
      this.layer.addData(nextProps.data);
    }
  },

  componentWillUnmount: function componentWillUnmount() {
    this.layer.remove();
  },

  featureClick: function featureClick(feature, layer) {

    if (typeof this.props.onClick === 'function') {
      this.props.onClick(feature, layer, this.props.map);
    }

    this.setState({ click: feature });
  },

  featureMouseover: function featureMouseover(feature, layer) {

    if (this.props.highlightStyle && (layer.feature.geometry.type !== 'Point' || this.props.circleMarkers)) {
      layer.setStyle(this.props.highlightStyle);

      if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
      }
    }

    this.setState({ mouseover: feature });
  },

  featureMouseout: function featureMouseout(feature, layer) {
    if (this.props.highlightStyle && (layer.feature.geometry.type !== 'Point' || this.props.circleMarkers)) {
      this.layer.resetStyle(layer);
    }
    this.setState({ mouseover: null });
  },

  onEachFeature: function onEachFeature(feature, layer) {
    layer.on({
      mouseover: this.featureMouseover.bind(null, feature, layer),
      mouseout: this.featureMouseout.bind(null, feature, layer),
      click: this.featureClick.bind(null, feature, layer)
    });
  },

  pointToCircleMarker: function pointToCircleMarker(point, latlng) {
    return L.circleMarker(latlng, this.props.markerStyle || this.props.style);
  },

  pointToMarker: function pointToMarker(point, latlng) {
    return L.marker(latlng, this.props.markerOptions);
  },

  render: function render() {
    return React.createElement(ControlHandlers, _extends({
      layer: this.layer,
      click: this.state.click,
      mouseover: this.state.mouseover
    }, this.props));
  }
});

module.exports = GeoJSON;