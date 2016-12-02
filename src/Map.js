var React = require('react');
var { findDOMNode } = require('react-dom');

var L = require('leaflet');
//L.Icon.Default.imagePath = '/assets/lib/leaflet/images/';


var LeafletMap = React.createClass({
  
  getDefaultProps: function() {
    return {
      prefix: 'map',
      center: [0 ,0],
      zoom: 13,
    };
  },

  getInitialState: function() {
    return {
      map: null 
    };
  },

  componentWillReceiveProps : function(nextProps) {
    if ((nextProps.center || nextProps.zoom) && this.state.map) {
      this.state.map.setView(nextProps.center || this.props.center, nextProps.zoom || this.props.zoom);
    }
  },
 
  componentWillUnmount : function() {
    this.state.map.remove();
  },
  
  setMap: function(map) {
    this.setState({ map });
  },

  render: function() {
    const { style, children } = this.props;
    const { map } = this.state;
    return (
      <div className={this.props.prefix}>
        <MapComponent
          {...this.props}
          setMap={this.setMap}
        />
        {
          map ? 
            React.Children.map(children, (child, idx) => 
                               React.cloneElement(child, { map })
                              ) : null
        }
        </div>
    );
  },

});

//leaflet lives under here
var MapComponent = React.createClass({

  componentDidMount: function() {
    const map = L.map(findDOMNode(this), this.props);
    this.props.setMap(map);  
  },

  shouldComponentUpdate : function() {
    return false;
  },

  render: function() {
    return (
      <div 
        style={this.props.style}
      />
    );
  }
});

module.exports = LeafletMap;
