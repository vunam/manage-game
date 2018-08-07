import getDb from '../helpers/db';

const db = getDb();
const table = 'users';

// READ

export const getAllUsers = () =>
  db
    .cloneDeep()
    .get(table)
    .value();

export const queryUsers = search =>
  db
    .get(table)
    .cloneDeep()
    .chain()
    .filter(search)
    .value();

export const findUserById = id =>
  db
    .get(table)
    .find({id})
    .value();

export const findUserByUsername = username =>
  db
    .get(table)
    .find({username})
    .value();

// WRITE

export const createUser = (id, username, hashed, team = null, role = 'owner') =>
  db
    .get(table)
    .push({
      id,
      username,
      team,
      hashed,
      role,
    })
    .write();

export const updateUserById = (id, data) =>
  db
    .get(table)
    .find({id})
    .assign(data)
    .write();

export const deleteUserById = (id) =>
  db
    .get(table)
    .remove({id})
    .write();
