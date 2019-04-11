const firstNameEmpty = {
  firstName: '',
  lastName: 'Ogbonna',
  email: 'nke@gmail.com',
  password: 'nke123',
  cpassword: 'nke123'
};
const undefinedFirstName = {
  lastName: 'Ogbonna',
  email: 'nke@gmail.com',
  password: 'nke123',
  cpassword: 'nke123'
};
const firstNameNotSring = {
  firstName: { firstname: ['nkechi'] },
  lastName: 'Ogbonna',
  email: 'nke@gmail.com',
  password: 'nke123',
  cpassword: 'nke123'
};
const lastNameEmpty = {
  firstName: 'Nkechi',
  lastName: '',
  email: 'nke@gmail.com',
  password: 'nke123',
  cpassword: 'nke123'
};
const undefinedlastName = {
  firstName: 'Nkechi',
  email: 'nke@gmail.com',
  password: 'nke123',
  cpassword: 'nke123'
};
const lastNameNotString = {
  firstName: 'Nkechi',
  lastName: ['nkechi'],
  email: 'nke@gmail.com',
  password: 'nke123',
  cpassword: 'nke123'
};
const emailAddressEmpty = {
  firstName: 'Nkechi',
  lastName: 'Ogbonna',
  email: '',
  password: 'nke123',
  cpassword: 'nke123'
};
const emailAddressUndefined = {
  firstName: 'Nkechi',
  lastName: 'Ogbonna',
  password: 'nke123',
  cpassword: 'nke123'
};
const emailAddressNotString = {
  firstName: 'Nkechi',
  lastName: 'Ogbonna',
  email: ['nkechi'],
  password: 'nke123',
  cpassword: 'nke123'
};
const emailInvalidLength = {
  firstName: 'Nkechi',
  lastName: 'Ogbonna',
  email: 'n@g.co',
  password: 'nke123',
  cpassword: 'nke123'
};
const emailInvalidFormat = {
  firstName: 'Nkechi',
  lastName: 'Ogbonna',
  email: 'nk23gmail',
  password: 'nke123@#',
  cpassword: 'nke123@#'
};
const passwordNotEmpty = {
  firstName: 'Nkechi',
  lastName: 'Ogbonna',
  email: 'nke@gmail.com',
  password: '',
  cpassword: 'nke123'
};
export {
  firstNameEmpty, undefinedFirstName, firstNameNotSring, lastNameEmpty, undefinedlastName,
  lastNameNotString, emailAddressEmpty, emailAddressUndefined, emailAddressNotString,
  emailInvalidLength, emailInvalidFormat, passwordNotEmpty,
};
