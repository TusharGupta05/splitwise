import { combineReducers, createStore } from 'redux';
import { REDUCER_NAMES } from '../constants/reducers.constants';
import authReducer from './auth/authReducer';
import transactionsReducer from './transactions/transactionsReducer';

const defaultReducers = {
  [REDUCER_NAMES.AUTH]: authReducer,
  [REDUCER_NAMES.TRANSACTIONS]: transactionsReducer,
};

const rootReducer = combineReducers(defaultReducers);

const reduxStore = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__());
export default reduxStore;
