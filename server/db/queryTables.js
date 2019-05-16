const createSuperAdmin = 'INSERT INTO users (firstName, lastName, email, password, usertype, isadmin) VALUES($1, $2, $3, $4, $5, $6) returning *';

const createUser = 'INSERT INTO users (firstName, lastName, email, password, user_activation_code, user_email_status) VALUES($1, $2, $3, $4, $5, $6) returning id, firstname, lastname, email, usertype';
const adminCreateUser = 'INSERT INTO users (firstName, lastName, email, password, user_activation_code, user_email_status, usertype) VALUES($1, $2, $3, $4, $5, $6, $7) returning id, firstname, lastname, email, usertype';
const createAccount = `INSERT INTO account (account_number, created_on, user_id,
email, account_type, account_status, balance) 
VALUES($1, $2, $3, $4, $5, $6, $7) returning account_number, created_on,
email, account_type, account_status, balance`;

const getUser = 'SELECT * FROM users WHERE email=$1';

const getUsers = 'SELECT id, firstName, email, usertype FROM users WHERE email=$1';

const transactions = `INSERT INTO transactions (account_number, transaction_id, transaction_date,
  cashier_id, amount, transaction_type, old_balance, new_balance, payee_name, payee_phone, payee_account_number,
  transaction_type2) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
  RETURNING account_number, transaction_id, transaction_date, amount, transaction_type, new_balance`;

const updateAccount = 'UPDATE account set balance=$1 WHERE account_number= $2 returning *';

const updateAccountDb = 'UPDATE account SET account_status=$1 WHERE account_number=$2 RETURNING *';

const getAcctStatus = 'SELECT * FROM account where account_number = $1';

const delAccount = 'DELETE FROM account WHERE account_number=$1';

const getAcctTransactions = 'SELECT transaction_id, transaction_date, cashier_id, amount, transaction_type, old_balance, new_balance FROM transactions WHERE account_number=$1';

const setUserType = 'UPDATE users SET usertype=$1, isadmin=$2 WHERE id=$3';

export {
  createSuperAdmin, createUser, createAccount, getUser, getUsers, transactions,
  updateAccount, updateAccountDb, getAcctStatus, delAccount, getAcctTransactions, setUserType,
  adminCreateUser
};
