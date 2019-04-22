const createSuperAdmin = 'INSERT INTO users (firstName, lastName, email, password, usertype, isadmin) VALUES($1, $2, $3, $4, $5, $6) returning *';

const createUser = 'INSERT INTO users (firstName, lastName, email, password) VALUES($1, $2, $3, $4) returning *';

const createAccount = 'INSERT INTO account (account_number, created_on, user_id, account_type, account_status, balance) VALUES($1, $2, $3, $4, $5, $6) returning *';

const getUser = 'SELECT email, password FROM users WHERE email=$1';

const getUsers = 'SELECT id, firstName, email FROM users WHERE email=$1';
export {
  createSuperAdmin, createUser, createAccount, getUser, getUsers
};
