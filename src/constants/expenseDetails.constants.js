const EXPENSE_DETAILS = {
  PAID_BY: 'paidBy',
  DESCRIPTION: 'description',
  CATEGORY: 'category',
  DATE: 'date',
  AMOUNT: 'amount',
  SPLIT_BETWEEN: 'splitBetween',
  SPLITTED_PARTS: 'splittedParts',
  SPLIT_TYPE: 'splitType',
};

const DESCRIPTORS = {
  [EXPENSE_DETAILS.AMOUNT]: 'Amount(₹)',
  [EXPENSE_DETAILS.CATEGORY]: 'Category',
  [EXPENSE_DETAILS.SPLIT_BETWEEN]: 'Split Between',
  [EXPENSE_DETAILS.PAID_BY]: 'Paid By',
  [EXPENSE_DETAILS.DESCRIPTION]: 'Description',
  [EXPENSE_DETAILS.SPLIT_TYPE]: 'Split Type',
  [EXPENSE_DETAILS.DATE]: 'Date',
  [EXPENSE_DETAILS.SPLITTED_PARTS]: 'Splitted Parts',
};

export { EXPENSE_DETAILS, DESCRIPTORS };
