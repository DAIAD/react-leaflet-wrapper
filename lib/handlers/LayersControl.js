'use strict';

var React = require('react');

var HandleLayersControl = React.createClass({
  displayName: 'HandleLayersControl',

  getDefaultProps: function getDefaultProps() {
    return {
      type: 'overlay'
    };
  },
  componentWillMount: function componentWillMount() {
    if (this.props.type === 'overlay') {
      this.props.layersControl.addOverlay(this.props.layer, this.props.name);
    } else if (this.props.type === 'base') {
      this.props.layersControl.addBaseLayer(this.props.layer, this.props.name);
    }
  },
  componentWillUnmount: function componentWillUnmount() {
    this.props.layersControl.removeLayer(this.props.layer);
  },
  render: function render() {
    return null;
  }
});

module.exports = HandleLayersControl;