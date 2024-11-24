// src/actions/customLayerActions.js

export const ADD_LAYER = 'ADD_LAYER';

export const addBuildingLayer = (layer) => ({
  type: ADD_LAYER,
  payload: layer,
});

