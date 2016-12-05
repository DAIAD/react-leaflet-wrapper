'use strict';

var React = require('react');

var HandleLayerGroup = React.createClass({
  displayName: 'HandleLayerGroup',

  componentWillMount: function componentWillMount() {
    if (this.props.layerGroup) {
      this.props.layerGroup.addLayer(this.props.layer);
    }
  },
  componentWillUnmount: function componentWillUnmount() {
    if (this.props.layerGroup) {
      this.props.layerGroup.removeLayer(this.props.layer);
    }
  },
  render: function render() {
    return null;
  }
});

module.exports = HandleLayerGroup;