'use strict';

var React = require('react');

var _require = require('react-dom/server'),
    renderToStaticMarkup = _require.renderToStaticMarkup;

var HandleInfoControl = React.createClass({
  displayName: 'HandleInfoControl',

  getDefaultProps: function getDefaultProps() {
    return {};
  },
  componentWillMount: function componentWillMount() {
    this.props.updateInfo(renderToStaticMarkup(this.props.infoContent()));
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (nextProps.mouseover === null) {
      this.props.updateInfo(renderToStaticMarkup(this.props.infoContent()));
    }
    if (nextProps.mouseover) {
      this.props.updateInfo(renderToStaticMarkup(this.props.infoContent(nextProps.mouseover)));
    }
  },
  componentWillUnmount: function componentWillUnmount() {},
  render: function render() {
    return null;
  }
});

module.exports = HandleInfoControl;