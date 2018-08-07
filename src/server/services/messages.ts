import getDb from '../helpers/db';

const db = getDb();
const table = 'messages';

// READ

export const getAllMessages = () =>
  db
    .cloneDeep()
    .get(table)
    .value();

export const findMessagesByUser = user =>
  db
    .get(table)
    .find({user})
    .value();

// WRITE

export const createMessage = data =>
  db
    .get(table)
    .push(data)
    .write();
