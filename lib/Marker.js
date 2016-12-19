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

var Marker = function (_React$Component) {
  _inherits(Marker, _React$Component);

  function Marker(props) {
    _classCallCheck(this, Marker);

    var _this = _possibleConstructorReturn(this, (Marker.__proto__ || Object.getPrototypeOf(Marker)).call(this, props));

    _this.state = {
      mouseover: null,
      click: null
    };
    return _this;
  }

  _createClass(Marker, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.layer = _leaflet2.default.marker(this.props.latlng, this.props).addTo(this.props.map);

      this.layer.on({
        click: this.onMarkerClick.bind(this),
        mouseover: this.onMarkerMouseover.bind(this),
        mouseout: this.onMarkerMouseout.bind(this)
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.layer.remove();
      this.layer.off('click', this.onMarkerClick);
    }
  }, {
    key: 'onMarkerClick',
    value: function onMarkerClick(e) {
      var layer = e.target;
      if (typeof this.props.onClick === 'function') {
        this.props.onClick(layer, this.props.map);
      }
      this.setState({ click: layer });
    }
  }, {
    key: 'onMarkerMouseover',
    value: function onMarkerMouseover(e) {
      var layer = e.target;
      if (typeof this.props.onMouseover === 'function') {
        this.props.onMouseover(layer, this.props.map);
      }
      this.setState({ mouseover: e.target });
    }
  }, {
    key: 'onMarkerMouseout',
    value: function onMarkerMouseout(e) {
      var layer = e.target;
      if (typeof this.props.onMouseout === 'function') {
        this.props.onMouseout(layer, this.props.map);
      }
      this.setState({ mouseover: null });
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

  return Marker;
}(_react2.default.Component);

Marker.defaultProps = {
  latlng: null,
  name: 'Marker',
  controlledLayer: false,
  draggable: false
};

module.exports = Marker;