import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

class HandleInfoControl extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.updateInfo(renderToStaticMarkup(this.props.infoContent()));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.mouseover === null) {
      this.props.updateInfo(renderToStaticMarkup(this.props.infoContent()));
    }
    if (nextProps.mouseover) {
      this.props.updateInfo(renderToStaticMarkup(this.props.infoContent(nextProps.mouseover)));
    }
  }
  
  render() {
    return null;
  }
}

module.exports = HandleInfoControl;
