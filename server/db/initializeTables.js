import bcrypt from 'bcrypt';
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

const tableInitialize = () => {
  const createTables = `
DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
  id SERIAL NOT NULL PRIMARY KEY,
  firstname VARCHAR(50) NOT NULL ,
  lastName VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  user_activation_code VARCHAR(255),
  user_email_status VARCHAR(20),
  usertype VARCHAR(20) NOT NULL DEFAULT('client'),
  isadmin BOOL NOT NULL DEFAULT('false')
);

DROP TABLE IF EXISTS account CASCADE;
CREATE TABLE account (
  id SERIAL NOT NULL PRIMARY KEY,
  account_number BIGINT NOT NULL UNIQUE ,
  created_on TIMESTAMP,
  user_id INT NOT NULL REFERENCES users (id),
  email VARCHAR(100) NOT NULL ,
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
  transaction_type2 VARCHAR(20)
);
`;

  const query = {
    text: 'INSERT INTO users (firstName, lastName, email, password, user_activation_code, user_email_status, usertype, isadmin) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
    values: [
      process.env.firstname,
      process.env.lastname,
      process.env.email,
      bcrypt.hashSync(process.env.password, 10),
      'ac9f52cdde2c85401d48d769eb9b7e22',
      'verified',
      'admin',
      'true'
    ]
  };

  pool.query(createTables).then(() => {
    pool.query(query, () => {
      console.log('all done');
    });
  }).catch((err) => {
    console.log(err);
  });
};


tableInitialize();
