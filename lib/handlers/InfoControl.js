'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HandleInfoControl = function (_React$Component) {
  _inherits(HandleInfoControl, _React$Component);

  function HandleInfoControl(props) {
    _classCallCheck(this, HandleInfoControl);

    return _possibleConstructorReturn(this, (HandleInfoControl.__proto__ || Object.getPrototypeOf(HandleInfoControl)).call(this, props));
  }

  _createClass(HandleInfoControl, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.props.updateInfo((0, _server.renderToStaticMarkup)(this.props.infoContent()));
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.mouseover === null) {
        this.props.updateInfo((0, _server.renderToStaticMarkup)(this.props.infoContent()));
      }
      if (nextProps.mouseover) {
        this.props.updateInfo((0, _server.renderToStaticMarkup)(this.props.infoContent(nextProps.mouseover)));
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }]);

  return HandleInfoControl;
}(_react2.default.Component);

module.exports = HandleInfoControl;