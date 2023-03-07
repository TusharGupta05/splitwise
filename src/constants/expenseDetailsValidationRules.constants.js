import { EXPENSE_DETAILS } from './expenseDetails.constants';
import EXPENSE_DETAILS_ERRORS from './expenseDetailsErrors.constants';

const EXPENSE_DETAILS_VALIDATION_RULES = {
  [EXPENSE_DETAILS.AMOUNT]: [{ required: true, message: EXPENSE_DETAILS_ERRORS.EMPTY_AMOUNT }],
  [EXPENSE_DETAILS.PAID_BY]: [{ required: true, message: EXPENSE_DETAILS_ERRORS.EMPTY_PAID_BY }],
  [EXPENSE_DETAILS.CATEGORY]: [{ required: true, message: EXPENSE_DETAILS_ERRORS.EMPTY_CATEGORY }],
  [EXPENSE_DETAILS.SPLIT_BETWEEN]: [{ required: true, message: EXPENSE_DETAILS_ERRORS.EMPTY_SPLIT_BETWEEN }],
  [EXPENSE_DETAILS.DESCRIPTION]: [{ required: true, message: EXPENSE_DETAILS_ERRORS.EMPTY_DESCRIPTION }],
};

export default EXPENSE_DETAILS_VALIDATION_RULES;
