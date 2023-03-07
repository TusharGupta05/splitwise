import { handleActions } from 'redux-actions';
import produce from 'immer';
import TRANSACTIONS_REDUCER from '../constants/transactionsReducer.actionTypes';
import LS_CACHE_KEYS from '../../constants/localStorage.cacheKeys';
import { getItemFromLocalStorage, setItemInLocalStorage } from '../../helpers/localStorage';
import { EXPENSE_DETAILS } from '../../constants/expenseDetails.constants';
import calculateSplittedAmounts from '../../helpers/calculateSplittedAmounts';

const transactionsInitialState = getItemFromLocalStorage(LS_CACHE_KEYS.TRANSACTIONS) || [];
const handleAddExpense = produce((state, action) => {
  state.push(action.payload);
  setItemInLocalStorage(LS_CACHE_KEYS.TRANSACTIONS, state);
});

const handleUpdateExpense = produce((state, action) => {
  const { index, key, value } = action.payload;
  const newState = state;
  const updatedTransaction = { ...state[index], [key]: value };
  if (
    updatedTransaction[EXPENSE_DETAILS.AMOUNT] > 0 &&
    (updatedTransaction[EXPENSE_DETAILS.DESCRIPTION] ?? '').length &&
    updatedTransaction[EXPENSE_DETAILS.SPLIT_BETWEEN].length &&
    updatedTransaction[EXPENSE_DETAILS.PAID_BY] &&
    Object.values(calculateSplittedAmounts(updatedTransaction)).reduce((acc, currVal) => acc + currVal, 0) ===
      updatedTransaction[EXPENSE_DETAILS.AMOUNT]
  ) {
    newState[index] = updatedTransaction;
    setItemInLocalStorage(LS_CACHE_KEYS.TRANSACTIONS, newState);
  }
});

const transactionsReducer = handleActions(
  {
    [TRANSACTIONS_REDUCER.HANDLE_ADD_EXPENSE]: handleAddExpense,
    [TRANSACTIONS_REDUCER.HANDLE_UPDATE_EXPENSE]: handleUpdateExpense,
  },
  transactionsInitialState,
);
export default transactionsReducer;
