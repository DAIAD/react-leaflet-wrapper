import React from 'react';
import L from 'leaflet';

class InfoControl  extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.control = L.control({ position: this.props.position });
  
    this.control.onAdd = map => 
      L.DomUtil.create('div', this.props.className);

    this.control.addTo(this.props.map);
    this.updateInfo('');
  }

  componentWillUnmount() {
    this.control.remove();
  }
  
  updateInfo(display) {
    this.control.getContainer().innerHTML = display;
  }

  render() {
    return (
      <div>
        {
          this.control ? React.Children.map(this.props.children, (child, idx) => {
            const properties = Object.keys(this.props)
              .filter(key => key !== 'children')
              .reduce((p, key) => {p[key] = this.props[key]; return p;}, {});
              
            return React.cloneElement(child, { infoControl: this.control, updateInfo: this.updateInfo.bind(this), ...properties, ...child.props }); }) : null
        } 
      </div>
    );
  }
}

InfoControl.defaultProps = {
  position: 'bottomright',
  className: 'info'
};


module.exports = InfoControl;
