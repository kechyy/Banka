const userSignUp = [{
  id: 1,
  firstName: 'Rosemary',
  lastName: 'Emmanuel',
  email: 'rossy@gmail.com',
  password: 'rosemary123&%',
  userType: 'client',
  isAdmin: 'false'
},
{
  id: 2,
  firstName: 'Nkechi',
  lastName: 'Ogbonna',
  email: 'kech3443@gmail.com',
  password: 'nkky123@#',
  userType: 'staff',
  isAdmin: 'true'
}];

const bankAccounts = [{
  accountNumber: '0004456511',
  firstName: 'Rosemary',
  lastName: 'Emmanuel',
  email: 'rossy@gmail.com',
  type: 'savings',
  openingBalance: 20000.00,
  status: 'dormant'
},
{
  accountNumber: '0234567987',
  firstName: 'Nkechi',
  lastName: 'Ogbonna',
  email: 'nke@gmail.com',
  type: 'current',
  openingBalance: 5000.00,
  status: 'active',
}];

const accountTransactionsData = [];

export { userSignUp, bankAccounts, accountTransactionsData };
