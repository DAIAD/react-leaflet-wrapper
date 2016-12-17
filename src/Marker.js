import React from 'react';
import L from 'leaflet';

import ControlHandlers from './handlers/';

class Marker  extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mouseover: null,
      click: null
    };
  }

  componentWillMount() {
    this.layer = L.marker(this.props.latlng, this.props)
    .addTo(this.props.map);

    this.layer.on({
      click: this.onMarkerClick.bind(this),
      mouseover: this.onMarkerMouseover.bind(this),
      mouseout: this.onMarkerMouseout.bind(this)
    });
  }

  componentWillUnmount() {
    this.layer.remove();
    this.layer.off('click', this.onMarkerClick);
  }

  onMarkerClick(e) {
    this.setState({ click: e.target }); 
  }

  onMarkerMouseover(e) {
    this.setState({ mouseover: e.target });
  }

  onMarkerMouseout(e) {
    this.setState({ mouseover: null });
  }

  render() {
    return ( 
      <ControlHandlers
          layer={this.layer}
          click={this.state.click}
          mouseover={this.state.mouseover}
          {...this.props} 
        />
    );
  }
}

Marker.defaultProps = {
  latlng: null,
  name: 'Marker',
  controlledLayer: false,
  draggable: false,
};


module.exports = Marker;
