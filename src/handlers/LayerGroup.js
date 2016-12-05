var React = require('react');

var HandleLayerGroup = React.createClass({
  componentWillMount: function() {
    if (this.props.layerGroup) {
      this.props.layerGroup.addLayer(this.props.layer);
    }
  },
  componentWillUnmount: function() {
    if (this.props.layerGroup) {
      this.props.layerGroup.removeLayer(this.props.layer);
    }
  },
  render: function() {
    return null;
  }
});

module.exports = HandleLayerGroup;
