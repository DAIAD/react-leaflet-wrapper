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


  getDefaultProps: function getDefaultProps() {
    return {
      latlng: null,
      name: 'Marker',
      controlledLayer: false
    };
  },

  componentWillMount: function componentWillMount() {

    this.layer = L.marker(this.props.latlng, this.props).addTo(this.props.map);

    if (this.props.popupContent) {
      this.popup = L.popup();
      this.layer.bindPopup(this.popup);
      this.layer.on({
        click: this.markerClick
      });
    }
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {},

  componentWillUnmount: function componentWillUnmount() {

    this.layer.off('click');

    if (this.popup) {
      this.popup.remove();

      if (this.popup._contentNode) {
        unmountComponentAtNode(this.popup._contentNode);
      }
    }

    this.layer.remove();
  },

  markerClick: function markerClick(marker) {
    if (this.props.popupContent) {
      if (!this.popup._contentNode) {
        this.popup.setLatLng(this.props.map.getCenter()).openOn(this.props.map);
      }
      render(this.props.popupContent(marker), this.popup._contentNode);
      //this.popup.update();
    }

    if (typeof this.props.onClick === 'function') {
      this.props.onClick(this.props.map, marker);
    }
  },

  render: function render() {
    return React.createElement(ControlHandlers, _extends({
      layer: this.layer
    }, this.props));
  }
});

module.exports = Marker;