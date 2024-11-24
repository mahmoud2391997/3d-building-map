import {createStore, combineReducers} from 'redux';
import {keplerGlReducer} from '@kepler.gl/reducers';

// Combine the reducers (add your own reducers if needed)
export const rootReducer = combineReducers({
  keplerGl: keplerGlReducer
});

// Create the store
