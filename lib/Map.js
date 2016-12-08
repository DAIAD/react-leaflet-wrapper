'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');

var _require = require('react-dom'),
    findDOMNode = _require.findDOMNode;

var L = require('leaflet');
//L.Icon.Default.imagePath = '/assets/lib/leaflet/images/';


var LeafletMap = React.createClass({
  displayName: 'LeafletMap',


  getDefaultProps: function getDefaultProps() {
    return {
      prefix: 'map',
      center: [0, 0],
      zoom: 13
    };
  },

  getInitialState: function getInitialState() {
    return {
      map: null
    };
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (nextProps.center && (nextProps.center[0] !== this.props.center[0] || nextProps.center[1] !== this.props.center[1]) && this.state.map) {
      this.state.map.setView(nextProps.center);
    }
    if (nextProps.zoom && nextProps.zoom !== this.props.zoom && this.state.map) {
      this.state.map.setZoom(nextProps.zoom);
    }
  },

  componentWillUnmount: function componentWillUnmount() {
    this.state.map.remove();
  },

  setMap: function setMap(map) {
    this.setState({ map: map });
  },

  render: function render() {
    var _props = this.props,
        style = _props.style,
        children = _props.children;
    var map = this.state.map;

    return React.createElement(
      'div',
      { className: this.props.prefix },
      React.createElement(MapComponent, _extends({}, this.props, {
        setMap: this.setMap
      })),
      map ? React.Children.map(children, function (child, idx) {
        return React.cloneElement(child, { map: map });
      }) : null
    );
  }

});

//leaflet lives under here
var MapComponent = React.createClass({
  displayName: 'MapComponent',


  componentDidMount: function componentDidMount() {
    var map = L.map(findDOMNode(this), this.props);
    this.props.setMap(map);
  },

  shouldComponentUpdate: function shouldComponentUpdate() {
    return false;
  },

  render: function render() {
    return React.createElement('div', {
      style: this.props.style
    });
  }
});

module.exports = LeafletMap;