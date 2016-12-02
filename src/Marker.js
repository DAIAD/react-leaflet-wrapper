var React = require('react');
var { renderToStaticMarkup } = require('react-dom/server');
var { render, unmountComponentAtNode } = require('react-dom');
var L = require('leaflet');

var Marker = React.createClass({
  
  getDefaultProps: function() {
    return {
      latlng: null,
      name: null
    };
  },

  componentWillMount: function() {
    
    this.layer = L.marker(this.props.latlng, this.props)
    .addTo(this.props.map);

   
    if (this.props.layersControl && this.props.name) {
      this.props.layersControl.addOverlay(this.layer, this.props.name);
    }

    if (this.props.popupContent) {
      this.popup = L.popup();
      this.layer.bindPopup(this.popup);
      this.layer.on({
        click: this.markerClick
      });
    }

    if (this.props.layerGroup) {
      this.props.layerGroup.addLayer(this.layer);
    }
  },

  componentWillReceiveProps: function(nextProps) {
  },

  componentWillUnmount: function() {
    
    if (this.props.layersControl && this.props.name) {
      this.props.layersControl.removeLayer(this.layer);
    }
    
    this.layer.off('click');

    if (this.popup) {
      this.popup.remove();
      
      if (this.popup._contentNode) {
        unmountComponentAtNode(this.popup._contentNode);
      }
    } 

    if (this.props.layerGroup) {
      this.props.layerGroup.removeLayer(this.layer);
    }

    this.layer.remove();
  },

  markerClick: function(marker) {
    if (this.props.popupContent) {
      if (!this.popup._contentNode) {
        this.popup
        .setLatLng(this.props.map.getCenter())
        .openOn(this.props.map);
      }
      render(this.props.popupContent(marker), this.popup._contentNode)
      //this.popup.update();
    }
    
    if (typeof this.props.onClick === 'function') {
      this.props.onClick(this.props.map, marker);
    }
  },

  render: function() {
    return null;
  }
});

module.exports = Marker;
