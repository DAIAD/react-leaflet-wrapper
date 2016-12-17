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

var InfoControl = function (_React$Component) {
  _inherits(InfoControl, _React$Component);

  function InfoControl(props) {
    _classCallCheck(this, InfoControl);

    return _possibleConstructorReturn(this, (InfoControl.__proto__ || Object.getPrototypeOf(InfoControl)).call(this, props));
  }

  _createClass(InfoControl, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      this.control = _leaflet2.default.control({ position: this.props.position });

      this.control.onAdd = function (map) {
        return _leaflet2.default.DomUtil.create('div', _this2.props.className);
      };

      this.control.addTo(this.props.map);
      this.updateInfo('');
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.control.remove();
    }
  }, {
    key: 'updateInfo',
    value: function updateInfo(display) {
      this.control.getContainer().innerHTML = display;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return _react2.default.createElement(
        'div',
        null,
        this.control ? _react2.default.Children.map(this.props.children, function (child, idx) {
          var properties = Object.keys(_this3.props).filter(function (key) {
            return key !== 'children';
          }).reduce(function (p, key) {
            p[key] = _this3.props[key];return p;
          }, {});

          return _react2.default.cloneElement(child, _extends({ infoControl: _this3.control, updateInfo: _this3.updateInfo.bind(_this3) }, properties, child.props));
        }) : null
      );
    }
  }]);

  return InfoControl;
}(_react2.default.Component);

InfoControl.defaultProps = {
  position: 'bottomright',
  className: 'info'
};

module.exports = InfoControl;