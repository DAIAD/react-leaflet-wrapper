var React = require('react');
var { renderToStaticMarkup } = require('react-dom/server');
var { render, unmountComponentAtNode } = require('react-dom');
var L = require('leaflet');

var ControlHandlers = require('./handlers/');

var GeoJSON = React.createClass({
  
  getDefaultProps: function() {
    return {
      data: null,
      style: {},
      info: null,
      name: '',
      circleMarkers: false,
      controlledLayer: true,
    };
  },

  componentWillMount: function() {
    
    this.layer = L.geoJson(this.props.data, { 
      style: this.props.style,
      onEachFeature: this.onEachFeature,
      pointToLayer: this.props.circleMarkers ? this.pointToCircleMarker : this.pointToMarker,
      ...this.props,
    }).addTo(this.props.map);


    if (this.props.infoContent && this.props.updateInfo) {
      this.props.updateInfo(renderToStaticMarkup(this.props.infoContent()));
    }
    
    if (this.props.popupContent) {
      this.popup = L.popup();
      this.layer.bindPopup(this.popup);
    }
   
  },

  componentWillReceiveProps: function(nextProps) {
    if (nextProps.data) {
      this.layer.clearLayers();
      this.layer.addData(nextProps.data);
      
      if (this.popup) {
        this.popup.remove();
      }
    }
  },

  componentWillUnmount: function() {

    if (this.popup) {
      this.popup.remove();
      
      if (this.popup._contentNode) {
        unmountComponentAtNode(this.popup._contentNode);
      }
    } 

    this.layer.remove();
  },

  defaultHighlight: function(e) {
    const layer = e.target;

    if (!(layer.feature.geometry.type === 'Point' && !this.props.circleMarkers)) {
      layer.setStyle(this.props.highlightStyle);
      
      if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
      }
    }
 
    if (this.props.infoContent) {
      this.props.updateInfo(renderToStaticMarkup(this.props.infoContent(layer.feature)));
    }
  },

  defaultReset: function(e) {
  
    this.layer.resetStyle(e.target);
    if (this.props.infoContent) {
      this.props.updateInfo(renderToStaticMarkup(this.props.infoContent()));
    }
  },

  featureClick: function(feature, layer) {
    if (this.props.popupContent) {
      if (!this.popup._contentNode) {
        this.popup
        .setLatLng(this.props.map.getCenter())
        .openOn(this.props.map);
      }
      render(this.props.popupContent(feature), this.popup._contentNode)
      //this.popup.update();
    }
    
    if (typeof this.props.onClick === 'function') {
      this.props.onClick(this.props.map, layer, feature);
    }
  },

  onEachFeature: function(feature, layer) {
    layer.on({
      mouseover: this.props.onHighlight || this.defaultHighlight,
      mouseout: this.props.onReset || this.defaultReset,
      click: this.featureClick.bind(null, feature, layer)
    });
  },

  pointToCircleMarker: function(point, latlng) {
    return L.circleMarker(latlng, this.props.markerStyle || this.props.style);
  },

  pointToMarker: function(point, latlng) {
    return L.marker(latlng, this.props.markerOptions);
  },

  render: function() {
    return (
        <ControlHandlers
          layer={this.layer}
          {...this.props} 
        />
    );
  }
});

module.exports = GeoJSON;
