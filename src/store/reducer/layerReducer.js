const initialState = {
    layers: [
        {
            id: 'point-layer',
            type: 'point', // Type of the layer, in this case, it's a point layer
            data: {
              type: 'FeatureCollection',
              features: [
                {
                  type: 'Feature',
                  geometry: {
                    type: 'Point',
                    coordinates: [-74.006, 40.7128]
                  },
                  properties: {
                    name: 'Location 1',
                    description: 'This is a point location in New York City.',
                  },
                },
                {
                  type: 'Feature',
                  geometry: {
                    type: 'Point',
                    coordinates: [-73.935242, 40.730610], // Example coordinates (Longitude, Latitude)
                  },
                  properties: {
                    name: 'Location 2',
                    description: 'Another point location in NYC.',
                  },
                },
              ],
            },
            config: {
              // Layer configuration settings such as color, size, radius, etc.
              color: [255, 0, 0], // Red color
              radius: 10, // Radius of the points
              opacity: 0.8, // Opacity of the points
              sizeScale: 1, // Size scaling factor
              // You can add more configurations depending on the type of layer
            },
          }
    ],
  };
  
  export const customLayerReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_LAYER':
        return {
          ...state,
          layers: [...state.layers, action.payload],
        };
      default:
        return state;
    }
  };
  