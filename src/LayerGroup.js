var React = require('react');
var L = require('leaflet');
var HandleLayersControl = require('./handlers/LayersControl');

var LayerGroup = React.createClass({
  
  getDefaultProps: function() {
    return {
      name: 'Group',
      controlledLayer: true
    };
  },

  componentWillMount: function() {

    this.layer = L.layerGroup()
    .addTo(this.props.map);

  },

  componentWillUnmount: function() {

    this.layer.clearLayers();
    this.layer.remove();
  }, 

  render: function() {
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
  },
});

module.exports = LayerGroup;
