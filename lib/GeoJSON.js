'use strict';

var React = require('react');

var _require = require('react-dom/server'),
    renderToStaticMarkup = _require.renderToStaticMarkup;

var _require2 = require('react-dom'),
    render = _require2.render,
    unmountComponentAtNode = _require2.unmountComponentAtNode;

var L = require('leaflet');

var GeoJSON = React.createClass({
  displayName: 'GeoJSON',


  getDefaultProps: function getDefaultProps() {
    return {
      data: null,
      style: {},
      info: null,
      name: '',
      circleMarkers: false
    };
  },

  componentWillMount: function componentWillMount() {

    this.layer = L.geoJson(this.props.data, {
      style: this.props.style,
      onEachFeature: this.onEachFeature,
      pointToLayer: this.props.circleMarkers ? this.pointToCircleMarker : this.pointToMarker
    }).addTo(this.props.map);

    if (this.props.infoContent && this.props.updateInfo) {
      this.props.updateInfo(renderToStaticMarkup(this.props.infoContent()));
    }

    if (this.props.layersControl) {
      this.props.layersControl.addOverlay(this.layer, this.props.name);
    }

    if (this.props.popupContent) {
      this.popup = L.popup();
      this.layer.bindPopup(this.popup);
    }
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (nextProps.data) {
      this.layer.clearLayers();
      this.layer.addData(nextProps.data);
    }
  },

  componentWillUnmount: function componentWillUnmount() {

    if (this.props.layersControl) {
      this.props.layersControl.removeLayer(this.layer);
    }
    this.layer.remove();
    if (this.popup) {
      this.popup.remove();

      if (this.popup._contentNode) {
        unmountComponentAtNode(this.popup._contentNode);
      }
    }
  },

  defaultHighlight: function defaultHighlight(e) {
    var layer = e.target;

    layer.setStyle(this.props.highlightStyle);

    if (this.props.infoContent) {
      this.props.updateInfo(renderToStaticMarkup(this.props.infoContent(layer.feature)));
    }
  },

  defaultReset: function defaultReset(e) {

    this.layer.resetStyle(e.target);
    if (this.props.infoContent) {
      this.props.updateInfo(renderToStaticMarkup(this.props.infoContent()));
    }
  },

  featureClick: function featureClick(feature, layer) {
    if (this.props.popupContent) {
      if (!this.popup._contentNode) {
        this.popup.setLatLng(this.props.map.getCenter()).openOn(this.props.map);
      }
      render(this.props.popupContent(feature), this.popup._contentNode);
      //this.popup.update();
    }

    if (typeof this.props.onClick === 'function') {
      this.props.onClick(this.props.map, layer, feature);
    }
  },

  onEachFeature: function onEachFeature(feature, layer) {
    layer.on({
      mouseover: this.props.onHighlight || this.defaultHighlight,
      mouseout: this.props.onReset || this.defaultReset,
      click: this.featureClick.bind(null, feature, layer)
    });
  },

  pointToCircleMarker: function pointToCircleMarker(point, latlng) {
    return L.circleMarker(latlng, this.props.style);
  },

  pointToMarker: function pointToMarker(point, latlng) {
    return L.marker(latlng);
  },

  render: function render() {
    return null;
  }
});

module.exports = GeoJSON;