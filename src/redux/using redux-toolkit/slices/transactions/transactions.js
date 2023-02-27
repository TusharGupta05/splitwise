// import { createSlice } from '@reduxjs/toolkit';
// import LS_CACHE_KEYS from '../../../../constants/localStorage.cacheKeys';
// import {
//   getItemFromLocalStorage,
//   setItemInLocalStorage,
// } from '../../../../helpers/localStorage';

// const transactionsInitialState =
//   getItemFromLocalStorage(LS_CACHE_KEYS.TRANSACTIONS) || [];

// const transactionsSlice = createSlice({
//   name: 'transactions',
//   initialState: transactionsInitialState,
//   reducers: {
//     onAddExpense(state, action) {
//       state.push(action.payload);
//       setItemInLocalStorage(LS_CACHE_KEYS.TRANSACTIONS, state);
//     },
//   },
// });

// export default transactionsSlice;
