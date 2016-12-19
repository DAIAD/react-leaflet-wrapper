'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _leaflet = require('leaflet');

var _leaflet2 = _interopRequireDefault(_leaflet);

require('leaflet-draw');

var _GeoJSON = require('./GeoJSON');

var _GeoJSON2 = _interopRequireDefault(_GeoJSON);

var _handlers = require('./handlers/');

var _handlers2 = _interopRequireDefault(_handlers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DrawControl = function (_React$Component) {
  _inherits(DrawControl, _React$Component);

  function DrawControl(props) {
    _classCallCheck(this, DrawControl);

    var _this = _possibleConstructorReturn(this, (DrawControl.__proto__ || Object.getPrototypeOf(DrawControl)).call(this, props));

    _this.state = {
      data: _this.props.data,
      geojson: null
    };
    return _this;
  }

  _createClass(DrawControl, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.props.map.on('draw:created', this.createHandler.bind(this));
      this.props.map.on('draw:edited', this.editHandler.bind(this));
      this.props.map.on('draw:deleted', this.deleteHandler.bind(this));
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {
      if (nextState.geojson && !this.state.geojson) {
        this.control = new _leaflet2.default.Control.Draw({
          position: this.props.position,
          edit: _extends({
            featureGroup: nextState.geojson
          }, this.getEditOptions()),
          draw: this.getDrawOptions()
        });
        this.control.addTo(this.props.map);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.control.remove();

      this.props.map.off('draw:created');
      this.props.map.off('draw:edited');
      this.props.map.off('draw:deleted');
    }
  }, {
    key: 'getDrawOptions',
    value: function getDrawOptions() {
      return {
        polyline: false,
        rectangle: {
          shapeOptions: _extends({}, this.props.style)
        },
        circle: false,
        marker: false,
        polygon: {
          allowIntersection: false,
          showArea: true,
          shapeOptions: _extends({}, this.props.style)
        }
      };
    }
  }, {
    key: 'getEditOptions',
    value: function getEditOptions() {
      return _extends({
        edit: true,
        remove: true
      }, this.props.edit);
    }
  }, {
    key: 'createHandler',
    value: function createHandler(e) {
      var layer = {
        type: 'FeatureCollection',
        features: [e.layer.toGeoJSON()]
      };
      this.updateData(layer);
    }
  }, {
    key: 'editHandler',
    value: function editHandler(e) {
      var layer = e.layers.toGeoJSON();
      this.updateData(layer);
    }
  }, {
    key: 'deleteHandler',
    value: function deleteHandler(e) {
      this.updateData(null);
    }
  }, {
    key: 'updateData',
    value: function updateData(data) {
      if (!this.props.controlled) {
        this.setState({ data: data });
      }

      if (typeof this.props.onFeatureChange === 'function') {
        this.props.onFeatureChange(data);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(_GeoJSON2.default, _extends({
        ref: function ref(geojson) {
          if (geojson && !_this2.state.geojson) {
            _this2.setState({ geojson: geojson.layer });
          }
        }
      }, this.props, {
        data: this.props.controlled ? this.props.data : this.state.data
      }));
    }
  }]);

  return DrawControl;
}(_react2.default.Component);

DrawControl.defaultProps = {
  position: 'topleft',
  data: null,
  edit: {},
  draw: {},
  style: {
    color: '#2c3e50',
    fillColor: '#2980b9'
  },
  name: 'Selection',
  controlled: false
};

module.exports = DrawControl;