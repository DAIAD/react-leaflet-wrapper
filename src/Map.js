import React from 'react';
import { findDOMNode } from 'react-dom';
import L from 'leaflet';

class LeafletMap extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      map: null
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.center && 
        (nextProps.center[0] !== this.props.center[0] || nextProps.center[1] !== this.props.center[1])  && 
        this.state.map) {
          this.state.map.setView(nextProps.center);
        }
    if (nextProps.zoom && nextProps.zoom !== this.props.zoom && this.state.map) {
      this.state.map.setZoom(nextProps.zoom);
    }
  }
 
  componentWillUnmount() {
    this.state.map.remove();
  }
  
  setMap(map) {
    this.setState({ map });
  }

  render() {
    const { children } = this.props;
    const { map } = this.state;
    return (
      <div className={this.props.prefix}>
        <MapComponent
          {...this.props}
          setMap={this.setMap.bind(this)}
        />
        {
          map ? 
            React.Children.map(children, (child, idx) => 
                               React.cloneElement(child, { map })
                              ) : null
        }
        </div>
    );
  }
}

LeafletMap.defaultProps = {
  prefix: 'map',
  center: [0 ,0],
  zoom: 13,
  width: '100%',
  height: 400
};

//leaflet lives under here
class MapComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const map = L.map(findDOMNode(this), this.props);
    this.props.setMap(map);  
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div 
        style={{ width: this.props.width, height: this.props.height }}
      />
    );
  }
}

module.exports = LeafletMap;
