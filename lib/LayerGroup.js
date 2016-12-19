'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _leaflet = require('leaflet');

var _leaflet2 = _interopRequireDefault(_leaflet);

var _LayersControl = require('./handlers/LayersControl');

var _LayersControl2 = _interopRequireDefault(_LayersControl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LayerGroup = function (_React$Component) {
  _inherits(LayerGroup, _React$Component);

  function LayerGroup(props) {
    _classCallCheck(this, LayerGroup);

    return _possibleConstructorReturn(this, (LayerGroup.__proto__ || Object.getPrototypeOf(LayerGroup)).call(this, props));
  }

  _createClass(LayerGroup, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.layer = _leaflet2.default.layerGroup().addTo(this.props.map);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.layer.clearLayers();
      this.layer.remove();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.Children.map(this.props.children, function (Child, idx) {
          var properties = Object.keys(_this2.props).filter(function (key) {
            return key !== 'children';
          }).reduce(function (p, key) {
            p[key] = _this2.props[key];return p;
          }, {});
          return _react2.default.cloneElement(Child, _extends({ layerGroup: _this2.layer }, properties, Child.props));
        }),
        _react2.default.createElement(_LayersControl2.default, _extends({}, this.props, {
          layer: this.layer
        }))
      );
    }
  }]);

  return LayerGroup;
}(_react2.default.Component);

LayerGroup.defaultProps = {
  name: 'Group',
  controlledLayer: true
};

module.exports = LayerGroup;