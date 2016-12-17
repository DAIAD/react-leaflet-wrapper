'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

var _reactDom = require('react-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HandlePopup = function (_React$Component) {
  _inherits(HandlePopup, _React$Component);

  function HandlePopup(props) {
    _classCallCheck(this, HandlePopup);

    return _possibleConstructorReturn(this, (HandlePopup.__proto__ || Object.getPrototypeOf(HandlePopup)).call(this, props));
  }

  _createClass(HandlePopup, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.popup = L.popup().setLatLng(this.props.map.getCenter()).openOn(this.props.map);

      this.props.layer.bindPopup(this.popup).closePopup();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.click !== this.props.click) {
        (0, _reactDom.render)(this.props.popupContent(nextProps.click), this.popup._contentNode);
      }
      if (nextProps.data !== this.props.data) {
        this.popup.remove();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.props.layer.unbindPopup();
      this.popup.remove();
      (0, _reactDom.unmountComponentAtNode)(this.popup._contentNode);
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }]);

  return HandlePopup;
}(_react2.default.Component);

module.exports = HandlePopup;