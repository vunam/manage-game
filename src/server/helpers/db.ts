import * as low from 'lowdb';
import * as path from 'path';
import * as FileSync from 'lowdb/adapters/FileSync';

let db = null;

export default () => {
  if (db) return db;

  const adapter = new FileSync(path.resolve(__dirname, '..', '..', '..', 'db.json'));
  db = low(adapter)
  
  return db;
};
