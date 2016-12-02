var React = require('react');
var L = require('leaflet');

var LayerGroup = React.createClass({
  
  getDefaultProps: function() {
    return {
      name: 'Group'
    };
  },

  componentWillMount: function() {
    this.layer = L.layerGroup()
    .addTo(this.props.map);

    if (this.props.layersControl) {
      this.props.layersControl.addOverlay(this.layer, this.props.name);
    }
  },

  componentWillUnmount: function() {
    if (this.props.layersControl) {
      this.props.layersControl.removeLayer(this.layer);
    }

    this.layer.clearLayers();
    this.layer.remove();
  }, 

  render: function() {
    return (
      <div>
        {
          this.layer ? React.Children.map(this.props.children, (child, idx) => {
            const properties = Object.keys(this.props)
            .filter(key => key !== 'children')
            .reduce((p, key) => {p[key] = this.props[key]; return p;}, {});
              return React.cloneElement(child, { layerGroup: this.layer, ...properties, ...child.props });
            }) : null
        } 
      </div>
    );
  },
});

module.exports = LayerGroup;
