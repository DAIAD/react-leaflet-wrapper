import React from 'react';

import HandleLayerGroup from './LayerGroup';
import HandleLayersControl from './LayersControl';
import HandlePopup from './Popup';
import HandleInfoControl from './InfoControl';

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
