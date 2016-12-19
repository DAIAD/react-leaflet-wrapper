import React from 'react';
import L from 'leaflet';
import 'leaflet.heat';

import ControlHandlers from './handlers/';

class HeatLayer  extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.layer = L.heatLayer(this.props.data, this.props)
    .addTo(this.props.map);
  }

  componentWillUnmount() {
    this.layer.remove();
  }

  render() {
    return (
      <ControlHandlers
        {...this.props} 
        layer={this.layer}
      />
    );
  }
}

HeatLayer.defaultProps = {
  data: null,
  style: {},
  name: 'Heatmap',
  radius: 30,
  maxZoom: 11
};

module.exports = HeatLayer;


