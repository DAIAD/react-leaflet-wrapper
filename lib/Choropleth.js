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
      legend: false,
      legendClass: 'info legend'
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

    return data ? data.features.map(function (feature) {
      return typeof _this.props.valueProperty === 'function' ? _this.props.valueProperty(feature) : feature.properties[_this.props.valueProperty];
    }) : [];
  },

  getLimits: function getLimits(values) {
    var _this2 = this;

    return this.props.buckets ? this.props.buckets : this.props.limits ? Array.from({ length: this.props.steps + 1 }, function (v, i) {
      return i === _this2.props.steps ? _this2.props.limits[1] : _this2.props.limits[0] + i * Math.round((_this2.props.limits[1] - _this2.props.limits[0]) / _this2.props.steps);
    }) : Array.isArray(values) && values.length > 0 ? chroma.limits(values, this.props.mode, this.props.steps) : [];
  },

  limitsToBuckets: function limitsToBuckets() {
    return this.limits.map(function (limit, i, arr) {
      return i < arr.length - 1 ? [arr[i], arr[i + 1]] : null;
    }).filter(function (x, i, arr) {
      return i < arr.length - 1;
    });
  },

  getColors: function getColors() {
    return this.props.colors || chroma.scale(this.props.scale).colors(this.props.steps + 1);
  },

  getStyle: function getStyle() {
    var _this3 = this;

    return function (feature) {
      var style = typeof _this3.props.style === 'function' ? _extends({}, _this3.props.style()) : _extends({}, _this3.props.style);
      var value = typeof _this3.props.valueProperty === 'function' ? _this3.props.valueProperty(feature) : feature.properties[_this3.props.valueProperty];

      var buckets = _this3.limitsToBuckets();

      var idx = buckets.findIndex(function (bucket) {
        return value >= bucket[0] && value < bucket[1];
      });

      //if bucket not found add to last?
      if (idx === -1) {
        style.fillColor = _this3.colors[_this3.colors.length - 1];
      } else {
        style.fillColor = _this3.colors[idx];
      }

      return style;
    };
  },

  render: function render() {
    return React.createElement(
      'div',
      null,
      this.props.legend && this.limits && this.colors ? React.createElement(
        InfoControl,
        {
          map: this.props.map,
          position: this.props.legend,
          className: this.props.legendClass
        },
        React.createElement(InitLegend, {
          buckets: this.limitsToBuckets(),
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

  componentDidMount: function componentDidMount() {
    this.props.updateInfo('');

    var buckets = this.props.buckets;
    var colors = this.props.colors;

    this.props.updateInfo(renderToStaticMarkup(React.createElement(LegendMarkup, { buckets: buckets, colors: colors })));
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    var buckets = nextProps.buckets || this.props.buckets;
    var colors = nextProps.colors || this.props.colors;

    this.props.updateInfo('');
    this.props.updateInfo(renderToStaticMarkup(React.createElement(LegendMarkup, { buckets: buckets, colors: colors })));
  },
  render: function render() {
    return null;
  }
});

function LegendMarkup(props) {
  var buckets = props.buckets,
      colors = props.colors;

  return React.createElement(
    'div',
    null,
    buckets.map(function (bucket, i) {
      return React.createElement(
        'span',
        { key: i },
        React.createElement('i', { style: { backgroundColor: colors[i] } }),
        bucket[0] + ' - ' + bucket[1],
        React.createElement('br', null)
      );
    })
  );
}

module.exports = Choropleth;