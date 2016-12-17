import React from 'react';

class HandleLayersControl extends React.Component {

  constructor(props) {
    super(props);
  }
  
  componentWillMount() {
    if (this.props.type === 'overlay') {
      this.props.layersControl.addOverlay(this.props.layer, this.props.name);
    }
    else if (this.props.type === 'base') {
      this.props.layersControl.addBaseLayer(this.props.layer, this.props.name);
    }
  }

  componentWillUnmount() {
    this.props.layersControl.removeLayer(this.props.layer);
  }

  render() {
    return null;
  }
}

HandleLayersControl.defaultProps = {
  type: 'overlay',
};


module.exports = HandleLayersControl;
