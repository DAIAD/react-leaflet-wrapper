'use strict';

var React = require('react');

var _require = require('react-dom/server'),
    renderToStaticMarkup = _require.renderToStaticMarkup;

var _require2 = require('react-dom'),
    render = _require2.render,
    unmountComponentAtNode = _require2.unmountComponentAtNode;

var HandlePopup = React.createClass({
  displayName: 'HandlePopup',


  componentWillMount: function componentWillMount() {
    this.popup = L.popup().setLatLng(this.props.map.getCenter()).openOn(this.props.map);

    this.props.layer.bindPopup(this.popup).closePopup();
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (nextProps.click !== this.props.click) {
      render(this.props.popupContent(nextProps.click), this.popup._contentNode);
    }
    if (nextProps.data !== this.props.data) {
      this.popup.remove();
    }
  },

  componentWillUnmount: function componentWillUnmount() {
    this.props.layer.unbindPopup();
    this.popup.remove();
    unmountComponentAtNode(this.popup._contentNode);
  },

  render: function render() {
    return null;
  }
});

module.exports = HandlePopup;