var React = require('react');

var HandleLayerGroup = React.createClass({
  componentWillMount: function() {
    this.props.layerGroup.addLayer(this.props.layer);
  },
  componentWillUnmount: function() {
    this.props.layerGroup.removeLayer(this.props.layer);
  },
  render: function() {
    return null;
  }
});

module.exports = HandleLayerGroup;
