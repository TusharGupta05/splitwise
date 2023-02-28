import TRANSACTIONS_REDUCER from '../constants/transactionsReducer.actionTypes';
import LS_CACHE_KEYS from '../../constants/localStorage.cacheKeys';
import {
  getItemFromLocalStorage,
  setItemInLocalStorage,
} from '../../helpers/localStorage';
import { handleActions } from 'redux-actions';
import produce from 'immer';

const transactionsInitialState =
  getItemFromLocalStorage(LS_CACHE_KEYS.TRANSACTIONS) || [];

const handleAddExpense = produce((state, action) => {
  state.push(action.payload);
  setItemInLocalStorage(LS_CACHE_KEYS.TRANSACTIONS, state);
});

const transactionsReducer = handleActions(
  {
    [TRANSACTIONS_REDUCER.HANDLE_ADD_EXPENSE]: handleAddExpense,
  },
  transactionsInitialState
);
export default transactionsReducer;
