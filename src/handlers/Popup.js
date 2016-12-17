var React = require('react');
var { renderToStaticMarkup } = require('react-dom/server');
var { render, unmountComponentAtNode } = require('react-dom');

var HandlePopup = React.createClass({

  componentWillMount: function() {
    this.popup = L.popup()
    .setLatLng(this.props.map.getCenter())
    .openOn(this.props.map)
    
    this.props.layer.bindPopup(this.popup).closePopup();
    
  },
  componentWillReceiveProps: function(nextProps) {
    if (nextProps.click !== this.props.click) {
        render(this.props.popupContent(nextProps.click), this.popup._contentNode)
    }
    if (nextProps.data !== this.props.data) {
      this.popup.remove();
    }
  },

  componentWillUnmount: function() {
    this.props.layer.unbindPopup();
    this.popup.remove();
    unmountComponentAtNode(this.popup._contentNode);
  },
  
  render: function() {
    return null;
  }
});

module.exports = HandlePopup;
