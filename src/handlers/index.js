var React = require('react');

var HandleLayerGroup = require('./LayerGroup');
var HandleLayersControl = require('./LayersControl');
var HandlePopup = require('./Popup');
var HandleInfoControl = require('./InfoControl');

const ControlHandlers = function (props) {
  return (  
    <div> 
      {
        props.layerGroup ? 
          <HandleLayerGroup 
            {...props} 
          />
          :
            null
      }
      {
        props.layersControl && props.controlledLayer ?
          <HandleLayersControl 
            {...props}
          />
          :
            null
      }
      {
        props.infoContent && props.updateInfo ?
          <HandleInfoControl
            {...props}
          />
          :
            null
      }
      { 
        props.popupContent ? 
          <HandlePopup
            {...props}
          />
          :
            null
      }
      
    </div>
   );
};

module.exports = ControlHandlers;
