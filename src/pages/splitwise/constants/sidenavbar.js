import ROUTES from './routes';

const sideNavBarItems = ['Dashboard', { Analytics: ['Categorical', 'All Expenses'] }, 'Transactions', 'View Profile', 'Add Expense'];
const sideNavBarLinks = [
  ROUTES.DASHBOARD_ROUTE,
  [ROUTES.CATEGORIES_ANALYTICS, ROUTES.ALL_EXPENSES_ANALYTICS],
  ROUTES.TRANSACTIONS_ROUTE,
  ROUTES.PROFILE_ROUTE,
  ROUTES.ADD_EXPENSE_ROUTE,
];

export { sideNavBarItems, sideNavBarLinks };
