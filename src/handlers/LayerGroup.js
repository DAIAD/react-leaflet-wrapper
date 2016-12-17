import React from 'react';

class HandleLayerGroup extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.layerGroup.addLayer(this.props.layer);
  }

  componentWillUnmount() {
    this.props.layerGroup.removeLayer(this.props.layer);
  }

  render() {
    return null;
  }
}

module.exports = HandleLayerGroup;
