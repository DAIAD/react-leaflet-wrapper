'use strict';

var Map = require('./Map');
var TileLayer = require('./Tile');
var GeoJSON = require('./GeoJSON');
var Choropleth = require('./Choropleth');
var HeatLayer = require('./Heat');
var DrawControl = require('./DrawControl');
var LayersControl = require('./LayersControl');
var InfoControl = require('./InfoControl');

module.exports = {
  Map: Map,
  TileLayer: TileLayer,
  GeoJSON: GeoJSON,
  Choropleth: Choropleth,
  HeatLayer: HeatLayer,
  DrawControl: DrawControl,
  LayersControl: LayersControl,
  InfoControl: InfoControl
};