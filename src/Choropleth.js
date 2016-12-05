var React = require('react');
var { renderToStaticMarkup } = require('react-dom/server');
var L = require('leaflet');
var chroma = require('chroma-js');
var GeoJSON = require('./GeoJSON');
var InfoControl = require('./InfoControl');

var Choropleth = React.createClass({

  getDefaultProps: function() {
    return {
      data: null,
      valueProperty: null,
      scale: ['white', 'red'],
      steps: 5,
      mode: 'q',
      style: {},
      legend: false,
      legendClass: 'info legend'
    };
  },
  componentDidMount: function() {

    this.values = this.getValues(this.props.data); 
    this.limits = this.getLimits(this.values); 
    this.colors = this.getColors();

  },
  componentWillReceiveProps: function(nextProps) {
    if (nextProps.data) {
      this.values = this.getValues(nextProps.data); 
      this.limits = this.getLimits(this.values); 
      this.colors = this.getColors();
    }
  },

  getValues: function(data) {
    return data ? data.features
      .map(feature => (typeof this.props.valueProperty === 'function') ? 
           this.props.valueProperty(feature)
             :
               feature.properties[this.props.valueProperty])
               : [];
  },

  getLimits: function(values) {
    return this.props.buckets ? this.props.buckets : (
      this.props.limits ? 
         Array.from({ length: this.props.steps+1 }, (v, i) => i === this.props.steps ? this.props.limits[1] : this.props.limits[0] + (i*Math.round((this.props.limits[1]-this.props.limits[0])/(this.props.steps)))) 
           : ( Array.isArray(values) && values.length > 0 ?  
              chroma.limits(values, this.props.mode, this.props.steps)
              : [])
    );
  },
  
  limitsToBuckets: function() {
    return this.limits.map((limit, i, arr) => i < arr.length - 1 ? [arr[i], arr[i+1]] : null).filter((x, i, arr) => i < arr.length -1);
  },

  getColors: function() {
    return this.props.colors || chroma.scale(this.props.scale).colors(this.props.steps+1);
  },

  getStyle: function() {
    return feature => {
      const style = typeof this.props.style === 'function' ? {...this.props.style()} : {...this.props.style};
      const value = (typeof this.props.valueProperty === 'function') ? 
      this.props.valueProperty(feature)
        :
          feature.properties[this.props.valueProperty];

      const buckets = this.limitsToBuckets();

      const idx = buckets.findIndex(bucket => value >= bucket[0] && value < bucket[1]);

      //if bucket not found add to last?
      if (idx === -1) {
        style.fillColor = this.colors[this.colors.length - 1];
      }
      else {
        style.fillColor = this.colors[idx];
      }

      return style;

    };
  },

  render: function() {
    return (
      <div>
        {
          this.props.legend && this.limits && this.colors ? 
            <InfoControl
              map={this.props.map}
              position={this.props.legend}
              className={this.props.legendClass}
              >
              <InitLegend
                buckets={this.limitsToBuckets()}
                colors={this.colors}
              />
            </InfoControl>
              :
                null
        }
        <GeoJSON 
          {...this.props}
          style={this.getStyle()}
        />
      </div>
    );
  }
});

var InitLegend = React.createClass({
  componentDidMount: function() {
    this.props.updateInfo('');

    const buckets = this.props.buckets;
    const colors = this.props.colors;
    
    this.props.updateInfo(renderToStaticMarkup(<LegendMarkup buckets={buckets} colors={colors} />));
  },
  componentWillReceiveProps: function(nextProps) {
    const buckets = nextProps.buckets || this.props.buckets;
    const colors = nextProps.colors || this.props.colors;

    this.props.updateInfo('');
    this.props.updateInfo(renderToStaticMarkup(<LegendMarkup buckets={buckets} colors={colors} />));
  },
  render: function() {
    return null;
  }
});

function LegendMarkup (props) {
  const { buckets, colors } = props;
  return (
    <div>
      {
      buckets.map((bucket, i) =>  
                 <span key={i}>
                 <i style={{ backgroundColor: colors[i] }} /> 
                   {`${bucket[0]} - ${bucket[1]}`}
                   <br />
                 </span>
      )
      }
    </div>
  );
}

module.exports = Choropleth;
