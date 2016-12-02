'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');

var _require = require('react-dom/server'),
    renderToStaticMarkup = _require.renderToStaticMarkup;

var L = require('leaflet');
var chroma = require('chroma-js');
var GeoJSON = require('./GeoJSON');
var InfoControl = require('./InfoControl');

var Choropleth = React.createClass({
  displayName: 'Choropleth',


  getDefaultProps: function getDefaultProps() {
    return {
      data: null,
      valueProperty: null,
      scale: ['white', 'red'],
      steps: 5,
      mode: 'q',
      style: {},
      legend: false
    };
  },
  componentDidMount: function componentDidMount() {

    this.values = this.getValues(this.props.data);
    this.limits = this.getLimits(this.values);
    this.colors = this.getColors();
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (nextProps.data) {
      this.values = this.getValues(nextProps.data);
      this.limits = this.getLimits(this.values);
      this.colors = this.getColors();
    }
  },

  getValues: function getValues(data) {
    var _this = this;

    console.log('getting values from', data);
    return data ? data.features.map(function (feature) {
      return typeof _this.props.valueProperty === 'function' ? _this.props.valueProperty(feature) : feature.properties[_this.props.valueProperty];
    }) : [];
  },

  getLimits: function getLimits(values) {
    var _this2 = this;

    return this.props.limits ? Array.from({ length: this.props.steps + 1 }, function (v, i) {
      return i === _this2.props.steps ? _this2.props.limits[1] : _this2.props.limits[0] + i * Math.round((_this2.props.limits[1] - _this2.props.limits[0]) / _this2.props.steps);
    }) : chroma.limits(values, this.props.mode, this.props.steps);
  },

  getColors: function getColors() {
    return this.props.colors || chroma.scale(this.props.scale).colors(this.props.steps + 1);
  },

  getStyle: function getStyle() {
    return function (feature) {
      var _this3 = this;

      var style = typeof this.props.style === 'function' ? _extends({}, this.props.style()) : _extends({}, this.props.style);
      var value = typeof this.props.valueProperty === 'function' ? this.props.valueProperty(feature) : feature.properties[this.props.valueProperty];

      if (this.limits) {
        this.limits.forEach(function (limitBucket, i, arr) {
          if (i === arr.length - 1 && value >= limitBucket) {
            style.fillColor = _this3.colors[i];
          }

          if (value >= limitBucket && value < arr[i + 1]) {
            style.fillColor = _this3.colors[i];
          }
        });
      }
      return style;
    }.bind(this);
  },

  render: function render() {
    console.log('render choropleth', this.props.legend);
    return React.createElement(
      'div',
      null,
      this.props.legend && this.limits && this.colors ? React.createElement(
        InfoControl,
        {
          map: this.props.map,
          position: this.props.legend,
          className: 'legend'
        },
        React.createElement(InitLegend, {
          limits: this.limits,
          colors: this.colors
        })
      ) : null,
      React.createElement(GeoJSON, _extends({}, this.props, {
        style: this.getStyle()
      }))
    );
  }
});

var InitLegend = React.createClass({
  displayName: 'InitLegend',

  componentWillMount: function componentWillMount() {
    this.props.updateInfo('');
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    var limits = nextProps.limits || this.props.limits;
    var colors = nextProps.colors || this.props.colors;

    this.props.updateInfo('');

    this.props.updateInfo(renderToStaticMarkup(React.createElement(LegendMarkup, { limits: limits, colors: colors })));
  },
  render: function render() {
    console.log('initing legend', this.props);
    return null;
  }
});

function LegendMarkup(props) {
  var limits = props.limits,
      colors = props.colors;

  return React.createElement(
    'div',
    null,
    limits.map(function (limit, i, arr) {
      return arr[i + 1] ? React.createElement(
        'span',
        { key: i },
        React.createElement('i', { style: { backgroundColor: colors[i] } }),
        arr[i] + ' - ' + arr[i + 1],
        React.createElement('br', null)
      ) : React.createElement('span', { key: i });
    })
  );
}

module.exports = Choropleth;