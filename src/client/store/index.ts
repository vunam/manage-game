
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import defaultReducers, { rootEpic } from '../redux';

const epicMiddleware = createEpicMiddleware(rootEpic);
const middleware = [epicMiddleware];

export default (initialState) => {
  const combinedReducer = combineReducers(defaultReducers);
  const finalCreateStore = compose(applyMiddleware(...middleware))(createStore);

  return finalCreateStore(combinedReducer, initialState);
}
