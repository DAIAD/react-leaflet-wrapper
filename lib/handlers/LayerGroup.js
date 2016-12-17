'use strict';

var React = require('react');

var HandleLayerGroup = React.createClass({
  displayName: 'HandleLayerGroup',

  componentWillMount: function componentWillMount() {
    this.props.layerGroup.addLayer(this.props.layer);
  },
  componentWillUnmount: function componentWillUnmount() {
    this.props.layerGroup.removeLayer(this.props.layer);
  },
  render: function render() {
    return null;
  }
});

module.exports = HandleLayerGroup;