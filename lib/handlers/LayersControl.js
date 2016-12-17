'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HandleLayersControl = function (_React$Component) {
  _inherits(HandleLayersControl, _React$Component);

  function HandleLayersControl(props) {
    _classCallCheck(this, HandleLayersControl);

    return _possibleConstructorReturn(this, (HandleLayersControl.__proto__ || Object.getPrototypeOf(HandleLayersControl)).call(this, props));
  }

  _createClass(HandleLayersControl, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      if (this.props.type === 'overlay') {
        this.props.layersControl.addOverlay(this.props.layer, this.props.name);
      } else if (this.props.type === 'base') {
        this.props.layersControl.addBaseLayer(this.props.layer, this.props.name);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.props.layersControl.removeLayer(this.props.layer);
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }]);

  return HandleLayersControl;
}(_react2.default.Component);

HandleLayersControl.defaultProps = {
  type: 'overlay'
};

module.exports = HandleLayersControl;