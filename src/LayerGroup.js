import React from 'react';
import L from 'leaflet';

import HandleLayersControl from './handlers/LayersControl';

class LayerGroup  extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.layer = L.layerGroup()
    .addTo(this.props.map);
  }

  componentWillUnmount() {
    this.layer.clearLayers();
    this.layer.remove();
  }

  render() {
    return (
      <div>
        {
          React.Children.map(this.props.children, (Child, idx) => {
            const properties = Object.keys(this.props)
            .filter(key => key !== 'children')
            .reduce((p, key) => {p[key] = this.props[key]; return p;}, {});
              return React.cloneElement(Child, { layerGroup: this.layer, ...properties, ...Child.props });
            })
        } 
        <HandleLayersControl 
          layer={this.layer}
          {...this.props}
        />
      </div>
    );
  }
}

LayerGroup.defaultProps = {
  name: 'Group',
  controlledLayer: true
};


module.exports = LayerGroup;
