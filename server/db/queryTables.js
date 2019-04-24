const createSuperAdmin = 'INSERT INTO users (firstName, lastName, email, password, usertype, isadmin) VALUES($1, $2, $3, $4, $5, $6) returning *';

const createUser = 'INSERT INTO users (firstName, lastName, email, password) VALUES($1, $2, $3, $4) returning *';

const createAccount = 'INSERT INTO account (account_number, created_on, user_id, account_type, account_status, balance) VALUES($1, $2, $3, $4, $5, $6) returning *';

const getUser = 'SELECT email, password FROM users WHERE email=$1';

const getUsers = 'SELECT id, firstName, email FROM users WHERE email=$1';

const transactions = 'INSERT INTO transactions (account_number, transaction_id, transaction_date, cashier_id, amount, transaction_type, old_balance, new_balance, payee_name, payee_phone, transaction_type2, payee_accountNumber) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *';

const updateAccount = 'UPDATE account set balance=$1 WHERE account_number= $2 returning *';
export {
  createSuperAdmin, createUser, createAccount, getUser, getUsers, transactions,
  updateAccount
};
