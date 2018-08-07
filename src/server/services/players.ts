import getDb from '../helpers/db';

const db = getDb();
const table = 'players';

// READ

export const getAllPlayers = () =>
  db
    .cloneDeep()
    .get(table)
    .value();

export const queryPlayers = search =>
  db
    .get(table)
    .cloneDeep()
    .chain()
    .filter(search)
    .value();

export const findPlayerById = id =>
  db
    .get(table)
    .find({id})
    .value();

// WRITE

export const createPlayer = data =>
  db
    .get(table)
    .push(data)
    .write();

export const updatePlayerById = (id, data) =>
  db
    .get(table)
    .find({id})
    .assign(data)
    .write();
