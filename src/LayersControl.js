import React from 'react';
import L from 'leaflet';

class LayersControl  extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.control = L.control.layers({}, {}, { position: this.props.position });
    this.control.addTo(this.props.map);
  }

  componentWillUnmount() {
    this.control.remove();
  }

  render() {
    return (
      <div>
        {
          this.control ? React.Children.map(this.props.children, (Child, idx) => {
            const properties = Object.keys(this.props)
            .filter(key => key !== 'children')
            .reduce((p, key) => {p[key] = this.props[key]; return p;}, {});
              return React.cloneElement(Child, { layersControl: this.control, ...properties, ...Child.props });
            }) : null
        } 
      </div>
    );
  }
}

LayersControl.defaultProps = {
  position: 'topright'
};


module.exports = LayersControl;
