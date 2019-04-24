const computeNewBalance = (type, findAcct, amount) => {
  if (type === 'credit') {
    return parseFloat(findAcct.rows[0].balance) + parseFloat(amount);
  }
  if (type === 'debit') {
    return parseFloat(findAcct.rows[0].balance) -  parseFloat(amount);
  }
}
const addUser = (usertype, staffUser = '', clientUser = '') => {
  if (typeOf(staffUser) !== 'array' && typeOf(clientUser) !== 'array') {
    return 'User details should be in an array';
  }
  if (usertype) {
    return staffUser;
  }
  return clientUser;
}
export  { computeNewBalance, addUser };
