var React = require('react');

var HandleLayersControl = React.createClass({
  getDefaultProps: function() {
    return {
      type: 'overlay',
    };
  },
  componentWillMount: function() {
    if (this.props.layersControl && this.props.controlledLayer) {
      if (this.props.type === 'overlay') {
        this.props.layersControl.addOverlay(this.props.layer, this.props.name);
      }
      else if (this.props.type === 'base') {
        this.props.layersControl.addBaseLayer(this.props.layer, this.props.name);
      }
    }
  },
  componentWillUnmount: function() {
    if (this.props.layersControl && this.props.controlledLayer) {
      this.props.layersControl.removeLayer(this.props.layer);
    }

  },
  render: function() {
    return null;
  }
});

module.exports = HandleLayersControl;
