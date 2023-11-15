import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';

const initialStore = {};

const store = createStore(
  reducers,
  initialStore,
  applyMiddleware(thunk))
  ;

export default store;
