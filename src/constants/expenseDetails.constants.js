const EXPENSE_DETAILS = {
  PAID_BY: 'paidBy',
  AMOUNT: 'amount',
  SPLIT_BETWEEN: 'splitBetween',
  DESCRIPTION: 'description',
};

const DESCRIPTORS = {
  [EXPENSE_DETAILS.AMOUNT]: 'Amount(₹)',
  [EXPENSE_DETAILS.SPLIT_BETWEEN]: 'Split Between',
  [EXPENSE_DETAILS.PAID_BY]: 'Paid By',
  [EXPENSE_DETAILS.DESCRIPTION]: 'Description',
};

export { EXPENSE_DETAILS, DESCRIPTORS };
