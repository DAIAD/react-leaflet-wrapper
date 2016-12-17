'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

var _leaflet = require('leaflet');

var _leaflet2 = _interopRequireDefault(_leaflet);

var _chromaJs = require('chroma-js');

var _chromaJs2 = _interopRequireDefault(_chromaJs);

var _GeoJSON = require('./GeoJSON');

var _GeoJSON2 = _interopRequireDefault(_GeoJSON);

var _InfoControl = require('./InfoControl');

var _InfoControl2 = _interopRequireDefault(_InfoControl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Choropleth = function (_React$Component) {
  _inherits(Choropleth, _React$Component);

  function Choropleth(props) {
    _classCallCheck(this, Choropleth);

    return _possibleConstructorReturn(this, (Choropleth.__proto__ || Object.getPrototypeOf(Choropleth)).call(this, props));
  }

  _createClass(Choropleth, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.values = this.getValues(this.props.data);
      this.limits = this.getLimits(this.values);
      this.colors = this.getColors();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.data) {
        this.values = this.getValues(nextProps.data);
        this.limits = this.getLimits(this.values);
        this.colors = this.getColors();
      }
    }
  }, {
    key: 'getValues',
    value: function getValues(data) {
      var _this2 = this;

      return data ? data.features.map(function (feature) {
        return typeof _this2.props.valueProperty === 'function' ? _this2.props.valueProperty(feature) : feature.properties[_this2.props.valueProperty];
      }) : [];
    }
  }, {
    key: 'getLimits',
    value: function getLimits(values) {
      var _this3 = this;

      return this.props.buckets ? this.props.buckets : this.props.limits ? Array.from({ length: this.props.steps + 1 }, function (v, i) {
        return i === _this3.props.steps ? _this3.props.limits[1] : _this3.props.limits[0] + i * Math.round((_this3.props.limits[1] - _this3.props.limits[0]) / _this3.props.steps);
      }) : Array.isArray(values) && values.length > 0 ? _chromaJs2.default.limits(values, this.props.mode, this.props.steps) : [];
    }
  }, {
    key: 'limitsToBuckets',
    value: function limitsToBuckets() {
      return this.limits.map(function (limit, i, arr) {
        return i < arr.length - 1 ? [arr[i], arr[i + 1]] : null;
      }).filter(function (x, i, arr) {
        return i < arr.length - 1;
      });
    }
  }, {
    key: 'getColors',
    value: function getColors() {
      return this.props.colors || _chromaJs2.default.scale(this.props.scale).colors(this.props.steps + 1);
    }
  }, {
    key: 'getStyle',
    value: function getStyle() {
      var _this4 = this;

      return function (feature) {
        var style = typeof _this4.props.style === 'function' ? _extends({}, _this4.props.style()) : _extends({}, _this4.props.style);
        var value = typeof _this4.props.valueProperty === 'function' ? _this4.props.valueProperty(feature) : feature.properties[_this4.props.valueProperty];

        var buckets = _this4.limitsToBuckets();

        var idx = buckets.findIndex(function (bucket) {
          return value >= bucket[0] && value < bucket[1];
        });

        //if bucket not found add to last?
        if (idx === -1) {
          style.fillColor = _this4.colors[_this4.colors.length - 1];
        } else {
          style.fillColor = _this4.colors[idx];
        }

        return style;
      };
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        this.props.legend && this.limits && this.colors ? _react2.default.createElement(
          _InfoControl2.default,
          {
            map: this.props.map,
            position: this.props.legend,
            className: this.props.legendClass
          },
          _react2.default.createElement(InitLegend, {
            buckets: this.limitsToBuckets(),
            colors: this.colors
          })
        ) : null,
        _react2.default.createElement(_GeoJSON2.default, _extends({}, this.props, {
          style: this.getStyle()
        }))
      );
    }
  }]);

  return Choropleth;
}(_react2.default.Component);

Choropleth.defaultProps = {
  data: null,
  valueProperty: null,
  scale: ['white', 'red'],
  steps: 5,
  mode: 'q',
  style: {},
  legend: false,
  legendClass: 'info legend'
};

var InitLegend = function (_React$Component2) {
  _inherits(InitLegend, _React$Component2);

  function InitLegend(props) {
    _classCallCheck(this, InitLegend);

    return _possibleConstructorReturn(this, (InitLegend.__proto__ || Object.getPrototypeOf(InitLegend)).call(this, props));
  }

  _createClass(InitLegend, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.props.updateInfo('');

      var buckets = this.props.buckets;
      var colors = this.props.colors;

      this.props.updateInfo((0, _server.renderToStaticMarkup)(_react2.default.createElement(LegendMarkup, { buckets: buckets, colors: colors })));
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var buckets = nextProps.buckets || this.props.buckets;
      var colors = nextProps.colors || this.props.colors;

      this.props.updateInfo('');
      this.props.updateInfo((0, _server.renderToStaticMarkup)(_react2.default.createElement(LegendMarkup, { buckets: buckets, colors: colors })));
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }]);

  return InitLegend;
}(_react2.default.Component);

function LegendMarkup(props) {
  var buckets = props.buckets,
      colors = props.colors;

  return _react2.default.createElement(
    'div',
    null,
    buckets.map(function (bucket, i) {
      return _react2.default.createElement(
        'span',
        { key: i },
        _react2.default.createElement('i', { style: { backgroundColor: colors[i] } }),
        bucket[0] + ' - ' + bucket[1],
        _react2.default.createElement('br', null)
      );
    })
  );
}

module.exports = Choropleth;