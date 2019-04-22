const createSuperAdmin = 'INSERT INTO users (firstName, lastName, email, password, usertype, isadmin) VALUES($1, $2, $3, $4, $5, $6) returning *';

const createUser = 'INSERT INTO users (firstName, lastName, email, password) VALUES($1, $2, $3, $4) returning *';

export {
  createSuperAdmin, createUser
};
