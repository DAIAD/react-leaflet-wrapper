var React = require('react');
var L = require('leaflet');

var LayersControl = React.createClass({
  
  getDefaultProps: function() {
    return {
      position: 'topright'
    };
  },

  componentWillMount: function() {
    this.control = L.control.layers({}, {}, { position: this.props.position });
    this.control.addTo(this.props.map);
  },

  componentWillUnmount: function() {
    this.control.remove();
  }, 

  render: function() {
    return (
      <div>
        {
          this.control ? React.Children.map(this.props.children, (child, idx) => {
            const properties = Object.keys(this.props)
            .filter(key => key !== 'children')
            .reduce((p, key) => {p[key] = this.props[key]; return p;}, {});
              return React.cloneElement(child, { layersControl: this.control, ...properties, ...child.props });
            }) : null
        } 
      </div>
    );
  },
});

module.exports = LayersControl;
