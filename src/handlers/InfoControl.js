var React = require('react');
var { renderToStaticMarkup } = require('react-dom/server');

var HandleInfoControl = React.createClass({
  
  componentWillMount: function() {
    this.props.updateInfo(renderToStaticMarkup(this.props.infoContent()));
  },

  componentWillReceiveProps: function(nextProps) {
    if (nextProps.mouseover === null) {
      this.props.updateInfo(renderToStaticMarkup(this.props.infoContent()));
    }
    if (nextProps.mouseover) {
      this.props.updateInfo(renderToStaticMarkup(this.props.infoContent(nextProps.mouseover)));
    }
  },
  
  render: function() {
    return null;
  }
});

module.exports = HandleInfoControl;
