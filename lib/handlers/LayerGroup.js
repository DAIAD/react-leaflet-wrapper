'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HandleLayerGroup = function (_React$Component) {
  _inherits(HandleLayerGroup, _React$Component);

  function HandleLayerGroup(props) {
    _classCallCheck(this, HandleLayerGroup);

    return _possibleConstructorReturn(this, (HandleLayerGroup.__proto__ || Object.getPrototypeOf(HandleLayerGroup)).call(this, props));
  }

  _createClass(HandleLayerGroup, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.props.layerGroup.addLayer(this.props.layer);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.props.layerGroup.removeLayer(this.props.layer);
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }]);

  return HandleLayerGroup;
}(_react2.default.Component);

module.exports = HandleLayerGroup;