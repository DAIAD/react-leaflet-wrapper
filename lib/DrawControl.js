'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var L = require('leaflet');
require('leaflet-draw');

var DrawControl = React.createClass({
  displayName: 'DrawControl',


  getDefaultProps: function getDefaultProps() {
    return {
      position: 'topleft',
      edit: {},
      draw: {}
    };
  },

  componentWillMount: function componentWillMount() {

    this.drawnItems = new L.FeatureGroup();
    this.props.map.addLayer(this.drawnItems);

    //have to break Control -> Layer logic
    //since this control needs to know layers on creation
    this.control = new L.Control.Draw({
      position: this.props.position,
      edit: _extends({
        featureGroup: this.drawnItems
      }, this.getEditOptions()),
      draw: this.getDrawOptions()
    });
    this.control.addTo(this.props.map);

    this.props.map.on('draw:created', this.createHandler);
    this.props.map.on('draw:edited', this.editHandler);
    this.props.map.on('draw:deleted', this.deleteHandler);
  },

  componentWillUnmount: function componentWillUnmount() {

    this.control.remove();
    this.drawnItems.remove();

    this.props.map.off('draw:created');
    this.props.map.off('draw:edited');
    this.props.map.off('draw:deleted');
  },

  getDrawOptions: function getDrawOptions() {
    return _extends({
      polyline: false,
      rectangle: {
        shapeOptions: {
          color: '#2c3e50',
          fillColor: '#2980b9'
        }
      },
      circle: false,
      marker: false,
      polygon: {
        allowIntersection: false,
        showArea: true,
        shapeOptions: {
          color: '#2c3e50',
          fillColor: '#2980b9'
        }
      }
    }, this.props.draw);
  },

  getEditOptions: function getEditOptions() {
    return _extends({
      edit: true,
      remove: true
    }, this.props.edit);
  },

  createHandler: function createHandler(e) {
    var _this = this;

    var layer = e.layer;

    this.drawnItems.eachLayer(function (layer) {
      _this.drawnItems.removeLayer(layer);
    });

    this.drawnItems.addLayer(layer);

    if (typeof this.props.onDraw === 'function') {
      this.props.onDraw.bind(this)(layer);
    }

    if (typeof this.props.onFeatureChange === 'function') {
      this.props.onFeatureChange(this.drawnItems.toGeoJSON().features);
    }
  },

  editHandler: function editHandler(e) {
    var _this2 = this;

    var layers = e.layers;

    this.drawnItems.clearLayers();

    layers.eachLayer(function (layer) {
      _this2.drawnItems.addLayer(layer);

      if (typeof _this2.props.onDraw === 'function') {
        _this2.props.onDraw.bind(_this2)(layer);
      }
    });

    if (typeof this.props.onFeatureChange === 'function') {
      this.props.onFeatureChange(this.drawnItems.toGeoJSON().features);
    }
  },

  deleteHandler: function deleteHandler(e) {
    var layer = e.layers;

    if (typeof this.props.onFeatureChange === 'function') {
      this.props.onFeatureChange(this.drawnItems.toGeoJSON().features);
    }
  },

  render: function render() {
    return null;
  }
});

module.exports = DrawControl;