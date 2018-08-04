
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import defaultReducers from '../redux';

const middleware = [];

export default (initialState) => {
  const combinedReducer = combineReducers(defaultReducers);
  const finalCreateStore = compose(applyMiddleware(...middleware))(createStore);

  return finalCreateStore(combinedReducer, initialState);
}
