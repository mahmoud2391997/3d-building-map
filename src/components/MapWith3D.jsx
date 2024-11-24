import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import KeplerGl from '@kepler.gl/components';
import { addDataToMap } from '@kepler.gl/actions';

const sampleTripData = {
  fields: [
    { name: 'pickup_time', type: 'timestamp' },
    { name: 'pickup_longitude', type: 'real' },
    { name: 'pickup_latitude', type: 'real' },
    { name: 'dropoff_longitude', type: 'real' },
    { name: 'dropoff_latitude', type: 'real' },
    { name: 'passenger_count', type: 'integer' },
  ],
  rows: [
    [
      '2024-11-21 12:34:56',
      -73.9821548461914,
      40.76793670654297,
      -73.96463012695312,
      40.765602111816406,
      1,
    ],
    // Add more rows as needed
  ],
};

const Map = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      addDataToMap({
        datasets: {
          info: {
            label: 'Sample Taxi Trips in New York City',
            id: 'test_trip_data',
          },
          data: sampleTripData,
        },
        option: {
          centerMap: true,
          readOnly: false,
        },
        config: {
          mapStyle: { styleType: 'light' },
        },
      })
    );
  }, [dispatch]);

  return (
    <KeplerGl
      id="foo"
      mapboxApiAccessToken={import.meta.env.VITE_APP_MAPBOX_API_KEY}
      width={window.innerWidth}
      height={window.innerHeight}
    />
  );
};

export default Map;
