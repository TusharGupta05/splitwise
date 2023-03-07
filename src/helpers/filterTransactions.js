import { EXPENSE_DETAILS } from '../constants/expenseDetails.constants';

const filterTransactions = (targetUser) => (transaction) =>
  transaction[EXPENSE_DETAILS.PAID_BY] === targetUser || transaction[EXPENSE_DETAILS.SPLIT_BETWEEN].find((user) => user === targetUser);
export default filterTransactions;
