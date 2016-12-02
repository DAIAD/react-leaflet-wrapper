var React = require('react');
var L = require('leaflet');

var InfoControl = React.createClass({
  
  getDefaultProps: function() {
    return {
      position: 'bottomright',
      className: 'info'
    };
  },

  componentWillMount: function() {
    this.control = L.control({ position: this.props.position });
  
    this.control.onAdd = map => 
      L.DomUtil.create('div', this.props.className);

    this.control.addTo(this.props.map);
    this.updateInfo('');
  },
  componentWillUnmount: function() {
    this.control.remove();
  },
  
  updateInfo: function(display) {
    this.control.getContainer().innerHTML = display;
  },

  render: function() {
    return (
      <div>
        {
          this.control ? React.Children.map(this.props.children, (child, idx) => {
            const properties = Object.keys(this.props)
              .filter(key => key !== 'children')
              .reduce((p, key) => {p[key] = this.props[key]; return p;}, {});
              
            return React.cloneElement(child, { infoControl: this.control, updateInfo: this.updateInfo, ...properties, ...child.props }); }) : null
        } 
      </div>
    );
  },
});

module.exports = InfoControl;
