import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import {createEpicMiddleware} from 'redux-observable';
import defaultReducers, {rootEpic} from '../redux';

const epicMiddleware: any = createEpicMiddleware();

export default initialState => {
  const combinedReducer = combineReducers(defaultReducers);
  const finalCreateStore = compose(applyMiddleware(epicMiddleware))(
    createStore,
  );
  const result = finalCreateStore(combinedReducer, initialState);
  epicMiddleware.run(rootEpic);
  return result;
};
