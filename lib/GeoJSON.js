'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _leaflet = require('leaflet');

var _leaflet2 = _interopRequireDefault(_leaflet);

var _handlers = require('./handlers/');

var _handlers2 = _interopRequireDefault(_handlers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GeoJSON = function (_React$Component) {
  _inherits(GeoJSON, _React$Component);

  function GeoJSON(props) {
    _classCallCheck(this, GeoJSON);

    var _this = _possibleConstructorReturn(this, (GeoJSON.__proto__ || Object.getPrototypeOf(GeoJSON)).call(this, props));

    _this.state = {
      mouseover: null,
      click: null
    };
    return _this;
  }

  _createClass(GeoJSON, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.layer = _leaflet2.default.geoJson(this.props.data, _extends({
        onEachFeature: this.onEachFeature.bind(this),
        pointToLayer: this.props.circleMarkers ? this.pointToCircleMarker.bind(this) : this.pointToMarker.bind(this)
      }, this.props)).addTo(this.props.map);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.data == null) {
        this.layer.clearLayers();
      }
      if (nextProps.data && nextProps.data !== this.props.data) {
        this.layer.clearLayers();
        this.layer.addData(nextProps.data);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.layer.remove();
    }
  }, {
    key: 'featureClick',
    value: function featureClick(feature, layer) {
      if (typeof this.props.onClick === 'function') {
        this.props.onClick(feature, layer, this.props.map);
      }

      this.setState({ click: feature });
    }
  }, {
    key: 'featureMouseover',
    value: function featureMouseover(feature, layer) {
      if (this.props.highlightStyle && (layer.feature.geometry.type !== 'Point' || this.props.circleMarkers)) {
        layer.setStyle(this.props.highlightStyle);

        if (!_leaflet2.default.Browser.ie && !_leaflet2.default.Browser.opera && !_leaflet2.default.Browser.edge) {
          layer.bringToFront();
        }
      }

      this.setState({ mouseover: feature });
    }
  }, {
    key: 'featureMouseout',
    value: function featureMouseout(feature, layer) {
      if (this.props.highlightStyle && (layer.feature.geometry.type !== 'Point' || this.props.circleMarkers)) {
        this.layer.resetStyle(layer);
      }
      this.setState({ mouseover: null });
    }
  }, {
    key: 'onEachFeature',
    value: function onEachFeature(feature, layer) {
      layer.on({
        mouseover: this.featureMouseover.bind(this, feature, layer),
        mouseout: this.featureMouseout.bind(this, feature, layer),
        click: this.featureClick.bind(this, feature, layer)
      });
    }
  }, {
    key: 'pointToCircleMarker',
    value: function pointToCircleMarker(point, latlng) {
      return _leaflet2.default.circleMarker(latlng, this.props.markerStyle || this.props.style);
    }
  }, {
    key: 'pointToMarker',
    value: function pointToMarker(point, latlng) {
      return _leaflet2.default.marker(latlng, this.props.markerOptions);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_handlers2.default, _extends({
        layer: this.layer,
        click: this.state.click,
        mouseover: this.state.mouseover
      }, this.props));
    }
  }]);

  return GeoJSON;
}(_react2.default.Component);

GeoJSON.defaultProps = {
  data: null,
  style: {},
  info: null,
  name: '',
  circleMarkers: false,
  controlledLayer: true
};

module.exports = GeoJSON;