import { combineReducers, createStore } from 'redux';
import authReducers from './auth/authReducers';
import transactionsReducers from './transactions/transactionsReducers';

const reduxStore = createStore(
  combineReducers({ transactions: transactionsReducers, auth: authReducers })
);

export default reduxStore;
