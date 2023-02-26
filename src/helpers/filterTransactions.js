import { EXPENSE_DETAILS } from '../constants/expenseDetails.constants';

export default (targetUser) => {
  return (transaction) =>
    transaction[EXPENSE_DETAILS.PAID_BY] === targetUser ||
    transaction[EXPENSE_DETAILS.SPLIT_BETWEEN].find(
      (user) => user === targetUser
    );
};
