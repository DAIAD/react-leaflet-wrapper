import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { render, unmountComponentAtNode } from 'react-dom';

class HandlePopup extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.popup = L.popup()
    .setLatLng(this.props.map.getCenter())
    .openOn(this.props.map)
    
    this.props.layer.bindPopup(this.popup).closePopup();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.click !== this.props.click) {
        render(this.props.popupContent(nextProps.click), this.popup._contentNode)
    }
    if (nextProps.data !== this.props.data) {
      this.popup.remove();
    }
  }

  componentWillUnmount() {
    this.props.layer.unbindPopup();
    this.popup.remove();
    unmountComponentAtNode(this.popup._contentNode);
  }
  
  render() {
    return null;
  }

}

module.exports = HandlePopup;
