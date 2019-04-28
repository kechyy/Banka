const firstNameEmpty = {
  firstName: '',
  lastName: 'Ogbonna',
  email: 'nke@gmail.com',
  type: 'savings'
};
const undefinedFirstName = {
  lastName: 'Ogbonna',
  email: 'nke@gmail.com',
  type: 'current'
};
const firstNameNotSring = {
  firstName: ['nkechi'],
  lastName: 'Ogbonna',
  email: 'nke@gmail.com',
  type: 'current',
};
const lastNameEmpty = {
  firstName: 'Nkechi',
  lastName: '',
  email: 'nke@gmail.com',
  type: 'savings'
};
const typeNameEmpty = {
  firstName: 'Nkechi',
  lastName: 'Pgbonna',
  email: 'nke@gmail.com',
  type: ''
};
const undefinedlastName = {
  firstName: 'Nkechi',
  email: 'nke@gmail.com',
  type: 'current'
};
const lastNameNotString = {
  firstName: 'Nkechi',
  lastName: ['nkechi'],
  email: 'nke@gmail.com',
  type: 'savings'
};
const emailAddressEmpty = {
  firstName: 'Nkechi',
  lastName: 'Ogbonna',
  email: '',
  type: 'savings'
};
const emailAddressUndefined = {
  firstName: 'Nkechi',
  lastName: 'Ogbonna',
  type: 'current'
};
const acctTypeUndefined = {
  firstName: 'Nkechi',
  lastName: 'Ogbonna',
  email: 'nke@gmail.com'
};
const InvalidAccType = {
  firstName: 'Nkechi',
  lastName: 'Ogbonna',
  email: 'nke@gmail.com',
  type: 'withdrawal'
};
const emailAddressNotString = {
  firstName: 'Nkechi',
  lastName: 'Ogbonna',
  email: ['nkechi'],
  type: 'current'
};
const firstNameInvalidLength = {
  firstName: 'N',
  lastName: 'Ogbonna',
  email: 'nke@gmail.co',
  type: 'current'
};
const lastNameInvalidLength = {
  firstName: 'Nkechi',
  lastName: 'O',
  email: 'nke@gmail.co',
  type: 'current'
};
const emailInvalidLength = {
  firstName: 'Nkechi',
  lastName: 'Ogbonna',
  email: 'n@g.co',
  type: 'current'
};
const emailInvalidFormat = {
  firstName: 'Nkechi',
  lastName: 'Ogbonna',
  email: 'nk23gmail',
  type: 'current'
};
const InvalidAccountNumber = {
  accountNumber: '7788123',
  firstName: 'Nkechi',
  lastName: 'Ogbonna',
  email: 'nk23@gmail',
  type: 'current'
};
const acctNotFound = {
  accountNumber: '09877881293',
  firstName: 'Nkechi',
  lastName: 'Ogbonna',
  email: 'nk23@gmail',
  type: 'current'
};

export {
  firstNameEmpty, typeNameEmpty, undefinedFirstName, acctTypeUndefined, firstNameNotSring,
  lastNameEmpty, undefinedlastName, lastNameNotString, emailAddressEmpty, emailAddressUndefined,
  emailAddressNotString, lastNameInvalidLength, firstNameInvalidLength, emailInvalidLength,
  emailInvalidFormat, InvalidAccType, InvalidAccountNumber, acctNotFound
};
