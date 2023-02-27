import TRANSACTIONS_REDUCER from '../constants/transactionsReducers.actionTypes';
import LS_CACHE_KEYS from '../../constants/localStorage.cacheKeys';
import {
  getItemFromLocalStorage,
  setItemInLocalStorage,
} from '../../helpers/localStorage';

const transactionsInitialState =
  getItemFromLocalStorage(LS_CACHE_KEYS.TRANSACTIONS) || [];

const transactionsReducers = (state = transactionsInitialState, action) => {
  const newState = [...state];
  switch (action.type) {
    case TRANSACTIONS_REDUCER.ADD_EXPENSE:
      addExpense(newState, action);
      break;
    default:
      break;
  }
  return newState;
};

const addExpense = (state, action) => {
  state.push(action.payload);
  setItemInLocalStorage(LS_CACHE_KEYS.TRANSACTIONS, state);
};

export default transactionsReducers;
