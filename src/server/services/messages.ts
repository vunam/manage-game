import getDb from '../helpers/db';

const db = getDb();
const table = 'messages';

// READ

export const getAllMessages = () =>
  db
    .cloneDeep()
    .get(table)
    .value();

export const findMessagesByTeam = team =>
  db
    .get(table)
    .filter({team})
    .reverse()
    .value();

// WRITE

export const createMessage = data =>
  db
    .get(table)
    .push(data)
    .write();
