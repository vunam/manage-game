import getDb from '../helpers/db';

const db = getDb();

db.defaults({players: [], users: [], teams: []}).write();
