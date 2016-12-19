import React from 'react';
import L from 'leaflet';

import ControlHandlers from './handlers/';

class Tile  extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.layer = L.tileLayer(this.props.url, {
      attribution: this.props.attribution,
      ...this.props
    }).addTo(this.props.map);
  }

  componentWillUnmount() {
    this.layer.remove();
  }

  render() {
    return (
      <div>
        <ControlHandlers
          {...this.props} 
          layer={this.layer}
          type='base'
        />
      </div>
    );
  }
}

Tile.defaultProps = {
  url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
  name: 'Base',
  controlledLayer: true,
};


module.exports = Tile;
