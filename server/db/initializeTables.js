import bcrypt from 'bcrypt';
import pool from './connection';
import { createSuperAdmin } from './queryTables';

const createTables = `
DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
  id SERIAL NOT NULL PRIMARY KEY,
  firstname VARCHAR(50) NOT NULL ,
  lastName VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  usertype VARCHAR(8) NOT NULL DEFAULT('client'),
  isadmin BOOL NOT NULL DEFAULT('false')
);

DROP TABLE IF EXISTS account CASCADE;
CREATE TABLE account (
  id SERIAL NOT NULL PRIMARY KEY,
  account_number BIGINT NOT NULL UNIQUE ,
  created_on TIMESTAMP,
  user_id INT NOT NULL REFERENCES users (id),
  account_type VARCHAR(8) NOT NULL,
  account_status VARCHAR(8) NOT NULL,
  balance NUMERIC(6,2) NOT NULL
);
DROP TABLE IF EXISTS transactions CASCADE;
CREATE TABLE transactions (
  id SERIAL NOT NULL PRIMARY KEY,
  account_number BIGINT NOT NULL,
  transaction_id VARCHAR(255) NOT NULL UNIQUE,
  transaction_date TIMESTAMP,
  cashier_id INT NOT NULL REFERENCES users (id),
  amount NUMERIC(6,2) NOT NULL,
  transaction_type VARCHAR(8) NOT NULL,
  old_balance NUMERIC(6,2) NOT NULL,
  new_balance NUMERIC(6,2) NOT NULL,
  payee_name VARCHAR(50),
  payee_phone VARCHAR(50),
  payee_account_number BIGINT,
  transaction_type2 VARCHAR(20),
  payee_accountnumber BIGINT
);
`;

const initializeTable = async () => {
  try {
    await pool.query(createTables);
    console.log('Tables created');
  } catch (err) {
    console.log({ err: err.message });
  }
};


const adminInfo = [
  process.env.firstname,
  process.env.lastname,
  process.env.email,
  bcrypt.hashSync(process.env.password, 10),
  'admin',
  'true'
];
const superAdmin = async () => {
  try {
    const admin = await pool.query(createSuperAdmin, adminInfo);
  } catch (err) {
    console.log({ err: err.message });
  }
};

initializeTable()
  .then(() => superAdmin())
  .catch(err => console.log(err));
