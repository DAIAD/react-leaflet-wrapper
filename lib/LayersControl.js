'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _leaflet = require('leaflet');

var _leaflet2 = _interopRequireDefault(_leaflet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LayersControl = function (_React$Component) {
  _inherits(LayersControl, _React$Component);

  function LayersControl(props) {
    _classCallCheck(this, LayersControl);

    return _possibleConstructorReturn(this, (LayersControl.__proto__ || Object.getPrototypeOf(LayersControl)).call(this, props));
  }

  _createClass(LayersControl, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.control = _leaflet2.default.control.layers({}, {}, { position: this.props.position });
      this.control.addTo(this.props.map);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.control.remove();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        null,
        this.control ? _react2.default.Children.map(this.props.children, function (Child, idx) {
          var properties = Object.keys(_this2.props).filter(function (key) {
            return key !== 'children';
          }).reduce(function (p, key) {
            p[key] = _this2.props[key];return p;
          }, {});
          return _react2.default.cloneElement(Child, _extends({ layersControl: _this2.control }, properties, Child.props));
        }) : null
      );
    }
  }]);

  return LayersControl;
}(_react2.default.Component);

LayersControl.defaultProps = {
  position: 'topright'
};

module.exports = LayersControl;