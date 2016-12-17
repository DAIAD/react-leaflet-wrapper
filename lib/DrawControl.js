'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var L = require('leaflet');
require('leaflet-draw');
var GeoJSON = require('./GeoJSON');

var DrawControl = React.createClass({
  displayName: 'DrawControl',


  getInitialState: function getInitialState() {
    return {
      data: this.props.data,
      geojson: null
    };
  },

  getDefaultProps: function getDefaultProps() {
    return {
      position: 'topleft',
      data: null,
      edit: {},
      draw: {},
      style: {}
    };
  },

  componentWillMount: function componentWillMount() {
    this.props.map.on('draw:created', this.createHandler);
    this.props.map.on('draw:edited', this.editHandler);
    this.props.map.on('draw:deleted', this.deleteHandler);
  },

  componentWillUpdate: function componentWillUpdate(nextProps, nextState) {
    if (nextState.geojson && !this.state.geojson) {
      this.control = new L.Control.Draw({
        position: this.props.position,
        edit: _extends({
          featureGroup: nextState.geojson
        }, this.getEditOptions()),
        draw: this.getDrawOptions()
      });
      this.control.addTo(this.props.map);
    }
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.state.data) {
      this.setState({ data: nextProps.data });
    }
  },

  componentWillUnmount: function componentWillUnmount() {

    this.control.remove();

    this.props.map.off('draw:created');
    this.props.map.off('draw:edited');
    this.props.map.off('draw:deleted');
  },

  getDrawOptions: function getDrawOptions() {
    return {
      polyline: false,
      rectangle: {
        shapeOptions: _extends({}, this.props.style)
      },
      circle: false,
      marker: false,
      polygon: {
        allowIntersection: false,
        showArea: true,
        shapeOptions: _extends({}, this.props.style)
      }
    };
  },

  getEditOptions: function getEditOptions() {
    return _extends({
      edit: true,
      remove: true
    }, this.props.edit);
  },

  createHandler: function createHandler(e) {
    var layer = e.layer.toGeoJSON();
    this.updateData(layer);
  },

  editHandler: function editHandler(e) {
    var layer = e.layers.toGeoJSON();
    this.updateData(layer);
  },

  deleteHandler: function deleteHandler(e) {
    this.updateData(null);
  },

  updateData: function updateData(data) {
    this.setState({ data: data });

    if (typeof this.props.onFeatureChange === 'function') {
      this.props.onFeatureChange(data);
    }
  },

  render: function render() {
    var _this = this;

    return React.createElement(GeoJSON, _extends({
      ref: function ref(geojson) {
        if (geojson && !_this.state.geojson) {
          _this.setState({ geojson: geojson.layer });
        }
      }
    }, this.props, {
      data: this.state.data
    }));
  }
});

module.exports = DrawControl;