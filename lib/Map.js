'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _leaflet = require('leaflet');

var _leaflet2 = _interopRequireDefault(_leaflet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LeafletMap = function (_React$Component) {
  _inherits(LeafletMap, _React$Component);

  function LeafletMap(props) {
    _classCallCheck(this, LeafletMap);

    var _this = _possibleConstructorReturn(this, (LeafletMap.__proto__ || Object.getPrototypeOf(LeafletMap)).call(this, props));

    _this.state = {
      map: null
    };
    return _this;
  }

  _createClass(LeafletMap, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.center && (nextProps.center[0] !== this.props.center[0] || nextProps.center[1] !== this.props.center[1]) && this.state.map) {
        this.state.map.setView(nextProps.center);
      }
      if (nextProps.zoom && nextProps.zoom !== this.props.zoom && this.state.map) {
        this.state.map.setZoom(nextProps.zoom);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.state.map.remove();
    }
  }, {
    key: 'setMap',
    value: function setMap(map) {
      this.setState({ map: map });
    }
  }, {
    key: 'render',
    value: function render() {
      var children = this.props.children;
      var map = this.state.map;

      return _react2.default.createElement(
        'div',
        { className: this.props.prefix },
        _react2.default.createElement(MapComponent, _extends({}, this.props, {
          setMap: this.setMap.bind(this)
        })),
        map ? _react2.default.Children.map(children, function (child, idx) {
          return _react2.default.cloneElement(child, { map: map });
        }) : null
      );
    }
  }]);

  return LeafletMap;
}(_react2.default.Component);

LeafletMap.defaultProps = {
  prefix: 'map',
  center: [0, 0],
  zoom: 13,
  width: '100%',
  height: 400
};

//leaflet lives under here

var MapComponent = function (_React$Component2) {
  _inherits(MapComponent, _React$Component2);

  function MapComponent(props) {
    _classCallCheck(this, MapComponent);

    return _possibleConstructorReturn(this, (MapComponent.__proto__ || Object.getPrototypeOf(MapComponent)).call(this, props));
  }

  _createClass(MapComponent, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var map = _leaflet2.default.map((0, _reactDom.findDOMNode)(this), this.props);
      this.props.setMap(map);
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      return false;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement('div', {
        style: { width: this.props.width, height: this.props.height }
      });
    }
  }]);

  return MapComponent;
}(_react2.default.Component);

module.exports = LeafletMap;