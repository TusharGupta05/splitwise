import { configureStore } from '@reduxjs/toolkit';
// import auth from './slices/auth';
import authSlice from './slices/auth';
import transactionsSlice from './slices/transactions';

const reduxStore = configureStore({
  reducer: { auth: authSlice.reducer, transactions: transactionsSlice.reducer },
});

export default reduxStore;
