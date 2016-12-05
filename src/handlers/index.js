var React = require('react');

var HandleLayerGroup = require('./LayerGroup');
var HandleLayersControl = require('./LayersControl');

const ControlHandlers = function (props) {
  return (  
    <div> 
      <HandleLayerGroup 
        {...props} 
      />
      <HandleLayersControl 
        {...props}
      />
    </div>
   );
};

module.exports = ControlHandlers;
